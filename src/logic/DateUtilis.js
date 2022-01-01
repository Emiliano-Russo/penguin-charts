export function GetHour(Time) {
  var text = Time.split(":")[0];
  return parseInt(text, 10);
}

export function GetMinutes(Time) {
  var text = Time.split(":")[1];
  return parseInt(text, 10);
}

export function GetYear(date) {
  var result = date.split("/")[2];
  return result;
}

export function GetMonth(date) {
  var result = date.split("/")[1];
  return result;
}

export function GetDepthInDate(Date) {
  if (Date.Day != null && Date.Day != 0) {
    return "day";
  } else if (Date.Month != null && Date.Month != 0) {
    return "month";
  } else if (Date.Year != null && Date.Year != 0) {
    return "year";
  }
}

export function DoesDateFit(Item, Date) {
  const arrDate = Item.Date.split("/");
  const year = arrDate[2];
  const month = arrDate[1];
  const day = arrDate[0];
  const booleanExpresion =
    Date.Year == year &&
    (Date.Month == "0" || Date.Month == month) &&
    (Date.Day == null || Date.Day == "0" || Date.Day == day);
  if (booleanExpresion) return true;
  return false;
}

export function FilterByDateRange(userEventHistory, Date) {
  var obj = {};
  for (let key in userEventHistory) {
    const eventItem = userEventHistory[key];
    if (DoesDateFit(eventItem, Date)) obj[key] = userEventHistory[key];
  }
  return obj;
}
