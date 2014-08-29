# Dateline

[Associated Press style](http://en.wikipedia.org/wiki/AP_Stylebook) style date & times for JavaScript & Node.js

[![Build Status](https://travis-ci.org/banterability/dateline.png)](https://travis-ci.org/banterability/dateline)

## Usage

Pass in a [JavaScript Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), get a wrapped `Dateline` object back:

```js
Dateline = require('dateline');

var newYears = Dateline(new Date(2014, 0, 1, 0, 0););

var moonWalk = Dateline(new Date(-14159040000));
```

Call through to native date methods to your heart's content:

```js
moonWalk.getFullYear();
// -> 1969
```

Dateline also adds new methods.

**`#getTime()`** returns an AP-style time string:

```js
newYears.getTime();
// -> 'midnight'

moonWalk.getTime();
// -> '9:56 p.m.'
```

**`#getDate()`** returns an AP-style date string:

```js
newYears.getDate();
// -> 'Jan. 1'

moonWalk.getDate();
// -> 'July 20, 1969'
```
