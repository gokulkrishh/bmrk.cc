'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'components/ui/accordion';

const faqs = [
  {
    question: 'Can I Import unlimited bookmarks?',
    answer: `Yes, for the first time, you can import unlimited bookmarks. Both for free and pro plan, after that, you can import bookmarks within the limit of your plan.`,
  },
  {
    question: 'When does usage reset happens?',
    answer: `Usage reset happens on same day every month once based current billings cycle. You can view the usage info under settings page.`,
  },
  {
    question: 'How do I delete a bookmark?',
    answer: `To delete any bookmark, click on the options menu (represented by three dots) and then select "Delete".`,
  },
  {
    question: 'Can I access my bookmarks from different devices?',
    answer: `Yes, you can access your saved bookmarks from any device via web browser, anytime, as long as you have internet access.`,
  },
  {
    question: 'Do you have a browser extension?',
    answer:
      'Yes, you can download it from the Web Store by searching it or click the link in browser extensions section above.',
  },
  {
    question: 'I have more questions, how can I contact you?',
    answer: `You can contact us through the app\'s "Help" link in profile menu or send us an email to "support@bmrk.cc".`,
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
