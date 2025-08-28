import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SouvenirCard({ item, view }) {
  const navigate = useNavigate();

  const renderStars = (rating = 4) => (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.19 3.674a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.126 2.27a1 1 0 00-.364 1.118l1.19 3.674c.3.922-.755 1.688-1.54 1.118l-3.126-2.27a1 1 0 00-1.176 0l-3.126 2.27c-.784.57-1.838-.196-1.539-1.118l1.19-3.674a1 1 0 00-.364-1.118L2.46 9.101c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.19-3.674z" />
        </svg>
      ))}
    </div>
  );

  const saveToCart = (variation, quantity) => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = storedCart.findIndex(
      (p) => p.id === item.id && p.variation === variation
    );

    if (existingIndex > -1) {
      storedCart[existingIndex].quantity += quantity;
    } else {
      storedCart.push({ ...item, variation, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(storedCart));

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${item.name} (${variation || "Default"}) x${quantity} added to your cart!`,
      confirmButtonText: "Go to Cart",
      showCancelButton: true,
      cancelButtonText: "Continue Shopping",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cart");
      }
    });
  };

  const handleAddToCart = () => {
    if (item.variations && item.variations.length > 0) {
      let selectedVariation = null;
      let qty = 1;

      Swal.fire({
        title: "",
        html: `
          <div style="display:flex; flex-direction:column; align-items:center; gap:14px; font-family:sans-serif;">
            <img src="${item.image}" alt="${item.name}" 
              style="width:140px; height:140px; object-fit:cover; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.15);" />
            <h2 style="font-size:18px; font-weight:600; color:#111827; margin:0;">${item.name}</h2>
            <p style="font-size:14px; color:#DC2626; font-weight:500; margin:0;">₱${item.price}</p>
            <p style="font-size:13px; color:#4B5563; text-align:center; margin:0 0 8px;">
              ${item.description}
            </p>
            <div id="variationContainer" style="display:flex; flex-wrap:wrap; gap:8px; justify-content:center; margin-bottom:10px;">
              ${item.variations
                .map(
                  (v) => `
                  <button type="button" class="variation-btn" data-value="${v.name}"
                    style="padding:6px 12px; border:1px solid #D1D5DB; border-radius:20px; font-size:12px; cursor:pointer; background:#fff;">
                    ${v.name}
                  </button>`
                )
                .join("")}
            </div>
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
          saveToCart(result.value.variation, result.value.quantity);
        }
      });
    } else {
      saveToCart("", 1);
    }
  };

  const AddToCartButton = () => (
    <button
      onClick={handleAddToCart}
      className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9m-6-4a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
      Add to Cart
    </button>
  );

  const ViewDetailsButton = () => (
    <button
      onClick={() => navigate(`/details/${item.id}`)}
      className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
    >
      View Details
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );

  // LIST VIEW
  if (view === "list") {
    return (
      <div className="flex items-center gap-6 border border-gray-200 rounded-lg p-4 bg-white">
        <div className="w-1/4 min-w-[100px]">
          <img src={item.image} alt={item.name} className="w-full h-28 object-cover rounded-md" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
          {renderStars(item.rating)}
          <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
          <p className="mt-1 text-sm font-semibold text-gray-700">₱{item.price}</p>
        </div>
        <div className="flex justify-between gap-2">
          <AddToCartButton />
          <ViewDetailsButton />
        </div>
      </div>
    );
  }

  // GRID VIEW
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col bg-white">
      <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-3" />
      <h3 className="text-base font-medium text-gray-800">{item.name}</h3>
      {renderStars(item.rating)}
      <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
      <p className="mt-1 text-sm font-semibold text-gray-700">₱{item.price}</p>
      <div className="mt-3 flex justify-between gap-2">
        <AddToCartButton />
        <ViewDetailsButton />
      </div>
    </div>
  );
}
