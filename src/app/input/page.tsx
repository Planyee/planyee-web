"use client";
import { textState } from "@/state/states";
import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";

export default function Plan() {
  return (
    <>
      <div className="h-screen relative">
        <p>일정 등록</p>

        <div className="bg=beige"></div>
        <p>list들</p>
        <p>list들</p>
        <p>list들</p>
        <p>list들</p>

        <div className="absolute bottom-5 w-full">
          <Link href="/day">
            <button className="bg-[#CB475B] text-white w-full h-10">
              확인
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
