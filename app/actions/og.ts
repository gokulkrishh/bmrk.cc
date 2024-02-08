import { MetaTags } from 'types/data';

export async function getOg(url: string) {
  const data = await fetch(`/api/open-graph?url=${encodeURIComponent(url)}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  });
  if (!data.ok) {
    throw new Error('Failed to fetch data');
  }
  return (await data.json()) as MetaTags;
}
