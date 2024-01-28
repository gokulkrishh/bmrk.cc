'use client';

import { useState } from 'react';

import SignupModal from 'components/modal/signup';

export default function Signup() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="rounded-full inline-flex text-sm items-center disabled:bg-red-200 focus:outline-0 bg-neutral-950 focus:bg-neutral-800 active:bg-neutral-800 hover:bg-neutral-800 border-0 py-2 px-4 text-white"
      >
        Sign up
      </button>
      {open ? <SignupModal open={open} onHide={setOpen} /> : null}
    </>
  );
}
