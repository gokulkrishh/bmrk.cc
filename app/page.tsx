import Image from 'next/image';
import Link from 'next/link';

import { urls } from 'config';

import GitButton from 'components/git-button';
import Extensions from 'components/home/extensions';
import Faq from 'components/home/faq';
import Features from 'components/home/features';
import Footer from 'components/home/footer';
import Pricing from 'components/home/pricing';
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
          <h1 className="font-semibold text-xl flex items-center">
            <Link
              className="flex text-primary items-center active:opacity-80"
              href="/"
            >
              <Image
                src="/icons/icon.svg"
                width={40}
                height={40}
                alt="Bookmark it"
                className="mr-2.5 rounded-full"
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
            Effortlessly Bookmark, Categorize, and Favorite your websites.
          </p>
          <Signup />
        </div>

        <Features />

        <div className="mx-auto w-full h-full relative my-8 mt-10 sm:mt-20  flex flex-col items-center">
          <h2 className="mt-4 mb-0 text-3xl font-extrabold tracking-[-0.03em] text-center text-primary sm:text-4xl sm:leading-[3.5rem]">
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mt-1 inline-flex">
              What People
            </span>{' '}
            Are Saying
          </h2>
          <p className="mt-3 mb-0 text-muted-foreground leading-7 sm:text-lg w-[80%] text-center">
            Don{"'"}t just take our word for it. Here{"'"}s what people are
            saying on Twitter.
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
        <Pricing />
        <Faq />

        <div className="mx-auto mt-0 sm:mt-16  flex flex-col items-center">
          <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
            Proudly{' '}
            <span className="bg-gradient-to-r from-blue-400 to-sky-600 bg-clip-text text-transparent">
              Open Source
            </span>
          </h2>
          <p className="mt-3 mb-10 text-muted-foreground leading-7 sm:text-lg w-[80%] text-center">
            Our source code is available on GitHub - feel free to read, review,
            or contribute to it.
          </p>
          <GitButton />
        </div>
      </main>

      <Footer />
    </div>
  );
}
