import { plans } from 'config';

import { UserModified } from 'types/data';

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as Intl.DateTimeFormatOptions;

export const billingDateOptions = {
  month: 'short',
  day: '2-digit',
  year: '2-digit',
} as Intl.DateTimeFormatOptions;

export const formatDate = (
  dateString: string | Date | null,
  options: Intl.DateTimeFormatOptions = dateOptions,
): string | null => {
  if (!dateString) return null;
  return new Intl.DateTimeFormat('en-US', options).format(
    new Date(dateString),
  ) as string;
};

export const addYears = (dateString: string | Date | null, years: number) => {
  if (!dateString) return null;
  let date = new Date(dateString);
  const day = date.getDate(),
    newDate = new Date(
      Date.UTC(date.getFullYear() + years, date.getMonth(), date.getDate(), 0),
    );
  newDate.getDate() != day && newDate.setDate(0);
  return newDate;
};

export const formatBillingDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

// Following methods are based on Dub.co's code, thank them.
export const getFirstAndLastDate = (billingCycleStart: string) => {
  const date = new Date();
  const startDay = new Date(billingCycleStart).getDate();
  const current = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear(),
  };

  if (current.day >= startDay) {
    return {
      first: new Date(current.year, current.month, startDay),
      last: new Date(current.year, current.month + 1, startDay - 1),
    };
  } else {
    // To get the date right if the date is jan month (start of year)
    const lastYear = current.month === 0 ? current.year - 1 : current.year;
    const lastMonth = current.month === 0 ? 11 : current.month - 1;
    return {
      first: new Date(lastYear, lastMonth, startDay),
      last: new Date(current.year, current.month, startDay - 1),
    };
  }
};

export const getLastDateOfMonth = () => {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0); // This will give the last day of the current month
  return lastDay.getDate();
};

export const getAdjustedBillingCycleDate = (billingDateStr: string) => {
  const date = new Date(billingDateStr);
  const startDate = date.getDate();
  const lastDate = getLastDateOfMonth();
  if (startDate > lastDate) {
    return lastDate;
  } else {
    return startDate;
  }
};

export const getDate = (date: string) => {
  return new Date(date).getDate();
};

export const isUserAccountCreatedToday = (date: string) => {
  const today = new Date();
  const createdDate = new Date(date);
  return (
    today.getDate() === createdDate.getDate() &&
    today.getMonth() === createdDate.getMonth() &&
    today.getFullYear() === createdDate.getFullYear()
  );
};
