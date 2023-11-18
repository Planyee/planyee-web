import Image from "next/image";
import { Loader } from "@mantine/core";
// Fix

const Loading = () => {
  return (
    <div className="relative w-400px h-930px">
      {/* 배경 이미지 */}
      <Image
        src="/images/loading.svg"
        alt="background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="z-0"
      />

      {/* 로더 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loader color="rgba(255, 255, 255, 1)" type="dots" />
      </div>
    </div>
  );
};

export default Loading;
