import { getSystemFees } from "@/app/data";
import SystemPreviewList from "@/components/admin/PreviewSystemFees";

export default async function SystemFee() {
  const { systemFees } = await getSystemFees();

  return (
    <section className="min-h-screen bg-slate-100 p-10 text-slate-900">
      <div className="mx-auto max-w-5xl bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">All Buisness Related Fees</h2>
        <SystemPreviewList systemFees={systemFees} />
      </div>
    </section>
  );
}
