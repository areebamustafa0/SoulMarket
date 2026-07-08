"use client";

import { useState } from "react";

export function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const gallery = images.length ? images : [];
  const [active, setActive] = useState(gallery[0]);

  return (
    <div className="lg:sticky lg:top-24">
      <div className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-soft">
        <img
          src={active}
          alt={title}
          className="aspect-square w-full object-cover"
        />
      </div>
      {gallery.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {gallery.map((img) => (
            <button
              key={img}
              onClick={() => setActive(img)}
              className={`overflow-hidden rounded-2xl border-2 transition ${
                active === img ? "border-primary" : "border-transparent hover:border-line"
              }`}
            >
              <img src={img} alt="" className="aspect-square w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
