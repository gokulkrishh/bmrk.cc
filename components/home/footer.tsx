import Link from 'next/link';

import { urls } from 'config';

import { cn } from 'lib/utils';

import FooterSection from './footer-section';

export default function Footer({ className }: { className?: string }) {
  return (
    <footer
      className={cn(
        'flex w-full justify-center mt-8 items-center flex-col',
        className,
      )}
    >
      <FooterSection />
      <div className="w-full mt-8 p-4 flex justify-between text-[13px] border-t">
        <div className="w-full sm:max-w-4xl flex-col sm:flex-row sm:gap-2 gap-4 mx-auto flex justify-between text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()} Bookmark It. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
