// Products.jsx
import { useState } from "react";
import SouvenirCard from "../components/SouvenirCard";
import souvenirs from "../data/souvenirs";

export default function Products() {
  const [view, setView] = useState("grid");

  // filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState(400); // max
  const [sortBy, setSortBy] = useState("Name");

  // floating inquiry state
  const [showInquiry, setShowInquiry] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hi there 👋! I’m your Keepsakes Assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const categories = ["All", "Wellness", "Flavors", "Heritage", "Aromas", "Crafts"];

  // filtering logic
  const filteredSouvenirs = souvenirs
    .filter((item) => {
      if (search && !item.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (category !== "All" && item.category !== category) {
        return false;
      }
      if (item.price > price) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "Name") return a.name.localeCompare(b.name);
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      return 0;
    });

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setPrice(400);
    setSortBy("Name");
  };

// send message handler
const handleSend = () => {
  if (!input.trim()) return;

  const userMessage = input.trim().toLowerCase();

  // normalize user message to object format
  setMessages((prev) => [
    ...prev,
    { from: "user", type: "text", text: input }
  ]);

  setTimeout(() => {
    let botReplies = [
      { type: "text", text: "Sorry, I didn’t quite get that. Could you rephrase?" }
    ];

    // greetings
    if (userMessage.includes("hello") || userMessage.includes("hi")) {
      botReplies = [
        { type: "text", text: "👋 Hello! Welcome to Souvenir屋." },
        { type: "text", text: "How can I help you today?" }
      ];
    } 
    
    // price
    else if (userMessage.includes("price") || userMessage.includes("cost") || userMessage.includes("range")) {
      botReplies = [
        { type: "text", text: "💰 Price Range:" },
        { type: "text", text: "Up to ₱400" }
      ];
    } 

        // best seller
    else if (userMessage.includes("best seller") || userMessage.includes("best sellers")  || userMessage.includes("bestseller") || userMessage.includes("bestsellers")) {
      botReplies = [
        { type: "text", text: "🏆 Best Sellers:" },
        { type: "text", text: "1. Aroma Diffuser — ₱400" },
        { type: "text", text: "2. Coffee Scrub — ₱200" },
        { type: "text", text: "3. Local Honey — ₱220" }
      ];
    }

    // recommendations
    else if (userMessage.includes("recommend") || userMessage.includes("recommendation") || userMessage.includes("recommendations")  || userMessage.includes("reco") || userMessage.includes("recommends")) {
      botReplies = [
        { type: "text", text: "🤔 Looking for a recommendation?" },
        { type: "text", text: "✨ For relaxation: Aroma Diffuser" },
        { type: "text", text: "☕ For skincare: Coffee Scrub" },
        { type: "text", text: "🍯 For food lovers: Local Honey" }
      ];
    }

  
    // categories
    else if (userMessage.includes("category") || userMessage.includes("categories")) {
      botReplies = [
        { type: "text", text: "📦 Categories:" },
        { type: "text", text: "• Wellness" },
        { type: "text", text: "• Flavors" },
        { type: "text", text: "• Heritage" },
        { type: "text", text: "• Aromas" },
        { type: "text", text: "• Crafts" }
      ];
    } 

    // products
    else if (userMessage.includes("products") || userMessage.includes("product") || userMessage.includes("item") || userMessage.includes("lists") || userMessage.includes("list") || userMessage.includes("items")) {
      botReplies = [
        { type: "text", text: "🛍️ Products:" },
        { type: "text", text: "1. Aroma Diffuser — ₱400\n   A calming diffuser" },
        { type: "text", text: "2. Coffee Scrub — ₱200\n   Natural exfoliating scrub" },
        { type: "text", text: "3. Linen Spray — ₱250\n   Relaxing linen scent" },
        { type: "text", text: "4. Local Coffee — ₱350\n   Premium beans" },
        { type: "text", text: "5. Local Honey — ₱220\n   Pure honey" },
        { type: "text", text: "6. Tampipi — ₱400\n   Handwoven tampipi" }
      ];
    }

    // product details
    else if (userMessage.includes("diffuser") || userMessage.includes("diffusers") || userMessage.includes("aroma diffuser")) {
      botReplies = [
        { type: "text", text: "🌿 Aroma Diffuser — ₱400" },
        { type: "text", text: "Category: Aromas" },
        { type: "text", text: "Description: A calming diffuser" },
        { type: "text", text: "Variations: • Lavender • Lemon • Mint" }
      ];
    } else if (userMessage.includes("coffee scrub") || userMessage.includes("scrub") || userMessage.includes("scrubs")) {
      botReplies = [
        { type: "text", text: "☕ Coffee Scrub — ₱200" },
        { type: "text", text: "Category: Wellness" },
        { type: "text", text: "Description: Natural exfoliating scrub" },
        { type: "text", text: "Variations: • Solo • Set" }
      ];
    }

    // about
    else if (userMessage.includes("about")) {
      botReplies = [
        { type: "text", text: "🌸 About Souvenir屋" },
        { type: "text", text: "We craft souvenirs that capture memories and bring joy." },
        { type: "text", text: "Values:" },
        { type: "text", text: "• Handcrafted Quality" },
        { type: "text", text: "• Unique Designs" },
        { type: "text", text: "• Memories Preserved" },
        { type: "text", text: "• Sustainable Materials" }
      ];
    }

    // contact
    else if (
      userMessage.includes("contact") ||
      userMessage.includes("address") ||
      userMessage.includes("phone") ||
      userMessage.includes("info") ||
      userMessage.includes("information") 
    ) {
      botReplies = [
        { type: "text", text: "📞 Contact Us:" },
        { type: "link", text: "Email: info@yourcompany.com", href: "mailto:info@yourcompany.com" },
        { type: "link", text: "Phone: (+63)917-374-7475", href: "tel:+639173747475" },
        { type: "link", text: "Address: Unit O, Gold Commercial Complex, Aguinaldo Highway, Anabu I-A, Imus, Cavite 4103", href: "https://maps.google.com/?q=Unit O, Gold Commercial Complex, Aguinaldo Highway, Anabu I-A, Imus, Cavite 4103" },
        { type: "link", text: "FB: Keepsakes & Memories", href: "https://www.facebook.com/KeepsakesAndMemories.PH" }
      ];
    }

    // how to order
    else if (userMessage.includes("how to order") || userMessage.includes("order")) {
      botReplies = [
        { type: "text", text: "🛒 How to Order:" },
        { type: "text", text: "1. Add product to cart" },
        { type: "text", text: "2. Check your cart" },
        { type: "text", text: "3. Proceed to checkout" },
        { type: "text", text: "4. Fill in your details" },
        { type: "text", text: "5. Pay first" },
        { type: "text", text: "6. Send reference number" },
        { type: "text", text: "7. Confirm checkout" },
        { type: "text", text: "8. Book a Lalamove rider 🚚" }
      ];
    }

    // expo / events
    else if (userMessage.includes("expo") || userMessage.includes("event") || userMessage.includes("events") || userMessage.includes("books") || userMessage.includes("book")) {
      botReplies = [
        { type: "text", text: "🎪 Expos & Events:" },
        { type: "link", text: "Email: info@yourcompany.com", href: "mailto:info@yourcompany.com" },
        { type: "link", text: "Phone: (+63)917-374-7475", href: "tel:+639173747475" },
        { type: "link", text: "Address: Unit O, Gold Commercial Complex, Aguinaldo Highway, Anabu I-A, Imus, Cavite 4103", href: "https://maps.google.com/?q=Unit O, Gold Commercial Complex, Aguinaldo Highway, Anabu I-A, Imus, Cavite 4103" }
      ];
    }

    // thanks
    else if (userMessage.includes("thank")) {
      botReplies = [{ type: "text", text: "🙏 You’re welcome!" }];
    }

    // push multiple bot messages
    botReplies.forEach((reply, i) => {
      setTimeout(() => {
        setMessages((prev) => [...prev, { from: "bot", ...reply }]);
      }, i * 500); // delay each message a bit for effect
    });
  }, 800);

  setInput("");
};



  return (
    <div className="min-h-screen bg-gray-50 relative font-sans">
      {/* TITLE */}
      <section className="py-12 text-center bg-white shadow-sm">
        <h2 className="text-3xl font-bold text-gray-800">All Products</h2>
        <p className="text-sm text-gray-500 mt-1">
          Browse our full collection of souvenirs
        </p>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto flex">
        {/* LEFT FILTERS */}
        <aside className="w-1/4 border-r border-gray-200 p-6 bg-white">
          <h3 className="text-lg font-semibold mb-6 text-gray-800">Filters</h3>

          {/* Search */}
          <div className="mb-8">
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Search
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Category as buttons */}
          <div className="mb-8">
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Categories
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1 rounded-full text-sm transition ${
                    category === c
                      ? "bg-red-600 text-white shadow"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-8">
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Price Range
            </label>
            <p className="text-sm text-gray-500 mb-1">Up to ₱{price}</p>
            <input
              type="range"
              min="0"
              max="400"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-red-600"
            />
          </div>

          {/* Sort By */}
          <div className="mb-8">
            <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option>Name</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={resetFilters}
            className="mt-6 w-full bg-red-100 text-red-700 font-medium py-2 px-4 rounded-lg hover:bg-red-200 transition"
          >
            Clear Filters ✕
          </button>
        </aside>

        {/* RIGHT PRODUCTS */}
        <main className="w-3/4 p-8">
          {/* Header row */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-600">
              {filteredSouvenirs.length} products
            </p>

            {/* View Toggle */}
            <div className="flex gap-2">
              {/* GRID */}
              <button
                onClick={() => setView("grid")}
                className={`p-2 rounded-lg transition ${
                  view === "grid"
                    ? "bg-red-600 text-white shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
                </svg>
              </button>

              {/* LIST */}
              <button
                onClick={() => setView("list")}
                className={`p-2 rounded-lg transition ${
                  view === "list"
                    ? "bg-red-600 text-white shadow"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Products */}
          {filteredSouvenirs.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div
              className={
                view === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "flex flex-col gap-6"
              }
            >
              {filteredSouvenirs.map((item) => (
                <SouvenirCard key={item.id} item={item} view={view} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Floating Inquiry Button */}
      <button
        onClick={() => setShowInquiry(!showInquiry)}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition"
      >
        {/* Message Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M8 10h8M8 14h5M21 12c0 4.418-4.03 8-9 8-1.234 0-2.402-.225-3.45-.63L3 20l1.67-3.34C3.61 15.32 3 13.71 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

{/* Floating Inquiry Chatbot */}
{showInquiry && (
  <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-200 shadow-xl rounded-lg flex flex-col">
    
    {/* Header */}
    <div className="flex justify-between items-center p-3 border-b bg-red-600 text-white rounded-t-lg">
      <h4 className="text-sm font-semibold">Keepsakes Assistant</h4>
      <button
        onClick={() => setShowInquiry(false)}
        className="text-white hover:text-gray-200 transition"
      >
        ✕
      </button>
    </div>

    {/* Messages */}
    <div className="flex-1 p-3 space-y-3 text-sm bg-gray-50 overflow-y-auto max-h-96 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.from === "user" ? "justify-end" : "items-start space-x-2"
          }`}
        >
          {/* Bot Icon */}
<div
  className={`p-2 rounded-lg max-w-[70%] whitespace-pre-line ${
    msg.from === "user"
      ? "bg-red-600 text-white"
      : "bg-gray-200 text-gray-800"
  }`}
>
  {msg.type === "link" ? (
    <a
      href={msg.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline"
    >
      {msg.text}
    </a>
  ) : (
    msg.text
  )}
</div>

        </div>
      ))}
    </div>

    {/* Input */}
    <div className="p-3 border-t flex items-center space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Send
      </button>
    </div>
  </div>
)}

    </div>

    
  );
}
