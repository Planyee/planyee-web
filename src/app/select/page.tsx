"use client";
import { useRouter } from "next/navigation";
import { Stack } from "@mantine/core";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Select() {
  const [imageUrls, setImageUrls] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const router = useRouter();

  const handleImageClick = (imageData: any) => {
    // 이미지가 이미 선택되었다면 선택 해제하고, 그렇지 않다면 선택
    if (selectedImages.find((image) => image === imageData.name)) {
      setSelectedImages(
        selectedImages.filter((image) => image !== imageData.name)
      );
    } else {
      setSelectedImages([...selectedImages, imageData.name]);
    }
  };

  const handleImageSelection = async () => {
    // 이미지 선택 확인 후, 다음 페이지로 이동
    try {
      const response = await fetch("https://43.202.89.97:52678/select", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(selectedImages),
      });

      if (!response.ok) {
        throw new Error(
          `API 호출이 실패하였습니다. 상태 코드: ${response.status}`
        );
      }

      router.push("/main");
    } catch (error) {
      console.error("이미지 정보 전송 실패", error);
    }
  };

  useEffect(() => {
    const fetchImagesFromBackend = async () => {
      try {
        const response = await fetch("https://43.202.89.97:52678/select");
        if (!response.ok) {
          throw new Error(
            `API 호출이 실패하였습니다. 상태 코드: ${response.status}`
          );
        }
        const data = await response.json();
        setImageUrls(data);
      } catch (error) {
        console.error("이미지 가져오기 실패", error);
      }
    };

    fetchImagesFromBackend();
  }, []);

  return (
    <div className="h-screen relative flex flex-col items-center w-full">
      <div className="overflow-y-auto h-[calc(100%-5rem)] mt-12 pb-16">
        <Stack className="gap-10">
          <p className="text-2xl font-medium">선호하는 장소를 선택해주세요</p>
          <div className="grid grid-cols-2 gap-4">
            {imageUrls &&
              imageUrls.map((imageData, index) => (
                <div
                  key={index}
                  onClick={() => handleImageClick(imageData)}
                  style={{ position: "relative", aspectRatio: "1" }}
                  className={`border-4 ${
                    selectedImages.includes(imageData.name) // 이미지 선택 확인
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={imageData.imageUrl}
                    alt="이미지"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
          </div>
        </Stack>
      </div>

      <div className="fiexd bottom-0 left-0 w-full">
        <button
          className="bg-[#CB475B] text-white text-white font-semibold w-full h-16"
          onClick={handleImageSelection}
        >
          확인
        </button>
      </div>
    </div>
  );
}
