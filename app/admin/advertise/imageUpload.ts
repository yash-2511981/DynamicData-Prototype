"use server";

import { del, put } from "@vercel/blob";

type Response = {
  success: boolean;
  url?: string;
  message?: string;
};

export const uploadImage = async (file: File): Promise<Response> => {
  if (file.size > 1024 * 1024)
    return {
      success: false,
      message: "File size should be less or equal to 1 MB",
    };

  const fileName = file.name;
  const timestamp = Date.now();
  const path = `/dynamic_data/${timestamp}-${fileName}`;
  const { url } = await put(path, file, {
    access: "public",
  });
  return { success: true, url };
};

export const deleteImage = async (link: string): Promise<Response> => {
  if (!link) return { success: true };
  await del(link);
  return { success: true };
};
