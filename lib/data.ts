import groupBy from 'object.groupby';

import { BookmarkModified } from 'types/data';

export const groupByKey = (data: unknown[], key: string) => {
  return data.reduce((acc: { [key: string]: unknown }, datum: any) => {
    acc[datum[key] as string] = datum;
    return acc;
  }, {});
};

export const groupByDate = (data: BookmarkModified[]) => {
  if (!data) return {};
  return groupBy(data, ({ created_at }) => {
    const date = new Date(created_at);
    const dateStr = new Intl.DateTimeFormat('en-US')
      .format(date)
      .replace(/\//g, '-');
    return dateStr;
  }) as { [key: string]: BookmarkModified[] };
};

export const filterByTagName = (data: BookmarkModified[], tagName: string) => {
  if (!data) return [];
  return data.filter((datum) => {
    return datum.bookmarks_tags.some((bookmarkTag) => {
      return bookmarkTag.tags.name === tagName;
    });
  });
};
