'use client';

import Link from 'next/link';
import Image from "next/image";
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';
import { Menu, X, User, Search } from 'lucide-react';
import { UserMenu } from '@/components/user/user-menu';
import { ThemeToggle } from '@/components/theme-toggle';
import { NotificationDropdown } from '@/components/notifications/notification-dropdown';

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const { sidebarOpen, setSidebarOpen, user } = useAppStore();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full px-6 border-b bg-header backdrop-blur supports-[backdrop-filter]:bg-header"
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="ghost"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="h-16 w-16 rounded-lg flex items-center justify-center"
            >
              <Image src="/assets/kartr_logo.png" alt="logo" width={100} height={100} className="text-primary-foreground font-bold text-2xl" />
            </motion.div>
            <span className="font-bold text-2xl text-title">Kartr</span>
          </Link>
        </div>
{/* 
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Dashboard
          </Link>
          <Link 
            href="/features" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link 
            href="/about" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            About
          </Link>
        </nav> */}

        <div className="flex items-center space-x-2">
          <motion.div
            className={cn(
              "flex items-center space-x-2 transition-all duration-300",
              searchOpen ? "w-64" : "w-auto"
            )}
          >
            {searchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="flex items-center space-x-2"
              >
                <Input
                  autoFocus
                  className="h-6"
                  placeholder="Search..."
                  onBlur={() => setSearchOpen(false)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
          </motion.div>

          {/* <NotificationDropdown /> */}
          <ThemeToggle />
          {user ? <UserMenu /> : (
            <div className="flex items-center space-x-2">
              <Button variant={pathname.includes("login") ? "default" : "ghost"} size="sm" asChild>
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button variant={pathname.includes("register") ? "default" : "ghost"} size="sm" asChild>
                <Link href="/register">
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}