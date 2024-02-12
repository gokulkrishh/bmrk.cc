import Link from 'next/link';

import { setWelcomed } from 'app/actions/user';

import { Logo } from 'components/icons';

import UploadBookmarks from './upload';

export default async function Page() {
  await setWelcomed();

  return (
    <div className="h-full pb-24 flex flex-col justify-center items-center">
      <header className="mt-10">
        <Logo className="w-40 h-40" />
      </header>
      <div className="flex mt-10 flex-col items-center justify-center">
        <h1 className="sm:text-4xl text-2xl font-bold tracking-wide">
          Import Bookmarks.
        </h1>
        <p className="text-lg mt-4 text-muted-foreground text-center">
          Seamlessly import your current browser bookmarks.
        </p>
      </div>
      <UploadBookmarks />
      <Link
        href="/"
        className="items-center hover:text-white active:text-white underline text-muted-foreground mt-2 h-[40px] tracking-wide text-sm flex justify-center py-2 px-5 transition-colors"
      >
        Skip
      </Link>
    </div>
  );
}
