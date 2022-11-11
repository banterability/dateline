import {getDayName, getMonthName, showYear, useDayName} from "./date";
import {formatHours, formatMinutes, showMinutes} from "./time";

interface DatelineOptions {
  alwaysIncludeMinutes?: boolean;
  alwaysShowYear?: boolean;
  useDayNameForLastWeek?: boolean;
}

class DatelineObj extends Date {
  private options: DatelineOptions;

  constructor(args: string | number | Date, options?: DatelineOptions) {
    super(args)
    this.options = options || {};
  };

  public toAPDate() {
    const month = this.getMonth();
    const date = this.getDate();
    const year = this.getFullYear();
    
    const monthName = getMonthName(month);

    if (useDayName(this, this.options)) {
      return getDayName(this);
    } else if (showYear(year, this.options)) {
      return monthName + " " + date;
    } else {
      return monthName + " " + date + ", " + year;
    }
  }

  public toAPTime() {
    const hours = this.getHours();
    const minutes = this.getMinutes();

    // Special cases: "midnight" and "noon"
    if (hours === 0 && minutes === 0) {
      return "midnight";
    } else if (hours === 12 && minutes === 0) {
      return "noon";
    }

    const timeOfDay = hours < 12 ? "a.m." : "p.m.";

    const hour = formatHours(hours);

    // Don't show minutes at the top of the hour by default
    if (showMinutes(minutes, this.options)) {
      return hour + " " + timeOfDay;
    }

    const minute = formatMinutes(minutes);

    return `${hour}:${minute} ${timeOfDay}`;
  }
}

export function Dateline(dateObj?: Date): DatelineObj {
  if (dateObj === undefined) {
    dateObj = new Date();
  }

  return new DatelineObj(dateObj);
}