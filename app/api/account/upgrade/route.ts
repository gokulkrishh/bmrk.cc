import { NextRequest } from 'next/server';

import { checkAuth } from 'lib/auth';
import createClient from 'lib/supabase/server';

import { UserModified } from 'types/data';

export async function POST(request: NextRequest) {
  return await checkAuth(async (user) => {
    const { billing_cycle_start_date, plan_status, order_info }: UserModified =
      await request.json();
    if (
      !billing_cycle_start_date ||
      !plan_status ||
      !order_info.identifier ||
      !order_info.store_id ||
      !order_info.number ||
      !order_info.status
    ) {
      return new Response('Invalid request', { status: 400 });
    }
    try {
      const supabase = await createClient();
      const { error: bookmarksTagsError } = await supabase
        .from('users')
        .update({ billing_cycle_start_date, plan_status, order_info })
        .eq('id', user.id);

      if (bookmarksTagsError) {
        throw new Error(bookmarksTagsError.message);
      }
      return Response.json('Successful', { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          message:
            error?.toString() || 'Error occurried while upgrade your plan',
        }),
        { status: 500 },
      );
    }
  });
}
