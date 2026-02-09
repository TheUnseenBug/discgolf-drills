import { type ReactNode } from "react";
import type { Drill } from "../types/drill";
import { YouTubeEmbed } from "./YoutubeEmbed";
import { useDrillStore } from "../store/useDrillStore";

type CardProps = {
  drill: Drill;
  children: ReactNode;
  className?: string;
};

export function Card({ drill, children, className = "" }: CardProps) {
  const { setSelectedCategory } = useDrillStore();
  return (
    <div
      className={`flex flex-col divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-300 shadow-sm h-full ${className}`}
    >
      <div className="px-4 py-5 sm:px-6">
        {drill.name && (
          <h3 className="mb-2 text-sm lg:text-lg md:text-md font-semibold text-gray-900">
            {drill.name}
          </h3>
        )}
        {drill.category && (
          <button
            type="button"
            className="rounded-full bg-amber-600 px-2 py-1.25 text-sm font-semibold text-white shadow-xs hover:bg-amber-800 cursor-pointer mb-3"
            onClick={() =>
              setSelectedCategory(
                drill.category === "All" ? null : drill.category,
              )
            }
          >
            {drill.category}
          </button>
        )}

        {drill.url && <YouTubeEmbed url={drill.url} title={drill.name} />}
      </div>

      <div className="flex flex-col flex-1 px-4 py-4 sm:px-6">
        <div className=" text-sm md:text-md  flex-1">{children}</div>
      </div>
    </div>
  );
}
