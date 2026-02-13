"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

// Add this interface
interface NavbarProps {
  showNav?: boolean;
}

export default function Navbar({ showNav = true }: NavbarProps) {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { name: "Doctors", href: "/user/doctors" },
    { name: "Hospitals", href: "/user/hospitals" },
    { name: "Pharmacies", href: "/user/pharmacy" },
    { name: "Labs", href: "/user/labs" },
    { name: "How it works", href: "/user/how-it-works" },
  ];

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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/80 backdrop-blur-md border-b shadow-md" : "bg-white"
        }`}
      >
        <div className="mx-auto max-w-[1287px] h-[72px] flex items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logos.png"
              alt="Open Treatment"
              width={132}
              height={72}
              priority
            />
          </Link>

          {/* Center Links - Desktop (Conditional) */}
          {showNav && (
            <nav className="hidden md:flex items-center gap-[40px]">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-1 text-[14px] font-medium text-gray-700 hover:text-[#39A4F0] transition-colors cursor-pointer"
                >
                  {item.name}
                  <ChevronDown className="w-4 h-4" />
                </Link>
              ))}
            </nav>
          )}

          {/* Right Actions - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSearchOpen(true)}
              className="relative group bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border-slate-700 hover:from-slate-800 hover:via-slate-700 hover:to-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 h-[40px] px-4 rounded-full"
            >
              <Search className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium text-sm">Search</span>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer w-10 h-10 border-2 border-[#39A4F0]">
                    <AvatarImage src={user.image || ""} alt={user.name || ""} />
                    <AvatarFallback className="bg-[#39A4F0] text-white">
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
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/${user.id}/user`}
                      className="w-full cursor-pointer"
                    >
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer text-red-600 focus:text-red-600"
                    onClick={() => signOut({ callbackUrl: "/auth" })}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                className="h-[48px] px-6 rounded-full bg-[#39A4F0] hover:bg-[#2d8fd6] text-white text-sm font-medium"
                asChild
              >
                <Link href="/auth">Sign up</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-slate-700 hover:scale-105 transition-transform duration-300"
            >
              <Search className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
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

        {/* Mobile Menu (Conditional nav links) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t bg-white"
            >
              <nav className="px-6 py-4 flex flex-col gap-4">
                {showNav && navLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[14px] font-medium text-gray-700 py-2 hover:text-[#39A4F0] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className={`border-t pt-4 mt-2 ${!showNav ? 'border-0' : ''}`}>
                  {user ? (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={user.image || ""} alt={user.name || ""} />
                          <AvatarFallback className="bg-[#39A4F0] text-white">
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <Link
                        href={`/${user.id}/user`}
                        className="text-sm font-medium text-gray-700 py-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          signOut({ callbackUrl: "/auth" });
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full h-[48px] rounded-full bg-[#39A4F0] hover:bg-[#2d8fd6] text-white text-sm font-medium"
                      asChild
                    >
                      <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                        Login / Signup
                      </Link>
                    </Button>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 flex items-start justify-center pt-32"
            onClick={() => setIsSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <form onSubmit={handleSearch} className="flex items-center gap-4">
                <Search className="w-6 h-6 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search doctors, hospitals, medicines..."
                  className="flex-1 text-lg outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" className="bg-[#39A4F0] hover:bg-[#2d8fd6]">
                  Search
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">Press ESC to close</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}