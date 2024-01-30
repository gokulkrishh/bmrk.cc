import { NextRequest } from 'next/server';

import { parse } from 'node-html-parser';

import { checkAuth } from 'lib/auth';

export async function POST(request: NextRequest) {
  return await checkAuth(async () => {
    const htmlString = await request.json();

    if (!htmlString) {
      return new Response('data is missing.', { status: 400 });
    }
    try {
      const node = parse(htmlString);
      const root = node?.querySelector('dl');
      const bookmarks = extractBookmarks(root, []);
      console.log('bookmarks -->', bookmarks);
      return new Response(JSON.stringify({ message: 'Bookmarks created' }), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify(error), { status: 500 });
    }
  });
}

type ParsedBookmarksType = {
  [key: string]: string | string[] | undefined | null;
}[];

function extractBookmarks(node: any, tags: any[] = []) {
  const bookmarks: ParsedBookmarksType = [];
  let currentFolder = '';

  node?.childNodes?.forEach((child: any) => {
    if (child.tagName === 'DT') {
      const folder = child.querySelector('h3');
      const anchor = child.querySelector('a');

      console.log('folder -->', folder.textContent);
      console.log('anchor -->', anchor.textContent);

      if (folder) {
        // When a folder is found, extract bookmarks from its child <dl>
        const newTags = [...tags, folder.textContent];
        const dl = child.querySelector('dl');
        if (dl) {
          extractBookmarks(dl, newTags);
        }
      } else if (anchor) {
        bookmarks.push({
          name: anchor.textContent,
          url: anchor.getAttribute('href'),
          tags: tags,
        });
      }
    }
  });

  return bookmarks;
}
