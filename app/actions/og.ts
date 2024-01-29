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
  const data = await fetch(`/api/og`, {
    body: JSON.stringify({ url }),
    method: 'POST',
  });
  return await data.json();
}
