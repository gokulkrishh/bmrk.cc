import Link from 'next/link';

import { urls } from 'config';

import AccountButton from 'components/account-button';
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
      <footer className="w-full p-4 flex justify-between text-[13px] border-t text-primary">
        <div className="sm:max-w-3xl w-full mx-auto flex justify-between">
          <div>&copy; {new Date().getFullYear()} Bookmark It. </div>
          <div className="flex items-center gap-4">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:opacity-85"
              href="https://x.com/@gokul_i"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true" className="h-4 w-4">
                <path
                  fill="currentColor"
                  d="M12.6 0h2.454l-5.36 6.778L16 16h-4.937l-3.867-5.594L2.771 16H.316l5.733-7.25L0 0h5.063l3.495 5.114L12.601 0Zm-.86 14.376h1.36L4.323 1.539H2.865l8.875 12.837Z"
                ></path>
              </svg>
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:opacity-85"
              href="https://github.com/gokulkrishh/bmrk.cc"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-[1.15rem] w-[1.15rem]"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.582 0 0 3.672 0 8.203c0 3.623 2.292 6.699 5.471 7.783.4.075.546-.178.546-.396 0-.194-.007-.71-.01-1.394-2.226.495-2.696-1.1-2.696-1.1-.363-.948-.888-1.2-.888-1.2-.726-.508.055-.499.055-.499.803.058 1.225.845 1.225.845.714 1.253 1.873.891 2.328.682.074-.53.28-.891.509-1.096-1.776-.207-3.644-.911-3.644-4.054 0-.895.312-1.628.823-2.201-.082-.208-.357-1.042.079-2.17 0 0 .672-.222 2.2.84A7.485 7.485 0 0 1 8 3.967c.68.003 1.364.094 2.003.276 1.527-1.062 2.198-.841 2.198-.841.437 1.129.161 1.963.08 2.17.512.574.822 1.307.822 2.202 0 3.15-1.871 3.844-3.653 4.048.288.253.543.753.543 1.519 0 1.095-.01 1.98-.01 2.25 0 .219.144.474.55.394a8.031 8.031 0 0 0 3.96-2.989A8.337 8.337 0 0 0 16 8.203C16 3.672 12.418 0 8 0Z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
