"use client";

import { useState } from "react";
import { ProductDraft } from "@/types/types";
import Modal from "./ModalWrapper";
import ProductForm from "./ProductForm";

type Props = {
  products: ProductDraft[];
};

const emptyProduct: ProductDraft = {
  name: "",
  price: "",
  category: "",
  brand: "",
};

const ProductPreviewList = ({ products }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDraft | null>(
    null
  );

  const openCreateForm = () => {
    setEditingProduct(emptyProduct);
    setModalOpen(true);
  };

  const openEditForm = (prod: ProductDraft) => {
    setEditingProduct(prod);
    setModalOpen(true);
  };

  return (
    <aside className="w-full rounded-2xl bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Products</h2>
          <div className="mt-1 text-xs text-slate-600">
            Total: {products.length}
          </div>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-full bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow"
        >
          + Create Product
        </button>
      </div>

      {/* GRID LIST */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <div className="col-span-full rounded-xl border-dashed p-6 text-center text-slate-600">
            No products yet.
          </div>
        ) : (
          products.map((p) => (
            <article
              key={p.id}
              className="rounded-xl border p-4 text-sm flex flex-col hover:shadow-md transition"
            >
              <div className="text-xs text-slate-500">
                {p.createdAt &&
                  new Date(p.createdAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
              </div>

              <h3 className="mt-2 font-semibold truncate">{p.name}</h3>
              <p className="text-slate-600 mb-1">₹{p.price}</p>

              <div className="flex flex-wrap gap-1 text-xs mb-3">
                {p.category && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5">
                    {p.category}
                  </span>
                )}
                {p.brand && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5">
                    {p.brand}
                  </span>
                )}
              </div>

              <button
                onClick={() => openEditForm(p)}
                className="mt-auto rounded-full bg-indigo-600 px-4 py-1.5 text-white text-xs font-medium shadow"
              >
                Edit
              </button>
            </article>
          ))
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <ProductForm productForEdit={editingProduct} />
      </Modal>
    </aside>
  );
};

export default ProductPreviewList;
