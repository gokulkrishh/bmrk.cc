'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { getBookmarks } from 'app/actions/bookmarks';

import { BookmarkModified } from 'types/data';

const BookmarkContext = createContext(null);

type BookmarkContextProptype = {
  children: React.ReactNode;
};

export const BookmarkProvider = (props: BookmarkContextProptype) => {
  const [bookmarks, setBookmarks] = useState<BookmarkModified[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { children } = props;

  useEffect(() => {
    const getAllBookmarks = async () => {
      setLoading(true);
      const data = await getBookmarks();
      setLoading(false);
      setBookmarks(data as BookmarkModified[]);
    };

    getAllBookmarks();
  }, []);

  const value = useMemo(() => {
    return { bookmarks, loading };
  }, [bookmarks, loading]) as any;

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext<any>(BookmarkContext);
  if (context === undefined) {
    throw new Error(
      `useBookmarks must be used within a Bookmark Context Provider.`
    );
  }

  return context ?? null;
};
