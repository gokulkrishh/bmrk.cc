'use client';

import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';

const featuresList = [
  {
    name: 'Twitter-like timeline',
    description:
      'Bookmarks are arranged in a timeline for easy historical browsing.',
    videoUrl: `/demo/timeline.mp4`,
    screenshotUrl: `/demo/timeline.png`,
  },
  {
    name: 'Seemless integration',
    description: 'Easily import all your existing bookmarks from web browser.',
    videoUrl: `/demo/import.mp4`,
    screenshotUrl: `/demo/import.png`,
  },
  {
    name: 'Personalize your bookmarks',
    description: 'Personalized tags for quick and easy bookmark organization.',
    videoUrl: `/demo/personalize.mp4`,
    screenshotUrl: `/demo/personalize.png`,
  },
  {
    name: 'Favorite your bookmarks',
    description: 'Quickly access your most-loved site with a simple click.',
    videoUrl: `/demo/fav.mp4`,
    screenshotUrl: `/demo/fav.png`,
  },
  {
    name: 'One-Click Bookmarking',
    description:
      'Bookmark any site with a One-Click and seamless browsing within your tab – try our Chrome extension!',
    videoUrl: `/demo/bookmark-one-click.mp4`,
    screenshotUrl: `/demo/bookmark-one-click.png`,
  },
  {
    name: 'Optimize your viewing experience',
    description: 'Choose between light or dark mode.',
    videoUrl: `/demo/themes.mp4`,
    screenshotUrl: `/demo/themes.png`,
  },
  {
    name: 'Export bookmarks',
    description:
      'Export your bookmarks as CSV or HTML file for easy sharing and backup.',
    videoUrl: `/demo/export.mp4`,
    screenshotUrl: `/demo/export.jpg`,
  },
  {
    name: 'You control your data',
    description: 'Delete your account and its data whenever you choose.',
    videoUrl: `/demo/delete-account.mp4`,
    screenshotUrl: `/demo/delete-account.jpg`,
  },
];

export default function Features() {
  const [state, setState] = useState(0);

  return (
    <div className="mx-auto my-8 mt-20 sm:mt-32 flex flex-col items-center">
      <h2 className="mt-4 mb-0 text-3xl font-extrabold text-center tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
        <span className="gradient-white mt-1 inline-flex">
          Organize, Discover, and Personalize.
        </span>
      </h2>
      <p className="text-muted-foreground leading-7 mt-3 sm:text-lg mx-auto max-w-xl tracking-normal text-center">
        Simple yet powerful features to unlock the full potential of your
        bookmarking experience.
      </p>
      <div className="grid gap-12 items-center grid-cols-1 lg:grid-cols-2 mt-10 overflow-hidden relative w-full justify-center">
        <Accordion
          onValueChange={(value: string) => {
            const index = parseInt(value.split('-')[1], 10) - 1;
            setState(index);
          }}
          className="max-w-sm w-full mx-auto mt-2 flex justify-center flex-col"
          type="single"
          defaultValue="item-1"
        >
          {featuresList.map((feature, index) => (
            <AccordionItem key={feature.name} value={`item-${index + 1}`}>
              <AccordionTrigger>{feature.name}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {feature.description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="flex h-[390px] mx-auto bg-white max-w-sm w-full rounded-lg border-2 border-input">
          <video
            className="rounded-lg px-0 object-cover border-2 border-white"
            playsInline
            autoPlay
            muted
            loop
            width="1200"
            height="400"
            src={
              featuresList[state].videoUrl
                ? featuresList[state].videoUrl
                : featuresList[state].screenshotUrl
            }
            poster={featuresList[state].screenshotUrl}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}
