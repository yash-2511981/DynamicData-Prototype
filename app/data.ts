import { API_BASE_URL } from "@/lib/config";
import { UserAdd } from "@/types/types";
import { cacheTag } from "next/cache";

export async function getProductsData() {
  "use cache";

  cacheTag("products");

  const res = await fetch(`${API_BASE_URL}/server/get-all-products`);
  const json = await res.json();
  if (!json.success) {
    return { products: [] };
  }

  const products = Array.isArray(json.products) ? json.products : [];

  return { products };
}

export async function getRules() {
  "use cache";

  cacheTag("rules");

  const res = await fetch(`${API_BASE_URL}/server/get-rules`);
  const data = await res.json();
  const rules = data.rules;
  return { rules };
}

export async function getSystemFees() {
  "use cache";

  cacheTag("systemfees");

  const res = await fetch(`${API_BASE_URL}/server/get-fees`);

  const data = await res.json();
  if (!data.success) return { systemFees: [] };
  const systemFees = data.systemFees;
  return { systemFees };
}

export async function getAllAdvertisement() {
  "use cache";

  cacheTag("advertises");

  const res = await fetch(`${API_BASE_URL}/admin/all-advertises`, {
    next: { revalidate: 30 },
  });

  const resData = await res.json();
  console.log(resData);
  if (resData.success) return { advertises: resData.advertises };
  else return { advertises: [] };
}

type Response = {
  success: boolean;
  homePageAds: UserAdd[];
  popupAds: UserAdd[];
};

export async function getUserDisplayAdds(): Promise<Response> {
  "use cache";

  cacheTag("advertises");

  const res = await fetch(`${API_BASE_URL}/user/get-display-ads`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  console.log(data);
  if (!data.success) return { success: false, homePageAds: [], popupAds: [] };

  return {
    success: true,
    homePageAds: data.HomePageAds,
    popupAds: data.PopupAds,
  };
}
