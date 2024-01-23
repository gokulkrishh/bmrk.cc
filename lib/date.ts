export const showGreetings = () => {
  let partOfTheDay;
  let date = new Date();
  let hrs = date.getHours();

  if (hrs < 12) partOfTheDay = 'Good Morning';
  else if (hrs >= 12 && hrs <= 17) partOfTheDay = 'Good Afternoon';
  else if (hrs >= 17 && hrs <= 24) partOfTheDay = 'Good Evening';
  return partOfTheDay;
};

const getTimeZone = () =>
  Intl.DateTimeFormat().resolvedOptions().timeZone as string;

export const formatDate = (dateString: string | Date | null): string | null => {
  if (!dateString) return null;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: getTimeZone(),
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(dateString)) as string;
};
