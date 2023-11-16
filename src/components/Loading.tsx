import Image from "next/image";

const Loading = () => {
  return (
    <Image
      src="/image/loading.svg"
      alt="loading"
      layout="fill"
      objectFit="cover"
      objectPosition="center"
    />
  );
};

export default Loading;
