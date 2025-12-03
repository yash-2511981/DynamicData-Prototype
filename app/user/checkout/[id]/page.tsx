import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import CheckoutClient from "./checkout-client";

type CheckoutPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: CheckoutPageProps): Promise<Metadata> {
  const { name, category } = await searchParams;

  if (!name || !category) {
    return {
      title: "You can found best discount on this page",
      description:
        "Rental Shop gives you a best offers on used and new products near your area",
    };
  }

  return {
    title: `Best Discount Deals - ${name}`,
    description: `You are seeing the best deals on ${name} in ${category} category.`,
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <Link
          href="/user"
          className="text-sm text-slate-500 transition hover:text-indigo-600 w-fit"
        >
          Back to catalog
        </Link>

        <Suspense fallback={<div>Loading checkout...</div>}>
          <CheckoutClient params={params} />
        </Suspense>
      </div>
    </main>
  );
}
