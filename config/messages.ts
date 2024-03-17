import { plans } from './plans';

export const messages = {
  bookmarkLimit: (plan: string = plans.free.name) =>
    `Bookmarks in the import exceeds the allowed usage limit.`,
  tagLimit: (plan: string = plans.free.name) =>
    `Tags count exceeds the allowed monthly usage limit.`,
  usageLimitRenewal: `Usage limit auto-renews on monthly basis`,
  maxFileSize: `Maximum file size is 500 KB`,
  importLimitWarning: (count: number = 1) =>
    `Importing ${count} time${count > 1 ? 's' : ''} – doesn't count towards your monthly usage. After that usage will be counted.`,
  imagePreview: `Upgrade to pro plan to support continued free access for everyone else.`,
};
