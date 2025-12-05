import Link from "next/link";

const AdminPage = () => {
  return (
    <section className="min-h-screen bg-slate-100 p-10 text-slate-900">
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-semibold">Discount Rules</h2>
            <p className="text-slate-600 mt-1">
              Create, edit, and manage all discount patterns.
            </p>

            <div className="mt-4 flex gap-3">
              <Link
                href="/admin/rules"
                className="rounded-full bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow"
              >
                View Rules
              </Link>
            </div>
          </div>

          {/* Products */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="text-slate-600 mt-1">
              Add, edit, and manage all products.
            </p>

            <div className="mt-4 flex gap-3">
              <Link
                href="/admin/products"
                className="rounded-full bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow"
              >
                View Products
              </Link>
            </div>
          </div>

          {/* System fees */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-semibold">System Fees</h2>
            <p className="text-slate-600 mt-1">
              Add, edit, and manage all System Fees.
            </p>

            <div className="mt-4 flex gap-3">
              <Link
                href="/admin/systemFees"
                className="rounded-full bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow"
              >
                View Fees
              </Link>
            </div>
          </div>
          {/* Manage Adverti */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border">
            <h2 className="text-xl font-semibold">System Fees</h2>
            <p className="text-slate-600 mt-1">
              Add, edit, and manage all System Fees.
            </p>

            <div className="mt-4 flex gap-3">
              <Link
                href="/admin/systemFees"
                className="rounded-full bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow"
              >
                Manage Advertisement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPage;
