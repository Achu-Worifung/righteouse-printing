"use client";

import { useState, useEffect } from "react";
import { CartItem } from "@/lib/to-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  useEffect(() => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    // Use setTimeout to avoid setState in effect warning
    setTimeout(() => setCartItems(cart), 0);
  }, []);

  const updateQuantity = (sku: string, delta: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.sku === sku) {
        const newQuantity = Math.max(
          1,
          Math.min((item.quantity || 1) + delta, item.stockLimit),
        );
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (sku: string) => {
    const updatedCart = cartItems.filter((item) => item.sku !== sku);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const applyCoupon = () => {
    // Simple coupon logic - you can expand this
    if (couponCode.toUpperCase() === "SAVE10") {
      setAppliedDiscount(subtotal * 0.1);
      alert("Coupon applied! 10% discount");
    } else if (couponCode) {
      alert("Invalid coupon code");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const shippingFee = cartItems.length > 0 ? 4.99 : 0;
  const total = subtotal - appliedDiscount + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-offwhite flex items-center justify-center p-4">
        <div className=" p-8 max-w-md w-full text-center">
          <motion.p 
		  initial={{ opacity: 0, y: -20 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.3 }}
		  
		  className=" relative font-serif text-3xl md:text-5xl text-forest mb-2 tracking-tighter text-center">
            Your Cart is Empty
          </motion.p>
          <motion.p
		  initial={{ opacity: 0, y: 20 }}
		  animate={{ opacity: 1, y: 0 }}
		  transition={{ duration: 0.5, delay: 0.2 }}
		   className="text-softGray max-w-2xl mx-auto font-light leading-relaxed text-sm md:text-lg text-center mb-10">
            Add some items to your cart to get started!
          </motion.p>
          <Link href="/listing">
            <motion.button 
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.4 }}
			className="bg-burgundy hover:bg-hoverprimary text-white py-4 px-3 cursor-pointer hover:text-hovertext">
              Continue Shopping
            </motion.button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-offwhite py-4 px-4 md:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header - Desktop only */}
        <h1 className="hidden md:block text-3xl font-bold text-gray-800 mb-6">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 md:space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.sku}
                className="bg-offwhite rounded-lg shadow-md p-4 md:p-6"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  {/* Product Image */}
                  <div className="relative w-16 h-16 md:w-24 md:h-24 bg-orange-100 rounded-lg shrink-0 overflow-hidden">
                    <Image
                      src={item.imageUrl || "/placeholder-image.png"}
                      alt={item.productName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <h3 className="text-base md:text-lg font-semibold text-gray-800 line-clamp-2">
                          {item.productName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Size: {item.size}
                        </p>
                        <p className="text-sm text-gray-600">
                          Color: {item.color}
                        </p>
                      </div>

                      {/* Price - Desktop */}
                      <div className="hidden md:block text-right">
                        <p className="text-xl font-bold text-gray-800">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* Quantity Controls and Price - Mobile */}
                    <div className="flex items-center justify-between mt-3 md:mt-4">
                      <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5">
                        <button
                          onClick={() => updateQuantity(item.sku, -1)}
                          disabled={(item.quantity || 1) <= 1}
                          className="text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-gray-800 min-w-8 text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.sku, 1)}
                          disabled={(item.quantity || 1) >= item.stockLimit}
                          className="text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price - Mobile */}
                      <p className="md:hidden text-lg font-bold text-gray-800">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </p>

                      {/* Remove Button - Desktop */}
                      <button
                        onClick={() => removeItem(item.sku)}
                        className="hidden md:block text-red-600 hover:text-red-800 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Remove Button - Mobile */}
                    <button
                      onClick={() => removeItem(item.sku)}
                      className="md:hidden mt-2 text-sm text-red-600 hover:text-red-800 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar - Coupons and Checkout */}
          <div className="lg:col-span-1 space-y-3 md:space-y-4">
            {/* Apply Coupons */}
            <div className="bg-offwhite rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Apply coupons
              </h2>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Apply your coupons here"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") applyCoupon();
                  }}
                />
                <Button
                  onClick={applyCoupon}
                  className="bg-[#570009] hover:bg-[#7a020e] text-white px-6"
                >
                  Apply
                </Button>
              </div>
              {appliedDiscount > 0 && (
                <p className="text-sm text-green-600 mt-2">
                  Coupon applied successfully!
                </p>
              )}
            </div>

            {/* Checkout Summary */}
            <div className="bg-offwhite rounded-lg shadow-md p-4 md:p-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
                Checkout
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-700">
                  <span>Your cart subtotal:</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount through applied coupons:</span>
                    <span className="font-semibold">
                      -${appliedDiscount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Shipping fees:</span>
                  <span className="font-semibold">
                    ${shippingFee.toFixed(2)}
                  </span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button className="w-full mt-6 bg-[#570009] hover:bg-[#7a020e] text-white py-6 text-lg font-semibold">
                Proceed to Checkout
              </Button>

              <Link href="/listing">
                <Button
                  variant="outline"
                  className="w-full mt-3 border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
