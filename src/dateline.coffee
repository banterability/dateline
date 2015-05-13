Dateline = (dateObj = new Date()) ->

  dateObj.getAPTime = (options = {}) ->
    hours = dateObj.getHours()
    minutes = dateObj.getMinutes()

    # Special cases: "midnight" and "noon"
    return 'midnight' if hours == 0 and minutes == 0
    return 'noon' if hours == 12 and minutes == 0

    timeOfDay = if hours < 12 then 'a.m.' else 'p.m.'
    hour = formatHours(hours)

    # Don't show minutes at the top of the hour by default
    return "#{hour} #{timeOfDay}" if showMinutes minutes, options

    minute = formatMinutes(minutes)

    "#{hour}:#{minute} #{timeOfDay}"

  dateObj.getAPDate = (options = {}) ->
    month = dateObj.getMonth()
    date = dateObj.getDate()
    year = dateObj.getFullYear()

    monthName = monthNames[month]

    if useDayName dateObj, options
      getDayOfWeek dateObj
    else if showYear year, options
      "#{monthName} #{date}"
    else
      "#{monthName} #{date}, #{year}"

  dateObj

# Export for Node or browser
if module?.exports
  module.exports = Dateline
else
  this.Dateline = Dateline


################
# Time Helpers #
################

formatHours = (hours) ->
  return 12 if hours == 0
  return hours - 12 if hours > 12
  hours

topOfHour = (minutes) ->
  minutes == 0

formatMinutes = (minutes) ->
  return "0#{minutes}" if minutes < 10
  minutes

showMinutes = (minutes, options) ->
  topOfHour(minutes) && !options.includeMinutes?


################
# Date Helpers #
################

monthNames = [
  'Jan.'
  'Feb.'
  'March'
  'April'
  'May'
  'June'
  'July'
  'Aug.'
  'Sept.'
  'Oct.'
  'Nov.'
  'Dec.'
]

dayNames = [
  'Sunday'
  'Monday'
  'Tuesday'
  'Wednesday'
  'Thursday'
  'Friday'
  'Saturday'
]

showYear = (year, options) ->
  (year == new Date().getFullYear()) && !options.includeYear?

getDayOfWeek = (dateObj) ->
  dayNames[dateObj.getDay()]

useDayName = (dateObj, options) ->
  options.useDayNameForLastWeek? && withinSevenDays(new Date(), dateObj)

withinSevenDays = (date1, date2) ->
  oneDayInMs = 1000 * 60 * 60 * 24
  -7 < ((date2 - date1) / oneDayInMs) < 0
