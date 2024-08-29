export const toDateTime = (seconds: number) => {
  const t = new Date(0); // Epoch
  t.setSeconds(seconds);
  return t;
};

export const toUnixTimeStamp = (date: Date) => {
  const unixTimeStamp = Math.floor(date.getTime() / 1000);
  return unixTimeStamp;
};

export const getMonthsAgo = (month: number) => {
  const dateMonthsAgo = new Date(new Date().setMonth(new Date().getMonth() - month));

  return dateMonthsAgo;
};

export const isWithInMonthsAgo = (date: Date, month: number) => {
  const monthsAgo = getMonthsAgo(month);
  const unixMonthsAgo = toUnixTimeStamp(monthsAgo);

  const unixDateTime = toUnixTimeStamp(date);

  if (unixDateTime >= unixMonthsAgo) {
    return true;
  }

  return false;
};

export const unixToDate = (unix: number, format?: string) => {
  const date = new Date(unix * 1000);

  switch (format) {
    case 'numeric':
      return date.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    default:
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
      });
  }
};

export const formatDate = (dateString: string, format = 'mm-dd-yyyy') => {
  const date = new Date(dateString);
  const dateFormat = format.replace('/', '-').split('-');
  const dateObject: { [key: string]: string } = {
    mm: date.toLocaleString('default', { month: '2-digit' }),
    dd: date.toLocaleString('default', { day: '2-digit' }),
    yyyy: date.toLocaleString('default', { year: 'numeric' }),
  };

  const formattedDate: string[] = [];

  for (const value of dateFormat) {
    formattedDate.push(dateObject[value]);
  }

  return formattedDate.join('-');
};

export const currentDate = () => {
  const dateNow = new Date();

  return dateNow;
};

export const addYears = (date: Date, years: number) => {
  date.setFullYear(date.getFullYear() + years);

  return date;
};

export const deductDays = (date: Date, days: number) => {
  date.setDate(date.getDate() - days);

  return date;
};
