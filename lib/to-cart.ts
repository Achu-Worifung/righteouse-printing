import { variant } from "./types";
interface cartItem {
    productId: string;
    productName: string;
    selectedVariant: variant;
}
export function addToCart({productId, productName, selectedVariant}: cartItem) {
    const cart: cartItem[] = JSON.parse(localStorage.getItem('cart') as string) || [];
    
    // Check if this specific variant is already in the cart
    const existingItem = cart.find(item => item.selectedVariant.sku === selectedVariant.sku);

    if (existingItem) {
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
            imageUrl: selectedVariant.images[0]?.url
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}