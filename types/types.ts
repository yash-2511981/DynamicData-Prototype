import { Product } from "@/lib/products";

export type DiscountType = "PERCENTAGE" | "FLAT" | "FREE_DELIVERY";

export type ApplyOn = "PRODUCT" | "CATEGORY" | "BRAND";

export type RuleDraft = {
  id?: number;
  title: string;
  type: DiscountType | "";
  value: string;
  message: string;
  applyOn: ApplyOn | "";
  applyValue: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductDraft = {
  id?: number;
  name: string;
  price: number | string;
  category?: string;
  brand?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type SystemFeeDraft = {
  id?: number;
  feeName: string;
  type: number | string;
  applyOn: string;
  value: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Fee = { name: string; amount: number };

export type CheckoutResponse = {
  success: boolean;
  product: Product;
  subtotal: number;
  discountAmount: number;
  discountName: string | null;
  amountAfterDiscount: number;
  fees: Fee[];
  totalFees: number;
  totalPayable: number;
};
