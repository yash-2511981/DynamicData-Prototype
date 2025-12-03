import { API_BASE_URL } from "@/lib/config";
import type { MetadataRoute } from "next";

async function getProductTags() {
  const res = await fetch(`${API_BASE_URL}/server/site-map-url`);
  const data = await res.json();
  const productTags: string[] = data.productTags;

  return { productTags };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { productTags } = await getProductTags();

  const searchUrls: MetadataRoute.Sitemap = productTags.map((t) => {
    return {
      url: `${process.env.NEXT_SERVER_URL}/user/checkout/${t}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0,
    };
  });

  return [
    {
      url: `${API_BASE_URL}/user`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...searchUrls,
  ];
}
