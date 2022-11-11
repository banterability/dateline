import timekeeper = require("timekeeper");
import {showYear, getDayName, getMonthName} from "./date";

describe("date helpers", () => {
  describe("showYear", () => {
    beforeEach(() => {
      timekeeper.freeze(new Date(2022, 10, 10));
    });
    afterEach(() => {
      timekeeper.reset();
    });

    describe('when "alwaysShowYear" is undefined', () => {
      test("returns false for the current year", () => {
        expect(showYear(2022)).toBe(false);
      });
      test("returns true at all other times", () => {
        expect(showYear(2021)).toBe(true);
        expect(showYear(2023)).toBe(true);
      });
    });
    describe('when "alwaysShowYear" is false', () => {
      test("returns false for the current year", () => {
        expect(showYear(2022, {alwaysShowYear: false})).toBe(false);
      });
      test("returns true at all other times", () => {
        expect(showYear(2021, {alwaysShowYear: false})).toBe(true);
        expect(showYear(2023, {alwaysShowYear: false})).toBe(true);
      });
    });
    describe('when "alwaysShowYear" is true', () => {
      test("returns true at all times", () => {
        expect(showYear(2022, {alwaysShowYear: true})).toBe(true);
        expect(showYear(2021, {alwaysShowYear: true})).toBe(true);
        expect(showYear(2023, {alwaysShowYear: true})).toBe(true);
      });
    });
  });
  describe("getDayName", () => {
    test('returns "Monday" for 0', () => {
      expect(getDayName(new Date(2022, 10, 7))).toBe("Monday");
    });
    test('returns "Tuesday" for 1', () => {
      expect(getDayName(new Date(2022, 10, 8))).toBe("Tuesday");
    });
    test('returns "Wednesday" for 2', () => {
      expect(getDayName(new Date(2022, 10, 9))).toBe("Wednesday");
    });
    test('returns "Thursday" for 3', () => {
      expect(getDayName(new Date(2022, 10, 10))).toBe("Thursday");
    });
    test('returns "Friday" for 4', () => {
      expect(getDayName(new Date(2022, 10, 11))).toBe("Friday");
    });
    test('returns "Saturday" for 5', () => {
      expect(getDayName(new Date(2022, 10, 12))).toBe("Saturday");
    });
    test('returns "Sunday" for 6', () => {
      expect(getDayName(new Date(2022, 10, 13))).toBe("Sunday");
    });
  });

  describe("getMonthName", () => {
    test('returns "Jan." for 0', () => {
      expect(getMonthName(0)).toBe("Jan.");
    });
    test('returns "Feb." for 1', () => {
      expect(getMonthName(1)).toBe("Feb.");
    });
    test('returns "March" for 2', () => {
      expect(getMonthName(2)).toBe("March");
    });
    test('returns "April" for 3', () => {
      expect(getMonthName(3)).toBe("April");
    });
    test('returns "May" for 4', () => {
      expect(getMonthName(4)).toBe("May");
    });
    test('returns "June" for 5', () => {
      expect(getMonthName(5)).toBe("June");
    });
    test('returns "July" for 6', () => {
      expect(getMonthName(6)).toBe("July");
    });
    test('returns "Aug." for 7', () => {
      expect(getMonthName(7)).toBe("Aug.");
    });
    test('returns "Sept." for 8', () => {
      expect(getMonthName(8)).toBe("Sept.");
    });
    test('returns "Oct." for 9', () => {
      expect(getMonthName(9)).toBe("Oct.");
    });
    test('returns "Nov." for 10', () => {
      expect(getMonthName(10)).toBe("Nov.");
    });
    test('returns "Dec." for 11', () => {
      expect(getMonthName(11)).toBe("Dec.");
    });
  });

  // describe('useDayName', () => { })
  // describe('withinSevenDays', () => {})
});

// export function useDayName(dateObj: Date, options?: UseDayNameOptions) {
//   return options?.useDayNameForLastWeek != null && withinSevenDays(dateObj);
// }

// export function withinSevenDays(dateObj: Date) {
//   var diffInDays = (dateObj - new Date()) / ONE_DAY_IN_MS;
//   return -7 < diffInDays && diffInDays < 0;
// }
