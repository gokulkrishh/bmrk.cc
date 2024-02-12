const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as Intl.DateTimeFormatOptions;

export const formatDate = (
  dateString: string | Date | null,
  options = dateOptions,
): string | null => {
  if (!dateString) return null;
  return new Intl.DateTimeFormat('en-US', options).format(
    new Date(dateString),
  ) as string;
};
