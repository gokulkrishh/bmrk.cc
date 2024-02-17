'use client';

import { useState } from 'react';

import Link from 'next/link';

import { plans, urls } from 'config';

import { CheckIcon } from 'components/icons';
import { Switch } from 'components/ui/switch';

export default function Pricing() {
  const [planYearly, setYearly] = useState(true);

  return (
    <div className="mx-auto my-8 mt-10 flex flex-col items-center">
      <h2 className="mt-4 mb-1 text-3xl font-extrabold text-center tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
        <span className="bg-gradient-to-r from-neutral-950 to-neutral-950 bg-clip-text text-transparent mt-1 inline-flex">
          Our Pricing Plans
        </span>
      </h2>
      <p className="text-muted-foreground leading-7 mt-3 sm:text-lg mx-auto max-w-xl tracking-normal text-center">
        Start for free. Upgrade to paid plan when you need it.
      </p>
      <div className="flex w-full mt-6 justify-center items-center font-medium">
        Monthly{' '}
        <Switch
          checked={planYearly}
          className="mx-4"
          onCheckedChange={setYearly}
        />{' '}
        Yearly
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="min-w-[360px] rounded-lg border border-input bg-white shadow-md text-left sm:mr-8 text-primary">
          <div className="px-5 p-4">
            <h3 className="text-2xl font-semibold leading-6">Free</h3>
            <p className="text-muted-foreground mt-1.5">
              Free forever with limits
            </p>
            <div className="my-4">
              <p className="text-4xl tabular-nums font-semibold text-primary">
                $0 <span className="text-base">/ month</span>
              </p>
              <span className="text-sm text-muted-foreground">
                Free forever
              </span>
            </div>
            <div className="flex flex-col gap-2.5 tracking-wide">
              <p className="text-gray-700 flex items-center font-medium">
                What{"'"}s included:
              </p>
              <p className="text-gray-600 flex items-center font-normal">
                <CheckIcon className="text-primary" />{' '}
                {plans.free.limit.bookmarks} bookmarks/mo
              </p>
              <p className="text-gray-600 flex items-center font-normal">
                <CheckIcon className="text-primary" /> {plans.free.limit.tags}{' '}
                tags creation
              </p>
              <p className="text-gray-600 flex items-center font-normal">
                <CheckIcon className="text-primary" />{' '}
                {plans.free.limit.favorites} favorite bookmarks
              </p>
              <p className="text-gray-600 flex items-center font-normal">
                <CheckIcon className="text-primary" /> Dark mode support
              </p>
              <p className="text-gray-600 flex items-center font-normal">
                <CheckIcon className="text-primary" /> Browser Extensions
              </p>
            </div>
            <div className="mt-6 mb-2">
              <Link
                href={urls.account}
                className="w-full rounded-lg flex justify-center bg-primary text-white p-2"
              >
                Start for free
              </Link>
            </div>
          </div>
        </div>
        <div className="min-w-[330px] rounded-lg border-2 border-blue-600 bg-white shadow-md text-left sm:mr-8 text-primary">
          <div className="px-5 p-4">
            <h3 className="text-2xl font-semibold leading-6">Pro</h3>
            <p className="text-muted-foreground mt-1.5">
              Get more out of pro plan
            </p>
            <div className="my-4">
              <p className="text-4xl tabular-nums font-semibold text-primary">
                $
                {planYearly
                  ? plans.pro.pricing.yearly
                  : plans.pro.pricing.monthly}{' '}
                <span className="text-base">/ month</span>{' '}
              </p>
              <span className="text-sm text-muted-foreground">
                Billed {planYearly ? 'yearly' : 'monthly'}
              </span>
            </div>
            <div className="flex flex-col gap-2.5 tracking-wide">
              <p className="text-gray-700 flex items-center font-medium">
                Everything in Free, plus:
              </p>
              <p className="text-gray-600 flex items-center font-normal">
                <CheckIcon className="text-primary" />{' '}
                {plans.pro.limit.bookmarks} bookmarks/mo
              </p>
              <p className="text-gray-600 flex items-center font-normal">
                <CheckIcon className="text-primary" /> {plans.pro.limit.tags}{' '}
                tags creation
              </p>
              <p className="text-gray-600 flex items-center font-normal">
                <CheckIcon className="text-primary" />{' '}
                {plans.pro.limit.favorites} favorite bookmarks
              </p>
              <p className="text-gray-600 flex items-center font-normal">
                <CheckIcon className="text-primary" /> Export bookmarks CSV or
                HTML
              </p>
              <p className="text-gray-600 flex items-center font-normal">
                <CheckIcon className="text-primary" /> Email Support
              </p>
            </div>
            <div className="mt-6 mb-2">
              <Link
                href={urls.settings}
                className="w-full rounded-lg flex justify-center bg-blue-600 text-white p-2"
              >
                Get started with pro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
