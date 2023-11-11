"use client";
import { Group, Stack } from "@mantine/core";
import { Calendar, DatePicker } from "@mantine/dates";
import Link from "next/link";
import { useState } from "react";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { useRecoilState } from "recoil";
import { selectedDatesState } from "@/state/states";

export default function Main() {
  const [value, setValue] = useState<Date | null>(null);
  const [selectedDates, setSelectedDates] = useRecoilState(selectedDatesState);

  const handleSelectDate = (selectedDate: any) => {
    // 선택한 날짜를 Recoil 상태에 추가 (맵 형태로)
    const { month, day } = selectedDate;
    // 이미 선택한 월과 일이 배열에 없을 때만 추가
    if (
      !selectedDates.some((date) => date.month === month && date.day === day)
    ) {
      setSelectedDates([...selectedDates, { month, day }]);
    }
    setValue(selectedDate);
  };

  return (
    <>
      <div className="h-screen relative flex flex-col gap-10 items-center w-full">
        <DatePicker
          className="mt-12"
          allowDeselect
          value={value}
          onChange={(selectedDate) => {
            if (selectedDate) {
              const month = selectedDate.getMonth() + 1; // 월은 0부터 시작하므로 +1
              const day = selectedDate.getDate();
              handleSelectDate({ month, day });
            }
          }}
        />
        {/* <Calendar className="mt-12"></Calendar> */}

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
