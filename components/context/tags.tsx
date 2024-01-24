'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getTags } from 'app/actions/tags';

import { Tag } from 'types/data';

const TagContext = createContext(null);

type TagProviderProps = {
  children: React.ReactNode;
};

export const TagProvider = (props: TagProviderProps) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { children } = props;

  useEffect(() => {
    const getAllTags = async () => {
      setLoading(true);
      const data = await getTags();
      setTags(data as Tag[]);
      setLoading(false);
    };

    getAllTags();
  }, []);

  const value = useMemo(() => {
    return { tags, loading };
  }, [tags, loading]) as any;

  return <TagContext.Provider value={value}>{children}</TagContext.Provider>;
};

export const useTags = () => {
  const context = useContext<any>(TagContext);
  if (context === undefined) {
    throw new Error(`useTags must be used within a Tag Context Provider.`);
  }

  return context ?? null;
};
