import { getProductsData } from "@/app/data";
import ProductPreviewList from "@/components/admin/ProductPreviewList";

export default async function ProductsPage() {
  const { products } = await getProductsData();

  return (
    <section className="min-h-screen bg-slate-100 p-10 text-slate-900">
      <div className="mx-auto w-full max-w-4xl">
        <ProductPreviewList products={products} />
      </div>
    </section>
  );
}
