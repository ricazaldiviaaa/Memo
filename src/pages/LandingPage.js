import { useState, useEffect } from "react";
import { ArrowUp, Home } from "lucide-react"; // icon for button
import SouvenirCard from "../components/SouvinerCard";
import souvenirs from "../data/souviners";
import { Twitter, Instagram, Facebook } from "lucide-react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Homephoto1 from "../assets/Homephoto.png";                                     
import Homephoto2 from "../assets/Homephoto2.png";
import Homephoto3 from "../assets/Homephoto3.png";

export default function LandingPage() {
  const [showButton, setShowButton] = useState(false);
  const photos = [Homephoto1, Homephoto2, Homephoto3];
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const prevPhoto = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
      setFade(true);
    }, 200); // match fade duration
  };

  const nextPhoto = () => {
    setFade(false);
    setTimeout(() => {
      setCurrent((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
      setFade(true);
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50">
     <section className="relative bg-gradient-to-b from-white via-stone-50 to-white py-24 px-6 overflow-hidden">
        {/* Container */}
        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-snug">
              Objects that <span className="text-stone-700">hold memories</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Thoughtfully crafted souvenirs that bring a sense of{" "}
              <span className="text-stone-700">calm and meaning</span> to everyday life.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/products"
                className="px-8 py-3 bg-stone-800 text-white rounded-full shadow-md hover:bg-stone-900 transition"
              >
                Explore Products
              </a>
              <a
                href="/#bestsellers"
                className="px-8 py-3 border border-stone-400 text-stone-700 rounded-full hover:border-stone-600 hover:text-stone-900 transition"
              >
                View Best Sellers
              </a>
            </div>
          </div>

          {/* Image Preview with arrows */}
          <div className="relative flex justify-center items-center">
            <img
              src={photos[current]}
              alt="Minimal Souvenir"
              className={`w-full max-w-md transform transition duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
            />

            {/* Floating label */}
            <span className="absolute -top-6 left-6 flex items-center gap-2 bg-amber-200/90 text-stone-800 px-4 py-1.5 rounded-full text-sm font-medium shadow-md">
              <Star size={14} className="text-amber-600" />
              Best Seller
            </span>

            {/* Prev/Next buttons */}
            <button
              onClick={prevPhoto}
              className="absolute left-2 md:-left-10 bg-white/70 hover:bg-white text-stone-700 p-2 rounded-full shadow transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 md:-right-10 bg-white/70 hover:bg-white text-stone-700 p-2 rounded-full shadow transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>


{/* PREVIEW PRODUCTS */}
<section className="relative bg-gradient-to-b from-stone-50 to-stone-200 py-24 px-6 overflow-hidden">
  <div className="relative z-10 max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Featured Products</h2>
      <p className="mt-4 text-gray-700 text-base md:text-lg max-w-3xl mx-auto">
        Handpicked products designed for quality, style, and everyday life.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {[{img: Homephoto1, name: "Home Photo", desc: "Beautiful decorative photo for your living space.", price: "$49.99", new: true},
        {img: Homephoto2, name: "Product 2", desc: "Stylish product perfect for home or office.", price: "$59.99"},
        {img: Homephoto3, name: "Product 3", desc: "Functional and beautiful for daily use.", price: "$39.99"},
        {img: Homephoto1, name: "Product 4", desc: "Modern design with elegant finish.", price: "$69.99", new: true}
      ].map((item, idx) => (
        <div key={idx} className="relative group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden">
          
          {/* Optional Ribbon Label */}
          {item.new && (
            <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-20">
              NEW
            </div>
          )}

          <div className="overflow-hidden rounded-t-2xl">
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
            />
          </div>

          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
            <p className="text-gray-600 text-sm mb-3">{item.desc}</p>
            
            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.067 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-900 font-bold text-md mb-4">{item.price}</p>

            <button className="w-full bg-stone-800 hover:bg-stone-900 text-white py-2 rounded-lg transition text-sm font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* See All Button */}
    <div className="flex justify-center mt-16">
      <a
        href="/products"
        className="relative inline-flex items-center px-8 py-3 bg-white border border-stone-300 rounded-full text-stone-900 font-semibold text-lg shadow-md hover:shadow-lg transition group"
      >
        <span className="mr-3">See All Products</span>
        <span className="transform transition-transform duration-300 group-hover:translate-x-3">→</span>
        <span className="absolute -inset-1 rounded-full bg-stone-200 opacity-20 blur-xl animate-pulse"></span>
      </a>
    </div>
  </div>
</section>




{/* ABOUT PREVIEW */}
<section id="about" className="relative bg-gradient-to-b from-stone-50 to-stone-100 py-28 px-6 overflow-hidden">
  <div className="relative z-10 max-w-6xl mx-auto text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About Us</h2>
    <p className="text-gray-700 text-lg md:text-xl mb-16 leading-relaxed max-w-3xl mx-auto">
      We craft meaningful souvenirs that capture memories and bring joy to every occasion.
      Each piece is thoughtfully designed to inspire calm, beauty, and a sense of connection in your daily life.
    </p>

{/* Feature Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
  {[
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m12 3.75A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
        </svg>
      ),
      title: "Handcrafted Quality",
      desc: "Every item is carefully handmade with attention to detail and love.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-3.5 2.25 1-4.25-3.25-2.75 4.25-.25L12 8.5l1.5 3.75 4.25.25-3.25 2.75 1 4.25-3.5-2.25z" />
        </svg>
      ),
      title: "Unique Designs",
      desc: "Original designs that bring beauty, meaning, and joy to your space.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h18M3 12h18M3 19h18" />
        </svg>
      ),
      title: "Memories Preserved",
      desc: "Create keepsakes that capture moments and make them unforgettable.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="h-10 w-10 text-red-600" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
        </svg>
      ),
      title: "Sustainable Materials",
      desc: "We use eco-friendly materials to craft products that care for the planet.",
    },
  ].map((item, idx) => (
    <div
      key={idx}
      className="bg-white rounded-2xl shadow-md p-8 hover:shadow-2xl transition transform hover:-translate-y-2 hover:bg-stone-50"
    >
      <div className="mb-4">{item.icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
      <p className="text-gray-600 text-sm">{item.desc}</p>
    </div>
  ))}
</div>
  </div>
</section>


{/* CONTACT PREVIEW */}
<section id="contact" className="relative bg-stone-50 py-28 px-6 overflow-hidden">

  {/* Background abstract shapes */}
  <div className="absolute -top-32 -left-32 w-72 h-72 bg-stone-200 rounded-full opacity-10 blur-3xl animate-float-slow"></div>
  <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-stone-300 rounded-full opacity-10 blur-3xl animate-float-slow"></div>

  <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">

    {/* Top: Info + Form */}
    <div className="grid lg:grid-cols-2 gap-16">

      {/* Left: Contact info */}
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl md:text-5xl font-bold text-stone-900">Get in Touch</h2>
        <p className="text-stone-700 text-lg md:text-xl max-w-lg leading-relaxed">
          Questions, feedback, or just want to say hello? Reach out via the channels below or send us a message directly.
        </p>

        {/* Contact cards */}
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
  <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
    {/* Top row: icon + label */}
    <div className="flex items-center gap-3 mb-2">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
        <path d="M280-280q-33 0-56.5-23.5T200-360v-400q0-33 23.5-56.5T280-840h560q33 0 56.5 23.5T920-760v400q0 33-23.5 56.5T840-280H280Zm280-188L280-663v303h560v-303L560-468Zm0-98 280-194H280l280 194ZM120-120q-33 0-56.5-23.5T40-200v-500h80v500h660v80H120Zm720-546v-94H280v94-94h560v94Z"/>
      </svg>
      <p className="font-semibold text-stone-900">Email</p>
    </div>

    {/* Bottom row: actual email */}
    <p className="text-stone-600 text-sm">info@yourcompany.com</p>
  </div>
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
  {/* Top row: icon + label */}
  <div className="flex items-center gap-3 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
      <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z"/>
    </svg>
    <p className="font-semibold text-stone-900">Phone</p>
  </div>

  {/* Bottom row: actual phone number */}
  <p className="text-stone-600 text-sm">(+63)917-374-7475</p>
</div>

          <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
  {/* Top row: icon + label */}
  <div className="flex items-center gap-3 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q152 0 263.5 98T876-538q-20-10-41.5-15.5T790-560q-19-73-68.5-130T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q11 0 20.5 5.5T595-459q-17 27-26 57t-9 62q0 63 32.5 117T659-122q-41 20-86 31t-93 11Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm340 82q-7 0-12-4t-7-10q-11-35-31-65t-43-59q-21-26-34-57t-13-65q0-58 41-99t99-41q58 0 99 41t41 99q0 34-13.5 64.5T873-218q-23 29-43 59t-31 65q-2 6-7 10t-12 4Zm0-113q10-17 22-31.5t23-29.5q14-19 24.5-40.5T860-340q0-33-23.5-56.5T780-420q-33 0-56.5 23.5T700-340q0 24 10.5 45.5T735-254q12 15 23.5 29.5T780-193Zm0-97q-21 0-35.5-14.5T730-340q0-21 14.5-35.5T780-390q21 0 35.5 14.5T830-340q0 21-14.5 35.5T780-290Z"/></svg>
    <p className="font-semibold text-stone-900">Address</p>
  </div>

  {/* Bottom row: actual address */}
  <p className="text-stone-600 text-sm">Unit O, Gold Commercial Complex, Aguinaldo Highway, Anabu I-A,, Imus, Philippines, 4103</p>
</div>

          <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-5">
  {/* Top row: icon + label */}
  <div className="flex items-center gap-3 mb-2">
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
      <path d="M300-180v-200l160 100-160 100Zm220-380q-50 0-85-35t-35-85q0-50 35-85t85-35h50v60h-50q-25 0-42.5 17.5T460-680q0 25 17.5 42.5T520-620h50v60h-50Zm110 0v-60h50q25 0 42.5-17.5T740-680q0-25-17.5-42.5T680-740h-50v-60h50q50 0 85 35t35 85q0 50-35 85t-85 35h-50Zm-110-90v-60h160v60H520Zm124 250v-80h196v-360H360v360h-80v-360q0-33 23.5-56.5T360-920h480q33 0 56.5 23.5T920-840v360q0 33-23.5 56.5T840-400H644ZM120-40q-33 0-56.5-23.5T40-120v-320q0-33 23.5-56.5T120-520h480q33 0 56.5 23.5T680-440v320q0 33-23.5 56.5T600-40H120Zm0-80h480v-320H120v320Zm480-540ZM360-280Z"/>
    </svg>
    <p className="font-semibold text-stone-900">Social</p>
  </div>

  {/* Bottom row: social links */}
  <div className="flex gap-4 mt-2 text-2xl">
  <a href="#" className="text-black hover:text-stone-900">
    <Twitter size={24} />
  </a>
  <a href="#" className="text-black hover:text-stone-900">
    <Instagram size={24} />
  </a>
  <a href="https://www.facebook.com/KeepsakesAndMemories.PH" className="text-black hover:text-stone-900">
    <Facebook size={24} />
  </a>
</div>
</div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex flex-col gap-6">
        <form className="bg-white p-6 rounded-2xl shadow-md flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-stone-900 mb-2">Send a Message</h3>
          <input
            type="text"
            placeholder="Your Name"
            className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="border border-stone-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-stone-400"
          ></textarea>
          <button
            type="submit"
            className="bg-stone-700 hover:bg-stone-800 text-white font-semibold rounded-lg py-2 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>

{/* Bottom: Map */}
<div className="w-full h-64 rounded-2xl overflow-hidden shadow-md">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.187305291503!2d120.94074141532779!3d14.40145988624674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c0f7c04c3a6b%3A0x1234567890abcdef!2sUnit%20O%2C%20Gold%20Commercial%20Complex%2C%20Aguinaldo%20Highway%2C%20Anabu%20I-A%2C%20Imus%2C%20Philippines%204103!5e0!3m2!1sen!2sph!4v1692960000000!5m2!1sen!2sph"
    className="w-full h-full border-0"
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>


  </div>

  <style jsx>{`
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }
    .animate-float-slow {
      animation: float 8s ease-in-out infinite;
    }
  `}</style>
</section>


{/* Back to Top Button */}
{showButton && (
  <button
    onClick={scrollToTop}
    className="fixed bottom-6 right-6 z-40 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition transform hover:scale-110"
  >
    <ArrowUp size={20} />
  </button>
)}

    </div>
  );
}
