'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Extensions() {
  return (
    <div className="mx-auto my-8 mt-10 flex flex-col items-center">
      <h2 className="mt-4 mb-1 text-3xl font-extrabold text-center tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
        <span className="bg-gradient-to-r from-neutral-950 to-neutral-950 bg-clip-text text-transparent mt-1 inline-flex">
          Browser Extensions
        </span>
      </h2>
      <p className="text-muted-foreground leading-7 mt-3 sm:text-lg mx-auto max-w-xl tracking-normal text-center">
        Add and browse bookmarks without having to leave the tab.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4">
        <div className="flex items-center flex-col justify-center">
          <h3 className="text-lg font-medium mb-2">Supported Browsers</h3>
          <div className="flex items-center gap-2">
            <Link
              title="Chrome Browser"
              href="#"
              className="rounded-2xl border border-transparent transition-all hover:border-input bg-white p-2 active:opacity-80"
            >
              <Image
                src={'/images/browsers/chrome.svg'}
                width={60}
                height={60}
                alt="Chrome Extension"
              />
            </Link>
            <Link
              title="Brave Browser"
              href="#"
              className="rounded-2xl border border-transparent transition-all hover:border-input bg-white p-2 active:opacity-80"
            >
              <Image
                src={'/images/browsers/brave.svg'}
                width={60}
                height={60}
                alt="Chrome Extension"
              />
            </Link>
          </div>
        </div>
        <Image
          className="flex bg-white mt-4 max-w-md w-full rounded-lg border-2 border-input"
          src="/images/chrome-ext.jpg"
          width={800}
          height={600}
          alt="Chrome Extension"
        />
      </div>
    </div>
  );
}
