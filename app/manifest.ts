import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: 'bmrk it.',
    name: 'Bookmark It',
    description:
      'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience',
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
      {
        src: '/icons/maskable_icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    start_url: '/?utm_source=homescreen',
    theme_color: '#ffffff',
    background_color: '#ffffff',
  };
}
