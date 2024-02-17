import { plans } from 'config';
import groupBy from 'object.groupby';

import { BookmarkInsert, BookmarkModified, UserModified } from 'types/data';

import { addYears, formatDate } from './date';

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

export const getUserPlan = (userData: UserModified) => {
  return userData?.plan_status === plans.pro.type ? plans.pro : plans.free;
};

export const isProPlan = (userData: UserModified) => {
  return userData?.plan_status === plans.pro.type;
};

export const isPlanExpired = (userData: UserModified) => {
  return (
    userData.pro_plan_start_date &&
    new Date(userData.pro_plan_start_date) > new Date()
  );
};

export const checkBookmarkLimit = (
  userData: UserModified,
  bookmarks: BookmarkModified[],
) => {
  const currentPlan = getUserPlan(userData);
  const isLimitReached =
    userData.usage.bookmarks >= currentPlan.limit.bookmarks ||
    userData.usage.bookmarks + bookmarks.length >= currentPlan.limit.bookmarks;

  return isLimitReached;
};

export const checkTagLimit = (userData: UserModified) => {
  const currentPlan = getUserPlan(userData);
  return userData?.usage?.tags >= currentPlan.limit.tags;
};

export const getBookmarkUsage = (userData: UserModified) => {
  const currentPlan = getUserPlan(userData);
  return Math.floor(
    (userData.usage.bookmarks / currentPlan.limit.bookmarks) * 100,
  );
};

export const getTagUsage = (userData: UserModified) => {
  const currentPlan = getUserPlan(userData);
  return Math.floor((userData.usage.tags / currentPlan.limit.tags) * 100);
};

export const getFavoriteUsage = (userData: UserModified) => {
  const currentPlan = getUserPlan(userData);
  return Math.floor(
    (userData.usage.favorites / currentPlan.limit.favorites) * 100,
  );
};

export const getNextBillingDate = (userData: UserModified) => {
  return formatDate(addYears(userData.pro_plan_start_date, 1));
};
