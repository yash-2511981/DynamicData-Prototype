"use client";
import { useEffect, useState } from "react";
import { UserAdd } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface PopupProps {
  ads: UserAdd[];
}

const PopupAdvs = ({ ads }: PopupProps) => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const current = ads[index];

  useEffect(() => {
    if (!current) return;

    const duration = current.displayDuration || 3000;

    const timer = setTimeout(() => {
      if (index < ads.length - 1) {
        setIndex(index + 1);
      } else {
        setVisible(false);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [index, current, ads]);

  if (!visible || !current) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-64 rounded-2xl border border-indigo-200 bg-white shadow-xl animate-fadeSlide">
      {/* Close Button */}
      <button
        onClick={() => {
          if (index < ads.length - 1) setIndex(index + 1);
          else setVisible(false);
        }}
        className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-indigo-600 text-white"
      >
        ✕
      </button>

      <div className="rounded-2xl overflow-hidden ">
        <Link href={current.visitLink} target="_blank">
          {current.assetType === "IMAGE" ? (
            <Image
              src={current.assetLink}
              alt="Popup AD"
              className="w-full h-40 object-cover"
              height={150}
              width={150}
            />
          ) : (
            <video
              src={current.assetLink}
              className="w-full h-40 object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
          )}
        </Link>
      </div>
    </div>
  );
};

export default PopupAdvs;
