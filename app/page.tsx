import Image from 'next/image';
import Link from 'next/link';

import { urls } from 'config';

import Extensions from 'components/home/extensions';
import Faq from 'components/home/faq';
import Features from 'components/home/features';
import Footer from 'components/home/footer';
import Signup from 'components/home/signup';
import { Tweet } from 'components/tweet/tweets';

const tweetIds = [
  '1754217612173562218',
  '1754190758096105879',
  '1754180337750708443',
  '1754189598891135463',
  '1754219522830250298',
  '1754346017049432479',
  '1754360689441833408',
  '1754459093870244045',
  '1754373174261596525',
];

export default async function Page() {
  return (
    <div className="flex flex-col mx-auto w-full homepage">
      <main className="flex after:bg-grid sm:max-w-4xl py-5 mx-auto flex-col w-full h-fit px-4">
        <header className="flex justify-between items-center">
          <h1 className="font-medium tracking-tight text-lg flex items-center">
            <Link
              className="flex text-primary items-center active:opacity-80"
              href="/"
            >
              <Image
                src="/icons/icon.svg"
                width={44}
                height={44}
                alt="Bookmark it"
                className="mr-2 "
                priority
              />
              Bookmark It.
            </Link>
          </h1>
          <Link
            href={urls.account}
            className="rounded-full inline-flex text-sm items-center focus:outline-0 bg-black hover:bg-black/80 shadow border border-black px-4 py-2 text-white"
          >
            Sign In
          </Link>
        </header>
        <div className="mx-auto max-sm:mt-32 mt-32">
          <h2 className="lg:text-6xl md:text-5xl text-4xl text-primary font-black max-w-2xl text-center mx-auto tracking-tight py-4 pb-1">
            Bookmark manager
            <br />
            for{' '}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mt-1 inline-flex">
              the modern web.
            </span>
          </h2>
          <p className="text-muted-foreground leading-7 mt-3 sm:text-lg mx-auto max-w-xl tracking-normal text-center">
            Effortlessly Bookmark, Categorize, and Favorite your web sites.
          </p>
          <Signup />
        </div>

        <Features />

        <div className="mx-auto w-full h-full relative my-8 mt-10 sm:mt-20   flex flex-col items-center">
          <h2 className="mt-4 mb-1 text-3xl font-extrabold tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mt-1 inline-flex">
              What People
            </span>{' '}
            Are Saying
          </h2>
          <p className="mt-3 mb-0 text-muted-foreground leading-7 sm:text-lg w-[80%] text-center">
            Don{"'"}t just take our word for it. Here{"'"}s what people are
            saying about Bookmark It on Twitter.
          </p>
          <div className="flex overflow-hidden relative w-full">
            <div className="animate-marquee gap-6 hover:animation-pause items-center w-full max-w-[90vw] flex">
              {tweetIds.map((id) => (
                <div key={id} data-theme="light">
                  <Tweet id={id} />
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/5 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-1/5 bg-gradient-to-l from-white dark:from-background"></div>
          </div>
        </div>

        <Extensions />
        <Faq />

        <div className="mx-auto mt-0 sm:mt-16  flex flex-col items-center">
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
            Proudly{' '}
            <span className="bg-gradient-to-r from-blue-400 to-sky-600 bg-clip-text text-transparent">
              Open Sourced!
            </span>
          </h2>
          <p className="mt-3 mb-10 text-muted-foreground leading-7 sm:text-lg w-[80%] text-center">
            A free and open-source project that respects your privacy and
            security. No ads, no analytics and no nonsense.
          </p>
          <Link
            className="inline-flex items-center justify-center h-[40px] rounded-full px-4 py-2 text-sm font-medium text-slate-900 ring-1 ring-slate-900/10 bg-white hover:bg-gray-200"
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/gokulkrishh/bmrk.cc"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
            </svg>
            Star on Github
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
