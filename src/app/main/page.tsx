"use client";
import { Group, Stack } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useSetRecoilState } from "recoil";
import Calendar from "@/components/Calendar";
import { selectedDateState } from "@/state/states";

export default function Main() {
  const setSelectedDate = useSetRecoilState(selectedDateState);

  const handleSelectDate = (selectedDate: {
    year: number;
    month: number;
    day: number;
  }) => {
    setSelectedDate(selectedDate);
  };

  return (
    <>
      <div className="h-screen relative flex flex-col gap-10 items-center w-full">
        <Calendar onSelectDate={handleSelectDate} />

        <Stack className="flex flex-col gap-4">
          <div className="bg-[#FFF2F2] w-full h-12 rounded-xl">
            <Group className="flex justify-between items-center h-full px-4">
              <p>9월 16일</p>
              <p>|</p>
              <p>서울 중구 - 서울 종로구</p>
            </Group>
          </div>
          <div className="bg-[#E3F0F4] w-full h-12 rounded-xl">
            <Group className="flex justify-between items-center h-full px-4">
              <p>9월 17일</p>
              <p>|</p>
              <p>홍대입구역 - 서울숲역</p>
            </Group>
          </div>
          <div className="bg-[#E3F0F4] w-full h-12 rounded-xl">
            <Group className="flex justify-between items-center h-full px-4">
              <p>9월 24일</p>
              <p>|</p>
              <p>서울역 - 종로5가역</p>
            </Group>
          </div>
        </Stack>

        <div className="absolute bottom-5 w-full">
          <Link href="/plan">
            <button className="bg-[#2C7488] text-white w-full h-10">
              일정 등록
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
