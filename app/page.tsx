"use client";

import { useState } from "react";
import ColorThief from "colorthief";

export default function Home() {
  const [colors, setColors] = useState<string[]>([]);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 5);

        const hexColors = palette.map(
          (rgb: number[]) =>
            "#" +
            rgb.map((x) => x.toString(16).padStart(2, "0")).join("")
        );

        setColors(hexColors);
      } catch (err) {
        console.error("ColorThief error:", err);
      }
    };
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        색 분석 & AI 해설 앱 (v1)
      </h1>

      <input type="file" accept="image/*" onChange={handleImage} />

      <div className="mt-6 flex gap-4">
        {colors.map((c, i) => (
          <div key={i} className="text-center">
            <div
              style={{ backgroundColor: c }}
              className="w-20 h-20 rounded"
            />
            <p>{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}