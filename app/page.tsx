"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);

  // 🔥 색 추출 엔진
  const extractColors = (img: HTMLImageElement) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return [];

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const map: Record<string, number> = {};

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const key = `${r},${g},${b}`;
      map[key] = (map[key] || 0) + 1;
    }

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([rgb]) => {
        const [r, g, b] = rgb.split(",").map(Number);
        return `#${[r, g, b]
          .map((x) => x.toString(16).padStart(2, "0"))
          .join("")}`;
      });
  };

  // 📸 카메라 / 이미지 처리
  const handleImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);

    const img = document.createElement("img");
    img.src = url;

    img.onload = () => {
      const result = extractColors(img);
      setColors(result);
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* 제목 */}
      <h1 className="text-2xl font-bold mb-6">
        색 분석 & AI 해설 앱이 '아마도'될..
        박주훈 책임님, 이 화면이 어플이라고 생각해 보세요. 아래 파일 선택 글자를 터치하면 카메라 앱이 구동될 거에요. 그걸로 사진을 찍으면 색이 분석될 거에요. 기본적인 색분석을 탑재한 거고, AI모듈은 아직 붙이지 않은 상태에요. 이 상태에서 시작하는거죠. 물론 지금은 허접하죠. 오늘 퇴근 하고 집에 와서, 딱 2시간 동안 진행한 결과인 거죠. (v1)
      </h1>

      {/* 카메라 / 업로드 */}
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleImage}
      />

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