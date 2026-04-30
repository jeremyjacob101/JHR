"use client";

import Image from "next/image";
import { useState } from "react";

type EfratImageGalleryProps = {
  images: readonly string[];
};

export default function EfratImageGallery({ images }: EfratImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex] ?? images[0];

  if (!selectedImage) return null;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="relative aspect-[1328/962] overflow-hidden rounded-lg border border-white/15 bg-white">
        <Image
          src={selectedImage}
          alt={`Efrat project image ${selectedIndex + 1}`}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-contain object-center"
          priority
        />
        <div className="absolute left-4 top-4 inline-flex h-9 min-w-9 items-center justify-center rounded-md bg-[#071b34]/90 px-3 text-sm font-semibold text-white ring-1 ring-white/25">
          {selectedIndex + 1}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 lg:grid-cols-2 lg:content-start">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelectedIndex(index)}
            aria-label={`View Efrat project image ${index + 1}`}
            aria-pressed={selectedIndex === index}
            className="group relative aspect-[1328/962] overflow-hidden rounded-lg border border-white/15 bg-white ring-offset-2 ring-offset-[#071b34] transition hover:border-[#d8b46d] aria-pressed:border-[#d8b46d] aria-pressed:ring-2 aria-pressed:ring-[#d8b46d]"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="(min-width: 1024px) 160px, 33vw"
              className="object-contain object-center transition duration-300 group-hover:scale-[1.04]"
            />
            <span className="absolute left-2 top-2 inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-[#071b34]/90 px-2 text-xs font-semibold text-white ring-1 ring-white/20">
              {index + 1}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
