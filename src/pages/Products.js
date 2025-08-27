// Products.jsx
import { useState } from "react";
import SouvenirCard from "../components/SouvinerCard";
import souvenirs from "../data/souviners";

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
    { from: "bot", text: "Hi there 👋! I’m your Keepsakes Assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");

  const categories = [
    "All",
    "Wellness",
    "Flavors",
    "Heritage",
    "Aromas",
    "Crafts",
  ];

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

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: input }]);

    // Simple bot response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Thanks for your message! I’ll get back to you soon 😊" }
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* TITLE */}
      <section className="py-12 text-center border-b border-gray-200">
        <h2 className="text-2xl font-medium">All Products</h2>
        <p className="text-sm text-gray-500">
          Browse our full collection of souvenirs
        </p>
      </section>

      {/* MAIN CONTENT */}
      <div className="container mx-auto flex">
        {/* LEFT FILTERS */}
        <aside className="w-1/4 border-r border-gray-200 p-6 bg-white">
          <h3 className="text-lg font-medium mb-4">Filters</h3>

          {/* Search */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search products
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <p className="text-sm text-gray-500 mb-1">Up to ${price}</p>
            <input
              type="range"
              min="0"
              max="400"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Sort By */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option>Name</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={resetFilters}
            className="mt-4 w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition"
          >
            Clear Filters
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
                className={`p-2 rounded-md transition ${
                  view === "grid"
                    ? "bg-gray-800 text-white"
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
                className={`p-2 rounded-md transition ${
                  view === "list"
                    ? "bg-gray-800 text-white"
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
        <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-200 shadow-lg rounded-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b bg-red-600 text-white rounded-t-lg">
            <h4 className="text-sm font-medium">Keepsakes Assistant</h4>
            <button
              onClick={() => setShowInquiry(false)}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user"
                    ? "justify-end"
                    : "items-start space-x-2"
                }`}
              >
                {msg.from === "bot" && (
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-xs">
                    🤖
                  </div>
                )}
                <div
                  className={`p-2 rounded-lg max-w-[70%] ${
                    msg.from === "user"
                      ? "bg-red-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
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
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
