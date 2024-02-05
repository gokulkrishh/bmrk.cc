'use client';

import SettingsCard from './settings-card';
import { ThemeToggle } from './theme-toggle';

export default function Appearance() {
  return (
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
  );
}
