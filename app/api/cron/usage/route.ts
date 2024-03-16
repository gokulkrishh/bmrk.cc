import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import { plans } from 'config/plans';

import { isProPlanExpired } from 'lib/data';
import {
  getAdjustedBillingCycleDate,
  isUserAccountCreatedToday,
} from 'lib/date';
import { verifyCronAuthorization } from 'lib/utils';

import { UserModified } from 'types/data';
import { Database } from 'types/supabase';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } },
);

export async function GET(request: NextRequest) {
  const isAuthorized = await verifyCronAuthorization(request);
  if (!isAuthorized) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .returns<UserModified[]>();

    if (error || users.length === 0) {
      return;
    }

    const today = new Date();
    const currentDay = today.getDate();

    // Reset the users plan to free plan, if pro plan expired
    const planResetUsers: UserModified[] = users.filter(isProPlanExpired);

    // Update user to free plan if the billing cycle start date matches today date
    await Promise.allSettled(
      planResetUsers.map(async (user: UserModified) => {
        const { error } = await supabaseAdmin
          .from('users')
          .update({
            billing_cycle_start_date: new Date().toISOString(),
            plan_status: plans.free.type,
            usage: {
              sessions: 0,
              bookmarks: 0,
              favorites: 0,
              tags: 0,
            },
            order_info: {
              status: '',
              number: 0,
              store_id: 0,
              identifier: '',
            },
          })
          .eq('id', user.id);
        if (error) {
          console.error(`Unable to update user's plan status`, error);
        }
      }),
    );

    // Reset the users usage only if the billing cycle start date matches today date
    // and avoid user who got created today
    const billingResetUsers: UserModified[] = users.filter(
      ({ created_at, billing_cycle_start_date, usage }) =>
        usage.bookmarks > 0 &&
        getAdjustedBillingCycleDate(billing_cycle_start_date) === currentDay &&
        created_at &&
        !isUserAccountCreatedToday(created_at),
    );

    // Update the usage for the users
    try {
      await Promise.allSettled(
        billingResetUsers.map(async (user: UserModified) => {
          const { error } = await supabaseAdmin.rpc(
            'update_user_bookmarks_usage',
            { user_id: user.id, count: 0 },
          );
          if (error) {
            console.error(`Unable to update usage`, error);
          }
        }),
      );
    } catch (error) {
      throw error;
    }

    return NextResponse.json({ message: 'Usage is updated successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
