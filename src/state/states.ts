"use client";
import { atom } from "recoil";

export const selectedDateState = atom({
  key: "selectedDateState",
  default: { year: 0, month: 0, day: 0 },
});
