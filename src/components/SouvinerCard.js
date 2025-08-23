export default function SouvenirCard({ item }) {
  const handleAddToCart = () => {
    // Get cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if item is already in cart
    const existingItemIndex = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // Increment quantity if item exists
      cart[existingItemIndex].quantity = (cart[existingItemIndex].quantity || 1) + 1;
    } else {
      // Add new item with quantity 1
      cart.push({ ...item, quantity: 1 });
    }

    // Save back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Go to cart page
    window.location.href = "/cart";
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition flex flex-col justify-between">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600">{item.description}</p>
        <p className="mt-2 font-bold">₱{item.price}</p>
      </div>

      <div className="p-4 pt-0 flex justify-end">
        <button
          className="p-1 rounded-full hover:bg-gray-200 transition"
          onClick={handleAddToCart}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
