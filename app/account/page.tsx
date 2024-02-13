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
      <main className="flex max-w-md mx-auto flex-col justify-center h-full px-4 items-center">
        <div className="flex justify-center w-full">
          <Link className="mb-2" href={urls.home}>
            <Logo className="w-20 h-20" />
          </Link>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="font-bold text-center tracking-tight text-2xl mb-1">
            Bookmark It.
          </h1>
          <p className="text-muted-foreground w-full text-center medium mx-auto mt-1.5 tracking-normal mb-5">
            The bookmark manager for the modern web.
          </p>
          <AccountButton />
          <p className="text-muted-foreground text-xs mt-4 px-1 sm:px-2 max-w-[360px] w-full leading-5 text-left">
            By clicking continue, you acknowledge that you have read and agree
            to{' '}
            <Link className="underline" href={`${urls.home}/terms`}>
              Terms of Service
            </Link>{' '}
            &{' '}
            <Link className="underline" href={`${urls.home}/privacy`}>
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
