"use client";
// Fix
import React, { useEffect, useState } from "react";
import { atom, useRecoilValue } from "recoil";
import { planId } from "@/state/states";
import { Stack, Group } from "@mantine/core";
import Map from "@/app/map/page";
import Link from "next/link";
import Image from "next/image";
import "./Contentlistpage.css";
import Loading from "@/components/Loading";

const List: React.FC = () => {
  const planIdValue = useRecoilValue(planId);

  const [source, setSource] = useState<string>(""); // 출발지
  const [destination, setDestination] = useState<string>(""); // 도착지
  const [shortaddress, setShortAddress] = useState<any>({
    source: "",
    destination: "",
  }); // 출발지, 도착지 짧은 주소
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const [array, setArray] = useState<ArrayType | null>(null);
  const [contents, setContents] = useState<JSX.Element[] | null>(null);

  const [MapClick, setMapClick] = useState<boolean>(false); // 클릭 여부

  const onclickhandler = (): void => {
    setMapClick((MapClick) => !MapClick);
  };

  interface Location {
    latitude: number;
    longitude: number;
  }

  interface Recommendation {
    name: string;
    mainCategory: string[];
    subCategory: string[];
    address: string;
    description: string;
    latitude: number;
    longitude: number;
  }

  interface ArrayType {
    source: Location;
    destination: Location;
    recommendations: Recommendation[];
  }

  async function ReverseGeocoding(lng: number, lat: number): Promise<string> {
    const appKey = "jej3T0nAxd2uWgcHlRn3n7p8Kd7hDAWLHtvIkHEg";
    const url = `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&format=json&callback=result&addressType=A03&lon=${lng}&lat=${lat}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          appKey: appKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.addressInfo.fullAddress; // 풀 주소를 반환
    } catch (error) {
      console.error("Error fetching the address:", error);
      return ""; // 에러 발생 시 빈 문자열 반환
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://43.202.89.97:52678/list/${planIdValue}`
      );
      const data = await response.json();
      setArray(data);
      setLoading(false); // 데이터 받아오면 로딩 상태 변경
    }
    fetchData();
  }, [planIdValue]);

  useEffect(() => {
    async function GetAddress() {
      if (array && array.source) {
        const sourceaddress = await ReverseGeocoding(
          array.source.longitude,
          array.source.latitude
        );

        const destinationaddress = await ReverseGeocoding(
          array.destination.longitude,
          array.destination.latitude
        );

        setSource(sourceaddress);
        setDestination(destinationaddress);

        setContents(
          array.recommendations.map((recommendation, index) => (
            <Group key={index}>
              <React.Fragment>
                <Image
                  src="/images/UI_image/information_bar_2.png"
                  alt="Information Bar"
                  width={13}
                  height={96}
                />
                <Stack>
                  <Group>
                    <button className="bg-[#FFF2F2] text-sm font-semibold rounded-xl px-2">
                      {recommendation.mainCategory}
                    </button>
                    <button className="bg-[#E3F0F4] text-sm font-semibold rounded-xl px-2">
                      {recommendation.subCategory}
                    </button>
                  </Group>

                  <div>
                    <span className="text-md font-bold">
                      {recommendation.name}
                    </span>
                  </div>
                </Stack>
              </React.Fragment>
            </Group>
          ))
        );
      }
    }
    GetAddress();
  }, [array]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {MapClick ? (
            array && (
              <Map locations={array} onbuttonclickhandler={onclickhandler} />
            )
          ) : (
            <>
              <div className="h-screen relative">
                <Group className="flex text-center mt-2">
                  <Link href="/main" className="absolute left-0">
                    <button>
                      <Image
                        src="/images/prev.svg"
                        alt="prev"
                        width={15}
                        height={15}
                      />
                    </button>
                  </Link>
                  <p className="text-2xl mx-auto font-semibold">일정 등록</p>
                  <Link href="/main" className="absolute right-0">
                    <button>
                      <Image
                        src="/images/close.svg"
                        alt="close"
                        width={15}
                        height={15}
                      />
                    </button>
                  </Link>
                </Group>

                <Stack className="flex flex-col items-center w-full">
                  <div className="gap-7 mt-12"></div>

                  <Stack className="flex flex-col gap-4">
                    <div className="overflow-y-auto h-[calc(100% - 5rem)] pb-20">
                      <Group>
                        <span className="font-semibold">
                          {shortaddress.source} {shortaddress.destination}
                        </span>
                      </Group>
                      <div className="date_departure_destination">
                        <Stack>
                          <Group>
                            <Image
                              src="/images/UI_image/information_bar.png"
                              alt="Information Bar"
                              width={13}
                              height={96}
                            ></Image>
                            <p className="text-md font-bold">출발지</p>
                            {source}
                          </Group>
                          {contents}
                          <Group>
                            <Image
                              src="/images/UI_image/information_bar.png"
                              alt="Information Bar"
                              width={13}
                              height={96}
                            ></Image>
                            <p className="text-md font-bold">도착지</p>
                            {destination}
                          </Group>
                        </Stack>
                      </div>
                    </div>
                  </Stack>
                  <div className="fixed bottom-0 left-0 w-full">
                    <button
                      onClick={onclickhandler}
                      className="bg-[#2C7488] text-white w-full h-16"
                    >
                      <img
                        src="/images/UI_image/pathsearch.png"
                        alt="Pathsearch"
                        className="pathsearch"
                      />
                      경로 탐색
                    </button>
                  </div>
                </Stack>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default List;
