"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ThemeToggleButton from "../ui/theme-toggle-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: session } = useSession();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isSearchOpen]);

  const user = session?.user;

  // Navigation items
  const navItems = [
    { name: "Hospitals", href: "/hospitals" },
    { name: "Medicines", href: "/medicines" },
    { name: "Insurance", href: "/insurance" },
    { name: "Consultations", href: "/consultations" },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle search logic here
      console.log("Searching for:", searchQuery);
      // You can add navigation or API call here
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b" : ""
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* LOGO */}
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={190}
                height={190}
                className="w-32 h-32 md:w-40 md:h-40"
                priority
              />
            </Link>

            {/* Desktop Navigation Items */}
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6">
              {/* Premium Search Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsSearchOpen(true)}
                className="relative group bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-slate-100 dark:via-white dark:to-slate-100 text-white dark:text-black border-slate-700 dark:border-slate-300 hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 dark:hover:from-slate-200 dark:hover:via-slate-100 dark:hover:to-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Search className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-medium">Search</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <ThemeToggleButton />

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user.image || ""}
                        alt={user.name || ""}
                      />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {user.email}
                        </span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => signOut({ callbackUrl: "/auth" })}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  className="text-lg  bg-[#10B981] hover:bg-[#0ea271] text-white"
                >
                  <Link href="/auth">Login / Signup</Link>
                </Button>
              )}
            </nav>

            {/* MOBILE MENU BUTTON */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Search Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-100 dark:to-white text-white dark:text-black border-slate-700 dark:border-slate-300 hover:scale-105 transition-transform duration-300"
              >
                <Search className="w-4 h-4" />
              </Button>

              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t bg-background"
            >
              <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {/* Mobile Navigation Items */}
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium py-2 transition-colors hover:text-primary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="border-t pt-4 mt-2">
                  <ThemeToggleButton />
                </div>

                {user ? (
                  <Button
                    variant="destructive"
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button variant="default">
                    <Link href="/auth">Login / Signup</Link>
                  </Button>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Premium Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
              }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Search Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="fixed top-20 left-1/2 transform -translate-x-1/2 w-[90%] max-w-2xl z-[70]"
            >
              <div className="bg-background/95 backdrop-blur-xl border rounded-2xl shadow-2xl p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search for hospitals, medicines, consultations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-muted/50 border-0 rounded-xl text-lg placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:bg-muted rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Quick Search Suggestions */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 border-t">
                    {[
                      "Hospitals",
                      "Medicines",
                      "Insurance",
                      "Consultations",
                    ].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setSearchQuery(suggestion);
                          if (suggestion.trim()) {
                            // Handle search logic here
                            console.log("Searching for:", suggestion);
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }
                        }}
                        className="text-xs bg-muted/50 hover:bg-muted border-0 rounded-lg transition-colors duration-200"
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </form>

                {/* Search Tips */}
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground text-center">
                    Press{" "}
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">
                      Esc
                    </kbd>{" "}
                    to close or{" "}
                    <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px]">
                      Enter
                    </kbd>{" "}
                    to search
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
