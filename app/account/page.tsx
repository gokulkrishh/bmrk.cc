import AccountButton from 'components/account-button';
import { Logo } from 'components/icons';

const title = 'Bookmark it. | Account';
const description = 'Bookmark manager for the modern web.';

export const metadata = {
  title,
  description,
};

export default async function Page() {
  return (
    <div className="flex flex-col max-w-sm min-h-screen mx-auto w-full">
      <main className="flex flex-col justify-center min-h-screen px-4 items-center">
        <div className="flex justify-center w-full">
          <Logo className="mb-4 w-16 h-16" />
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="font-bold text-center tracking-tight text-2xl mb-1">
            Login to Bookmark It.
          </h1>
          <p className="text-neutral-600 w-full text-center medium mx-auto mt-0 tracking-normal mb-5">
            Bookmark manager for the modern web.
          </p>
          <AccountButton />
        </div>
      </main>
    </div>
  );
}
