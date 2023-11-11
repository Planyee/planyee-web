"use client";
import { Group, Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { selectedDateState } from "@/state/states";

export default function Plan() {
  const selectedDate = useRecoilValue(selectedDateState);

  return (
    <>
      <div className="h-screen relative">
        <Stack className="text-center">
          <p className="gap-7 mt-12 text-lg font-semibold">일정 등록</p>
          <Link href="/main" className="absolute mt-12 right-0">
            <button>
              <Image
                src="/images/close.svg"
                alt="Close"
                width={25}
                height={25}
                className="text-[#2C7488]"
              />
            </button>
          </Link>

          <Stack>
            <p>날짜</p>
            <button className="rounded-full border border-gray-200 text-[#2C7488] font-medium mx-auto w-4/5 h-[50px]">
              {selectedDate.year
                ? `${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일`
                : ""}
            </button>

            <div className="border-b border-gray-400 w-full my-4"></div>
          </Stack>

          <Stack>
            <p>장소</p>
            <button className="rounded-full border border-gray-200 mx-auto w-4/5 h-[50px]">
              <Group className="ml-4">
                <Image
                  src="/images/logo_color.svg"
                  alt="Logo"
                  width={25}
                  height={25}
                  className="text-[#2C7488]"
                />
                <p className="text-gray-300">출발지 입력</p>
              </Group>
            </button>
            <button className="rounded-full border border-gray-200 mx-auto w-4/5 h-[50px]">
              <Group className="ml-4">
                <Image
                  src="/images/logo_color.svg"
                  alt="Logo"
                  width={25}
                  height={25}
                />
                <p className="text-gray-300">도착지 입력</p>
              </Group>
            </button>

            <div className="border-b border-gray-400 w-full my-4"></div>
          </Stack>
          <Stack>
            <p>카테고리</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="rounded-full hover:bg-gray-100 border border-gray-200 mx-auto w-4/5 h-[40px]">
                명소
              </button>
              <button className="rounded-full hover:bg-gray-100 border border-gray-200 mx-auto w-4/5 h-[40px]">
                관광
              </button>
              <button className="rounded-full hover:bg-gray-100 border border-gray-200 mx-auto w-4/5 h-[40px]">
                쇼핑
              </button>
              <button className="rounded-full hover:bg-gray-100 border border-gray-200 mx-auto w-4/5 h-[40px]">
                음식
              </button>
            </div>
          </Stack>
        </Stack>

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
