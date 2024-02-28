'use client';

import { useState } from 'react';

import { messages } from 'config';
import { toast } from 'sonner';

import { setImagePreview } from 'app/actions/user';

import { useUser } from 'components/context/user';
import { Switch } from 'components/ui/switch';

import { User } from 'types/data';

import PlanTooltip from './plan-tooltip';
import SettingsCard from './settings-card';
import { ThemeToggle } from './theme-toggle';

export default function Appearance() {
  const { user } = useUser();
  const [state, setState] = useState<boolean>(Boolean(user.preview_image));

  const turnOnPreview = async () => {
    try {
      setState(!state);
      await setImagePreview(!state);
      if (!state) {
        toast.info(messages.imagePreview, {
          duration: 6000,
        });
      } else {
        toast.success(`Image preview is turned off`);
      }
    } catch {
      setState(state);
      toast.error('Unable to set image preview, try again.');
    }
  };

  return (
    <>
      <SettingsCard className="flex p-3.5 py-4">
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="font-medium">Appearance</h3>
            <div className="text-sm mt-1 text-muted-foreground max-sm:w-[90%]">
              Change how this app looks and feels in your browser.
            </div>
          </div>
          <ThemeToggle />
        </div>
      </SettingsCard>
      <SettingsCard className="flex p-3.5 py-4 relative">
        <PlanTooltip
          type="info"
          className="absolute right-3 top-3.5"
          text={messages.imagePreview}
        />
        <div className="flex justify-between items-center w-full">
          <div>
            <h3 className="font-medium">Image Preview</h3>
            <div className="text-sm mt-1 text-muted-foreground max-sm:w-[90%]">
              Turn on or off the image preview associated with each bookmark.
            </div>
          </div>
          <Switch
            onCheckedChange={async () => {
              await turnOnPreview();
            }}
            checked={state}
            className="mt-6"
          />
        </div>
      </SettingsCard>
    </>
  );
}
