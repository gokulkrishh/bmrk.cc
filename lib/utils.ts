import { NextRequest } from 'next/server';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { UserModified } from 'types/data';

import { getAdjustedBillingCycleDate } from './date';
import createClient from './supabase/server';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getBrowserName = () => {
  const userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'chrome';
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'firefox';
  } else if (userAgent.match(/safari/i)) {
    browserName = 'safari';
  } else {
    browserName = 'No browser detection';
  }
  return browserName;
};

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

// Courtesy: dub.co
export const setImagePath = (url: string, imageUrl: string) => {
  if (!imageUrl) {
    return null;
  }
  if (isValidUrl(imageUrl)) {
    return imageUrl;
  }
  const { protocol, host } = new URL(url);
  const baseURL = `${protocol}//${host}`;
  return new URL(imageUrl, baseURL).toString();
};

export const verifyCronAuthorization = async (request: NextRequest) => {
  const authHeader = request.headers.get('authorization');
  return authHeader === `Bearer ${process.env.CRON_SECRET}`;
};
