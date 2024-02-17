import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

import {
  getAdjustedBillingCycleDate,
  getDate,
  isUserAccountCreatedToday,
} from 'lib/date';
import { verifyCronJob } from 'lib/utils';

import { UserModified } from 'types/data';
import { Database } from 'types/supabase';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } },
);

export async function GET(request: NextRequest) {
  const isValidRequest = await verifyCronJob(request);
  if (!isValidRequest) {
    return new Response('Unauthorized', { status: 401 });
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select(`id,email,usage,billing_cycle_start_date,created_at`)
      .returns<UserModified[]>();

    if (error || data.length === 0) {
      return;
    }

    const today = new Date();
    const currentDay = today.getDate();

    // Reset the users usage only if the billing cycle start date matches today date
    // and user is not created today
    const billingResetUsers: UserModified[] = data.filter(
      ({ created_at, email, billing_cycle_start_date }) =>
        getAdjustedBillingCycleDate(billing_cycle_start_date) === currentDay &&
        created_at &&
        !isUserAccountCreatedToday(created_at),
    );

    // Update the usage for the users
    await Promise.allSettled(
      billingResetUsers.map(async (user: UserModified) => {
        return await supabaseAdmin
          .from('users')
          .update({
            usage: { bookmarks: 0, favorites: 0, tags: 0, session: 0 },
          })
          .eq('id', user.id);
      }),
    );

    return NextResponse.json({ message: 'Usage is updated successfully!' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
