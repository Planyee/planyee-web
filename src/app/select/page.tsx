"use client";
import { textState } from "@/state/states";
import { Stack } from "@mantine/core";
// import { Button, Center, Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";

export default function Select() {
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // 유저가 선택한 카테고리

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };

  const handleImageSelection = async () => {
    try {
      const response = await fetch("백엔드 API URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl, category: selectedCategory }),
      });

      if (response.ok) {
        // 요청이 성공했을 때의 처리
      } else {
        throw new Error(
          `API 호출이 실패하였습니다. 상태 코드: ${response.status}`
        );
      }
    } catch (error) {
      console.error("이미지 업로드 및 카테고리 선택 실패", error);
    }
  };

  useEffect(() => {
    // 이미지 가져오는 로직
    // 백엔드 API에서 이미지 링크 가져오는 비동기 함수
    const fetchImageFromBackend = async () => {
      try {
        const response = await fetch("백엔드 API URL"); // 백엔드 API 호출
        if (!response.ok) {
          throw new Error(
            `API 호출이 실패하였습니다. 상태 코드: ${response.status}`
          );
        }
        const data = await response.json();
        setImageUrl(data.imageUrl); // 이미지 URL을 상태로 저장
      } catch (error) {
        console.error("이미지 가져오기 실패", error);
      }
    };

    fetchImageFromBackend(); // 이미지 가져오기 함수 호출
  }, []); // useEffect 두 번째 매개변수로 빈 배열을 전달하여 한 번만 호출

  return (
    <>
      {/* <div className="flex flex-col h-screen justify-between"> */}
      <div className="h-screen relative flex flex-col items-center w-full">
        <Stack className="mt-12 gap-10">
          <p>선호하는 장소를 선택해주세요</p>

          <p>이미지링크 받아서 띄워줄 곳</p>
          {imageUrl && (
            <Image src={imageUrl} alt="이미지" width={200} height={200} />
          )}

          {/* 카테고리 선택 폼 */}
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="카테고리1">카테고리1</option>
            <option value="카테고리2">카테고리2</option>
            {/* 다른 카테고리 옵션들 추가 */}
          </select>

          {/* 이미지 선택 및 카테고리 전송 버튼 */}
          <button onClick={handleImageSelection}>
            이미지 선택 및 카테고리 전송
          </button>
        </Stack>

        <div className="absolute bottom-5 w-full">
          <Link href="/main">
            <button className="bg-[#CB475B] text-white w-full h-10">
              확인
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
function fetchImageFromBackend() {
  throw new Error("Function not implemented.");
}
