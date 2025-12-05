"use client";

import { handleAdvertisementAction } from "@/app/serveractions";
import { Advertisement } from "@/types/types";
import { ChangeEvent, useEffect, useState } from "react";

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

  const handleMediaUpload = () => {
    console.log("Uploading media");
  };

  useEffect(() => {
    const setData = () => {
      if (advertisement) {
        setFormData(advertisement);
      }
    };
    setData();
  }, [advertisement]);

  const handleSubmit = async () => {
    const { success } = await handleAdvertisementAction({
      currentData: formData,
    });
    if (success) {
      return setToast({ tone: "success", message: "Data saved successfully" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <label className="flex flex-col gap-1 text-sm font-medium">
        Offer Name
        <input
          className="rounded-lg border px-3 py-2"
          name="offerName"
          value={formData?.offerName}
          onChange={handleInputChange}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Brand Name
        <input
          type="text"
          name="brandName"
          className="rounded-lg border px-3 py-2"
          value={formData?.brandName}
          onChange={handleInputChange}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Brand Name
        <input
          type="text"
          name="visitLink"
          className="rounded-lg border px-3 py-2"
          value={formData?.visitLink}
          onChange={handleInputChange}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Upload Media (Image/Video)
        <input
          type="file"
          className="rounded-lg border px-3 py-2"
          name="assetLink"
          value={formData.assetLink}
          onChange={handleMediaUpload}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Media Type
        <select
          className="rounded-lg border px-3 py-2"
          value={formData?.assetType}
          name="assetType"
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="IMAGE">Image</option>
          <option value="VIDEO">Video</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium">
        Display Type
        <select
          className="rounded-lg border px-3 py-2"
          value={formData?.assetType}
          name="displayType"
          onChange={handleInputChange}
        >
          <option value="">Select</option>
          <option value="HOMEPAGE">Home Page</option>
          <option value="POPUP">Popup</option>
        </select>
      </label>

      <label
        htmlFor="displayDuration"
        className="flex flex-col gap-1 text-sm font-medium"
      >
        Display Duration
        <input
          type="number"
          className="rounded-lg border px-3 py-2"
          name="displayDuration"
          value={formData.displayDuration || 3000}
          onChange={handleMediaUpload}
        />
      </label>

      <label
        htmlFor="displayDuration"
        className="flex flex-col gap-1 text-sm font-medium"
      >
        Display Duration
        <input
          type="checkbox"
          className="rounded-lg border px-3 py-2"
          name="isActive"
          checked={formData.isActive}
          onChange={(e) => {
            setFormData((prev) => ({
              ...prev,
              [e.target.name]: e.target.checked,
            }));
          }}
        />
      </label>

      <button
        type="submit"
        className="rounded-full bg-indigo-600 px-6 py-2 text-white"
      >
        Save Data
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

export default AdvertisementForm;
