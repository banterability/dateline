interface ShowMinuteOptions {
  alwaysIncludeMinutes?: boolean;
}

export function formatHours(hours: number): string {
  if (hours === 0) {
    return "12";
  } else if (hours > 12) {
    return (hours - 12).toString();
  } else {
    return hours.toString();
  }
}

export function formatMinutes(minutes: number): string {
  return minutes < 10 ? `0${minutes}` : minutes.toString();
}

export function showMinutes(
  minutes: number,
  options?: ShowMinuteOptions
): boolean {
  if (options?.alwaysIncludeMinutes) {
    return true;
  } else {
    return isTopOfHour(minutes);
  }
}

function isTopOfHour(minutes: number): boolean {
  return minutes === 0;
}
