"use client";

import Image from "next/image";
import { useState } from "react";
import ProjectVideoPlayer from "@/components/ProjectVideoPlayer";

type PropertyVideoSource = {
  src: string;
  poster: string;
  label: string;
};

type PropertyVideoGalleryProps = {
  title: string;
  videos: PropertyVideoSource[];
  viewportAspectRatio?: number;
};

export default function PropertyVideoGallery({
  videos,
  viewportAspectRatio = 0.62,
}: PropertyVideoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (videos.length === 0) {
    return (
      <div className="rounded-xl bg-slate-100 p-6 text-sm text-slate-600">
        No gallery videos available.
      </div>
    );
  }

  const activeVideo = videos[activeIndex] ?? videos[0];
  const safeAspectRatio = viewportAspectRatio > 0 ? viewportAspectRatio : 0.62;
  const viewportPaddingBottom = `${100 / safeAspectRatio}%`;

  return (
    <div className="overflow-hidden">
      <div
        className="relative w-full bg-black"
        style={{ paddingBottom: viewportPaddingBottom }}
      >
        <div className="absolute inset-0">
          <ProjectVideoPlayer
            key={activeVideo.src}
            src={activeVideo.src}
            poster={activeVideo.poster}
            title={activeVideo.label}
            videoFit="contain"
          />
        </div>
      </div>

      <div className="border-t border-slate-100 px-4 py-4">
        <div className="flex gap-3 overflow-x-auto pb-1">
          {videos.map((video, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={video.src}
                type="button"
                aria-pressed={isActive}
                aria-label={`Play ${video.label}`}
                onClick={() => setActiveIndex(index)}
                className={`shrink-0 rounded-2xl border bg-white text-left transition ${
                  isActive
                    ? "border-slate-900 shadow-sm"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3 p-2.5">
                  <div className="relative h-18 w-13 overflow-hidden rounded-xl bg-slate-900">
                    <Image
                      src={video.poster}
                      alt={`${video.label} poster`}
                      fill
                      sizes="52px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute right-2 top-2 rounded-full bg-black/55 px-1.5 py-0.5 text-[0.625rem] font-semibold text-white">
                      ▶
                    </div>
                  </div>

                  <div className="pr-2">
                    <p className="text-sm font-semibold text-slate-900">
                      {video.label}
                    </p>
                    <p className="text-xs text-slate-500">
                      {isActive ? "Now playing" : "Tap to play"}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
