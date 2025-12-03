import { Metadata } from "next";
import { Suspense } from "react";
import About from "./About";

export const metadata: Metadata = {
  title: "Dynamic Discount Prototype | About",
  description:
    "A prototype system demonstrating dynamic discount rules, condition-based pricing, and real-time checkout calculations.",
};

export const fallBackData = {
  heroImage: "/about-hero.png",
  title: "Dynamic Discount Rules Prototype",
  description:
    "This prototype demonstrates how discount rules are created, managed, and applied dynamically during checkout. All content shown here is static for now and will later be controlled from a CMS.",
  features: [
    {
      title: "Rule Management",
      description: "Admins can create discount rules with flexible conditions.",
    },
    {
      title: "Real-Time Calculation",
      description: "Users can simulate checkout and see the best discount.",
    },
    {
      title: "CMS-Ready Structure",
      description:
        "This page layout is designed to fetch content from a separate CMS.",
    },
  ],
};

export type AboutData = {
  heroImage: string;
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
  }[];
};

const AboutPage = async () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-12 font-sans text-slate-900">
      <Suspense>
        <About />
      </Suspense>
    </main>
  );
};

export default AboutPage;
