import Image from 'next/image';

import Signup from './signup';

export default async function Page() {
  return (
    <div className="flex flex-col mx-auto">
      <main className="flex max-w-3xl py-5 mx-auto flex-col w-full h-full px-4">
        <header className="flex justify-between items-center">
          <h1 className="font-bold tracking-wide text-lg flex items-center">
            <Image
              src="/icons/icon.svg"
              width={44}
              height={44}
              alt="Bookmark it"
              className="mr-2 "
            />
            Bookmark It.
          </h1>
          <Signup />
        </header>
        <div className="mx-auto mt-20">
          <h2 className="md:text-5xl text-4xl text-black font-black max-w-2xl text-center mx-auto tracking-tight py-4">
            Bookmark manager
            <br />
            for{' '}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent mt-1 inline-flex">
              modern web.
            </span>
          </h2>
          <p className="text-neutral-600 w-full mx-auto text-lg font-medium max-w-xl mt-1 tracking-normal text-center">
            Streamlined Browsing: Effortlessly Bookmark, Categorize, and
            Favorite your Web Essentials.
          </p>
          <Image
            src="/open-graph.jpg"
            width={1200}
            height={630}
            alt="Bookmark it"
            className="rounded-lg mt-10"
          />
        </div>
      </main>
      <footer className="w-full flex text-sm py-4">
        &copy; {new Date().getFullYear()} Bookmark It.{' '}
        <a
          className="ml-2"
          href="https://gokul.site"
          target="_blank"
          rel="noopener noreferrer"
        >
          All rights reserved.
        </a>
      </footer>
    </div>
  );
}
