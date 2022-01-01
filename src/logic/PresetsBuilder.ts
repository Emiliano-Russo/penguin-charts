import { allMonths, maxDaysInAMonth, hoursInADay } from "../rawData/Calendar";
import { dateType, userData, Date } from "../models/Types";
import { MakeDataSets } from "./Computation";
import { dictionary } from "../models/Discord_ID_Name";

const getDateType = (date: string) => {
  const amount = date.split("-").length - 1;
  return amount == 0
    ? dateType.Year
    : amount == 1
    ? dateType.Month
    : dateType.Day;
};

export const setLabel = (date: string) => {
  const type: dateType = getDateType(date);
  return type === dateType.Year
    ? allMonths
    : type === dateType.Month
    ? maxDaysInAMonth
    : hoursInADay;
};

function transformDate(date: string): Date {
  const dateArr = date.split("-");
  const obj = {
    Day: dateArr[2] ? dateArr[2] : "0",
    Month: dateArr[1] ? dateArr[1] : "0",
    Year: dateArr[0],
  };
  return obj;
}

function getUserDataFiltered(usersIncluded: string[]) {
  const dataString = window.localStorage.getItem("data");
  const x = dataString === null ? "" : dataString;
  const data = JSON.parse(x);
  const users = data.Usuarios;
  for (const property in users) {
    if (usersIncluded.includes(property) === false) delete users[property];
  }
  return users;
}

function transformLabels(dataset: any) {
  for (let i = 0; i < dataset.length; i++) {
    const element = dataset[i];
    if (element.label) element.label = dictionary[element.label];
  }
}

function MakeDataSet_Layer(date: Date, info: any): userData[] {
  return MakeDataSets(date, info);
}

export function setData(userList: string[], date: string): userData[] {
  const formattedDate: Date = transformDate(date);
  const info = getUserDataFiltered(userList);
  const dataSets = MakeDataSet_Layer(formattedDate, info);
  transformLabels(dataSets);
  return dataSets;
}
