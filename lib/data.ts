import groupBy from 'object.groupby';

import { Bookmark, BookmarkModified, Tag } from 'types/data';

export const groupByKey = (data: any, key: string) => {
  return data.reduce(
    (acc: any, datum: any) => {
      acc[datum[key]] = datum;
      return acc;
    },
    {} as Record<string, Tag>,
  );
};

export const groupByDate = (data: any) => {
  if (!data) return {};
  return groupBy(data, ({ created_at }: any) => {
    const date = new Date(created_at);
    return `${date.getDate()}-${date.getMonth() === 0 ? 1 : date.getMonth()}-${date.getFullYear()}`;
  }) as { [key: string]: BookmarkModified[] };
};

export const groupByTag = (data: BookmarkModified[], tags: any) => {
  return data.reduce((acc: any, datum) => {
    datum.bookmarks_tags.forEach(({ tags: { id } }) => {
      if (!acc[id]) {
        acc[id] = [];
      }
      acc[id].push(datum);
    });
    return acc;
  }, tags);
};

export const filterByTagName = (data: BookmarkModified[], tagName: string) => {
  if (!data) return [];
  return data.filter((datum) => {
    return datum.bookmarks_tags.some((bookmarkTag) => {
      return bookmarkTag.tags.name === tagName;
    });
  });
};
