import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://bmrk.cc',
      lastModified: new Date(),
    },
  ];
}
