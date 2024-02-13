import { BookmarkModified } from 'types/data';

type TagHierarchy = {
  [key: string]: TagHierarchy | { _links: BookmarkModified[] };
};

const buildTagHierarchy = (bookmarks: BookmarkModified[]) => {
  const root = {};

  bookmarks.forEach((bookmark: BookmarkModified) => {
    let currentLevel: { [key: string]: any } = root;
    bookmark.bookmarks_tags.forEach(({ tags }) => {
      const { name = 'Bookmarks' } = tags;
      if (!currentLevel[name]) {
        currentLevel[name] = { _links: [] };
      }
      currentLevel = currentLevel[name];
    });
    currentLevel?._links?.push({
      title: bookmark.title,
      url: bookmark.url,
      created_at: Math.floor(new Date(bookmark.created_at).getTime() / 1000),
    });
  });

  return root as TagHierarchy;
};

const generateHTMLForTags = (
  tagHierarchy: TagHierarchy,
  tagName = 'Bookmarks',
) => {
  let htmlContent = `<DT><H3>${tagName}</H3>\n<DL><p>\n`;

  Object.entries(tagHierarchy).forEach(([tag, content]: any) => {
    if (tag === '_links') {
      content.forEach((link: BookmarkModified) => {
        htmlContent += `<DT><A ADD_DATE="${link.created_at}" HREF="${link.url}">${link.title}</A>\n`;
      });
    } else {
      htmlContent += generateHTMLForTags(content as TagHierarchy, tag);
    }
  });

  htmlContent += `    </DL><p>\n`;
  return htmlContent;
};

export const exportAsHTML = (
  bookmarks: BookmarkModified[],
  filename: string,
) => {
  const tagHierarchy = buildTagHierarchy(bookmarks);
  let htmlContent = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>\n`;

  htmlContent += generateHTMLForTags(tagHierarchy);
  htmlContent += `</DL><p>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const bookmarkParser = (rootNode: HTMLElement) => {
  const bookmarks: BookmarkModified[] = [];

  const processNode = (node: HTMLAnchorElement) => {
    if (!node) {
      return;
    }
    let url = node.getAttribute('href') || '';
    const created_at: string | null = node.getAttribute('ADD_DATE');
    const title = node.textContent;

    try {
      url = new URL(url).href;
      const bookmark = {
        title: title || url,
        url,
      } as BookmarkModified;

      if (created_at) {
        bookmark['created_at'] = new Date(
          Number(created_at) * 1000,
        ).toISOString();
      }
      bookmarks.push(bookmark);
    } catch {
      console.error('Error parsing bookmark', title, url);
    }
  };

  const allAnchorTags = rootNode.querySelectorAll('a');
  if (allAnchorTags?.length) {
    allAnchorTags.forEach((aTag) => processNode(aTag));
  }
  return bookmarks;
};

export const exportAsCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
