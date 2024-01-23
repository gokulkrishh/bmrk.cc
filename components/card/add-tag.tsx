import { useState } from 'react';

import { Tags } from 'lucide-react';

import { cn } from 'lib/utils';

export default function AddTag() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className={cn(
          `flex items-center gap-1 hover:opacity-90 active:opacity-90`,
          { '!opacity-100': open }
        )}
      >
        <Tags className="w-4 h-4 text-blue-500" />
      </button>
    </div>
  );
}
