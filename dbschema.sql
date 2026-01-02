-- =====================================================
-- EXTENSIONS
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- =====================================================
-- CATEGORIES
-- =====================================================
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_categories_parent ON categories(parent_id);

-- =====================================================
-- PRODUCTS
-- =====================================================
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) UNIQUE NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL CHECK (base_price >= 0),
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_tax_exempt BOOLEAN DEFAULT FALSE,
    tax_category_id UUID,
    deleted_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_active ON products(is_active);

-- =====================================================
-- SIZES
-- =====================================================
CREATE TABLE sizes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    label VARCHAR(10) UNIQUE NOT NULL
);

-- =====================================================
-- COLORS
-- =====================================================
CREATE TABLE colors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) UNIQUE NOT NULL,
    hex_code VARCHAR(7)
);

-- =====================================================
-- PRODUCT VARIANTS
-- =====================================================
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size_id UUID REFERENCES sizes(id),
    color_id UUID REFERENCES colors(id),
    sku VARCHAR(100) UNIQUE NOT NULL,
    price DECIMAL(10,2) CHECK (price >= 0),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (product_id, size_id, color_id)
);

CREATE INDEX idx_variants_product ON product_variants(product_id);
CREATE INDEX idx_variants_active ON product_variants(is_active);

-- =====================================================
-- INVENTORY
-- =====================================================
CREATE TABLE inventory (
    variant_id UUID PRIMARY KEY REFERENCES product_variants(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- PRODUCT IMAGES
-- =====================================================
CREATE TABLE product_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_images_product ON product_images(product_id);

-- =====================================================
-- TAX REGIONS
-- =====================================================
CREATE TABLE tax_regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_code CHAR(2) NOT NULL,
    state_code VARCHAR(10),
    city VARCHAR(100),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW(),

    UNIQUE (country_code, state_code, city, postal_code)
);

-- =====================================================
-- TAX RATES
-- =====================================================
CREATE TABLE tax_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tax_region_id UUID REFERENCES tax_regions(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    rate DECIMAL(5,4) NOT NULL CHECK (rate >= 0),
    is_compound BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- TAX CATEGORIES
-- =====================================================
CREATE TABLE tax_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

ALTER TABLE products
ADD CONSTRAINT fk_products_tax_category
FOREIGN KEY (tax_category_id) REFERENCES tax_categories(id);

-- =====================================================
-- TAX CATEGORY → RATE MAPPING
-- =====================================================
CREATE TABLE tax_category_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tax_category_id UUID REFERENCES tax_categories(id) ON DELETE CASCADE,
    tax_rate_id UUID REFERENCES tax_rates(id) ON DELETE CASCADE,
    UNIQUE (tax_category_id, tax_rate_id)
);

-- =====================================================
-- CARTS
-- =====================================================
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID REFERENCES carts(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    UNIQUE (cart_id, variant_id)
);

-- =====================================================
-- ORDERS
-- =====================================================
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    status VARCHAR(30) DEFAULT 'pending',
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    tax_override DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_user_date ON orders(user_id, created_at);

-- =====================================================
-- ORDER ITEMS (TAX SNAPSHOT)
-- =====================================================
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    variant_id UUID REFERENCES product_variants(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase DECIMAL(10,2) NOT NULL,
    tax_rate DECIMAL(5,4),
    tax_amount DECIMAL(10,2)
);

-- =====================================================
-- REVIEWS
-- =====================================================
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    user_id UUID,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- FULL-TEXT SEARCH
-- =====================================================
CREATE INDEX idx_products_search
ON products
USING gin (to_tsvector('english', name || ' ' || COALESCE(description, '')));

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to tables
CREATE TRIGGER trg_products_updated
BEFORE UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_variants_updated
BEFORE UPDATE ON product_variants
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_inventory_updated
BEFORE UPDATE ON inventory
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER trg_carts_updated
BEFORE UPDATE ON carts
FOR EACH ROW EXECUTE FUNCTION update_timestamp();
