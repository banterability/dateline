import {describe, it, expect, beforeAll, afterAll, vi} from "vitest";

import Dateline from "../dateline.js";

let NATIVE_METHODS = [
  "getDate",
  "getDay",
  "getFullYear",
  "getHours",
  "getMilliseconds",
  "getMinutes",
  "getMonth",
  "getSeconds",
  "getTime",
  "getTimezoneOffset",
  "getUTCDate",
  "getUTCDay",
  "getUTCFullYear",
  "getUTCHours",
  "getUTCMilliseconds",
  "getUTCMinutes",
  "getUTCMonth",
  "getUTCSeconds",
  "getYear",
];

function testNativeMethod(methodName) {
  let dateObj = new Date();
  let datelineObj = Dateline(dateObj);

  it("calls through to native #" + methodName, function () {
    expect(datelineObj[methodName]()).toBe(dateObj[methodName]());
  });
}

describe("constructor", function () {
  beforeAll(function () {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2013, 1, 1));
  });

  afterAll(function () {
    vi.useRealTimers();
  });

  describe("initialization", function () {
    it("accepts a passed date object", function () {
      let expected = new Date(2014, 7, 28, 22, 5);
      let actual = Dateline(expected);
      expect(actual.toDateString()).toBe(expected.toDateString());
    });

    it("defaults to the current date", function () {
      let expected = new Date();
      let actual = Dateline();
      expect(actual.toDateString()).toBe(expected.toDateString());
    });
  });

  describe("native methods", function () {
    NATIVE_METHODS.forEach(function (method) {
      testNativeMethod(method);
    });
  });
});
