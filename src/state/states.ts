"use client";
import { atom } from "recoil";

export const textState = atom({
  key: "textState", // unique ID (with respect to other atoms/selectors)
  default: "hello", // default value (aka initial value)
});

export const selectedDatesState = atom({
  key: "selectedDatesState",
  default: [] as { month: any; day: any }[],
});
