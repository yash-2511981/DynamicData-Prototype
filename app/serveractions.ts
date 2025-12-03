"use server";

import { API_BASE_URL } from "@/lib/config";
import { CheckoutResponse } from "@/types/types";
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
      return { success: true, project: data.project };
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    return { success: false, project: fallBackData };
  }
};
