import Header from 'components/header';
import SettingsAccount from 'components/settings/account';
import Appearance from 'components/settings/appearance';
import DeleteAccount from 'components/settings/delete-account';
import DeleteData from 'components/settings/delete-data';
import ExportBookmarks from 'components/settings/export-bookmarks';
import Plans from 'components/settings/plans';

const title = 'Bookmark it. | Settings';
const description =
  'Bookmark It. is an open-source bookmark manager to organize, discover and personalize your bookmarking experience';

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
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="font-medium mb-2">Plan & Usage</h2>
          <div className="flex flex-col gap-6">
            <Plans />
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="font-medium mb-2">Data</h2>
          <div className="flex flex-col gap-6">
            <ExportBookmarks />
            {/* <DeleteData /> */}
          </div>
        </div>
        <div>
          <h2 className="font-medium mb-2">Danger Zone</h2>
          <div className="flex flex-col gap-6">
            <DeleteAccount />
          </div>
        </div>
      </div>
    </>
  );
}
