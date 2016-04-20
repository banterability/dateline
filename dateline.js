(function(){
  var MONTH_NAMES = ['Jan.', 'Feb.', 'March', 'April', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
  var DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //
  var Dateline = function(dateObj){
    if (dateObj == null){
      dateObj = new Date();
    }

    dateObj.getAPTime = function(options){
      if (options == null){
        options = {};
      }

      var hours = dateObj.getHours();
      var minutes = dateObj.getMinutes();

      // Special cases: "midnight" and "noon"
      if (hours === 0 && minutes === 0){
        return 'midnight';
      } else if (hours === 12 && minutes === 0){
        return 'noon';
      }

      var timeOfDay = hours < 12 ? 'a.m.' : 'p.m.';

      var hour = formatHours(hours);

      // Don't show minutes at the top of the hour by default
      if (showMinutes(minutes, options)){
        return hour + ' ' + timeOfDay;
      }

      var minute = formatMinutes(minutes);

      return hour + ':' + minute + ' ' + timeOfDay;
    }

    dateObj.getAPDate = function(options){
      if (options == null){
        options = {};
      }

      var month = dateObj.getMonth();
      var date = dateObj.getDate();
      var year = dateObj.getFullYear();

      var monthName = MONTH_NAMES[month];

      if (useDayName(dateObj, options)){
        return getDayOfWeek(dateObj);
      } else if (showYear(year, options)){
        return monthName + ' ' + date;
      } else {
        return monthName + ' ' + date + ', ' + year;
      }
    }

    return dateObj;
  }

  // Export for Node or browser
  if (typeof module !== "undefined" && module !== null ? module.exports : void 0) {
    module.exports = Dateline;
  } else {
    this.Dateline = Dateline;
  }

  // # Time Helpers
  function formatHours(hours){
    if (hours === 0){
      return 12;
    } else if (hours > 12) {
      return hours - 12;
    } else {
      return hours;
    }
  }

  function formatMinutes(minutes){
    return minutes < 10 ? '0' + minutes : minutes.toString();
  }

  function isTopOfHour(minutes){
    return minutes === 0;
  }

  function showMinutes(minutes, options){
    return isTopOfHour(minutes) && (options.includeMinutes == null);
  }

  // # Date Helpers

  function showYear(year, options){
    return (year === new Date().getFullYear()) && (options.includeYear == null);
  }

  function getDayOfWeek(dateObj){
    return DAY_NAMES[dateObj.getDay()];
  }

  function useDayName(dateObj, options){
    return (options.useDayNameForLastWeek != null) && withinSevenDays(dateObj);
  }

  function withinSevenDays(dateObj){
    var ONE_DAY_IN_MS = 1000 * 60* 60 * 24;
    var diff = dateObj - new Date();
    var diffInDays = diff / ONE_DAY_IN_MS;
    return (-7 < diffInDays) && (diffInDays < 0);
  }
}).call(this);
