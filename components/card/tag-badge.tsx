import Link from 'next/link';

import { Badge } from 'components/ui/badge';

import { BookmarkModified, Tag } from 'types/data';

export default function TagBadge({
  data,
  tags,
}: {
  data: BookmarkModified;
  tags: Tag[];
}) {
  const bookmarkTagIds = data.tag_ids;
  return (
    <div className="flex gap-y-1.5 items-center overflow-x-scroll max-sm:max-w-[230px] max-w-[350px] w-full hidden-scrollbar">
      {tags
        .filter((tag) => bookmarkTagIds?.includes(tag.id))
        .map(({ id, name }) => (
          <Link
            className="mr-1.5"
            prefetch={false}
            key={id}
            href={`/tags/${name}`}
          >
            <Badge className="font-normal" variant="secondary">
              {name}
            </Badge>
          </Link>
        ))}
    </div>
  );
}
