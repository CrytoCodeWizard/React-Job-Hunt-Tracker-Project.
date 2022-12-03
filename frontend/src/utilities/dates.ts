export const calculateDaysBetweenDates = (date1: Date, date2: Date) =>
  Math.abs(Math.ceil((date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)));
