2.2.0
-----
* Performance tweaks
* Use 'prettier' for formatting
* CI & dependency updates

2.1.1
-----
* CI & dependency updates

2.1.0
-----
* Switched from CoffeeScript to plain JavaScript. While there should be no breaking changes, bumping the version out of an abundance of caution.
* Added an in-browser (`phantomjs`) test suite

2.0.0
-----
* Expose `Dateline` object globally outside a Node-like environment
* Internal naming changes (potentially breaking for undocumented implementations)
  - File changed from 'index' to 'dateline'
  - Module name changed from 'Deadline' to 'Dateline' internally

1.2.0
-----
* Add `useDayNameForLastWeek` option to use day name (ie: 'Friday') for dates in the last week.

1.1.0
-----
* Add `includeMinutes` option to `#getAPTime` to include minutes at the top of the hour.
* Add test coverage around native methods

1.0.1
-----
* Documentation fixes

1.0.0
-----
* Initial public release of renamed library (deadine -> dateline)
