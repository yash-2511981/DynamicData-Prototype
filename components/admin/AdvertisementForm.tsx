"use client";

import { handleAdvertisementAction } from "@/app/serveractions";
import { Advertisement } from "@/types/types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";

const AdvertisementForm = ({
  advertisement,
}: {
  advertisement: Advertisement | null;
}) => {
  const [formData, setFormData] = useState<Advertisement>({
    offerName: "",
    brandName: "",
    assetLink: "",
    assetType: "",
    displayType: "",
    displayDuration: 0,
    visitLink: "",
    isActive: false,
  });
  const [toast, setToast] = useState<{ tone: string; message: string } | null>(
    null
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const setData = () => {
      if (advertisement) {
        setFormData(advertisement);
      }
    };
    setData();
  }, [advertisement]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { success } = await handleAdvertisementAction({
      currentData: formData,
    });
    if (success) {
      setFormData({
        offerName: "",
        brandName: "",
        assetLink: "",
        assetType: "",
        displayType: "",
        displayDuration: 0,
        visitLink: "",
        isActive: false,
      });
      setToast({ tone: "success", message: "Data saved successfully" });
    } else {
      setToast({ tone: "error", message: "Failed to save data" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 max-w-2xl"
    >
      {/* Column 1 */}
      <div className="space-y-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Offer Name
          <input
            className="rounded-lg border px-3 py-2"
            name="offerName"
            value={formData.offerName}
            onChange={handleInputChange}
          />
        </label>

        <ImageUpload setFormData={setFormData} assetLink={formData.assetLink} />

        <label className="flex flex-col gap-1 text-sm font-medium">
          Display Type
          <select
            className="rounded-lg border px-3 py-2"
            value={formData.displayType}
            name="displayType"
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="HOMEPAGE">Home Page</option>
            <option value="POPUP">Popup</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            className="rounded border px-3 py-2"
            name="isActive"
            checked={formData.isActive}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [e.target.name]: e.target.checked,
              }))
            }
          />
          Set Live
        </label>
      </div>

      <div className="space-y-4">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Display Duration (ms)
          <input
            type="number"
            className="rounded-lg border px-3 py-2"
            name="displayDuration"
            value={formData.displayDuration}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                displayDuration: Number(e.target.value),
              }))
            }
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Brand Name
          <input
            type="text"
            name="brandName"
            className="rounded-lg border px-3 py-2"
            value={formData.brandName}
            onChange={handleInputChange}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium">
          Visit Link
          <input
            type="text"
            name="visitLink"
            className="rounded-lg border px-3 py-2"
            value={formData.visitLink}
            onChange={handleInputChange}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Media Type
          <select
            className="rounded-lg border px-3 py-2"
            value={formData.assetType}
            name="assetType"
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="IMAGE">Image</option>
            <option value="VIDEO">Video</option>
          </select>
        </label>
      </div>

      {/* Full Width Submit Button */}
      <div className="col-span-1 md:col-span-2 flex justify-center">
        <button
          type="submit"
          className="rounded-full bg-indigo-600 px-8 py-3 text-white text-lg font-semibold"
        >
          Save Data
        </button>
      </div>

      {/* Toast message */}
      {toast && (
        <p
          className={`col-span-1 md:col-span-2 text-center text-sm ${
            toast.tone === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {toast.message}
        </p>
      )}
    </form>
  );
};

export default AdvertisementForm;
