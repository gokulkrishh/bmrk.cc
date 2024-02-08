import { NextRequest } from 'next/server';

import puppeteer from 'puppeteer';

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
      const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true,
      });
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const metaTags = await page.evaluate((): MetaTags => {
        const tags: MetaTags = {
          title: document.querySelector('title')?.innerText || '',
          description:
            document
              .querySelector('meta[name="description"]')
              ?.getAttribute('content') || '',
          ogTitle:
            document
              .querySelector('meta[property="og:title"]')
              ?.getAttribute('content') || '',
          ogDescription:
            document
              .querySelector('meta[property="og:description"]')
              ?.getAttribute('content') || '',
          ogImage:
            document
              .querySelector('meta[property="og:image"]')
              ?.getAttribute('content') || '',
          twitterTitle:
            document
              .querySelector('meta[name="twitter:title"]')
              ?.getAttribute('content') || '',
          twitterDescription:
            document
              .querySelector('meta[name="twitter:description"]')
              ?.getAttribute('content') || '',
          twitterImage:
            document
              .querySelector('meta[name="twitter:image"]')
              ?.getAttribute('content') || '',
        };
        return tags;
      });
      page.close();
      browser.close();
      return new Response(JSON.stringify(metaTags), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }
  });
}
