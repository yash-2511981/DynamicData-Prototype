"use client";

import { useState, FormEvent } from "react";
import { ProductDraft } from "@/types/types";
import { createProductAction, updateCacheData } from "@/app/serveractions";

const ProductForm = ({
  productForEdit,
}: {
  productForEdit?: ProductDraft | null;
}) => {
  const [draftProduct, setDraftProduct] = useState<ProductDraft>({
    id: productForEdit?.id,
    name: productForEdit?.name || "",
    price: productForEdit?.price || "",
    category: productForEdit?.category || "",
    brand: productForEdit?.brand || "",
  });

  const [toast, setToast] = useState<{ tone: string; message: string } | null>(
    null
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      ...draftProduct,
      price: Number(draftProduct.price),
    };

    try {
      const { success } = await createProductAction(payload);
      if (!success) return;
      setToast({ tone: "success", message: "Product saved!" });
      setDraftProduct({
        name: "",
        price: "",
        category: "",
        brand: "",
      });

      updateCacheData("products");
    } catch {
      setToast({ tone: "error", message: "Failed to save product" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <label className="flex flex-col gap-1 text-sm font-medium">
        Name
        <input
          className="rounded-lg border px-3 py-2"
          value={draftProduct.name}
          onChange={(e) =>
            setDraftProduct((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Price
        <input
          type="number"
          className="rounded-lg border px-3 py-2"
          value={draftProduct.price}
          onChange={(e) =>
            setDraftProduct((prev) => ({ ...prev, price: e.target.value }))
          }
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Category
        <input
          className="rounded-lg border px-3 py-2"
          value={draftProduct.category}
          onChange={(e) =>
            setDraftProduct((prev) => ({ ...prev, category: e.target.value }))
          }
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Brand
        <input
          className="rounded-lg border px-3 py-2"
          value={draftProduct.brand}
          onChange={(e) =>
            setDraftProduct((prev) => ({ ...prev, brand: e.target.value }))
          }
        />
      </label>

      <button
        type="submit"
        className="rounded-full bg-indigo-600 px-6 py-2 text-white"
      >
        Save Product
      </button>

      {toast && (
        <p
          className={`mt-2 text-sm ${
            toast.tone === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {toast.message}
        </p>
      )}
    </form>
  );
};

export default ProductForm;
