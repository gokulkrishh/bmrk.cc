const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
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
