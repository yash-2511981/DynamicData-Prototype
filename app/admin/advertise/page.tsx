import { getAllAdvertisement } from "@/app/data";
import PreviewAdvertiseList from "@/components/admin/PreviewAdvertiseList";

export default async function ProductsPage() {
  const { advertises } = await getAllAdvertisement();
  return (
    <section className="min-h-screen bg-slate-100 p-10 text-slate-900">
      <div className="mx-auto w-full max-w-4xl">
        <PreviewAdvertiseList advertises={advertises} />
      </div>
    </section>
  );
}
