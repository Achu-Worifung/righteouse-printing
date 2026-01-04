export type InsertProductPayLoad = {
    _id?: string;
    productName?: string;
    price?: number;
    taxClass?: string;
    category?: string;
    description?: string;
    checkpoint?: string;
    quantity?: number;
    color?: string;
    size?: string;
    sku?: string;
    status?: string;
    images?: { filename: string; size: number; type: string }[];
    variants?: {
        sku: string;
        price?: number;
        color?: string;
        size?: string;
        quantity?: number;
        images?: { filename: string; size: number; type: string }[];
        status?: string;
    }[];
};

