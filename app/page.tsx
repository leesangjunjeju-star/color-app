"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);

    // 임시 색상 (UI 구조 먼저 확인용)
    setColors(["#ff0000", "#00ff00", "#0000ff"]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      
      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-6">
        🎨 색 분석 & AI 해설 앱
      </h1>

      {/* 업로드 */}
      <input type="file" accept="image/*" onChange={handleImage} />

      {/* 이미지 미리보기 */}
      {image && (
        <div className="mt-6">
          <img src={image} className="w-64 rounded shadow" />
        </div>
      )}

      {/* 색상 결과 */}
      <div className="mt-6 flex gap-4">
        {colors.map((c, i) => (
          <div key={i} className="text-center">
            <div
              className="w-20 h-20 rounded"
              style={{ backgroundColor: c }}
            />
            <p>{c}</p>
          </div>
        ))}
      </div>
    </div>
  );
}