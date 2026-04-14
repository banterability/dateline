# Dateline

[Associated Press style](http://en.wikipedia.org/wiki/AP_Stylebook) date & times

[![Latest Version](https://img.shields.io/npm/v/dateline.svg)](https://www.npmjs.com/package/dateline)
[![Build status](https://img.shields.io/github/actions/workflow/status/banterability/dateline/ci.yml?branch=main)](https://github.com/banterability/dateline/actions/workflows/ci.yml)
[![install size](https://packagephobia.com/badge?p=dateline)](https://packagephobia.com/result?p=dateline)

## Installation

```bash
$ npm install dateline
```

### In the browser

Works via `<script type="module">` or any bundler that supports ES modules.

### On the server

```js
import Dateline from "dateline";
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

- `includeMinutesAtTopOfHour`: Force `:00` at the top of the hour.

  AP style omits the `:00` when referencing a time that lands on the hour, so the default renders `"2 p.m."` rather than `"2:00 p.m."`. Pass `true` to opt into the padded form. Special times (`midnight` and `noon`) are unaffected.

```js
// The current time is 11:00 a.m....

Dateline().getAPTime();
// -> '11 a.m.'

Dateline().getAPTime({includeMinutesAtTopOfHour: true});
// -> '11:00 a.m.'
```

- `suppressAmPm`: Drop the trailing `a.m.` / `p.m.` suffix.

  AP style omits the meridiem on the opening endpoint of a range — e.g. `"7-8 p.m."`, not `"7 p.m.-8 p.m."` — so callers composing ranges need a way to render a bare time. `midnight` and `noon` are unaffected.

```js
let start = Dateline(new Date(2013, 7, 7, 19, 0));
let end = Dateline(new Date(2013, 7, 7, 20, 0));

start.getAPTime({suppressAmPm: true}) + "-" + end.getAPTime();
// -> '7-8 p.m.'

Dateline(new Date(2013, 7, 7, 19, 1)).getAPTime({suppressAmPm: true});
// -> '7:01'
```

**`#getAPDate(options)`** returns an AP-style date string:

```js
newYears.getAPDate();
// -> 'Jan. 1'

moonWalk.getAPDate();
// -> 'July 20, 1969'
```

Available options:

- `includeYear`: Force the year to be included or excluded.

  The default hides the year when it matches the current year, and shows it otherwise. Pass `true` to force the year on, or `false` to force it off — both override the default regardless of the date.

```js
// Today is August 28, 2014

Dateline().getAPDate();
// -> 'Aug. 28'

Dateline(new Date(2012, 7, 28)).getAPDate();
// -> 'Aug. 28, 2012'

Dateline().getAPDate({includeYear: true});
// -> 'Aug. 28, 2014'

Dateline(new Date(2012, 7, 28)).getAPDate({includeYear: false});
// -> 'Aug. 28'
```

- `useDayNameWithinWeek`: Use the day of the week for dates within seven days of today, in either direction.

  Per AP style, weekday names stand in for the date within a week of the current date. The fallback kicks in at exactly seven days out in either direction — those dates render normally.

```js
// Today is Monday, June 22, 2009

Dateline(new Date(2009, 5, 21)).getAPDate({useDayNameWithinWeek: true});
// -> 'Sunday'

Dateline(new Date(2009, 5, 22)).getAPDate({useDayNameWithinWeek: true});
// -> 'Monday'

Dateline(new Date(2009, 5, 23)).getAPDate({useDayNameWithinWeek: true});
// -> 'Tuesday'

Dateline(new Date(2009, 5, 29)).getAPDate({useDayNameWithinWeek: true});
// -> 'June 29'
```
