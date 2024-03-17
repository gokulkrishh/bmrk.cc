import type { Metadata } from 'next';

import { ThemeProvider } from 'components/context/theme';
import { NotFoundIcon } from 'components/icons';

import '../globals.css';
import Header from './[tag]/header';

const title = 'Bookmark it. | Not Found';
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience';

export const metadata: Metadata = {
  title,
  description,
};

export default async function NotFound() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Header />
      <div className="min-h-dvh flex items-center flex-col border-r border-l border-border">
        <NotFoundIcon />
      </div>
    </ThemeProvider>
  );
}
