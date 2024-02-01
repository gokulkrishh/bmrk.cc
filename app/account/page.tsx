import AccountButton from 'components/account-button';
import { Logo } from 'components/icons';

export default async function Page() {
  return (
    <div className="flex flex-col max-w-sm min-h-screen mx-auto w-full">
      <main className="flex flex-col justify-center min-h-screen px-4 items-center">
        <div className="flex items-start w-full">
          <Logo className="mb-4" />
        </div>
        <div className="flex flex-col w-full">
          <h1 className="font-bold tracking-tight text-3xl mb-1">
            Login to Bookmark It.
          </h1>
          <p className="text-neutral-600 w-full medium mx-auto mt-0 tracking-normal mb-8">
            Bookmark manager for the modern web.
          </p>
          <AccountButton />
        </div>
      </main>
    </div>
  );
}
