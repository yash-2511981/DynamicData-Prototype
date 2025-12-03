import { getRules } from "@/app/data";
import RulePreviewList from "@/components/admin/RulePreview";

export default async function RulesPage() {
  const { rules } = await getRules();
  return (
    <section className="min-h-screen bg-slate-100 p-10 text-slate-900">
      <div className="mx-auto max-w-5xl bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6">All Discount Rules</h2>
        <RulePreviewList rules={rules} />
      </div>
    </section>
  );
}
