"use client";
import { atom } from "recoil";

export const selectedDateState = atom({
  key: "selectedDateState",
  default: { year: 0, month: 0, day: 0 },
});

// 출발지 (위도 , 경도)
export const srcLocationState = atom({
  key: "srcLocationState",
  default: { latitude: "", longitude: "" },
});

// 도착지 (위도, 경도)
export const destLocationState = atom({
  key: "destLocationState",
  default: { latitude: "", longitude: "" },
});

// 입력받은 위도 경도 -> 번역
export const translatedLocationState = atom({
  key: "translatedLocationState",
  default: { source: "", destination: "" },
});

// 추가 입력 스타일
export const additionalInputState = atom({
  key: "additionalInputState",
  default: {
    input: "",
  },
});

export const planState = atom({
  key: "planState",
  default: {
    date: "",
    planName: "나의 일정!",
    sourceLatitude: "",
    sourceLongitude: "",
    destinationLatitude: "",
    destinationLongitude: "",
    planPreferredPlaces: [] as string[],
    additionalCondition: "",
  },
});

export const planId = atom<number>({
  key: "planId",
  default: 0,
});
