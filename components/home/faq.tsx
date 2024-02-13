'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';

const faqs = [
  {
    question: 'How to I save a bookmark?',
    answer:
      'Copy the URL of the page you want to save, then just paste it into the input field or use our chrome extension to save bookmarks with single click.',
  },
  {
    question: 'Can I import my existings bookmarks?',
    answer: `Yes, you can import your existing bookmarks from your web browser. To do this, click the upload icon in home page and follow the instructions.`,
  },
  {
    question: 'How do I delete a bookmark?',
    answer: `To delete a bookmark, go to the bookmark you wish to remove, click on the options menu (usually represented by three dots), and select "Delete".`,
  },
  {
    question: 'Can I access my bookmarks from different devices?',
    answer: `Yes, you can access your saved bookmarks from any device, anytime, as long as you have internet access.`,
  },
  {
    question: 'Do you have a browser extension?',
    answer:
      'Yes, we have a chrome extension at the moment, more browser support is coming soon. You can download it from the Chrome Web Store by searching it or click the link in browser extensions section above.',
  },
  {
    question: 'Is there a limit to how many bookmarks I can save?',
    answer: `We offers enough storage for all your bookmarks. If you have concerns about storage, consider organizing and removing bookmarks you no longer need.`,
  },
  {
    question: 'I have more questions, how can I contact you?',
    answer: `If you have more questions, you can contact us through the app\'s "Help" section in profile menu or send us an email at support@bmrk.cc.`,
  },
];

export default function Faq() {
  return (
    <div className="mx-auto my-8 mt-20 sm:mt-20 flex flex-col items-center">
      <h2 className="mt-4 mb-1 text-3xl font-extrabold text-center tracking-[-0.03em] text-primary sm:text-4xl sm:leading-[3.5rem]">
        <span className="bg-gradient-to-r from-neutral-950 to-neutral-950 bg-clip-text text-transparent mt-1 inline-flex">
          Frequently Asked Questions
        </span>
      </h2>
      <div className="mt-5 max-w-md flex w-full flex-col">
        <Accordion className="max-w-md" type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger className="!text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-neutral-600 text-base leading-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
