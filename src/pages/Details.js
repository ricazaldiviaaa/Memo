// src/pages/Details.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import Swal from "sweetalert2";
import souvenirs from "../data/souvenirs";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = souvenirs.find((item) => item.id === parseInt(id));

  // ✅ Use product variations dynamically, fallback to null
  const [variation, setVariation] = useState(
    product?.variations ? product.variations[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  const gallery = [product.image, product.image, product.image];
  const mainImage = gallery[currentIndex];

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % gallery.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);

  const recommendations = souvenirs
    .filter((item) => item.id !== product.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  const handleAddToCart = (item, selectedVariation, qty) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = storedCart.findIndex(
      (i) => i.id === item.id && i.variation === selectedVariation
    );

    if (existingIndex > -1) {
      storedCart[existingIndex].quantity += qty;
    } else {
      storedCart.push({
        ...item,
        variation: selectedVariation,
        quantity: qty,
      });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));

    Swal.fire({
      title: "Added to Cart!",
      text: `${item.name} (${selectedVariation}) x${qty} has been added to your cart.`,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Go to Cart",
      cancelButtonText: "Continue Shopping",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cart");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Left: Image Gallery */}
        <div className="relative flex-1">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Prev / Next */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 -left-5 transform -translate-y-1/2 bg-white border rounded-full shadow p-2 hover:bg-gray-100"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={nextImage}
            className="absolute top-1/2 -right-5 transform -translate-y-1/2 bg-white border rounded-full shadow p-2 hover:bg-gray-100"
          >
            <ChevronRight size={22} />
          </button>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 justify-center">
            {gallery.map((img, idx) => (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-20 h-20 rounded-lg overflow-hidden cursor-pointer border transition ${
                  currentIndex === idx
                    ? "border-red-500 ring-2 ring-red-200"
                    : "border-gray-200 hover:border-red-400"
                }`}
              >
                <img
                  src={img}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="sticky top-10 self-start space-y-5">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-xl text-red-600 font-semibold">₱{product.price}</p>
          <p className="text-gray-600 text-sm leading-relaxed">
            {product.description}
          </p>
          <p className="text-xs text-gray-500">
            Category:{" "}
            <span className="font-medium text-gray-700">{product.category}</span>
          </p>

          {/* ✅ Dynamic Variation */}
          {product.variations && product.variations.length > 0 && (
            <div>
              <h2 className="text-xs font-semibold text-gray-700 mb-1">
                Choose Variation
              </h2>
              <div className="flex gap-2 mb-1 flex-wrap">
                {product.variations.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => setVariation(v)}
                    className={`px-4 py-1.5 rounded-full border text-xs font-medium transition ${
                      variation?.name === v.name
                        ? "bg-red-600 text-white border-red-600 shadow-sm"
                        : "bg-white text-gray-700 border-gray-300 hover:border-red-400"
                    }`}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Selected:{" "}
                <span className="font-medium">
                  {variation ? variation.name : "None"}
                </span>
              </p>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h2 className="text-xs font-semibold text-gray-700 mb-1">Quantity</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 border rounded-md hover:bg-gray-100 text-sm"
              >
                -
              </button>
              <span className="px-4 py-1.5 border rounded-md text-sm font-medium">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 border rounded-md hover:bg-gray-100 text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                handleAddToCart(product, variation?.name, quantity)
              }
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition text-sm"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 shadow-sm transition"
              title="Go Back"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

{/* Recommendations */}
<div className="max-w-6xl mx-auto mt-14">
  <h2 className="text-lg font-semibold text-gray-800 mb-6">
    You may also like
  </h2>
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
    {recommendations.map((item) => (
      <div
        key={item.id}
        onClick={() => navigate(`/details/${item.id}`)}
        className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group cursor-pointer"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
        />
        <div className="p-3">
          <h3 className="text-gray-800 text-sm font-medium truncate">
            {item.name}
          </h3>
          <p className="text-xs text-red-600 mb-2">₱{item.price}</p>

<button
  onClick={(e) => {
    e.stopPropagation();

    if (item.variations && item.variations.length > 0) {
      let selectedVariation = null;
      let qty = 1;

      Swal.fire({
        title: "",
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; gap:14px; font-family:sans-serif;">
            
            <!-- Image -->
            <img 
              src="${item.image}" 
              alt="${item.name}" 
              style="width:140px; height:140px; object-fit:cover; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.15);" 
            />

            <!-- Name & Price -->
            <h2 style="font-size:18px; font-weight:600; color:#111827; margin:0;">${item.name}</h2>
            <p style="font-size:14px; color:#DC2626; font-weight:500; margin:0;">₱${item.price}</p>

            <!-- Description -->
            <p style="font-size:13px; color:#4B5563; text-align:center; margin:0 0 8px;">
              ${item.description}
            </p>

            <!-- Variations -->
            <div id="variationContainer" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-bottom:10px;">
              ${item.variations
                .map(
                  (v) => `
                  <button 
                    type="button" 
                    class="variation-btn" 
                    data-value="${v.name}" 
                    style="padding:6px 12px; border:1px solid #D1D5DB; border-radius:20px; font-size:12px; cursor:pointer; background:#fff; transition:all .2s;"
                  >
                    ${v.name}
                  </button>`
                )
                .join("")}
            </div>

            <!-- Quantity -->
            <div style="display:flex; align-items:center; gap:10px; margin-top:10px;">
              <button id="decQty" style="width:28px; height:28px; border:1px solid #D1D5DB; border-radius:6px; background:#fff;">-</button>
              <span id="qtyDisplay" style="min-width:30px; text-align:center; font-size:14px; font-weight:500;">1</span>
              <button id="incQty" style="width:28px; height:28px; border:1px solid #D1D5DB; border-radius:6px; background:#fff;">+</button>
            </div>
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Add to Cart",
        confirmButtonColor: "#DC2626",
        cancelButtonColor: "#6B7280",
        didOpen: () => {
          const variationBtns = Swal.getHtmlContainer().querySelectorAll(".variation-btn");
          const qtyDisplay = Swal.getHtmlContainer().querySelector("#qtyDisplay");
          const decBtn = Swal.getHtmlContainer().querySelector("#decQty");
          const incBtn = Swal.getHtmlContainer().querySelector("#incQty");

          // Variation button logic
          variationBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
              variationBtns.forEach((b) => {
                b.style.background = "#fff";
                b.style.color = "#111827";
                b.style.borderColor = "#D1D5DB";
              });
              btn.style.background = "#DC2626";
              btn.style.color = "#fff";
              btn.style.borderColor = "#DC2626";
              selectedVariation = btn.getAttribute("data-value");
            });
          });

          // Quantity buttons
          decBtn.addEventListener("click", () => {
            qty = Math.max(1, qty - 1);
            qtyDisplay.textContent = qty;
          });
          incBtn.addEventListener("click", () => {
            qty++;
            qtyDisplay.textContent = qty;
          });
        },
        preConfirm: () => {
          if (!selectedVariation) {
            Swal.showValidationMessage("Please select a variation!");
            return false;
          }
          return { variation: selectedVariation, quantity: qty };
        },
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          handleAddToCart(item, result.value.variation, result.value.quantity);
        }
      });
    } else {
      handleAddToCart(item, "", 1);
    }
  }}
  className="w-full flex items-center justify-center gap-1 border border-red-600 text-red-600 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-red-50 transition"
>
  <ShoppingCart size={14} />
  Add
</button>

        </div>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}
