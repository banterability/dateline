# Updated options in v4 & v5

Two options have unclear names and unintuitive behavior. This document describes the issues and how to migrate.

In v4, both options emit a runtime warning pointing at this document.

In v5, both options are removed and have no effect when passed.

## ⚠️ `getAPTime » includeMinutes`

Status: deprecated in v4, removed in v5.

### Why

1. _Bug:_ `{includeMinutes: false}` doesn't behave as a boolean "off" and has the same result as passing `true`. Only omitting the option or passing `undefined` / `null` preserves the default behavior.
2. _Gotcha:_ The name oversells what it does. It only affects rendering at the top of the hour. Mid-hour minutes always render regardless of the option.

Rather than patch in place, the option has been replaced by `includeMinutesAtTopOfHour`, whose name better reflects what it does.

### Migrating to `getAPTime » includeMinutesAtTopOfHour`

Available beginning in v4.0.0.

```js
// It is 11:00 a.m.

// before
Dateline().getAPTime({includeMinutes: true});
// -> '11:00 a.m.'

// after
Dateline().getAPTime({includeMinutesAtTopOfHour: true});
// -> '11:00 a.m.'
```

`includeMinutesAtTopOfHour` behaves as a normal boolean:

- truthy → render `:00` at the top of the hour (`"7:00 a.m."`).
- falsy or omitted → suppress `:00` at the top of the hour (`"7 a.m."`, the AP default).

Mid-hour renderings (e.g. `7:01 a.m.`) are unaffected either way. `midnight` and `noon` are also unaffected.

## ⚠️ `getAPDate » useDayNameForLastWeek`

Status: deprecated in v4, removed in v5.

### Why

1. _Bug:_ `{useDayNameForLastWeek: false}` doesn't behave as a boolean "off" and has the same result as passing `true`. Only omitting the option or passing `undefined` / `null` preserves the default behavior.
2. _New behavior:_ `useDayNameWithinWeek` covers past and future dates within the window, matching AP style; the old option was past-only.

Rather than patch in place, the option has been replaced by `useDayNameWithinWeek`, whose name better reflects what it does.

### Migrating to `getAPDate » useDayNameWithinWeek`

Available beginning in v4.0.0.

```js
// Today is Tuesday, April 14, 2026
let yesterday = new Date(2026, 3, 13);
let tomorrow = new Date(2026, 3, 15);

// before
Dateline(yesterday).getAPDate({useDayNameForLastWeek: true});
// -> 'Monday'
Dateline(tomorrow).getAPDate({useDayNameForLastWeek: true});
// -> 'April 15'

// after
Dateline(yesterday).getAPDate({useDayNameWithinWeek: true});
// -> 'Monday'
Dateline(tomorrow).getAPDate({useDayNameWithinWeek: true});
// -> 'Wednesday'
```

`useDayNameWithinWeek` behaves as a normal boolean:

- truthy → render the weekday name when the date is within a week of today, in either direction (today inclusive, the ±7-day boundaries excluded).
- falsy or omitted → render the date normally.
