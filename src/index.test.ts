import { Dateline } from './index';

const DATE_NATIVE_METHODS = [
   'toString',
   'toDateString',
   'toTimeString',
   'toLocaleString',
   'toLocaleDateString',
   'toLocaleTimeString',
   'valueOf',
   'getTime',
   'getFullYear',
   'getUTCFullYear',
   'getMonth',
   'getUTCMonth',
   'getDate',
   'getUTCDate',
   'getDay',
   'getUTCDay',
   'getHours',
   'getUTCHours',
   'getMinutes',
   'getUTCMinutes',
   'getSeconds',
   'getUTCSeconds',
   'getMilliseconds',
   'getUTCMilliseconds',
   'getTimezoneOffset',
   'toUTCString',
   'toISOString',
   'toJSON',
];

function callFunction(obj: any, name: string) {
  return obj[name]();
}

function testNativeMethod(methodName: string) {
  const dateObj = new Date();
  const datelineObj = Dateline(dateObj);

  test(`calls through to Date-native ${methodName}`, () => {
    expect(
      callFunction(datelineObj, methodName)
    ).toBe(
      callFunction(dateObj, methodName)
    )
  })
}

describe('Dateline', () => {
  describe('constructor', () => {
    describe('native methods', () => {
      DATE_NATIVE_METHODS.forEach(methodName => testNativeMethod(methodName))
    })
  })
});