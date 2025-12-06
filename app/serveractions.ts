"use server";

import { API_BASE_URL } from "@/lib/config";
import {
  Advertisement,
  CheckoutResponse,
  ProductDraft,
  SystemFeeDraft,
} from "@/types/types";
import { updateTag } from "next/cache";
import { AboutData, fallBackData } from "./about/page";

const serverUrl = process.env.NEXT_SERVER_URL!;

export async function updateCacheData(tag: string) {
  console.log(tag);
  updateTag(tag);
}

type DiscountActionResult = {
  payload: CheckoutResponse | null;
  error: string | null;
};

export async function checkDiscount(
  id: string | number
): Promise<DiscountActionResult> {
  const productId = Number(id);

  try {
    const response = await fetch(`${API_BASE_URL}/user/discount/${productId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      let errorDetail = await response.text();

      if (errorDetail.length > 100) {
        errorDetail = errorDetail.substring(0, 100) + "...";
      }

      return {
        payload: null,
        error: `Discount service failed (${response.status}): ${errorDetail}`,
      };
    }

    const payload = (await response.json()) as CheckoutResponse;

    return { payload, error: null };
  } catch (e) {
    const errorMessage =
      e instanceof Error ? e.message : "A general network error occurred.";
    return {
      payload: null,
      error: `Network Error: Unable to reach discount service. (${errorMessage})`,
    };
  }
}

export const getAboutPageData = async (): Promise<{
  success: boolean;
  project: AboutData;
}> => {
  try {
    const res = await fetch(
      `${API_BASE_URL}/server/about-data?url=${encodeURIComponent(serverUrl)}`,
      {
        next: { tags: ["about"], revalidate: 30 },
      }
    );
    if (res.ok) {
      const data = await res.json();
      if (data.project === null) data.project = fallBackData;
      return { success: true, project: data.project };
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return { success: false, project: fallBackData };
  }
};

type Response = {
  success: boolean;
  message?: string;
};

export const createProductAction = async (
  payload: ProductDraft
): Promise<Response> => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) return { success: true };
    else return { success: false };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const createSystemFee = async (
  data: SystemFeeDraft
): Promise<Response> => {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/create-systemfee`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) return { success: false };

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const handleAdvertisementAction = async ({
  currentData,
  prevData,
}: {
  currentData: Advertisement;
  prevData?: Advertisement;
}): Promise<Response> => {
  const {
    offerName,
    brandName,
    assetLink,
    assetType,
    displayDuration,
    displayType,
    isActive,
  } = currentData;

  if (
    !offerName ||
    !brandName ||
    !assetLink ||
    !assetType ||
    !displayDuration ||
    !displayType ||
    !isActive
  )
    return { success: false, message: "Insert Valid Values" };
  if (prevData) {
    const isChangesDone =
      JSON.stringify(currentData) === JSON.stringify(prevData);
    if (isChangesDone) return { success: true };
  }
  try {
    const res = await fetch(`${API_BASE_URL}/admin/create-advertise`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(currentData),
    });
    if (!res.ok) return { success: false };

    const data = await res.json();
    if (!data.success) return { success: false };
    updateCacheData("advertises");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
