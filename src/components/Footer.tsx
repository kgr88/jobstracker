'use client';
import { Link } from '@heroui/react';

export default function Footer() {
  return (
    <div className=" border-t-1 border-default-200 dark:border-default-100 w-full text-sm">
      <div className="flex justify-between max-w-6xl mx-auto py-4 px-6">
        <div className="font-bold">JobsTracker</div>
        <div>
          Made by <Link className='text-sm font-bold' href="https://github.com/kgr88">Krystian Gruszecki</Link>
        </div>
      </div>
    </div>
  );
}
