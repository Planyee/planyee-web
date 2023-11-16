import Image from "next/image";
import { Loader } from "@mantine/core";

const Loading = () => {
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* 배경 이미지 */}
      <Image
        src="/image/loading-background.jpg"
        alt="background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
      />

      {/* 로더 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Loader color="rgba(255, 255, 255, 1)" type="dots" />
      </div>
    </div>
  );
};

export default Loading;
