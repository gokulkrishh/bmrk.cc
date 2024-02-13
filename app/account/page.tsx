import Link from 'next/link';

import { urls } from 'config';

import AccountButton from 'components/account-button';
import Footer from 'components/home/footer';
import { Logo } from 'components/icons';

const title = 'Bookmark it. | Account';
const description = 'Bookmark manager for the modern web.';

export const metadata = {
  title,
  description,
};

export default async function Page() {
  return (
    <div className="flex flex-col mx-auto w-full homepage">
      <main className="flex max-w-sm mx-auto flex-col justify-center h-full px-4 items-center">
        <div className="flex justify-center w-full">
          <Link className="mb-2" href={urls.home}>
            <Logo className="w-16 h-16" />
          </Link>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="font-bold text-center tracking-tight text-2xl mb-1">
            Bookmark It.
          </h1>
          <p className="text-muted-foreground w-full text-center medium mx-auto mt-1 tracking-normal mb-5">
            Bookmark manager for the modern web.
          </p>
          <AccountButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
