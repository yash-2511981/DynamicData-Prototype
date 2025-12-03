import ProductGrid from "./product-grid";
import { API_BASE_URL } from "@/lib/config";
import { getProductsData } from "../data";

export async function generateMetadata() {
  const res = await fetch(`${API_BASE_URL}/server/products`, {
    next: { revalidate: 60 },
  });
  const data = await res.json();

  if (!data.success) {
    return {
      title: "No products for sell",
      description: "0 products for sell near your city",
    };
  }

  return {
    title: `Found ${data.count} products near your city`,
    description: `Total ${data.count} products in your area.`,
  };
}

const UserPage = async () => {
  const { products } = await getProductsData();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="rounded-3xl border border-dashed border-indigo-200 bg-white p-8 text-center shadow-sm">
          <p className="text-xs uppercase text-indigo-500">Preview</p>
          <h1 className="mt-2 text-3xl font-semibold">
            User storefront & discount preview
          </h1>
        </header>

        <ProductGrid products={products} />
      </div>
    </main>
  );
};

export default UserPage;
