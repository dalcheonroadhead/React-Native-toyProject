import dayjs from "dayjs";
import { getStatusBarHeight, getBottomSpace } from "react-native-iphone-x-helper";

export const statusBarHeight = getStatusBarHeight(true);
export const bottomSpace = getBottomSpace();
export const ITEM_WIDTH = 240; 

// 달력에 빈 부분은 전원이나 내월의 날짜를 조금씩  포함한다. 
// 그걸 나타내주기 위한 함수, 딱 해당 월 날짜만 받아서, 시작 날짜, 끝 날짜로 앞 뒤 채워줌 
export const fillEmptyColumns = (columns, start, end) => {
  const filledColumns = columns.slice(0); 
  // slice는 부분 복사인데 (시작 인자, 복사할 끝인자) 혹은 (시작인자)로 적는다. 이건 두 번째 경우로 처음부터 끝까지 복사해 넣겠다는 소리이다.

  // 1. 첫날 이전 공백 채우기
  const startDay = dayjs(start).get("day"); // 시작 날짜의 요일만큼 뒷 공백이 필요함 일: 0~ 토: 6으로 day.js가 계산함을 잊지 말자 
  for (let i = 1; i <= startDay; i += 1) {
    const date = dayjs(start).subtract(i, "day");
    filledColumns.unshift(date);
  }
  // ["10.30","10.31","11.1",... "11.31"]

  // 2. 마지막날 이후 공백 채우기
  const endDay = dayjs(end).get("day");
  /**
    0 -> 6 // 마지막 날이 일요일이면 뒤로 6개를 채워야 한다.
    1 -> 5 // 마지막 날이 월요일이면 뒤로 5개를 채워야 한다.
    2 -> 4 // 마지막 날이 화요일이면 뒤로 4개를 채워야 한다.
    endDay + ? = 6
   */
  for (let i = 1; i <= 6 - endDay; i += 1) { // 마지막 날이 화요일이면, 맨 막줄이 일월화 3개 적히고 4칸 빈 거임 6-2(화요일의 숫자값)=4
    const date = dayjs(end).add(i, "day");
    filledColumns.push(date);
  }

  return filledColumns;
};



// 딴 파일에서 import될 최종본
// now를 선언하지 않았는데 왜 돌아갈까? 
// now를 선언하지 않은 것이 맞다. 근데 그냥 dayjs()에 파라미터 안 넣은 경우, dayjs()는 최신 날짜를 반환한다.
// 이걸 이용한 것이다. 그냥 now 다 지워버려도 동작한다.
export const getCalendarColumns = (now) => { // now는 무조건 현재 시각이 들어감. 
  const start = dayjs(now).startOf("month"); // 11.1
  const end = dayjs(now).endOf("month");     // 11.30
  const endDate = dayjs(end).get("date");    // end는 위에서 나온 걸로 11월 30일이 들어갔고 여기서 우리는 30만 쓴다. -> 달의 length 

  const columns = [];
  for (let i = 0; i < endDate; i += 1) {
    const date = dayjs(start).add(i, "day"); // start날짜에서 일 단위로 i만큼 더한다. 11월 1일에서 11월 (i+1)일로 
    columns.push(date); // 해당 값을 배열에 넣는다. 
  }

  // console.log('columns 3월', columns);

  const filledColumns = fillEmptyColumns(columns, start, end);
  // console.log('columns 최종', filledColumns);
  return filledColumns;
};

  /**
   * @param day라는 param이 오면 0 ~ 6 까지가 오는데
   * @return 일~ 월 이라는 text로 바꿔줄 것이다.
   */

const dayTexts = ["일", "월", "화", "수", "목", "금", "토"]

export const getDayText = (day) => {

  /* Ex 1 요일 배열을 만들고 day가 0~6까지의 인덱스 이므로 이를 이용해 원하는 값을 찾아가도록 하는 것*/
  return dayTexts[day];


  /* Ex 2  Switch 구문 이용 */
  // switch (day) {
  //   case 0: return '일';
  //   case 1: return '월';
  //   case 2: return '화';
  //   case 3: return '수';
  //   case 4: return '목';
  //   case 5: return '금';
  //   case 6: return '토';
  //   default: return ''; 
  // }
}

export const getDayColor = (day) => {

  /* Ex 1  삼항 연산자 이용*/
  return (day === 0)? "#e67639" : (day === 6)? "#5872d1" : "#2b2b2b" ;


  /*Ex 2 Switch문 이용*/
  // switch (day) {
  //   case 0: return 'e67639';
  //   case 6: return '#5872d1';
  //   default: return '#2b2b2b';
  // }
}
