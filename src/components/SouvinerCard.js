import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SouvenirCard({ item, view }) {
  const navigate = useNavigate();

  // Helper to render stars
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

  const handleAddToCart = () => {
    // Get cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product exists
    const existingIndex = storedCart.findIndex((p) => p.id === item.id);
    if (existingIndex > -1) {
      storedCart[existingIndex].quantity =
        (storedCart[existingIndex].quantity || 1) + 1;
    } else {
      storedCart.push({ ...item, quantity: 1 });
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(storedCart));

    // SweetAlert confirmation
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${item.name} has been added to your cart!`,
      confirmButtonText: "Go to Cart",
      showCancelButton: true,
      cancelButtonText: "Continue Shopping",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cart");
      }
    });
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
        <div className="flex-shrink-0">
          <AddToCartButton />
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
      <div className="mt-3">
        <AddToCartButton />
      </div>
    </div>
  );
}
