import Link from 'next/link';

import { Badge } from 'components/ui/badge';

import { BookmarkModifiedType, Tag } from 'types/data';

export default function TagBadge({
  data,
  tags,
}: {
  data: BookmarkModifiedType;
  tags: Tag[];
}) {
  const bookmarkTagIds = data.bookmarks_tags;
  return (
    <div className="flex gap-y-1.5 items-center overflow-x-scroll max-sm:max-w-[200px] max-w-[350px] w-full hidden-scrollbar">
      {tags
        .sort((a: any, b: any) => a?.name?.localeCompare(b?.name))
        .filter((tag) => bookmarkTagIds?.includes(tag.id))
        .map(({ id, name }) => (
          <Link key={id} href={`/tags/${name}`}>
            <Badge className="font-normal py-1 mr-1.5" variant="secondary">
              {name}
            </Badge>
          </Link>
        ))}
    </div>
  );
}
