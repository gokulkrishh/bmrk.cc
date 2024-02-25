'use client';

import Image from 'next/image';
import Link from 'next/link';

import { urls } from 'config';

import { useIntersectionObserver } from 'components/hooks/useInteraction';

export default function Extensions() {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });
  return (
    <div className="mx-auto my-8 mt-10 flex flex-col items-center">
      <h2 className="mt-4 mb-0 text-3xl font-extrabold text-center tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
        <span className="bg-gradient-to-r from-neutral-950 to-neutral-950 bg-clip-text text-transparent mt-1 inline-flex">
          Browser Extensions
        </span>
      </h2>
      <p className="text-muted-foreground leading-7 mt-3 sm:text-lg mx-auto max-w-xl tracking-normal text-center">
        Bookmark with One-Click and browse bookmarks without leaving your tab.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-4">
        <div className="flex items-center flex-col justify-center">
          <div className="flex items-center gap-8">
            <Link
              rel="noopener noreferrer"
              target="_blank"
              title="Chrome Browser"
              href={urls.extensions.chrome}
              className="rounded-2xl border transition-all border-input bg-white p-2 active:opacity-80"
            >
              <Image
                src={'/images/browsers/chrome.svg'}
                width={60}
                height={60}
                alt="Chrome Browser Extension"
              />
            </Link>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              title="Brave Browser"
              href={urls.extensions.chrome}
              className="rounded-2xl border transition-all border-input bg-white p-2 active:opacity-80"
            >
              <Image
                src={'/images/browsers/brave.svg'}
                width={60}
                height={60}
                alt="Brave Browser Extension"
              />
            </Link>
          </div>
        </div>
        <div
          ref={ref}
          className="flex bg-white overflow-hidden max-w-lg w-full  mt-4 rounded-xl border-2 border-input"
        >
          <video
            autoPlay={false}
            muted
            loop
            controls
            width="500"
            height="500"
            src={`${isIntersecting ? `/demo/chrome-ext.mp4` : ''}`}
            poster={`/demo/chrome-ext.png`}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
