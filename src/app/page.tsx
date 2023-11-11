import { Button } from "@mantine/core";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Login() {
  return (
    <>
      <div className="h-screen relative bg-[#CB475B] flex flex-col items-center justify-center">
        <Image src="/images/logo.svg" alt="Logo" width={25} height={25} />
        <div className="font-['Damion'] text-5xl font-medium text-white">
          Planyee
        </div>

        <div className="absolute bottom-0 mb-20">
          <a href="/oauth2/authorization/naver">
            {/* <Image
              src="/images/naver_btn.png"
              alt="Naver Login"
              width={150}
              height={40}
            /> */}
            <Image
              src="/images/naverBtn.png"
              alt="Naver Login"
              width={170}
              height={40}
            />
          </a>
        </div>
      </div>
    </>
  );
}
