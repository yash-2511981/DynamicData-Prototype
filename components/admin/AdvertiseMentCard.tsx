import { Advertisement } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">
    {children}
  </span>
);

const SmallMeta = ({ children }: { children: React.ReactNode }) => (
  <div className="text-xs text-slate-500">{children}</div>
);

const AdvertisementCard = ({
  a,
  onEdit,
}: {
  a: Advertisement;
  onEdit: () => void;
}) => {
  return (
    <article className="flex flex-col rounded-lg border p-3 text-sm hover:shadow-md transition">
      <div className="relative h-28 w-full overflow-hidden rounded-md bg-neutral-50">
        {a.assetType === "IMAGE" ? (
          <Image
            src={a.assetLink}
            alt={a.offerName}
            height={100}
            width={100}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          // small muted looped video preview
          <video
            src={a.assetLink}
            className="h-full w-full object-cover"
            playsInline
            muted
            loop
            preload="metadata"
          />
        )}
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold truncate">{a.offerName}</h3>
          <div className="flex gap-1">
            <Badge>{a.displayType}</Badge>
            <Badge>{a.assetType}</Badge>
          </div>
        </div>

        <SmallMeta>{a.brandName}</SmallMeta>

        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-2 text-xs">
            {a.displayDuration ? (
              <span className="text-slate-500">⏱ {a.displayDuration} ms</span>
            ) : null}
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{formatDate(a.createdAt)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={a.visitLink}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-indigo-600 hover:underline"
            >
              Visit
            </Link>
          </div>

          <button onClick={onEdit}>Edit</button>
        </div>
      </div>
    </article>
  );
};

export default AdvertisementCard;
