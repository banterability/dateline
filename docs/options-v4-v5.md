# Updated options in v4 & v5

Dateline occasionally replaces options with better-named or corrected alternatives. This doc lists the changes and how to migrate. Runtime deprecation warnings link here.

## `includeMinutes` → `includeMinutesAtTopOfHour`

Status: deprecated in v4, removed in v5.

### Why

Two problems with `includeMinutes`:

1. The name oversells its scope. It only affects rendering at the top of the hour. Mid-hour minutes always render regardless of the option.
2. `{includeMinutes: false}` does **not** behave as a boolean "off." At the top of the hour it forces `:00` on — the same result as `{includeMinutes: true}`. Only omitting the option (or passing `undefined` / `null`) triggers the AP default.

The bug is being left in place rather than fixed, to avoid silently changing behavior for anyone passing `false` deliberately. The replacement option is a clean break.

### Migrate

```js
// before
Dateline(date).getAPTime({includeMinutes: true});

// after
Dateline(date).getAPTime({includeMinutesAtTopOfHour: true});
```

`includeMinutesAtTopOfHour` behaves as a normal boolean:

- truthy → render `:00` at the top of the hour (`"7:00 a.m."`).
- falsy or omitted → suppress `:00` at the top of the hour (`"7 a.m."`, the AP default).

Mid-hour renderings are unaffected either way. `midnight` and `noon` are also unaffected — those literals always win.

## `useDayNameForLastWeek` → `useDayNameWithinWeek`

Status: deprecated in v4, removed in v5.

### Why

Two problems with `useDayNameForLastWeek`:

1. The name scopes to the past, but AP style uses weekday names in both directions — within seven days before or after the current date.
2. `{useDayNameForLastWeek: false}` does **not** behave as a boolean "off." For any date within the last seven days it still renders the weekday name — the same result as `{useDayNameForLastWeek: true}`. Only omitting the option (or passing `undefined` / `null`) triggers the default.

The bug is being left in place rather than fixed, to avoid silently changing behavior for anyone passing `false` deliberately. The replacement option is a clean break and covers the full AP-compliant window.

### Migrate

```js
// before
Dateline(date).getAPDate({useDayNameForLastWeek: true});

// after
Dateline(date).getAPDate({useDayNameWithinWeek: true});
```

`useDayNameWithinWeek` behaves as a normal boolean:

- truthy → render the weekday name when the date is within a week of today, in either direction (today inclusive, the ±7-day boundaries excluded).
- falsy or omitted → render the date normally.
