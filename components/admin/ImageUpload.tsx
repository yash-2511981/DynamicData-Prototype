"use client";

import { deleteImage, uploadImage } from "@/app/admin/advertise/imageUpload";
import { Advertisement } from "@/types/types";
import Image from "next/image";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const ImageUpload = ({
  setFormData,
  assetLink,
}: {
  assetLink: string;
  setFormData: Dispatch<SetStateAction<Advertisement>>;
}) => {
  const [preview, setPreview] = useState<string | null>();

  useEffect(() => {
    const setImage = () => {
      if (!assetLink) return;
      setPreview(assetLink);
    };
    setImage();
  }, [assetLink]);

  const handleMediaUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      alert("Only images or videos are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("File must be less or equal to 1 MB");
      e.target.value = "";
      return;
    }

    const { success, url, message } = await uploadImage(file);

    if (!success) {
      alert(message || "Upload failed");
      return;
    }
    if (success && assetLink) {
      await deleteImage(assetLink);
    }
    const previewURL = URL.createObjectURL(file);
    setPreview(previewURL);
    setFormData((prev) => ({ ...prev, assetLink: url! }));
  };

  return (
    <label className="flex flex-col gap-1 text-sm font-medium h-35 cursor-pointer">
      Upload Media (Image/Video)
      <div className="border w-full h-full rounded-md flex items-center justify-center relative overflow-hidden">
        {preview ? (
          <Image
            src={preview}
            fill
            alt="Preview"
            className="object-contain"
            unoptimized
          />
        ) : (
          "Click Here to select file"
        )}

        <input
          type="file"
          hidden
          accept="image/*,video/*"
          name="assetLink"
          onChange={handleMediaUpload}
        />
      </div>
    </label>
  );
};

export default ImageUpload;
