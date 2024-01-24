import { Tag } from 'types/data';

export const groupBy = (tags: Tag[], key: Tag['id']) => {
  return tags.reduce(
    (acc, tag) => {
      acc[tag[key] as keyof Tag] = tag;
      return acc;
    },
    {} as Record<string, Tag>
  );
};
