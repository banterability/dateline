## 5.0.1

### Fixed

- `useDayNameWithinWeek` now measures its window against calendar days rather than counting out milliseconds. Previously the same target date could render as a weekday or a formatted date depending on the time of day when `getAPDate` was called. Technically a breaking change, but the old behavior was never intentional, so let's call it a bug fix.

## 5.0.0

### Breaking changes

- **Removed**: `includeMinutes` option on `getAPTime`. Deprecated in v4; replaced by `includeMinutesAtTopOfHour`. See [`docs/options-v4-v5.md`](docs/options-v4-v5.md) for the migration.

- **Removed**: `useDayNameForLastWeek` option on `getAPDate`. Deprecated in v4; replaced by `useDayNameWithinWeek`. See [`docs/options-v4-v5.md`](docs/options-v4-v5.md) for the migration.

## 4.0.0

### Breaking changes

- **Breaking change**: `{includeYear: false}` now hides the year in every case.

  Previously, passing `false` was not a reliable way to hide the year: it behaved the same as `true` for the current year, and was silently ignored for past or future years. The option is now a symmetric counterpart to `{includeYear: true}`.

  The default behavior when the option is not present is unchanged: hide the year when it matches the current year, and show it otherwise.

### Deprecations

- **Deprecated**: `includeMinutes` in favor of `includeMinutesAtTopOfHour`. Passing the old option emits a `console.warn`. The old option still works for now but will be removed in v5. See [`docs/options-v4-v5.md`](docs/options-v4-v5.md) for the migration.

- **Deprecated**: `useDayNameForLastWeek` in favor of `useDayNameWithinWeek`. Passing the old option emits a `console.warn`. The old option still works for now but will be removed in v5. See [`docs/options-v4-v5.md`](docs/options-v4-v5.md) for the migration.

### Added

- Added `suppressAmPm` option to `getAPTime`. Drops the trailing `a.m.` / `p.m.` suffix so callers can compose AP-style time ranges (e.g. `"7-8 p.m."`). `midnight` and `noon` literals are unaffected.

- Added `includeMinutesAtTopOfHour` option to `getAPTime`. Replaces `includeMinutes` with a name that reflects its actual scope — it only affects top-of-hour rendering — and fixes the `false`-acts-like-`true` bug in the old option.

- Added `useDayNameWithinWeek` option to `getAPDate`. Renders the weekday name for dates within a week of today in either direction, matching AP style.

## 3.1.0

- Ship TypeScript type definitions with the package

## 3.0.0

- **Breaking change**: Migrated from CJS to ESM
  - Node: Use `import Dateline from 'dateline'` instead of `require('dateline')`
  - Browser: Use `import` with `<script type="module">` or a bundler
- Require Node >= 12.22.0

## 2.2.4

- Dependency updates

## 2.2.3

- Dependency updates
- CI fixes

## 2.2.2

- Dependency updates

  2.2.1

---

- Exclude test & configuration files from distributed package
- Dependency updates

  2.2.0

---

- Performance tweaks
- Use 'prettier' for formatting
- CI & dependency updates

  2.1.1

---

- CI & dependency updates

  2.1.0

---

- Switched from CoffeeScript to plain JavaScript. While there should be no breaking changes, bumping the version out of an abundance of caution.
- Added an in-browser (`phantomjs`) test suite

  2.0.0

---

- Expose `Dateline` object globally outside a Node-like environment
- Internal naming changes (potentially breaking for undocumented implementations)
  - File changed from 'index' to 'dateline'
  - Module name changed from 'Deadline' to 'Dateline' internally

    1.2.0

---

- Add `useDayNameForLastWeek` option to use day name (ie: 'Friday') for dates in the last week.

  1.1.0

---

- Add `includeMinutes` option to `#getAPTime` to include minutes at the top of the hour.
- Add test coverage around native methods

  1.0.1

---

- Documentation fixes

  1.0.0

---

- Initial public release of renamed library (deadine -> dateline)
