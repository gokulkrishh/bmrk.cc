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
          <div className="text-sm mt-1 text-muted-foreground">
            Instantly export your bookmarks as an HTML or CSV file.
          </div>
        </div>
      </div>
      <div className="flex w-full justify-end border-t bg-background border-border rounded-bl-md rounded-br-md p-1.5 px-3.5">
        <DropdownMenu>
          <DropdownMenuTrigger
            disabled={loadingHTML || loadingCSV}
            className="items-center tracking-wide disabled:cursor-not-allowed disabled:bg-accent disabled:border-border rounded-full text-primary border border-border focus:outline-0 active:bg-accent text-sm flex justify-center py-2 h-[36px] px-3 bg-primary-foreground hover:bg-accent"
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
                <Loader className="text-pimary-foreground w-3.5 h-3.5 mr-1.5" />
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
                <Loader className="text-pimary-foreground w-3.5 h-3.5 mr-1.5" />
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
