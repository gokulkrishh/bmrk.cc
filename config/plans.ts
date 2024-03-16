import { PlansType } from 'types/data';

export const plans: PlansType = {
  free: {
    type: 'free',
    name: 'Free',
    limit: {
      bookmarks: 25,
      tags: 15,
      favorites: 15,
      sessions: 0,
      imports: 1,
      share: 1,
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
      share: 10,
    },
    pricing: {
      monthly: 2.49,
      yearly: 24,
    },
  },
};
