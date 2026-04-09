export interface APTimeOptions {
  includeMinutes?: boolean;
}

export interface APDateOptions {
  includeYear?: boolean;
  useDayNameForLastWeek?: boolean;
}

export interface DatelineDate extends Date {
  getAPTime(options?: APTimeOptions): string;
  getAPDate(options?: APDateOptions): string;
}

declare function Dateline(dateObj?: Date): DatelineDate;

export default Dateline;
