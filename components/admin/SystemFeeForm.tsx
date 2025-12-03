"use client";

import { useState, FormEvent } from "react";
import { SystemFeeDraft } from "@/types/types";
import { API_BASE_URL } from "@/lib/config";
import { updateCacheData } from "@/app/serveractions";

const SystemFeeForm = ({
  SystemFee,
}: {
  SystemFee?: SystemFeeDraft | null;
}) => {
  const [draftSysteFee, setdraftSysteFee] = useState<SystemFeeDraft>({
    feeName: SystemFee?.feeName || "",
    value: SystemFee?.value || "",
    applyOn: SystemFee?.applyOn || "",
    type: SystemFee?.type || "",
  });

  const [toast, setToast] = useState<{ tone: string; message: string } | null>(
    null
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      ...draftSysteFee,
      value: Number(draftSysteFee.value),
    };

    try {
      const res = await fetch(`${API_BASE_URL}/admin/create-systemfee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const isUpdated = data.success;
      if (!isUpdated) throw new Error("Failed response");

      setToast({ tone: "success", message: "Fees Added saved!" });
      setdraftSysteFee({
        feeName: "",
        value: "",
        applyOn: "",
        type: "",
      });

      updateCacheData("systemfees");
    } catch {
      setToast({ tone: "error", message: "Failed to save product" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <label className="flex flex-col gap-1 text-sm font-medium">
        Fee Name
        <input
          className="rounded-lg border px-3 py-2"
          value={draftSysteFee.feeName}
          onChange={(e) =>
            setdraftSysteFee((prev) => ({ ...prev, feeName: e.target.value }))
          }
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Amount
        <input
          type="number"
          className="rounded-lg border px-3 py-2"
          value={draftSysteFee.value}
          onChange={(e) =>
            setdraftSysteFee((prev) => ({ ...prev, value: e.target.value }))
          }
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Apply On
        <select
          className="rounded-lg border px-3 py-2"
          value={draftSysteFee?.applyOn}
          onChange={(e) =>
            setdraftSysteFee((prev) => ({
              ...prev,
              applyOn: e.target.value,
            }))
          }
        >
          <option value="">Select</option>
          <option value="SUBTOTAL">Subtotal</option>
          <option value="ORDER">Order</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Fee Type
        <select
          className="rounded-lg border px-3 py-2"
          value={draftSysteFee.type}
          onChange={(e) =>
            setdraftSysteFee((prev) => ({
              ...prev,
              type: e.target.value,
            }))
          }
        >
          <option value="">Select</option>
          <option value="PERCENTAGE">Percentage</option>
          <option value="FLAT">Flat</option>
          <option value="DELIVERY_CHARGE">Delivery Charge</option>
        </select>
      </label>

      <button
        type="submit"
        className="rounded-full bg-indigo-600 px-6 py-2 text-white"
      >
        Save
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

export default SystemFeeForm;
