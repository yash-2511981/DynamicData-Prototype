"use client";

import { RuleDraft } from "@/types/types";
import { useMemo, useState } from "react";
import RuleForm from "./RuleForm";
import Modal from "./ModalWrapper";

type Props = {
  rules: RuleDraft[];
};

const emptyRule: RuleDraft = {
  title: "",
  type: "",
  value: "",
  message: "",
  applyOn: "",
  applyValue: "",
  isActive: true,
};

const RulePreviewList = ({ rules }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<RuleDraft | null>(null);

  const activeRules = useMemo(() => rules.filter((r) => r.isActive), [rules]);

  const openCreateForm = () => {
    setEditingRule(emptyRule);
    setModalOpen(true);
  };

  const openEditForm = (rule: RuleDraft) => {
    setEditingRule(rule);
    setModalOpen(true);
  };

  return (
    <aside className="w-full rounded-2xl bg-white p-6 shadow-sm">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Discount Patterns</h2>

          <div className="mt-1 text-xs text-slate-600 flex gap-4">
            <span>Total: {rules.length}</span>
            <span>Active: {activeRules.length}</span>
            <span>Inactive: {rules.length - activeRules.length}</span>
          </div>
        </div>

        <button
          onClick={openCreateForm}
          className="rounded-full bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow"
        >
          + Create Rule
        </button>
      </div>

      {/* GRID LIST */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {rules.length === 0 ? (
          <div className="col-span-full rounded-xl border-dashed p-6 text-center">
            No saved rules yet.
          </div>
        ) : (
          rules.map((rule) => (
            <article
              key={rule.id}
              className="rounded-xl border p-4 text-sm flex flex-col hover:shadow-md transition"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>
                  {rule.createdAt &&
                    new Date(rule.createdAt).toLocaleDateString("en-IN")}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${
                    rule.isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {rule.isActive ? "Active" : "Paused"}
                </span>
              </div>

              <h3 className="mt-2 font-semibold truncate">{rule.title}</h3>

              <p className="text-slate-600 text-xs line-clamp-2">
                {rule.message}
              </p>

              <div className="flex flex-wrap gap-2 mt-2 text-xs">
                <span className="rounded-full bg-slate-100 px-2 py-0.5">
                  {rule.type === "PERCENTAGE"
                    ? `${rule.value}%`
                    : `${rule.value}`}
                </span>

                {rule.applyOn && (
                  <span className="rounded-full bg-slate-100 px-2 py-0.5">
                    {rule.applyOn}
                  </span>
                )}
              </div>

              <button
                onClick={() => openEditForm(rule)}
                className="mt-auto rounded-full bg-indigo-600 px-4 py-1.5 text-white text-xs font-medium shadow"
              >
                Edit
              </button>
            </article>
          ))
        )}
      </div>

      {/* MODAL */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <RuleForm ruleForEdit={editingRule} />
      </Modal>
    </aside>
  );
};

export default RulePreviewList;
