import { NextRequest } from 'next/server';

import { parse } from 'node-html-parser';

import { checkAuth } from 'lib/auth';
import { isValidUrl } from 'lib/utils';

import { MetaTags } from 'types/data';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  return await checkAuth(async () => {
    const url = request.nextUrl.searchParams.get('url');

    if (!url || !isValidUrl(url)) {
      return new Response(`The URL ${url} is missing.`, { status: 400 });
    }
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'bmrk.cc Bot' },
      });
      const html = await response.text();
      if (!html) {
        return new Response(
          JSON.stringify({ title: url, description: '', ogImage: '' }),
        );
      }
      const metatags: { [key: string]: string } = extractMetaTags(html, url);
      return new Response(JSON.stringify(metatags));
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }
  });
}

function extractMetaTags(html: string, url: string) {
  const root = parse(html);
  const metaTags: { [key: string]: string } = {};

  const allowedKeys = {
    title: 'title',
    description: 'description',
    'og:image': 'ogImage',
    'og:description': 'ogDescription',
    'og:title': 'ogTitle',
    'twitter:image': 'twitterImage',
    'twitter:title': 'twitterTitle',
    'twitter:description': 'twitterDescription',
    image_src: 'ogImage',
    'shortcut icon': 'ogImage',
    icon: 'ogImage',
  } as { [key: string]: string };

  const objectMap: { [key: string]: string } = {};

  // Extract all meta tags
  root.querySelectorAll('meta').forEach(({ attributes }) => {
    const property = attributes.property || attributes.name || attributes.href;
    objectMap[property] = attributes.content;
  });

  // Extract all link tags
  root.querySelectorAll('links').forEach(({ attributes }) => {
    const { rel, href } = attributes;
    objectMap[rel] = href;
  });

  Object.keys(allowedKeys).map((key) => {
    const keyName = allowedKeys[key];
    if (objectMap[key] && !metaTags[keyName]) {
      metaTags[keyName] = objectMap[key];
    }
  });

  metaTags.title =
    root.querySelector('title')?.innerText ||
    metaTags.ogTitle ||
    metaTags.twitterTitle ||
    url;

  return metaTags as MetaTags;
}
