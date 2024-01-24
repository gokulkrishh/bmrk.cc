import groupBy from 'object.groupby';

import { Bookmark, Tag } from 'types/data';

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
