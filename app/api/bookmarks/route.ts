import { NextRequest } from 'next/server';

import { checkAuth } from 'lib/auth';

import { User } from 'types/data';

export async function POST(request: NextRequest) {
  return await checkAuth(async (user: User) => {
    try {
      return new Response(JSON.stringify({}), {
        status: 200,
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error, message: 'Error occurried.' }),
        { status: 500 },
      );
    }
  });
}
