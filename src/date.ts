const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

var MONTH_NAMES = [
  "Jan.",
  "Feb.",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface ShowYearOptions {
  alwaysShowYear?: boolean;
}

interface UseDayNameOptions {
  useDayNameForLastWeek?: boolean;
}

export function showYear(year: number, options?: ShowYearOptions): boolean {
  if (options?.alwaysShowYear) {
    return true;
  } else {
    return year !== new Date().getFullYear();
  }
}

export function getDayName(dateObj: Date): string {
  return DAY_NAMES[dateObj.getDay()];
}

export function getMonthName(month: number): string {
  return MONTH_NAMES[month];
}

export function useDayName(dateObj: Date, options?: UseDayNameOptions) {
  return options?.useDayNameForLastWeek != null && withinSevenDays(dateObj);
}

function withinSevenDays(dateObj: Date) {
  return false;
  // FIXME: we care about seven calendar days, not a ms offset
  // var diffInDays = (dateObj - new Date()) / ONE_DAY_IN_MS;
  // return -7 < diffInDays && diffInDays < 0;
}
