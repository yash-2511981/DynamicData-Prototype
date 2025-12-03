import Link from "next/link";

const Home = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 font-sans text-slate-900">
      <div className="w-full max-w-4xl rounded-3xl bg-white p-10 shadow-sm">
        <p className="text-xs uppercase text-indigo-500">Prototype</p>
        <h1 className="mt-3 text-4xl font-semibold">
          Dynamic Discount rules Prototype
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-600">
          Explore both sides of the experience. Admins can create rules +
          conditions, while users can simulate a checkout that calls the backend
          to determine the best discount for a selected product.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/admin"
            className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
          >
            Go to admin
          </Link>
          <Link
            href="/user"
            className="rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Browse as user
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
          >
            click here for About Page
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
