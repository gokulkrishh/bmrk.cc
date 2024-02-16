import { plans } from 'config';

import { getUser } from 'app/actions/user';

import { Progress } from 'components/ui/progress';

import { addYears, formatDate } from 'lib/date';
import { cn } from 'lib/utils';

import PlanTooltip from './plan-help';
import SettingsCard from './settings-card';

export default async function Plan() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const isFreePlan = user.plan_status === plans.free.type;

  const isProPlanExpired =
    !isFreePlan &&
    user.pro_plan_start_date &&
    new Date(user.pro_plan_start_date) < new Date();

  const { bookmarks, favorites, tags } = isFreePlan
    ? plans.free.limit
    : plans.pro.limit;

  return (
    <SettingsCard className="flex flex-col items-start gap-0 p-0">
      <div className="py-3 px-4 border-b w-full text-sm flex text-muted-foreground">
        <div
          className={cn(`flex max-sm:flex-col`, {
            'max-sm:gap-1': !isFreePlan,
          })}
        >
          <div className="flex items-center">
            You are currently on
            <span className="mx-1 text-black dark:text-white font-medium">
              {user.plan_status}
            </span>
            plan.
          </div>
          <div>
            {!isFreePlan ? (
              <>
                <span className="sm:ml-1">Next billing cycle is</span>
                <span className="ml-1 text-black dark:text-white font-medium">
                  {formatDate(addYears(user.free_plan_start_date, 1))}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <div className="p-4">
          <h3 className="font-medium mb-2 text-sm flex items-center">
            Bookmarks <PlanTooltip text="The number of bookmarks added." />
          </h3>
          <div className="flex w-full justify-between">
            <span className="text-muted-foreground mb-2 text-sm">
              {user.usage.bookmarks} of {bookmarks}
              <span className="text-xs ml-1.5">
                ({(user.usage.bookmarks / bookmarks) * 100}%)
              </span>
            </span>
          </div>
          <Progress
            className="h-3 mt-1"
            value={user.usage.bookmarks}
            max={bookmarks}
          />
        </div>
        <div className="flex justify-between mt-3 border-t">
          <div className="w-full border-r p-4 pb-6">
            <h3 className="font-medium mb-2 text-sm flex items-center">
              Tags <PlanTooltip text="The number of tags added." />
            </h3>
            <div className="flex w-full justify-between">
              <span className="text-muted-foreground flex items-center mb-2 text-sm">
                {user.usage.tags} of {tags}{' '}
                <span className="text-xs ml-1.5">
                  ({(user.usage.tags / tags) * 100}%)
                </span>
              </span>
            </div>
            <Progress className="h-3 mt-1" value={user.usage.tags} max={tags} />
          </div>
          <div className="w-full p-4 pb-6">
            <h3 className="font-medium mb-2 text-sm flex items-center">
              Favorites{' '}
              <PlanTooltip text="The number of bookmarks marked as favorites." />
            </h3>
            <div className="flex w-full justify-between">
              <span className="text-muted-foreground mb-2 text-sm">
                {user.usage.favorites} of {favorites}
                <span className="text-xs ml-1.5">
                  ({(user.usage.favorites / favorites) * 100}%)
                </span>
              </span>
            </div>
            <Progress
              className="h-3 mt-1"
              value={user.usage.favorites}
              max={favorites}
            />
          </div>
        </div>
      </div>

      {isFreePlan || isProPlanExpired ? (
        <div className="flex w-full p-3.5 justify-between items-center border-t">
          <p className="text-muted-foreground text-sm">
            For more usage limits, upgrade to the Pro plan.
          </p>
          <button className="items-center h-[40px] tracking-wide disabled:cursor-not-allowed disabled:border-border rounded-full text-white border border-blue-600 focus:outline-0 text-sm flex justify-center py-2 px-3 transition-colors bg-blue-600 hover:bg-blue-700 disabled:bg-blue-700 active:bg-blue-700">
            Upgrade
          </button>
        </div>
      ) : null}
    </SettingsCard>
  );
}
