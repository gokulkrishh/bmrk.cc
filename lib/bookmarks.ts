type Bookmark = {
  url: string;
  title: string;
  created_at: string;
};

export const bookmarkParser = (rootNode: HTMLElement) => {
  const bookmarks: Bookmark[] = [];

  const processNode = (node: HTMLAnchorElement) => {
    if (!node) {
      return;
    }
    const url = node.getAttribute('href');
    const created_at: any = node.getAttribute('ADD_DATE');
    const title = node.textContent;
    if (url?.length && title && created_at) {
      const bookmark = {
        title,
        url,
        created_at: new Date(created_at * 1000).toISOString(),
      };
      bookmarks.push(bookmark);
    }
  };

  const allAnchorTags = rootNode.querySelectorAll('a');
  if (allAnchorTags?.length) {
    allAnchorTags.forEach((aTag) => processNode(aTag));
  }
  return bookmarks;
};
