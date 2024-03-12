'use client';

import { useRouter } from 'next/navigation';

import { CircleArrowLeft } from 'lucide-react';

export default function BackLink() {
  const router = useRouter();
  return (
    <button
      className="flex active:opacity-90 w-40 items-center p-3 text-primary justify-end"
      onClick={() => {
        router.back();
      }}
    >
      <CircleArrowLeft className="w-5 h-5 shrink-0 text-primary mr-2" /> go back
    </button>
  );
}
