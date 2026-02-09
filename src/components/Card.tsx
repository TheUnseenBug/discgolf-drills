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
      className={`flex flex-col overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 h-full border border-gray-100 ${className}`}
    >
      {/* Video Section */}
      {drill.url && (
        <div className="relative w-full aspect-video bg-gray-900">
          <YouTubeEmbed url={drill.url} title={drill.name} />
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6">
        {/* Header */}
        <div className="mb-4">
          {drill.category && (
            <button
              type="button"
              className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 hover:bg-amber-100 transition-colors cursor-pointer duration-200 mb-3"
              onClick={() =>
                setSelectedCategory(
                  drill.category === "All" ? null : drill.category,
                )
              }
            >
              {drill.category}
            </button>
          )}

          {drill.name && (
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              {drill.name}
            </h3>
          )}
        </div>

        {/* Description */}
        <div className="text-sm  text-gray-600 leading-relaxed flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}