# Dateline

[Associated Press style](http://en.wikipedia.org/wiki/AP_Stylebook) date & times

[![Latest Version](https://img.shields.io/npm/v/dateline.svg)](https://www.npmjs.com/package/dateline)
[![Build status](https://img.shields.io/github/actions/workflow/status/banterability/dateline/ci.yml?branch=main)](https://github.com/banterability/dateline/actions/workflows/ci.yml)

## Installation

```bash
$ npm install dateline
```

### In the browser

Works via `<script type="module">` or any bundler that supports ES modules.

### On the server

```js
import Dateline from 'dateline';
```

## Usage

Pass in a [JavaScript Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date), get a wrapped `Dateline` object back:

```js
const newYears = Dateline(new Date(2014, 0, 1, 0, 0));

// Any valid date will do
const moonWalk = Dateline(new Date(-14159040000));

// Defaults to the current date/time
const now = Dateline();
```

Call through to [native date methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Date_instances) to your heart's content:

```js
moonWalk.getFullYear();
// -> 1969
```

Dateline adds two methods to the mix:

**`#getAPTime()`** returns an AP-style time string:

```js
newYears.getAPTime();
// -> 'midnight'

moonWalk.getAPTime();
// -> '9:56 p.m.'
```

Available options:
- `includeMinutes`: Always include minutes, even at the top of the hour:

```js
// The current time is 11:00 a.m....

Dateline().getAPTime();
// -> '11 a.m.'

Dateline().getAPTime({includeMinutes: true});
// -> '11:00 a.m.'
```

**`#getAPDate(options)`** returns an AP-style date string:

```js
newYears.getAPDate();
// -> 'Jan. 1'

moonWalk.getAPDate();
// -> 'July 20, 1969'
```

Available options:
- `includeYear`: Always include the year, even if it matches the current one:

```js
// Today is August 28, 2014...

Dateline().getAPDate();
// -> 'Aug. 28'

Dateline().getAPDate({includeYear: true});
// -> 'Aug. 28, 2014'
```

- `useDayNameForLastWeek`: Use the day of the week for dates in the last seven days:

```js
// Today is June 22, 2009

var myDate = new Date(2009, 5, 20);

Dateline(myDate).getAPDate();
// -> 'June 20'

Dateline(myDate).getAPDate({useDayNameForLastWeek: true});
// -> 'Saturday'
```
