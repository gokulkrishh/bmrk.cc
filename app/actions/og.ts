export type OgResponse = {
  title: string;
  description: string;
  'og:image'?: string;
  'og:description'?: string;
  'og:title'?: string;
  'twitter:image'?: string;
  'twitter:description'?: string;
  'twitter:title'?: string;
};

export async function getOg(url: string) {
  const res = await fetch(`/api/og?q=${encodeURIComponent(url)}`);
  const data = await res.json();
  return data;
}
