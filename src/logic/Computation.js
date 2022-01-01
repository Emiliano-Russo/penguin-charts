import {
  GetHour,
  GetMinutes,
  GetYear,
  GetMonth,
  GetDepthInDate,
  DoesDateFit,
  FilterByDateRange,
} from "./DateUtilis";

/*
Date: {day,month,year} AND REMEMBER "0" == undefined or not selected field
Info: Users:{
        UserId:{
          EventId:...
          EventId:{
            Date: "28/12/2020"
            Direction: "Enter"
            Time: "20:54:51"
            Voice: "Active"
          }
          EventId:...
    }
}
*/
export function MakeDataSets(Date, Info) {
  let arrOfDataSets = [];
  for (let key in Info) {
    //each key is a function call (MakeDataSet)
    const userEventHistory = Info[key];
    const User_obj = NewObject_SubKey_and_Data(key, userEventHistory);
    const DataSet = MakeDataSet(User_obj, Date);
    arrOfDataSets.push(DataSet);
  }
  return arrOfDataSets;
}

export function MakeDataSet(UserHistory, Date) {
  const userId = Object.keys(UserHistory)[0];
  let userEventHistory = UserHistory[userId];
  userEventHistory = FilterByDateRange(userEventHistory, Date); // Filters unnecesary events items
  const obj = NewObject_SubKey_and_Data(userId, userEventHistory);
  return CreateDataSet(obj, getRandomColor(), Date);
}

//Function Not belong here
function NewObject_SubKey_and_Data(SubKey, Data) {
  let obj = {};
  obj[SubKey] = Data;
  return obj;
}

//Function Not belong here
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function CreateDataSet(UserObj, Color, Date) {
  const lbl = Object.keys(UserObj)[0];
  const data = BuildData(UserObj, Date);
  return {
    label: lbl,
    data: data,
    backgroundColor: Color,
  };
}
export function BuildData(UserObj, Date) {
  //Magic Happends Here
  const userHistory = UserObj[Object.keys(UserObj)[0]];
  const depthDate = GetDepthInDate(Date); // "day","month","year"
  switch (depthDate) {
    case "day":
      return BuildDayData(userHistory);
    case "month":
      return BuildMonthData(userHistory);
    case "year":
      return BuildYearData(userHistory);
    default:
      break;
  }
}

export function BuildDayData(userHistory) {
  let Enter = null;
  let Leave = null;
  let HourlyArray = [];
  HourlyArray = FillArrayWithZeros(HourlyArray, 0, 23);
  if (Object.keys(userHistory).length === 0) return HourlyArray;
  for (let key in userHistory) {
    const eventItem = userHistory[key];
    if (eventItem.Direction === "Enter") Enter = eventItem;
    if (eventItem.Direction === "Leave") {
      Leave = eventItem;
      HourlyArray = DeployHourlyTimeInArray(CheckEnterObj(Enter), Leave, {
        HourlyArray,
      });
      Enter = null;
      Leave = null;
    }
  }
  if (Enter != null && Leave == null) {
    HourlyArray = DeployHourlyTimeInArray(
      Enter,
      { Time: "23:59:59" },
      { HourlyArray }
    );
  }
  return HourlyArray;
}

function CheckEnterObj(Enter) {
  if (Enter == null) return { Time: "0:0:0" };
  else return Enter;
}

export function DeployHourlyTimeInArray(Enter, Leave, objHourly) {
  const EnterHour = GetHour(Enter.Time);
  const EnterMinutes = GetMinutes(Enter.Time);
  const LeaveHour = GetHour(Leave.Time);
  const LeaveMinutes = GetMinutes(Leave.Time);
  const HourDiff = LeaveHour - EnterHour;
  if (HourDiff == 0)
    objHourly.HourlyArray[EnterHour] += LeaveMinutes - EnterMinutes;
  else {
    objHourly.HourlyArray[EnterHour] += 60 - EnterMinutes;
    for (let i = EnterHour + 1; i <= EnterHour + HourDiff; i++) {
      if (i != EnterHour + HourDiff) objHourly.HourlyArray[i] += 60;
      else objHourly.HourlyArray[i] += LeaveMinutes;
    }
  }
  return objHourly.HourlyArray;
}

export function BuildMonthData(userHistory) {
  let daysArr = [];
  if (Object.keys(userHistory).length === 0) return daysArr;
  daysArr = FillArrayWithZeros(daysArr, 0, 30);
  let DateObj = {
    Year: GetYear(userHistory[Object.keys(userHistory)[0]].Date),
    Month: GetMonth(userHistory[Object.keys(userHistory)[0]].Date),
    Day: null,
  };
  for (let i = 0; i <= 30; i++) {
    DateObj.Day = i + 1;
    const eventsOfASpecficDay = FilterByDateRange(userHistory, DateObj);
    const arrHourly = BuildDayData(eventsOfASpecficDay); // you get something like this [60,60,30,0,0...] 24hrs
    daysArr[i] = SumAllArray(arrHourly); // return the events of that specific day
  }
  return daysArr;
}

export function BuildYearData(userHistory) {
  let monthArr = [];
  if (Object.keys(userHistory).length === 0) return monthArr;
  for (let i = 0; i <= 11; i++) monthArr[i] = 0;
  let DateObj = {
    Year: GetYear(userHistory[Object.keys(userHistory)[0]].Date),
    Month: 0,
    Day: null,
  };
  for (let i = 0; i <= 11; i++) {
    DateObj.Month = i + 1;
    const eventsOfASpecficDay = FilterByDateRange(userHistory, DateObj);
    const arrMonthly = BuildMonthData(eventsOfASpecficDay);
    monthArr[i] = SumAllArray(arrMonthly);
  }
  return monthArr;
}

//General Utilis

function SumAllArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    const number = arr[i];
    total += number;
  }
  return total;
}

function FillArrayWithZeros(array, start, end) {
  if (start < 0 || end < 0 || start > end)
    throw "Bad Parameters on Fill Array With Zeros";
  for (let i = start; i <= end; i++) array[i] = 0;
  return array;
}
