import { type ReactNode } from "react";
import type { Drill } from "../types/drill";
import { YouTubeEmbed } from "./YoutubeEmbed";
import { useMinutesSeconds } from "../services/timeConverter";

type CardProps = {
  drill: Drill;
  children: ReactNode;
  className?: string;
};

export function Card({ drill, children, className = "" }: CardProps) {
  return (
    <div
      className={`divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm  ${className}`}
    >
      <div className="px-4 py-5 sm:px-6">
        {drill.name && (
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {drill.name}
          </h3>
        )}

          {drill.url && <YouTubeEmbed url={drill.url} title={drill.name} />}
        </div>

            <div className="px-4 py-4 sm:px-6">
      {drill.category && (
        <button
          type="button"
          className="rounded-full bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-amber-800  cursor-pointer"
        >
          {drill.category}
        </button>
      )}

      <div className="text-gray-700">{children}</div>
      {
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {useMinutesSeconds(drill.length).formatted}
        </h3>
      }
            </div>
    </div>
  );
}
