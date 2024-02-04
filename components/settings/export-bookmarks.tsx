'use client';

import { useState } from 'react';

import { FileIcon, FileTextIcon } from '@radix-ui/react-icons';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

import { getBookmarks, getBookmarksAsCSV } from 'app/actions/bookmarks';

import Loader from 'components/loader';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu';

import { exportAsCSV, exportAsHTML } from 'lib/bookmarks';
import { formatDate } from 'lib/date';

import SettingsCard from './settings-card';

const dateOptions = { day: 'numeric', month: 'numeric', year: 'numeric' };

export default function ExportBookmarks() {
  const [loadingHTML, setLoadingHTML] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);

  const exportHTML = async () => {
    try {
      setLoadingHTML(true);
      toast.info('Your bookmarks will be exported shortly.');
      const data = await getBookmarks();
      exportAsHTML(
        data,
        `bookmarkit-bookmarks-${formatDate(new Date(), dateOptions)}`,
      );
    } catch (errr) {
      toast.error('Unable to export bookmarks, try again.');
    } finally {
      setLoadingHTML(false);
    }
  };

  const exportCSV = async () => {
    try {
      setLoadingCSV(true);
      toast.info('Your bookmarks will be exported shortly.');
      const data = await getBookmarksAsCSV();
      exportAsCSV(
        data,
        `bookmarkit-bookmarks-${formatDate(new Date(), dateOptions)}`,
      );
    } catch (errr) {
      toast.error('Unable to export bookmarks, try again.');
    } finally {
      setLoadingCSV(false);
    }
  };

  return (
    <SettingsCard className="flex flex-col p-0 items-start">
      <div className="flex flex-col p-3.5 pt-3 pb-0 w-full">
        <div>
          <h3 className="font-medium">Export Bookmarks</h3>
          <div className="text-sm mt-1 text-neutral-600">
            Instantly export your bookmarks as an HTML or CSV file.
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end border-t bg-white border-neutral-300 rounded-bl-md rounded-br-md p-1.5 px-3.5">
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={loadingHTML || loadingCSV}
            className="items-center tracking-wide disabled:cursor-not-allowed disabled:bg-neutral-900/80 disabled:border-neutral-600 rounded-full text-white border border-neutral-900 focus:outline-0 active:bg-neutral-900/80 text-sm flex justify-center py-2 h-[36px] px-3 bg-neutral-900 hover:bg-neutral-900/80"
          >
            {loadingHTML || loadingCSV ? (
              <Loader className="w-4 h-4 mr-1.5" />
            ) : (
              <Download className="w-3.5 h-3.5 mr-1.5" />
            )}{' '}
            Export
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuItem
              disabled={loadingHTML}
              className="flex items-center cursor-pointer"
              onClick={() => {
                exportHTML();
              }}
            >
              {loadingHTML ? (
                <Loader className="text-black w-3.5 h-3.5 mr-1.5" />
              ) : (
                <FileTextIcon className="w-3.5 h-3.5 mr-1.5" />
              )}{' '}
              Export HTML
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={loadingCSV}
              className="flex items-center cursor-pointer"
              onClick={() => {
                exportCSV();
              }}
            >
              {loadingCSV ? (
                <Loader className="text-black w-3.5 h-3.5 mr-1.5" />
              ) : (
                <FileIcon className="w-3.5 h-3.5 mr-1.5" />
              )}{' '}
              Export CSV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SettingsCard>
  );
}
