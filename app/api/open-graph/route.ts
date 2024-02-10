import { NextRequest } from 'next/server';

import { parse } from 'node-html-parser';

import { checkAuth } from 'lib/auth';

import { MetaTags } from 'types/data';

export async function GET(request: NextRequest) {
  return await checkAuth(async () => {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url') ?? '';

    if (!url) {
      return new Response(`The URL ${url} is missing.`, { status: 400 });
    }
    try {
      const siteUrl = new URL(url);
      const response = await fetch(siteUrl, {
        headers: {
          'User-Agent': 'bmrk.cc Bot',
        },
      });
      const html = await response.text();
      const metatags: { [key: string]: string } = extractMetaTags(html);
      return new Response(JSON.stringify(metatags), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }
  });
}

function extractMetaTags(html: string) {
  const root = parse(html);
  const metaTags: { [key: string]: string } = {};

  const allowedProperties = ['og:', 'twitter:'];
  const allowedNames = ['title', 'description', 'og:image', 'twitter:image'];

  const allowedNamesKeys = {
    title: 'title',
    description: 'description',
    'og:image': 'ogImage',
    'og:description': 'ogDescription',
    'og:title': 'ogTitle',
    'twitter:image': 'twitterImage',
    'twitter:title': 'twitterTitle',
    'twitter:description': 'twitterDescription',
  };

  // Extract all meta tags
  root.querySelectorAll('meta').forEach((meta) => {
    const property = meta.getAttribute('property');
    const name: any = meta.getAttribute('name');
    const content = meta.getAttribute('content');
    const allowedPropertyKey =
      allowedNamesKeys[property as keyof typeof allowedNamesKeys];
    const allowedNameKey =
      allowedNamesKeys[name as keyof typeof allowedNamesKeys];

    if (
      property &&
      content &&
      allowedProperties.some((allowed) => property.startsWith(allowed)) &&
      allowedPropertyKey
    ) {
      metaTags[allowedPropertyKey] = content;
    } else if (
      allowedNamesKeys[name as keyof typeof allowedNamesKeys] &&
      content &&
      allowedNames.includes(name) &&
      allowedNameKey
    ) {
      metaTags[allowedNameKey] = content;
    }
  });

  // Extract title tag
  const titleTag = root.querySelector('title');
  if (titleTag) {
    metaTags['title'] = titleTag.text;
  }

  return metaTags as MetaTags;
}
