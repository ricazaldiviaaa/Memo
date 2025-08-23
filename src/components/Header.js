import { ShoppingCart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        
        {/* LEFT: Brand Name */}
        <h1 className="text-2xl font-bold tracking-wide text-stone-900 font-serif">
          Souvenir<span className="text-stone-600">屋</span>
        </h1>

        {/* MIDDLE: Navigation */}
        <nav className="hidden md:flex space-x-10 text-stone-700 font-medium tracking-wide">
          <a
            href="/"
            className="relative group transition-colors duration-200 hover:text-stone-900"
          >
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-stone-600 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/#about"
            className="relative group transition-colors duration-200 hover:text-stone-900"
          >
            About
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-stone-600 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="/#contact"
            className="relative group transition-colors duration-200 hover:text-stone-900"
          >
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-stone-600 transition-all group-hover:w-full"></span>
          </a>
        </nav>

        {/* RIGHT: Products + Cart */}
        <div className="flex items-center space-x-5">
          <a
            href="/products"
            className="relative group text-stone-700 hover:text-stone-900 font-medium transition-colors duration-200"
          >
            Products
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-stone-600 transition-all group-hover:w-full"></span>
          </a>

          <a
            href="/cart"
            className="flex items-center text-stone-700 hover:text-stone-900 transition-colors duration-200"
          >
            <ShoppingCart size={24} strokeWidth={2} />
          </a>
        </div>
      </div>
    </header>
  );
}
