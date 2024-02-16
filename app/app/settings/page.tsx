import Header from 'components/header';
import SettingsAccount from 'components/settings/account';
import Appearance from 'components/settings/appearance';
import DeleteAccount from 'components/settings/delete-account';
import ExportBookmarks from 'components/settings/export-bookmarks';

const title = 'Bookmark it. | Settings';
const description =
  'Bookmark It. is an open-source bookmark manager to organize and personalize your bookmarking experience';

export const metadata = {
  title,
  description,
};

export default async function Page() {
  return (
    <>
      <Header headerText="Settings" />
      <div className="min-h-dvh sm:border-r border-border pb-24 flex gap-6 flex-col px-4 py-4">
        <div className="flex flex-col">
          <h2 className="font-medium mb-2">General</h2>
          <div className="flex flex-col gap-6">
            <SettingsAccount />
            <Appearance />
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
