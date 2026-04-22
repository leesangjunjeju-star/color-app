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
        박주훈 책임님, 이 화면이 어플이라고 생각해 보세요. 
        아래 파일 선택 글자를 터치하면 카메라 앱이 구동될 거에요. 
        그걸로 사진을 찍으면 색이 분석될 거에요. 
        기본적인 색분석을 탑재한 거고, 
        AI모듈은 아직 붙이지 않은 상태에요. 
        이 상태에서 시작하는거죠. 
        물론 지금은 허접하죠. 
        오늘 퇴근 하고 집에 와서, 딱 2시간 동안 진행한 결과인 거죠.
      </h1>

      {/* 업로드 */}
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