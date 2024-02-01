export const showGreetings = () => {
  let partOfTheDay;
  let date = new Date();
  let hrs = date.getHours();

  if (hrs < 12) partOfTheDay = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17) partOfTheDay = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24) partOfTheDay = 'Good Evening';
  return partOfTheDay;
};

const dateOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as any;

export const formatDate = (
  dateString: string | Date | null,
  options = dateOptions,
): string | null => {
  if (!dateString) return null;
  return new Intl.DateTimeFormat('en-US', options).format(
    new Date(dateString),
  ) as string;
};
