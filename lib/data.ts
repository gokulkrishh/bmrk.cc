import groupBy from 'object.groupby';

import { Bookmark, BookmarkModifiedType, Tag } from 'types/data';

export const groupByKey = (data: any, key: string) => {
  return data.reduce(
    (acc: any, datum: any) => {
      acc[datum[key]] = datum;
      return acc;
    },
    {} as Record<string, Tag>
  );
};

export const groupByDate = (data: any) => {
  return groupBy(data, ({ created_at }: any) => new Date(created_at).getDate());
};

export const groupByTag = (data: BookmarkModifiedType[], tags: any) => {
  return data.reduce((acc: any, datum) => {
    datum.bookmarks_tags.forEach((tagId) => {
      if (!acc[tagId]) {
        acc[tagId] = [];
      }
      acc[tagId].push(datum);
    });
    return acc;
  }, tags);
};
