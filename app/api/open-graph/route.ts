import { NextRequest } from 'next/server';

import { parse } from 'node-html-parser';

import { checkAuth } from 'lib/auth';
import { isValidUrl, setImagePath } from 'lib/utils';

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
          JSON.stringify({ title: url, description: '', image: '' }),
        );
      }
      const metatags: { [key: string]: string } = extractMetaTags(html, url);
      return new Response(JSON.stringify(metatags));
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }
  });
}

const allowedTags = [
  'title',
  'og:title',
  'twitter:title',
  'description',
  'og:description',
  'twitter:description',
  'og:image',
  'twitter:image',
  'icon',
  'apple-touch-icon',
  'shortcut icon',
];

function extractMetaTags(html: string, url: string) {
  const root = parse(html);
  const objectMap: { [key: string]: string } = {};

  // Extract all meta tags
  root.querySelectorAll('meta').forEach(({ attributes }) => {
    const property = attributes.property || attributes.name || attributes.href;
    if (!objectMap[property] && allowedTags.includes(property)) {
      objectMap[property] = attributes.content;
    }
  });

  // Extract all link tags
  root.querySelectorAll('link').forEach(({ attributes }) => {
    const { rel, href } = attributes;
    if (rel && href && allowedTags.includes(rel)) {
      objectMap[rel] = href;
    }
  });

  const title =
    root.querySelector('title')?.innerText ||
    objectMap['og:title'] ||
    objectMap['twitter:title'] ||
    url;

  const description =
    objectMap['og:description'] || objectMap['description'] || '';

  const imageSrc =
    objectMap['og:image'] ||
    objectMap['twitter:image'] ||
    objectMap['apple-touch-icon'] ||
    objectMap['icon'] ||
    objectMap['shortcut icon'];

  const favIconImage =
    objectMap['apple-touch-icon'] ||
    objectMap['icon'] ||
    objectMap['shortcut icon'];

  const image = setImagePath(url, imageSrc);

  return {
    title,
    description,
    image,
    ...(image && { is_fallback: imageSrc == favIconImage }),
  } as MetaTags;
}
