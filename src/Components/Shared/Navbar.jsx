"use client";

import { authClient } from "@/lib/auth-client";
import { CloseIcon } from "@heroui/react";
import { TrophyIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const guestLinks = [
    { label: "Home", href: "/" },
    { label: "All Facilities", href: "/facilities" },
  ];

  const authLinks = [
    { label: "Home", href: "/" },
    { label: "All Facilities", href: "/facilities" },
    { label: "My Bookings", href: "/bookings" },
    { label: "Add Facility", href: "/facilities-add" },
    { label: "Manage My Facilities", href: "/facilities-manage" },
  ];

  const navLinks = user ? authLinks : guestLinks;

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#060813] border-b border-slate-800/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 bg-[#ccff00] text-black rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(204,255,0,0.4)]">
                <TrophyIcon className="h-4.5 w-4.5 stroke-[2.5]" />
              </div>
              <span className="text-[16px] font-black text-white tracking-wider uppercase">
                Volt<span className="text-[#ccff00]">Arena</span>
              </span>
            </Link>
 
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm px-3 py-1.5 rounded-md transition-all duration-150 font-medium
                                    ${
                                      pathname === link.href
                                        ? "text-[#ccff00] border-b-2 border-[#ccff00]"
                                        : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
 
            {/* Right Side */}
            <div className="flex items-center gap-2">
              {!user && (
                <button
                  onClick={() => router.push("/login")}
                  className="hidden md:inline-flex items-center bg-[#ccff00] hover:bg-[#ccff00]/90 text-black text-sm font-bold px-5 py-1.5 rounded-lg transition-colors duration-150 shadow-[0_0_10px_rgba(204,255,0,0.3)]"
                >
                  Login
                </button>
              )}
 
              {user && (
                <div className="relative hidden md:block" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-semibold text-white hover:bg-slate-700 transition-colors overflow-hidden"
                  >
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        height={44}
                        width={44}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      (user.name?.[0] || "U").toUpperCase()
                    )}
                  </button>
 
                  {dropdownOpen && (
                    <div className="absolute right-0 top-10 w-52 bg-[#111827] rounded-xl border border-slate-800 shadow-xl py-1.5 z-50">
                      <div className="px-4 py-2.5 border-b border-slate-800 mb-1">
                        <p className="text-sm font-semibold text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {user.email}
                        </p>
                      </div>
 
                      {[
                        { label: "My Bookings", href: "/bookings" },
                        { label: "Add Facility", href: "/facilities-add" },
                        {
                          label: "Manage My Facilities",
                          href: "/facilities-manage",
                        },
                      ].map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
 
                      <div className="border-t border-slate-800 mt-1 pt-1">
                        <button
                          onClick={async () => {
                            await authClient.signOut();
                            setMobileMenuOpen(false);
                            router.push("/");
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-950/20 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
 
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden w-8 h-8 flex items-center justify-center border border-slate-800 rounded-md text-slate-300 hover:bg-slate-800 transition-colors"
              >
                <HamburgerIcon />
              </button>
            </div>
          </div>
        </div>
      </header>
 
      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-64 bg-[#060813] border-l border-slate-800 shadow-xl p-4">
            <div className="flex justify-end">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center border border-slate-800 rounded-md text-slate-400 hover:bg-slate-850 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>
 
            <nav className="flex flex-col mt-4 gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm px-3 py-1.5 rounded-md transition-all duration-150 font-medium
                                        ${
                                          pathname === link.href
                                            ? "text-[#ccff00] bg-slate-800/40"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800/30"
                                        }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
 
            {/* Bottom Login / Logout */}
            <div className="mt-6">
              {!user ? (
                <button
                  onClick={() => {
                    router.push("/login");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full bg-[#ccff00] hover:bg-[#ccff00]/90 text-black text-sm font-bold py-2.5 rounded-lg transition-colors"
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={async () => {
                    await authClient.signOut();
                    setMobileMenuOpen(false);
                    router.push("/");
                  }}
                  className="w-full border border-red-900/50 text-red-400 hover:bg-red-950/20 text-sm font-medium py-2.5 rounded-lg transition-colors"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
function HamburgerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {" "}
      <line x1="3" y1="6" x2="21" y2="6" />{" "}
      <line x1="3" y1="12" x2="21" y2="12" />{" "}
      <line x1="3" y1="18" x2="21" y2="18" />{" "}
    </svg>
  );
}

export default Navbar;
