import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-stone-900 text-stone-200 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left px-6">

          {/* Brand */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-serif text-white tracking-wide">
              Souvenir<span className="text-stone-400">屋</span>
            </h2>
            <p className="text-stone-400 text-sm">
              Unique gifts and keepsakes to preserve your most special memories.
            </p>
            <div className="flex justify-center md:justify-start gap-4 mt-2">
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Quick Links</h3>
            <ul className="space-y-2 text-stone-400">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold mb-3 text-white">Categories</h3>
            <ul className="space-y-2 text-stone-400">
              <li>Handmade</li>
              <li>Local</li>
              <li>Custom</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
  <h3 className="font-semibold mb-3 text-white">Contact</h3>

  {/* Email */}
  <div className="flex items-center gap-2 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
      <path d="M280-280q-33 0-56.5-23.5T200-360v-400q0-33 23.5-56.5T280-840h560q33 0 56.5 23.5T920-760v400q0 33-23.5 56.5T840-280H280Zm280-188L280-663v303h560v-303L560-468Zm0-98 280-194H280l280 194ZM120-120q-33 0-56.5-23.5T40-200v-500h80v500h660v80H120Zm720-546v-94H280v94-94h560v94Z"/>
    </svg>
    <p className="text-stone-400 text-sm">info@yourcompany.com</p>
  </div>

  {/* Phone */}
  <div className="flex items-center gap-2 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
      <path d="M480-400q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400ZM320-240h320v-23q0-24-13-44t-36-30q-26-11-53.5-17t-57.5-6q-30 0-57.5 6T369-337q-23 10-36 30t-13 44v23ZM720-80H240q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80Zm0-80v-446L526-800H240v640h480Zm-480 0v-640 640Z"/>
    </svg>
    <p className="text-stone-400 text-sm">+1 (555) 123-4567</p>
  </div>

  {/* Location */}
  <div className="flex items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white">
      <path d="M480-80q-106 0-173-33.5T240-200q0-24 14.5-44.5T295-280l63 59q-9 4-19.5 9T322-200q13 16 60 28t98 12q51 0 98.5-12t60.5-28q-7-8-18-13t-21-9l62-60q28 16 43 36.5t15 45.5q0 53-67 86.5T480-80Zm1-220q99-73 149-146.5T680-594q0-102-65-154t-135-52q-70 0-135 52t-65 154q0 67 49 139.5T481-300Zm-1 100Q339-304 269.5-402T200-594q0-71 25.5-124.5T291-808q40-36 90-54t99-18q49 0 99 18t90 54q40 36 65.5 89.5T760-594q0 94-69.5 192T480-200Zm0-320q33 0 56.5-23.5T560-600q0-33-23.5-56.5T480-680q-33 0-56.5 23.5T400-600q0 33 23.5 56.5T480-520Zm0-80Z"/>
    </svg>
    <p className="text-stone-400 text-sm">123 Main Street, City</p>
  </div>
</div>

        </div>
      </footer>

      <div className="bg-stone-950 text-stone-500 text-center py-4 text-sm">
        © 2025 Souvenir屋. All rights reserved.
      </div>
    </>
  );
}
