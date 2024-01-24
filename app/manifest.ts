import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: 'bmrk it.',
    name: 'Bookmark It',
    description: 'Bookmark manager for the modern web.',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    start_url: '/?utm_source=homescreen',
    theme_color: '#fff',
    background_color: '#fff',
  };
}
