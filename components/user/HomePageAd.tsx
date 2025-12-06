import { UserAdd } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

interface HomePageProps {
  advertise: UserAdd;
}

const HomePageAd = ({ advertise }: HomePageProps) => {
  if (!advertise) return null;

  return (
    <Link href={advertise.visitLink} target="_blank">
      <div className=" mt-10 rounded-2xl overflow-hidden border border-indigo-100 bg-white shadow-sm max-w-5xl mx-auto">
        {advertise.assetType === "IMAGE" ? (
          <Image
            src={advertise.assetLink}
            alt="Advertises"
            className="w-full"
            height={100}
            width={300}
          />
        ) : (
          <video
            src={advertise.assetLink}
            className="w-full h-40 md:h-56 object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        <div className="p-3 text-center text-xs text-slate-500 bg-slate-50">
          Sponsored Advertisement
        </div>
      </div>
    </Link>
  );
};

export default HomePageAd;
