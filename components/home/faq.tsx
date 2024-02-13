'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';

export default function Faq() {
  return (
    <div className="mx-auto my-8 mt-32 flex flex-col items-center">
      <h2 className="mt-4 mb-1 text-3xl font-extrabold text-center tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
        <span className="bg-gradient-to-r from-neutral-950 to-neutral-950 bg-clip-text text-transparent mt-1 inline-flex">
          Frequently Asked Questions
        </span>
      </h2>
      <p className="text-muted-foreground leading-7 mt-3 sm:text-lg mx-auto max-w-xl tracking-normal text-center">
        If you can&apos;t find what you&apos;re looking for, feel free to reach
        out to us at{' '}
        <a
          className="cursor-pointer text-blue-700 underline"
          href="mailto:support@bmrk.cc"
        >
          support@bmrk.cc
        </a>
        .
      </p>
      <div className="mt-5">
        <Accordion className="max-w-sm" type="single" defaultValue="item-1">
          <AccordionItem value={`item-1`}>
            <AccordionTrigger>Hello</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Hello
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
