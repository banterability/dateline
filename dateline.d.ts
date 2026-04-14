export interface APTimeOptions {
  includeMinutesAtTopOfHour?: boolean;
  suppressAmPm?: boolean;
  /** @deprecated Use `includeMinutesAtTopOfHour`. Will be removed in v5. */
  includeMinutes?: boolean;
}

export interface APDateOptions {
  includeYear?: boolean;
  useDayNameWithinWeek?: boolean;
  /** @deprecated Use `useDayNameWithinWeek`. Will be removed in v5. */
  useDayNameForLastWeek?: boolean;
}

export interface DatelineDate extends Date {
  getAPTime(options?: APTimeOptions): string;
  getAPDate(options?: APDateOptions): string;
}

declare function Dateline(dateObj?: Date): DatelineDate;

export default Dateline;
