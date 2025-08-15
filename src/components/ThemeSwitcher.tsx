'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { Button } from '@heroui/react';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button 
      isIconOnly 
      onPress={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
      variant="bordered" 
      radius="full"
      className="hover:opacity-80 border-1 border-default-200 text-default-500"
    >
      {theme === 'dark' ? (
        <SunIcon className="size-5" /> 
      ) : (
        <MoonIcon className="size-5" />
      )}
    </Button>
  );
}
