import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `https://bmrk.cc`,
      lastModified: new Date(),
    },
    {
      url: `https://bmrk.cc/account`,
      lastModified: new Date(),
    },
    {
      url: `https://bmrk.cc/terms`,
      lastModified: new Date(),
    },
    {
      url: `https://bmrk.cc/privacy`,
      lastModified: new Date(),
    },
  ];
}
