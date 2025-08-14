'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon } from '@heroicons/react/24/outline';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <button onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}>
        <SunIcon className="size-10 border-1 border-default-200 rounded-full p-2 hover:opacity-80 text-default-500 mx-2" />
      </button>
    </div>
  );
}
