export default function prettyDate(date: Date) {
  let string =
    getDay(new Date(date).getDate()) +
    "/" +
    getMonth(new Date(date).getMonth()) +
    "/" +
    new Date(date).getFullYear();
  return string;
}

function getDay(day: number) {
  if (day < 10) {
    return "0" + day;
  }
  return day;
}

function getMonth(index: number) {
  let month: string | number = index + 1;

  if (index < 10) {
    month = "0" + month;
  }
  return month;
}
