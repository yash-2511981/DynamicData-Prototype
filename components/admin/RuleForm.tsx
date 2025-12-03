"use client";

import { useState, useMemo, useTransition, FormEvent } from "react";
import { RuleDraft, DiscountType, ApplyOn } from "@/types/types";
import { API_BASE_URL } from "@/lib/config";
import { updateCacheData } from "@/app/serveractions";

const RuleForm = ({ ruleForEdit }: { ruleForEdit?: RuleDraft | null }) => {
  const [draftRule, setDraftRule] = useState<RuleDraft>({
    id: ruleForEdit?.id,
    title: ruleForEdit?.title || "",
    type: ruleForEdit?.type || "",
    value: ruleForEdit?.value || "",
    message: ruleForEdit?.message || "",
    applyOn: ruleForEdit?.applyOn || "",
    applyValue: ruleForEdit?.applyValue || "",
    isActive: ruleForEdit?.isActive || true,
  });

  const [toast, setToast] = useState<{ tone: string; message: string } | null>(
    null
  );

  const [isPending, start] = useTransition();

  const canSubmit = useMemo(() => {
    if (!draftRule.title.trim()) return false;
    if (!draftRule.value || Number.isNaN(Number(draftRule.value))) return false;
    if (!draftRule.applyOn || !draftRule.applyValue.trim()) return false;
    return true;
  }, [draftRule]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    const payload = {
      id: ruleForEdit?.id,
      title: draftRule.title.trim(),
      type: draftRule.type,
      value: Number(draftRule.value),
      message: draftRule.message.trim(),
      applyOn: draftRule.applyOn,
      applyValue: draftRule.applyValue.trim(),
      isActive: draftRule.isActive,
    };

    start(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/admin/discount-rule`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        await res.json();
        setToast({ tone: "success", message: "Rule saved!" });
        updateCacheData("rules");
      } catch {
        setToast({ tone: "error", message: "Failed to save rule" });
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      {/* Rule Title */}
      <label className="flex flex-col gap-1 text-sm font-medium">
        Rule title
        <input
          className="rounded-lg border px-3 py-2"
          value={draftRule.title}
          onChange={(e) =>
            setDraftRule((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </label>

      {/* Message */}
      <label className="flex flex-col gap-1 text-sm font-medium">
        Customer message
        <textarea
          className="min-h-24 rounded-lg border px-3 py-2"
          value={draftRule.message}
          onChange={(e) =>
            setDraftRule((prev) => ({ ...prev, message: e.target.value }))
          }
        />
      </label>

      {/* Discount Inputs */}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Discount type
          <select
            className="rounded-lg border px-3 py-2"
            value={draftRule.type}
            onChange={(e) =>
              setDraftRule((prev) => ({
                ...prev,
                type: e.target.value as DiscountType,
              }))
            }
          >
            <option value="">Select</option>
            <option value="PERCENTAGE">Percentage</option>
            <option value="FLAT">Flat</option>
            <option value="FREE_DELIVERY">Free delivery</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Value
          <input
            type="number"
            className="rounded-lg border px-3 py-2"
            value={draftRule.value}
            onChange={(e) =>
              setDraftRule((prev) => ({ ...prev, value: e.target.value }))
            }
          />
        </label>
      </div>

      {/* Apply On */}
      <label className="flex flex-col gap-1 text-sm font-medium">
        Apply on
        <select
          className="rounded-lg border px-3 py-2"
          value={draftRule.applyOn}
          onChange={(e) =>
            setDraftRule((prev) => ({
              ...prev,
              applyOn: e.target.value as ApplyOn,
            }))
          }
        >
          <option value="">Select</option>
          <option value="PRODUCT">Product</option>
          <option value="CATEGORY">Category</option>
          <option value="BRAND">Brand</option>
        </select>
      </label>

      {/* Apply Value */}
      <label className="flex flex-col gap-1 text-sm font-medium">
        Apply value
        <input
          className="rounded-lg border px-3 py-2"
          placeholder="Product ID / Category / Brand"
          value={draftRule.applyValue}
          onChange={(e) =>
            setDraftRule((prev) => ({
              ...prev,
              applyValue: e.target.value,
            }))
          }
        />
      </label>

      {/* Active */}
      <label className="flex items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={draftRule.isActive}
          onChange={(e) =>
            setDraftRule((prev) => ({
              ...prev,
              isActive: e.target.checked,
            }))
          }
          className="h-4 w-4 accent-indigo-600"
        />
        Rule is active
      </label>

      {/* Submit button */}
      <button
        type="submit"
        disabled={!canSubmit || isPending}
        className="mt-6 rounded-full bg-indigo-600 px-6 py-2 text-white"
      >
        {isPending ? "Saving…" : "Save Rule"}
      </button>

      {/* Toast */}
      {toast && (
        <p
          className={`mt-4 text-sm ${
            toast.tone === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {toast.message}
        </p>
      )}
    </form>
  );
};

export default RuleForm;
