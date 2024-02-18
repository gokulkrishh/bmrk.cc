import { permanentRedirect } from 'next/navigation';

import { messages, urls } from 'config';

import { getUser } from 'app/actions/user';

import { Progress } from 'components/ui/progress';

import {
  getBookmarkUsage,
  getFavoriteUsage,
  getTagUsage,
  getUserPlan,
  isProPlan,
  isProPlanExpired,
} from 'lib/data';
import { formatBillingDate, getFirstAndLastDate } from 'lib/date';
import { cn } from 'lib/utils';

import PlanTooltip from './plan-tooltip';
import PlanUpgradeButton from './plan-upgrade';
import SettingsCard from './settings-card';

export default async function Plans() {
  const user = await getUser();

  if (!user) {
    return permanentRedirect(urls.account);
  }

  const isFreePlan = !isProPlan(user);
  const isPlanExpired = isProPlanExpired(user);
  const { bookmarks, favorites, tags } = getUserPlan(user).limit;

  const bookmarkPercentage = getBookmarkUsage(user);
  const tagPercentage = getTagUsage(user);
  const favoritePercentage = getFavoriteUsage(user);

  const { first, last } = getFirstAndLastDate(user.billing_cycle_start_date);

  return (
    <SettingsCard className="flex flex-col items-start gap-0 p-0">
      <div className="py-3 px-4 relative border-b w-full text-sm flex text-muted-foreground">
        <div className={cn(`flex max-sm:flex-col max-sm:gap-1`)}>
          {!isPlanExpired ? (
            <div className="flex items-center">
              Currently on
              <span className="mx-1 text-black dark:text-white font-medium">
                {user.plan_status}
              </span>
              plan.
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <span
                className={cn({
                  'text-red-600 dark:text-red-400': true,
                })}
              >
                You pro plan has been expired.
              </span>
              <span>Renew again to enjoy all the features.</span>
            </div>
          )}
          {first && last && !isPlanExpired ? (
            <div>
              <span className="sm:ml-1 mt-1">Current billing cycle:</span>
              <span className="ml-1 text-black dark:text-white font-medium">
                {formatBillingDate(first)} - {formatBillingDate(last)}
              </span>
            </div>
          ) : null}
          <PlanTooltip
            type="info"
            className="absolute right-3 top-3.5"
            text={messages.usageLimitRenewal}
          />
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="p-4">
          <h3 className="font-medium mb-2 text-sm flex items-center">
            Bookmarks{' '}
            <PlanTooltip text="Number of bookmarks created on your current billing cycle." />
          </h3>
          <div className="flex w-full justify-between">
            <span className="text-muted-foreground mb-2 text-sm">
              {user.usage.bookmarks} of {bookmarks}
              <span className="text-xs ml-1.5">({bookmarkPercentage}%)</span>
            </span>
          </div>
          <Progress className="h-3 mt-1" value={bookmarkPercentage} />
        </div>
        <div className="flex justify-between mt-3 border-t">
          <div className="w-full border-r p-4 pb-6">
            <h3 className="font-medium mb-2 text-sm flex items-center">
              Tags <PlanTooltip text="Number of tags created." />
            </h3>
            <div className="flex w-full justify-between">
              <span className="text-muted-foreground flex items-center mb-2 text-sm">
                {user.usage.tags} of {tags}{' '}
                <span className="text-xs ml-1.5">({tagPercentage}%)</span>
              </span>
            </div>
            <Progress className="h-3 mt-1" value={tagPercentage} />
          </div>
          <div className="w-full p-4 pb-6">
            <h3 className="font-medium mb-2 text-sm flex items-center">
              Favorites{' '}
              <PlanTooltip text="Number of bookmarks marked as favorite." />
            </h3>
            <div className="flex w-full justify-between">
              <span className="text-muted-foreground mb-2 text-sm">
                {user.usage.favorites} of {favorites}
                <span className="text-xs ml-1.5">({favoritePercentage}%)</span>
              </span>
            </div>
            <Progress className="h-3 mt-1" value={favoritePercentage} />
          </div>
        </div>
      </div>

      {isFreePlan || isPlanExpired ? (
        <div className="flex w-full p-3.5 justify-between items-center border-t">
          <p className="text-muted-foreground text-sm">
            For more usage limits, upgrade to the Pro plan.
          </p>
          <PlanUpgradeButton />
        </div>
      ) : null}
    </SettingsCard>
  );
}