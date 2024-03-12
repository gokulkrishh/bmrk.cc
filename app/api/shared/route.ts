import { checkAuth } from 'lib/auth';
import { nanoid } from 'lib/share';

export async function GET() {
  return await checkAuth(async () => {
    try {
      const randomStr = nanoid();
      return new Response(randomStr, { status: 200 });
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: error?.toString() || 'Error occurried.',
        }),
        { status: 500 },
      );
    }
  });
}
