import Header from 'components/header';
import SettingsAccount from 'components/settings/account';
import DeleteAccount from 'components/settings/delete-account';
import ExportBookmarks from 'components/settings/export-bookmarks';

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
      <div className="min-h-dvh border-r border-neutral-200 pb-24 flex gap-6 flex-col px-4 py-4">
        <div className="flex flex-col">
          <h2 className="font-medium mb-2">General</h2>
          <div className="flex flex-col gap-6">
            <SettingsAccount />
            <ExportBookmarks />
          </div>
        </div>
        <div>
          <h2 className="font-medium mb-2">Danger Zone</h2>
          <DeleteAccount />
        </div>
      </div>
    </>
  );
}
