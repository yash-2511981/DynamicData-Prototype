"use client";
import { useState } from "react";
import AdvertisementCard from "./AdvertiseMentCard";
import { Advertisement } from "@/types/types";
import Modal from "./ModalWrapper";
import AdvertisementForm from "./AdvertisementForm";

const PreviewAdvertiseList = ({
  advertises,
}: {
  advertises: Advertisement[];
}) => {
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [editingAdvertise, setEditingAdvertise] =
    useState<Advertisement | null>(null);

  const openCreateForm = () => {
    setEditingAdvertise(null);
    setOpenModel(true);
  };

  const openEditForm = (advertise: Advertisement) => {
    setEditingAdvertise(advertise);
    setOpenModel(true);
  };

  return (
    <aside className="w-full rounded-2xl bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-semibold">Advertisements</h2>
          <div className="mt-1 text-xs text-slate-600">
            Total: {advertises?.length ?? 0}
          </div>
        </div>
        <button
          onClick={openCreateForm}
          className="rounded-full bg-indigo-600 px-4 py-2 text-white text-sm font-medium shadow"
        >
          + Create Advertise
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {!advertises || advertises.length === 0 ? (
          <div className="col-span-full rounded-xl border-dashed p-6 text-center text-slate-600">
            No advertisements yet.
          </div>
        ) : (
          advertises.map((a: Advertisement) => (
            <AdvertisementCard
              key={a.id}
              a={a}
              onEdit={() => openEditForm(a)}
            />
          ))
        )}
      </div>
      <Modal open={openModel} onClose={() => setOpenModel(false)}>
        <AdvertisementForm advertisement={editingAdvertise} />
      </Modal>
    </aside>
  );
};

export default PreviewAdvertiseList;
