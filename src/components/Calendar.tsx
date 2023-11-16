import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const days = ["S", "M", "T", "W", "T", "F", "S"];

type CalendarProps = {
  onSelectDate: (selectedDate: {
    year: number;
    month: number;
    day: number;
  }) => void;
};

export default function Calendar({ onSelectDate }: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null); // 새로운 상태
  const [date, setDate] = useState(new Date());
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const firstDayName = firstDay.getDay();
  const lastDayName = lastDay.getDay();

  const daysInMonth = lastDay.getDate();

  const cells = firstDayName + daysInMonth + (6 - lastDayName);

  let datesArray = Array(cells).fill(null);

  for (let i = firstDayName; i < firstDayName + daysInMonth; i++) {
    datesArray[i] = i - firstDayName + 1;
  }

  const handleSelectDate = (day: number) => {
    const selectedDate = { year, month: month + 1, day };
    onSelectDate(selectedDate);
    setSelectedDay(day);
  };

  const handlePrevMonth = () => {
    setSelectedDate(null);
    setDate(new Date(year, month - 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(null);
    setDate(new Date(year, month + 1));
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-none shadow-none w-100 h-auto mt-12">
      <div className="flex items-center justify-between w-full mb-2">
        <button className="px-2 py-1" onClick={handlePrevMonth}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="text-lg font-medium">
          {year}년 {month + 1}월
        </div>
        <button className="px-2 py-1" onClick={handleNextMonth}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <div
            key={day}
            className={`text-center font-medium ${
              day === "S"
                ? index === 0
                  ? "text-red-500"
                  : "text-blue-500"
                : ""
            }`}
          >
            {day}
          </div>
        ))}
        {datesArray.map((day, i) => (
          <div
            key={i}
            className={`p-1 flex items-center justify-center cursor-pointer 
          ${
            day
              ? selectedDay === day // selectedDay 상태를 사용해서 배경색 변경
                ? "bg-slate-400 text-white rounded-full"
                : "hover:bg-gray-100"
              : "" // day가 null인 경우는 스타일 적용 X
          }`}
            onClick={() => day && handleSelectDate(day)} // day가 null인 경우는 클릭 불가능
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
