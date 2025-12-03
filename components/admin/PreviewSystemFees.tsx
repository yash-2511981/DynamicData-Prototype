"use client";

import { useState } from "react";
import { SystemFeeDraft } from "@/types/types";
import Modal from "./ModalWrapper";
import SystemFeeForm from "./SystemFeeForm";

type Props = {
  systemFees: SystemFeeDraft[];
};

const emptySystemFee: SystemFeeDraft = {
  feeName: "",
  type: "",
  applyOn: "",
  value: "",
};

const SystemPreviewList = ({ systemFees }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingFee, setEditingFee] = useState<SystemFeeDraft | null>(null);

  const openCreateForm = () => {
    setEditingFee(emptySystemFee);
    setModalOpen(true);
  };

  const openEditForm = (fee: SystemFeeDraft) => {
    setEditingFee(fee);
    setModalOpen(true);
  };

  return (
    <aside className="w-full rounded-2xl bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">System Fees</h2>
          <div className="mt-1 text-xs text-slate-600">Total: {systemFees.length}</div>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-full bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow"
        >
          + Create System Fee
        </button>
      </div>

      {/* GRID LIST */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {systemFees.length === 0 ? (
          <div className="col-span-full rounded-xl border-dashed p-6 text-center text-slate-600">
            No System Fees added.
          </div>
        ) : (
          systemFees.map((fee) => (
            <article
              key={fee.id}
              className="rounded-xl border p-4 text-sm flex flex-col hover:shadow-md transition"
            >
              <div className="text-xs text-slate-500">
                {fee.createdAt &&
                  new Date(fee.createdAt).toLocaleDateString("en-IN")}
              </div>

              <h3 className="mt-2 font-semibold truncate">{fee.feeName}</h3>
              <p className="text-slate-600 mb-1">₹{fee.value}</p>

              <div className="flex flex-wrap gap-1 text-xs mb-3">
                {fee.type && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5">
                    {fee.type}
                  </span>
                )}
                {fee.applyOn && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5">
                    {fee.applyOn}
                  </span>
                )}
              </div>

              <button
                onClick={() => openEditForm(fee)}
                className="mt-auto rounded-full bg-indigo-600 px-4 py-1.5 text-white text-xs font-medium shadow"
              >
                Edit
              </button>
            </article>
          ))
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <SystemFeeForm SystemFee={editingFee} />
      </Modal>
    </aside>
  );
};

export default SystemPreviewList;
