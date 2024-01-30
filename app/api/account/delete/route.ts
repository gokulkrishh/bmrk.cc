import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';
import { parse } from 'node-html-parser';

import { checkAuth } from 'lib/auth';

import { User } from 'types/data';
import { Database } from 'types/database';

const errorMessage = 'Unable to delete your account, try again.';

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? '',
  { auth: { persistSession: false } },
);

export async function POST(request: NextRequest) {
  return await checkAuth(async (user: User) => {
    const { email } = await request.json();
    if (!email) {
      return new Response('Email id is missing.', { status: 400 });
    }
    if (user.email !== email) {
      return new Response(errorMessage, { status: 500 });
    }
    try {
      const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id);
      if (error) {
        return new Response(
          JSON.stringify({
            error,
            message: errorMessage,
          }),
          { status: 500 },
        );
      }
      return new Response(JSON.stringify({ error, message: errorMessage }), {
        status: 200,
      });
    } catch (error) {
      return new Response(JSON.stringify({ error, message: errorMessage }), {
        status: 500,
      });
    }
  });
}

function extractMetaTags(html: string) {
  const root = parse(html);
  const metaTags: { [key: string]: string } = {};

  const allowedProperties = ['og:', 'twitter:'];
  const allowedNames = [
    'description',
    'twitter:image',
    'twitter:card',
    'twitter:title',
    'twitter:description',
  ];

  // Extract all meta tags
  root.querySelectorAll('meta').forEach((meta) => {
    const property = meta.getAttribute('property');
    const name = meta.getAttribute('name');
    const content = meta.getAttribute('content');

    if (
      property &&
      content &&
      allowedProperties.some((allowed) => property.startsWith(allowed))
    ) {
      metaTags[property] = content;
    } else if (name && content && allowedNames.includes(name)) {
      metaTags[name] = content;
    }
  });

  // Extract title tag
  const titleTag = root.querySelector('title');
  if (titleTag) {
    metaTags['title'] = titleTag.text;
  }

  return metaTags;
}
