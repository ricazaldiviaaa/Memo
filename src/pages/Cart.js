// src/pages/Cart.js
import React, { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (id, variation) => {
    updateCart(cartItems.filter((item) => !(item.id === id && item.variation === variation)));
  };

  const increaseQuantity = (id, variation) => {
    updateCart(
      cartItems.map((item) =>
        item.id === id && item.variation === variation
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, variation) => {
    updateCart(
      cartItems
        .map((item) =>
          item.id === id && item.variation === variation
            ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <ShoppingCart size={22} className="text-red-600" />
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingCart size={48} className="text-gray-300 mb-3" />
            <p className="text-gray-500">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <div
                  key={`${item.id}-${item.variation}-${index}`}
                  className="flex items-center justify-between py-5"
                >
                  {/* IMAGE + INFO */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg border"
                    />
                    <div>
                      <h2 className="font-semibold text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-xs text-gray-500 italic">
                        Variation: {item.variation}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <button
                        onClick={() => decreaseQuantity(item.id, item.variation)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-1 text-sm font-medium">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id, item.variation)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.variation)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-md transition"
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* FOOTER */}
            <div className="mt-8 border-t pt-6 flex items-center justify-between">
              <p className="text-lg font-semibold">
                Subtotal:{" "}
                <span className="text-red-600">{formatCurrency(subtotal)}</span>
              </p>
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium shadow hover:bg-red-700 transition">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
