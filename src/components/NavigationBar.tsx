'use client';
import { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { UserIcon } from '@heroicons/react/24/outline';

export default function NavigationBar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen} className='bg-opacity-40'>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand>
          <p className="font-bold text-inherit text-xl">JobsTracker</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <p className="font-bold text-inherit text-xl">JobsTracker</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <NavbarItem isActive={pathname === '/dashboard'}>
          <Link
            color={pathname === '/dashboard' ? 'primary' : 'foreground'}
            aria-current={pathname === '/dashboard' ? 'page' : undefined}
            href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === '/applications'}>
          <Link
            color={pathname === '/applications' ? 'primary' : 'foreground'}
            aria-current={pathname === '/applications' ? 'page' : undefined}
            href="/applications">
            Applications
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* user menu */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitcher />
          <Popover placement="bottom-end">
            <PopoverTrigger color="foreground" radius="full">
              <Button isIconOnly>
                <UserIcon className="size-10 border-1 border-default-200 rounded-full p-2 hover:opacity-80 text-default-500" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0">
              {user ? (
                <Button onPress={logout} variant="light" color="danger" className="w-full">
                  Log Out
                </Button>
              ) : (
                <Button onPress={logout} variant="light" className="w-full">
                  <Link href="/login">Log In</Link>
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>

      {/* mobile menu */}
      <NavbarMenu>
        {user ? (
          <>
            <NavbarMenuItem>
              <Link
                className="w-full"
                color={pathname === '/dashboard' ? 'primary' : 'foreground'}
                href="/dashboard"
                size="lg">
                Dashboard
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full"
                color={pathname === '/applications' ? 'primary' : 'foreground'}
                href="/applications"
                size="lg">
                Applications
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link className="w-full" color="danger" href="/applications" size="lg" onPress={logout}>
                Log Out
              </Link>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link className="w-full" color="foreground" href="/login" size="lg">
                Log In
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link className="w-full" color="foreground" href="/register" size="lg">
                Sign Up
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
