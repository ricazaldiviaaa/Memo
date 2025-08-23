import SouvenirCard from "../components/SouvinerCard";
import souvenirs from "../data/souviners";

export default function Products() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* TITLE */}
      <section className="bg-gray-200 py-12 text-center">
        <h2 className="text-3xl font-bold mb-2">All Products</h2>
        <p className="text-gray-600">Browse our full collection of souvenirs</p>
      </section>

      {/* PRODUCTS GRID */}
      <section id="products" className="p-8 container mx-auto flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {souvenirs.map((item) => (
            <SouvenirCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
