import { PlansType } from 'types/data';

const isProduction = process.env.NODE_ENV === 'production';

const domain = 'bmrk.cc';
const local = 'localhost:3000';
const home = isProduction ? domain : local;
const protocol = isProduction ? 'https://' : 'http://';

export const urls = {
  homeWithoutProtocol: home,
  home: `${protocol}${home}`,
  authCallback: `${protocol}app.${home}/auth/callback/`,
  account: `${protocol}app.${home}/account`,
  intro: `${protocol}app.${home}/intro`,
  settings: `${protocol}app.${home}/settings`,
  app: `${protocol}app.${home}`,
  api: `${protocol}app.${home}/api`,
  twitter: 'https://twitter.com/gokul_i',
  github: 'https://github.com/gokulkrishh/bmrk.cc',
  extensions: {
    chrome:
      'https://chromewebstore.google.com/detail/bookmark-it/fgnmdiklfcddmhmmmppepijecbljfjbm?utm_source=bmrk.cc',
  },
};

export const plans: PlansType = {
  free: {
    type: 'free',
    name: 'Free',
    limit: {
      bookmarks: 25,
      tags: 5,
      favorites: 5,
      sessions: 0,
      imports: 1,
    },
    pricing: {
      monthly: 0,
      yearly: 0,
    },
  },
  pro: {
    type: 'pro',
    name: 'Pro',
    limit: {
      bookmarks: 100,
      tags: 50,
      favorites: 50,
      sessions: 0,
      imports: 5,
    },
    pricing: {
      monthly: 2.49,
      yearly: 24,
    },
  },
};

export const messages = {
  bookmarkLimit: (plan: string = plans.free.name) =>
    `Bookmarks in the import exceeds the allowed usage limit.`,
  tagLimit: (plan: string = plans.free.name) =>
    `Tags count exceeds the allowed monthly usage limit.`,
  usageLimitRenewal: `Usage limit auto-renews on monthly basis`,
  maxFileSize: `Maximum file size is 500 KB`,
  importLimitWarning: (count: number = 1) =>
    `Importing ${count} time${count > 1 ? 's' : ''} – doesn't count towards your monthly usage.`,
};
