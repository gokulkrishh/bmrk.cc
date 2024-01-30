import Header from 'components/header';
import SettingsAccount from 'components/settings/account';
import DeleteAccount from 'components/settings/delete-account';

const title = 'Bookmark it. | Settings';
const description = 'Bookmark manager for the modern web.';

export const metadata = {
  title,
  description,
};

export default async function Page() {
  return (
    <>
      <Header headerText="Settings" />
      <div className="min-h-dvh border-r border-neutral-200 pb-24 flex gap-6 flex-col px-4 py-6">
        <div>
          <h2 className="font-medium mb-2">Account</h2>
          <SettingsAccount />
        </div>
        <div>
          <h2 className="font-medium mb-2">Danger Zone</h2>
          <DeleteAccount />
        </div>
      </div>
    </>
  );
}
