"use client";
import { MailCheck, MapPinCheck } from "lucide-react";
import Link from "next/link";
import { BiPhone, BiTrophy } from "react-icons/bi";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { PiXLogo } from "react-icons/pi";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#060813] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.3)]">
              <BiTrophy className="h-5 w-5" />
            </div>
            <span className="text-lg font-black tracking-wider uppercase text-white">
              Volt<span className="text-[#ccff00]">Arena</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-slate-400">
            Book the best high-performance sports facilities in your city, by the hour. From elite turf fields to cyber tennis courts and neon cycling tracks.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>
              <Link href="/" className="hover:text-[#ccff00] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/facilities" className="hover:text-[#ccff00] transition-colors">
                All Facilities
              </Link>
            </li>
            <li>
              <Link href="/facilities-add" className="hover:text-[#ccff00] transition-colors">
                List your facility
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex items-center gap-2 hover:text-white transition-colors">
              <MailCheck className="h-4 w-4 text-[#ccff00]" /> hello@voltarena.app
            </li>
            <li className="flex items-center gap-2 hover:text-white transition-colors">
              <BiPhone className="h-4 w-4 text-[#ccff00]" /> +1 (555) 010-2025
            </li>
            <li className="flex items-center gap-2 hover:text-white transition-colors">
              <MapPinCheck className="h-4 w-4 text-[#ccff00]" /> 221B Sports St, NY
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">Follow us</h4>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition-all hover:bg-slate-800 hover:text-[#ccff00]"
              aria-label="Facebook"
            >
              <FaFacebook className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition-all hover:bg-slate-800 hover:text-[#ccff00]"
              aria-label="Instagram"
            >
              <FaInstagram className="h-4 w-4" />
            </a>
            <a
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition-all hover:bg-slate-800 hover:text-[#ccff00]"
              aria-label="X"
            >
              <PiXLogo className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800/80">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} VoltArena. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
