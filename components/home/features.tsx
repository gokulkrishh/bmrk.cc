'use client';

import { useState } from 'react';

import { urls } from 'config';

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
      'Bookmarks are stored in a timeline view to effortlessly navigate around.',
    videoUrl: `/videos/add.mp4`,
    screenshotUrl: `/images/timeline.png`,
  },
  {
    name: 'Seemless Integration',
    description: 'Easily import your existing bookmarks from web browser.',
    videoUrl: `/videos/import-bookmarks.mp4`,
    screenshotUrl: `/images/import-bookmarks.png`,
  },
  {
    name: 'Personalise your bookmarks',
    description:
      'Organize your bookmarks with custom tags for easy navigation.',
    videoUrl: `/videos/tags.mp4`,
    screenshotUrl: `/images/tags.png`,
  },
  {
    name: 'Favorite your bookmarks',
    description: 'Quickly access your most-loved content with a simple click.',
    videoUrl: `/videos/fav.mp4`,
    screenshotUrl: `/images/fav.png`,
  },
  {
    name: 'Search and Open any bookmark',
    description:
      'Effortlessly find, share and access your bookmarks in seconds.',
    videoUrl: `/videos/search.mp4`,
    screenshotUrl: `/images/search.png`,
  },
  {
    name: 'Customizable Viewing Experience',
    description:
      'Choose between light and dark mode for better viewing experience.',
    videoUrl: `/videos/themes.mp4`,
    screenshotUrl: `/images/themes.png`,
  },
];

export default function Features() {
  const [state, setState] = useState(0);

  return (
    <div className="mx-auto my-8 mt-32 flex flex-col items-center">
      <h2 className="mt-4 mb-1 text-3xl font-extrabold text-center tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
        <span className="bg-gradient-to-r from-neutral-950 to-neutral-950 bg-clip-text text-transparent mt-1 inline-flex">
          Organize, Discover, and Personalize.
        </span>
      </h2>
      <p className="text-muted-foreground leading-7 mt-3 sm:text-lg mx-auto max-w-xl tracking-normal text-center">
        Simple yet powerful features to unlock the full potential of your
        bookmarking experience.
      </p>
      <div className="grid gap-12 items-center grid-cols-1 lg:grid-cols-2 mt-10 overflow-hidden relative w-full">
        <Accordion
          onValueChange={(value: string) => {
            const index = parseInt(value.split('-')[1], 10) - 1;
            setState(index);
          }}
          className="max-w-sm"
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
        <div className="flex bg-white max-w-sm w-full rounded-lg border-2 border-input">
          <video
            className="rounded-lg px-0 border-2 border-white"
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
