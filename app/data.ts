import { API_BASE_URL } from "@/lib/config";
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

  const res = await fetch(`${API_BASE_URL}/server/all-advertises`, {
    next: { revalidate: 86000 },
  });

  const resData = await res.json();
  if (resData.success) return { advertises: resData.advertises };
  else return { advertises: [] };
}
