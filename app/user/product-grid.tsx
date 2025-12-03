"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";

type ProductGridProps = {
  products: Product[];
};

const ProductGrid = ({ products }: ProductGridProps) => {
  const [filter, setFilter] = useState("all");

  const filterOptions = useMemo(() => {
    const categories = Array.from(
      new Set(
        products
          .map((product) => product.category)
          .filter((category): category is string => Boolean(category))
      )
    );

    return ["all", ...categories];
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (filter === "all") return products;
    return products.filter((product) => product.category === filter);
  }, [filter, products]);

  return (
    <section className="space-y-6">
      {/* Filter buttons */}
      <header className="flex flex-wrap items-center gap-2">
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={`rounded-full border px-4 py-1 text-sm transition ${
              filter === option
                ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                : "border-slate-200 text-slate-500 hover:border-slate-400"
            }`}
          >
            {option === "all" ? "All categories" : option}
          </button>
        ))}
      </header>

      {/* --- Main Fallback for No Products at All --- */}
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center space-y-3">
          <p className="text-slate-700 font-semibold text-lg">
            No products available
          </p>
          <p className="text-slate-500 text-sm">
            Please check back later or browse another category.
          </p>

          <Link
            href="/"
            className="inline-block mt-4 text-indigo-600 text-sm font-medium hover:underline"
          >
            Explore all products →
          </Link>
        </div>
      ) : filteredProducts.length === 0 ? (
        /* --- Fallback for no results after filtering --- */
        <div className="rounded-2xl border border-dashed border-slate-200 p-10 text-center space-y-3">
          <p className="text-slate-700 font-semibold text-lg">
            No items match this filter
          </p>
          <p className="text-slate-500 text-sm">
            Try selecting another category.
          </p>

          <button
            onClick={() => setFilter("all")}
            className="inline-block mt-4 text-indigo-600 text-sm font-medium hover:underline"
          >
            Reset filters →
          </button>
        </div>
      ) : (
        /* --- Product Grid --- */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {product.name}
              </h3>

              {product.brand && (
                <p className="text-xs text-slate-500">Brand: {product.brand}</p>
              )}

              <p className="text-sm font-semibold text-slate-900">
                Price: {product.price.toFixed(2)}
              </p>

              <Link
                href={`/user/checkout/${product.id}?name=${encodeURIComponent(
                  product.name
                )}&category=${encodeURIComponent(product.category)}`}
                className="mt-2 text-indigo-600 text-sm hover:underline font-medium"
              >
                Checkout →
              </Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
