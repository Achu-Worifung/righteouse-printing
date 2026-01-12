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
    images?: { filename: string; size: number; type: string; url: string }[];
    variants?: variant[];
    createdAt?: Date;
    updatedAt?: Date;
    options?: [string[], { colorName: string; colorHex: string }[]];
    rating?: rating;
    reviews?: review[];
};

export type rating = {
    avg?: number;
    count?: number;
    sum?: number;
}

export type review = {
    userName?: string;
    rating?: number;
    comment?: string;
    date?: Date;
}

export type variant = {
        sku?: string;
        price?: number;
        color?: string[];
        size?: string; //size should be an array
        quantity?: number;
        images?: { filename: string; size: number; type: string; url: string }[];
        status?: string;
    }
