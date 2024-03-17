import Link from 'next/link';

import { urls } from 'config/urls';

import AccountButton from 'components/account-button';
import { Logo } from 'components/icons';

const title = 'Bookmark it. | Account';
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience';

export const metadata = {
  title,
  description,
};

export default async function Page() {
  return (
    <div className="flex flex-col mx-auto w-full homepage-account">
      <main className="flex max-w-md mx-auto flex-col justify-center h-full px-4 items-center">
        <div className="flex justify-center w-full">
          <Link className="mb-4" href={urls.home}>
            <Logo className="w-20 h-20" />
          </Link>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="font-bold text-center text-2xl mb-1">Bookmark It.</h1>
          <p className="text-muted-foreground w-full text-center medium mx-auto mt-1.5 tracking-normal mb-5">
            Bookmark manager for the modern web
          </p>
          <AccountButton />
          <p className="text-muted-foreground text-xs mt-4 px-1 sm:px-2 max-w-[360px] w-full leading-5 text-left">
            By clicking continue, you acknowledge that you have read and agree
            to{' '}
            <Link
              className="underline hover:text-primary active:text-primary"
              href={`${urls.home}/terms`}
            >
              Terms & Condition
            </Link>{' '}
            and{' '}
            <Link
              className="underline hover:text-primary active:text-primary"
              href={`${urls.home}/privacy`}
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
