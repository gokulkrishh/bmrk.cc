'use client';

import UploadForm from 'components/form/upload';

export default function UploadBookmarks() {
  return (
    <div className="flex mt-10 flex-col items-center justify-center">
      <UploadForm
        SubmitBtn={({
          children,
          disabled,
        }: {
          children: any;
          disabled: boolean;
        }) => (
          <button
            disabled={disabled}
            type="submit"
            className="items-center mt-10 h-[48px] tracking-wide disabled:cursor-not-allowed disabled:bg-accent disabled:border-border rounded-full text-primary border border-border focus:outline-0 active:bg-accent text-sm flex justify-center py-2 px-5 transition-colors bg-primary-foreground hover:bg-accent"
          >
            {children}
          </button>
        )}
      />
    </div>
  );
}
