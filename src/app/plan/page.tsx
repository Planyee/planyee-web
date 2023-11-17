"use client";
// Fix
import React, { useEffect } from "react";
import { useState } from "react";
import { Group, Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import Input from "../input/page";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import {
  selectedDateState,
  srcLocationState,
  destLocationState,
  translatedLocationState,
  additionalInputState,
  planNameState,
  planState,
} from "@/state/states";
import Select from "@/components/Select";
import { useRouter } from "next/navigation";

interface PlanpageProps {
  // 여기에 필요한 props 타입을 정의하세요
}

interface Coordinate {
  sourceLatitude: string;
  sourceLongitude: string;
  destinationLatitude: string;
  destinationLongitude: string;
}

interface TranslatedCoordinate {
  departure: string;
  destination: string;
}

export default function Plan(props: PlanpageProps) {
  const router = useRouter();
  const appKey = "jej3T0nAxd2uWgcHlRn3n7p8Kd7hDAWLHtvIkHEg";
  const selectedDate = useRecoilValue(selectedDateState);

  const srcLocation = useRecoilValue(srcLocationState);
  const destLocation = useRecoilValue(destLocationState);
  const translatedLocation = useRecoilValue(translatedLocationState);

  const [isPopupOpen, setPopupOpen] = useState(false);

  const setadditionalInputState = useSetRecoilState(additionalInputState);
  const setplanNameState = useSetRecoilState(planNameState);
  const setPlanState = useSetRecoilState(planState);

  const [plan, setPlan] = useRecoilState(planState);
  const [inputValue, setInputValue] = useState("");
  const [currentName, setCurrentName] = useState("");

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
    setadditionalInputState({
      input: e.target.value,
    });
  };

  const handleInputNameChange = (e: any) => {
    setCurrentName(e.target.value);
    setplanNameState({
      name: e.target.value,
    });
  };

  const additionalInputStateValue = useRecoilValue(additionalInputState);
  const planNameStateValue = useRecoilValue(planNameState);

  useEffect(() => {
    setPlan((prevPlan) => ({
      ...prevPlan,
      additionalCondition: additionalInputStateValue.input,
    }));
  }, [additionalInputStateValue]);

  useEffect(() => {
    setPlan((prevPlan) => ({
      ...prevPlan,
      planName: planNameStateValue.name,
    }));
  }, [planNameStateValue]);

  useEffect(() => {
    const { year, month, day } = selectedDate;
    const formattedDate = `${year}-${month}-${day}`;

    setPlan((prevPlan) => ({
      ...prevPlan,
      date: formattedDate,
    }));
  }, [selectedDate, setPlan]);

  const handleCategoryClick = () => {
    setPopupOpen(true);
  };

  const handleClose = () => {
    setPopupOpen(false);
  };

  const [coordinate, setCoordinate] = useState<Coordinate>({
    sourceLatitude: "",
    sourceLongitude: "",
    destinationLatitude: "",
    destinationLongitude: "",
  });

  const [translatedCoordinate, setTranslatedCoordinate] =
    useState<TranslatedCoordinate>({
      departure: "",
      destination: "",
    });

  const [whatclicked, setWhatclicked] = useState<string>("");
  const [inputclicked, setInputclicked] = useState<boolean>(false);

  const departureclickhandler = () => {
    setInputclicked(true);
    setWhatclicked("departure");
  };

  const destinationclickhandler = () => {
    setInputclicked(true);
    setWhatclicked("destination");
  };

  const mapclickhandler = () => {
    setInputclicked(false);
  };

  const onconfirmhandler = async () => {
    try {
      const response = await fetch("https://43.202.89.97:52678/main", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(plan),
      });

      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }

      const responseData = await response.json();
      console.log("백엔드 응답:", responseData);

      // 테스트 코드
      // window.location.href = "/list";
      router.push("/list");
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const getvalue = async (address: string, lat: string, lon: string) => {
    if (whatclicked === "departure") {
      setCoordinate((prevState) => {
        return {
          ...prevState,
          sourceLatitude: lat,
          sourceLongitude: lon,
        };
      });

      setTranslatedCoordinate((prevState) => {
        return {
          ...prevState,
          departure: address,
        };
      });

      setPlanState((prevState) => {
        return {
          ...prevState,
          sourceLatitude: lat,
          sourceLongitude: lon,
        };
      });
    } else if (whatclicked === "destination") {
      setCoordinate((prevState) => {
        return {
          ...prevState,
          destinationLatitude: lat,
          destinationLongitude: lon,
        };
      });

      setTranslatedCoordinate((prevState) => {
        return {
          ...prevState,
          destination: address,
        };
      });

      setPlanState((prevState) => {
        return {
          ...prevState,
          destinationLatitude: lat,
          destinationLongitude: lon,
        };
      });
    }
  };

  // 테스트 함수
  // const handlePlanNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const updatedPlan = { ...plan, planName: e.target.value }; // 기존 planState를 복제하고 변경된 planName을 적용합니다.
  //   setPlan(updatedPlan); // 변경된 planState를 설정합니다.
  //   console.log(updatedPlan);
  // };
  // 테스트 함수

  return inputclicked ? (
    <Input
      clickstate={whatclicked}
      propsfunction={getvalue}
      onMapClick={mapclickhandler}
    />
  ) : (
    <div className="h-screen relative">
      <Group className="flex text-center mt-2">
        <Link href="/main" className="absolute left-0">
          <button>
            <Image src="/images/prev.svg" alt="prev" width={15} height={15} />
          </button>
        </Link>
        <p className="text-2xl mx-auto font-semibold">일정 등록</p>
        <Link href="/main" className="absolute right-0">
          <button>
            <Image src="/images/close.svg" alt="close" width={15} height={15} />
          </button>
        </Link>
      </Group>

      <div className="overflow-y-auto h-[calc(100% - 5rem)] pb-20">
        <Stack className="text-center gap-7 mt-12">
          <Stack>
            <p className="text-md font-bold">일정 이름</p>

            <form>
              <input
                className="rounded-full hover:bg-gray-100 border border-gray-200 w-4/5 h-[50px] text-center"
                placeholder="일정 이름을 입력해주세요"
                type="text"
                value={currentName}
                onChange={handleInputNameChange}
              />
            </form>

            <div className="border-b border-gray-400 w-full my-4"></div>
          </Stack>

          <Stack>
            <p className="text-md font-bold">날짜</p>
            <Link href="/main">
              <button className="rounded-full border border-gray-200 text-[#2C7488] font-medium mx-auto w-4/5 h-[50px] hover:bg-gray-100">
                {selectedDate.year
                  ? `${selectedDate.year}년 ${selectedDate.month}월 ${selectedDate.day}일`
                  : ""}
              </button>
            </Link>

            <div className="border-b border-gray-400 w-full my-4"></div>
          </Stack>

          <Stack>
            <p className="text-md font-bold">장소</p>
            <button
              onClick={departureclickhandler}
              className="rounded-full border border-gray-200 mx-auto w-4/5 h-[50px] hover:bg-gray-100"
            >
              <Group className="ml-4">
                <Image
                  src="/images/logo_color.svg"
                  alt="Logo"
                  width={25}
                  height={25}
                  className="text-[#2C7488]"
                />
                <p
                  className={`${
                    translatedCoordinate.departure
                      ? "text-black"
                      : "text-gray-300"
                  }`}
                >
                  {translatedCoordinate.departure || "출발지 입력"}
                </p>
              </Group>
            </button>
            <button
              onClick={destinationclickhandler}
              className="rounded-full border border-gray-200 mx-auto w-4/5 h-[50px] hover:bg-gray-100"
            >
              <Group className="ml-4">
                <Image
                  src="/images/logo_color.svg"
                  alt="Logo"
                  width={25}
                  height={25}
                  className="text-[#2C7488]"
                />
                <p
                  className={`${
                    translatedCoordinate.destination
                      ? "text-black"
                      : "text-gray-300"
                  }`}
                >
                  {translatedCoordinate.destination || "도착지 입력"}
                </p>
              </Group>
            </button>
            <div className="border-b border-gray-400 w-full my-4"></div>
          </Stack>
          <Stack>
            <p className="text-md font-bold">카테고리</p>
            <div className="mx-auto">
              <Group className="grid grid-cols-10 gap-4">
                <form className="col-span-7">
                  <input
                    className="rounded-full hover:bg-gray-100 border border-gray-200 mx-auto w-full h-[50px] text-center"
                    placeholder="오늘의 테마를 적어주세요!"
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                  />
                </form>

                <div className="col-span-3 flex items-center">
                  <button
                    className="rounded-full hover:bg-gray-100 border border-gray-200 w-full h-[50px] "
                    onClick={handleCategoryClick}
                  >
                    추천 테마
                  </button>

                  {isPopupOpen && <Select onClose={handleClose} />}
                </div>
              </Group>
            </div>
          </Stack>
        </Stack>
      </div>

      <div className="fixed bottom-0 left-0 w-full">
        <button
          className="bg-[#CB475B] text-white w-full h-16"
          onClick={onconfirmhandler}
        >
          확인
        </button>
      </div>
    </div>
  );
}
