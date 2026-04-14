"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function ImageCarousel({ images, label }) {
  const [index, setIndex] = useState(0);

  function goToNext() {
    setIndex((prev) => (prev + 1) % images.length);
  }

  function goToPrev() {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  if (!images.length) {
    return null;
  }

  const current = images[index];

  return (
    <div className="space-y-3">
      <div className="relative h-72 overflow-hidden rounded-3xl bg-slate-100 sm:h-96">
        <Image
          src={current.src}
          alt={current.alt || `${label} image ${index + 1}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrev}
              aria-label={`Previous ${label} image`}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={goToNext}
              aria-label={`Next ${label} image`}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
        {images.map((image, thumbIndex) => (
          <button
            type="button"
            key={image.id}
            onClick={() => setIndex(thumbIndex)}
            className={`relative h-16 overflow-hidden rounded-xl border-2 ${
              thumbIndex === index ? "border-coral" : "border-transparent"
            }`}
            aria-label={`View ${label} image ${thumbIndex + 1}`}
          >
            <Image src={image.src} alt={image.alt || `${label} thumbnail`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
