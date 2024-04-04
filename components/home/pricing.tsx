'use client';

import { useState } from 'react';

import Link from 'next/link';

import { messages } from 'config/messages';
import { plans } from 'config/plans';
import { urls } from 'config/urls';

import { ArrowRightIcon, CheckIcon } from 'components/icons';
import PlanTooltip from 'components/settings/plan-tooltip';
import { TooltipProvider } from 'components/ui/tooltip';

export default function Pricing() {
  const [planYearly, setYearly] = useState(true);

  return (
    <TooltipProvider>
      <div className="mx-auto my-8 mt-10 flex flex-col items-center">
        <h2 className="mt-4 mb-0 text-3xl font-extrabold text-center tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
          <span className="text-neutral-950 bg-clip-text mt-1 inline-flex">
            Our Pricing Plans
          </span>
        </h2>
        <p className="text-muted-foreground leading-7 mt-3 sm:text-lg mx-auto max-w-xl tracking-normal text-center">
          Start for free. Upgrade to paid plan when you need it.
        </p>
        {/* <div className="flex w-full mt-6 justify-center items-center font-medium">
        Monthly{' '}
        <Switch
          checked={planYearly}
          className="mx-4"
          onCheckedChange={setYearly}
        />{' '}
        Yearly
      </div> */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:min-w-[360px] max-w-full rounded-2xl border border-input bg-white shadow-md text-left sm:mr-8 text-primary">
            <div className="px-5 p-5">
              <h3 className="text-2xl font-semibold leading-6">Free</h3>
              <p className="text-muted-foreground mt-1.5">
                Free forever with limits.
              </p>
              <div className="my-4">
                <p className="text-4xl tabular-nums font-semibold text-primary">
                  $0 <span className="text-base">/ year</span>
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
                  {plans.free.limit.bookmarks} bookmarks/mo{' '}
                  <PlanTooltip
                    className="ml-1 relative -top-1"
                    text={messages.usageLimitRenewal}
                  />
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-primary" />
                  {plans.free.limit.imports} time unlimited bookmarks import.
                  <PlanTooltip
                    className="ml-1 relative -top-1"
                    text={messages.importLimitWarning(plans.free.limit.imports)}
                  />
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-primary" /> {plans.free.limit.tags}{' '}
                  tags
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-primary" />{' '}
                  {plans.free.limit.favorites} favorite bookmarks
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-primary" />
                  Share upto {plans.free.limit.share} tag publicly
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-primary" /> Theme Customizations
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-primary" /> One-Click Browser
                  Extensions
                </p>
              </div>
              <div className="mt-6 mb-2">
                <Link
                  href={urls.account}
                  className="w-full group/free font-normal hover:bg-primary/90 rounded-xl flex text-lg items-center justify-center bg-primary text-white p-2 px-6"
                >
                  Choose Free{' '}
                  <ArrowRightIcon className="ml-1.5 w-4 h-4  transition-all group-hover/free:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="min-w-[330px] bg-gradient-to-r from-sky-0 to-sky-50 via-white rounded-2xl border-2 border-sky-100 bg-white shadow-md text-left sm:mr-8 text-primary">
            <div className="px-5 p-5">
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
                  <span className="text-base">/ year</span>
                  <span className="text-xs ml-2 font-normal text-muted-foreground">
                    (Excl. Tax)
                  </span>
                </p>
                <span className="text-sm text-muted-foreground">
                  Billed yearly (no auto-renewal)
                </span>
              </div>
              <div className="flex flex-col gap-2.5 tracking-wide">
                <p className="text-gray-700 flex items-center font-medium">
                  Everything in Free, plus:
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-green-500" />{' '}
                  {plans.pro.limit.bookmarks} bookmarks/mo{' '}
                  <PlanTooltip
                    className="ml-1 relative -top-1"
                    text={messages.usageLimitRenewal}
                  />
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-green-500" />
                  {plans.pro.limit.imports} times unlimited bookmarks import.
                  <PlanTooltip
                    className="ml-1 relative -top-1"
                    text={messages.importLimitWarning(plans.pro.limit.imports)}
                  />
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-green-500" />{' '}
                  {plans.pro.limit.tags} tags
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-green-500" />{' '}
                  {plans.pro.limit.favorites} favorite bookmarks
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-green-500" />
                  Share upto {plans.pro.limit.share} tags publicly
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-green-500" /> Export bookmarks as
                  CSV/HTML
                </p>
                <p className="text-gray-600 flex items-center font-normal">
                  <CheckIcon className="text-green-500" /> Email Support
                </p>
              </div>
              <div className="mt-6 mb-2">
                <Link
                  href={urls.settings}
                  className="w-full group/pro font-normal hover:bg-blue-600/90 rounded-xl flex text-lg items-center justify-center bg-blue-600 text-white p-2 px-6"
                >
                  Choose Pro{' '}
                  <ArrowRightIcon className="ml-1.5 w-4 h-4 transition-all group-hover/pro:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
