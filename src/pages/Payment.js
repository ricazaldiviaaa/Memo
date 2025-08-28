// src/pages/Payment.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, User, Upload, CreditCard, Building, CircleStar } from "lucide-react";
import Swal from "sweetalert2";

export default function Payment() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [proof, setProof] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount);

// inside Payment.js
const handleConfirm = () => {
  if (!customer.name || !customer.email || !customer.phone) {
    Swal.fire("⚠️ Missing Info", "Please fill in all customer information.", "warning");
    return;
  }
  if (!proof) {
    Swal.fire("⚠️ No Proof", "Please upload your proof of payment.", "warning");
    return;
  }

  Swal.fire({
    title: "Review & Confirm",
    html: `
      <div style="text-align: left;">
        <p><b>Name:</b> ${customer.name}</p>
        <p><b>Email:</b> ${customer.email}</p>
        <p><b>Phone:</b> ${customer.phone}</p>
        <p><b>Payment Method:</b> ${paymentMethod.toUpperCase()}</p>
        <p><b>Total:</b> ${formatCurrency(subtotal)}</p>
      </div>
    `,
    imageUrl: proof ? URL.createObjectURL(proof) : null,
    imageWidth: 200,
    imageAlt: "Proof of Payment",
    showCancelButton: true,
    confirmButtonText: "✅ Confirm Order",
    cancelButtonText: "❌ Cancel",
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#6b7280",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const formData = new FormData();
        formData.append("name", customer.name);
        formData.append("email", customer.email);
        formData.append("phone", customer.phone);
        formData.append("paymentMethod", paymentMethod);
        formData.append("total", subtotal);
        formData.append("cart", JSON.stringify(cartItems));
        formData.append("proof", proof);

        console.log("📤 Sending order to backend:", [...formData.entries()]);

        const res = await fetch("http://localhost:5000/send-email", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (data.success) {
          Swal.fire("🎉 Order Sent!", "Your order has been placed successfully.", "success");
          localStorage.removeItem("cart");
          navigate("/");
        } else {
          Swal.fire("❌ Error", data.error || "Something went wrong sending the order.", "error");
        }
      } catch (err) {
        console.error("Order error:", err);
        Swal.fire("❌ Error", "Failed to connect to server.", "error");
      }
    }
  });
};



  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: Order Summary */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CircleStar className="w-6 h-6 text-black" />
            Order Summary
          </h2>
          <div className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex justify-between py-4"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  {item.variation && (
                    <p className="text-xs text-gray-500">Variation: {item.variation}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity || 1}
                  </p>
                </div>
                <p className="text-gray-700 font-semibold">
                  {formatCurrency((item.price || 0) * (item.quantity || 1))}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t pt-4">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-lg font-bold text-red-600">
              {formatCurrency(subtotal)}
            </span>
          </div>
        </div>

        {/* RIGHT: Customer + Payment */}
        <div className="bg-white shadow-xl rounded-2xl p-6 border space-y-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-black" />
            Payment Information
          </h2>

          {/* Customer Info */}
          <div className="space-y-3">
            <div className="flex items-center border rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Full Name"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                className="w-full text-sm outline-none"
              />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="email"
                placeholder="Email Address"
                value={customer.email}
                onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                className="w-full text-sm outline-none"
              />
            </div>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="tel"
                placeholder="Phone Number"
                value={customer.phone}
                onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                className="w-full text-sm outline-none"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>
            <div className="grid grid-cols-2 gap-3">
              {["gcash", "paymaya", "bdo", "unionbank"].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`border rounded-lg px-4 py-2 text-sm capitalize transition 
                    ${paymentMethod === method ? "bg-red-600 text-white shadow" : "bg-gray-50 hover:bg-gray-100"}`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* Owner Info */}
            <div className="mt-4 bg-gray-50 border rounded-lg p-4 space-y-1">
              <p className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-500" />
                Account Information:
              </p>
              {paymentMethod === "gcash" && (
                <p className="text-sm text-gray-600">
                  GCash: <span className="font-semibold">0917-123-4567</span>
                </p>
              )}
              {paymentMethod === "paymaya" && (
                <p className="text-sm text-gray-600">
                  PayMaya: <span className="font-semibold">0920-987-6543</span>
                </p>
              )}
              {paymentMethod === "bdo" && (
                <p className="text-sm text-gray-600">
                  BDO: <span className="font-semibold">1234-5678-9012</span>
                </p>
              )}
              {paymentMethod === "unionbank" && (
                <p className="text-sm text-gray-600">
                  UnionBank: <span className="font-semibold">9876-5432-1098</span>
                </p>
              )}
            </div>
          </div>

{/* Proof of Payment */}
<div>
  <h3 className="text-lg font-semibold mb-2">Upload Proof of Payment</h3>
  <div className="flex items-center gap-4">
    {/* Upload button */}
    <label className="flex items-center gap-2 cursor-pointer border rounded-lg px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 w-1/2">
      <Upload className="w-5 h-5 text-red-500" />
      <span className="truncate">{proof ? proof.name : "Choose file..."}</span>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setProof(e.target.files[0])}
        className="hidden"
      />
    </label>

    {/* Preview */}
    {proof && (
      <div className="w-1/2 flex justify-center">
        <img
          src={URL.createObjectURL(proof)}
          alt="Proof of Payment"
          className="h-32 object-cover rounded-lg border"
        />
      </div>
    )}
  </div>
</div>

          {/* Confirm Button */}
          <button
            onClick={handleConfirm}
            className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-red-700 transition"
          >
            Review & Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}
