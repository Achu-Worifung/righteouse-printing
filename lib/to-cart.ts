import { variant } from "./types";

export interface CartItem {
    productId: string;
    productName: string;
    sku: string;
    price: number;
    stockLimit: number;
    color: string;
    size: string;
    imageUrl: string;
    quantity?: number;
}

interface AddToCartParams {
    productId: string;
    productName: string;
    selectedVariant: variant;
}

export function addToCart({productId, productName, selectedVariant}: AddToCartParams) {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') as string) || [];
    
    // Check if this specific variant is already in the cart
    const existingItem = cart.find(item => item.sku === selectedVariant.sku);

    if (existingItem) {
        console.log("Item already in cart");
        return;
    } else {
        // Add new item
        cart.push({
            productId: productId,
            sku: selectedVariant.sku,
            productName: productName,
            price: selectedVariant.price,
            stockLimit: selectedVariant.quantity,
            color: selectedVariant.color,
            size: selectedVariant.size,
            imageUrl: selectedVariant.images[0]?.url,
            quantity: 1
        });
        console.log("Item added to cart");
    }


    localStorage.setItem('cart', JSON.stringify(cart));
}