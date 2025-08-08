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

export default function NavigationBar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
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
          <Popover placement="bottom-end">
            <PopoverTrigger color="foreground" radius="full">
              <Button isIconOnly>
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px">
                  <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                </svg>
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
