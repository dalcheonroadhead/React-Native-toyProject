import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const runPracticeDayjs = () => {
  // const now = dayjs("2022-11-04 16:01:30");
  // console.log("===== Practice Dayjs =====");
  // console.log(
  //   "1. set minute - hh",
  //   dayjs(now).set("minute", 5).format("YYYY.MM.DD hh:mm:ss a A")
  // );
  // console.log(
  //   "2. set minute - HH",
  //   dayjs(now).set("minute", 5).format("YYYY.MM.DD HH:mm:ss") //현재 분을 5분으로 바꿔라 , 시간 표기 형식을 다음과 같이 바꿔라 
  // );  //hh 소문자는 12시간제 대문자는 24시간제 a, A는 오전과 오후 
  // console.log(
  //   "3. set hour",
  //   dayjs(now).set("hour", 10).format("YYYY.MM.DD HH:mm:ss") // 시간을 10으로 바꾸겠다.
  // );
  // console.log("4. get year", dayjs(now).get("year"));
  // console.log("5. get month", dayjs(now).get("month")); // 0~11(1월~12월)
  // console.log("6. get date", dayjs(now).get("date"));
  // console.log("7. get day", dayjs(now).get("day")); // 0:일 ~ 6:토
  // console.log("8. get second", dayjs(now).get("second"));
  // console.log(
  //   "9. add hour",
  //   dayjs(now).add(3, "hour").format("YYYY.MM.DD HH:mm:ss") // 현재 시간에서 3시간 더해줘
  // );
  // console.log(
  //   "10. subtract hour",
  //   dayjs(now).subtract(3, "hour").format("YYYY.MM.DD HH:mm:ss") // 현재 시간에서 3시간 빼줘
  // );
  // console.log("11. startOf", dayjs(now).startOf("month").format("YYYY.MM.DD")); //달의 맨 처음 날짜를 가져와 달라
  // console.log("12. endOf", dayjs(now).endOf("month").format("YYYY.MM.DD")); // 달의 맨 끝 날짜를 가져와 달라
  
  // // 비교 (boolean)
  // const aDate = dayjs("2021-10-29 15:00:20");
  // const bDate = dayjs("2022-10-29 16:00:00");
  // console.log("13. isSame month", dayjs(aDate).isSame(bDate, "month")); // 달이 같은지 비교해줘
  // console.log("14. isSame hour", dayjs(aDate).isSame(bDate, "hour")); // 시가 같은지 비교해줘
  // console.log("15. isBefore", dayjs(aDate).isBefore(bDate)); // 비교 단위를 따로 안 적어주면  0.0001이라도 aDate가 빠르면 true가 된다.
  // console.log("16. isBefore date", dayjs(aDate).isBefore(bDate, "date"));
  // console.log("17. isAfter a,b", dayjs(aDate).isAfter(bDate));
  // console.log("18. isAfter b,a", dayjs(bDate).isAfter(aDate));
  // console.log("19. isSameOrBefore", dayjs(aDate).isSameOrBefore(bDate, "date"));
  // console.log("20. isSameOrAfter", dayjs(aDate).isSameOrAfter(bDate, "date"));
  
  // // 두 날짜 사이에 ()값이 존재하느냐 , 이것도 마찬가지로 비교단위 안적어주면, 밀리세컨드 까지 비교해서 해당 값들 사이에 있는지 check
  // console.log(
  //   "21. isBetween",
  //   dayjs("2022-10-29 15:30:00").isBetween(aDate, bDate)
  // );

  // //비교 단위를 적어주면 딱 그것만 가지고 비교 여기서는 앞에 년도가 3002년이든 2044년이든 상관 없이 딱 10월 29일만 가지고 비교
  // // ADate도 10월 29일이고, BDate도 10월 29일 이므로 해당 값은 false 
  // console.log(
  //   "22. isBetween date",
  //   dayjs("2022-10-29 15:30:00").isBetween(aDate, bDate, "date")
  // );

  // // 두 날짜의 차이를 구하는 함수 - 여기서는 분 단위로 차이를 나타낸다.
  // // 첫 번째꺼는 a에서 b 빼기, 두 번째꺼는 b에서 a 빼기
  // console.log("23. diff minute a,b", dayjs(aDate).diff(bDate, "minute"));
  // console.log("24. diff minute b,a", dayjs(bDate).diff(aDate, "minute"));

}