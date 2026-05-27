"use client";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { MdArrowRightAlt, MdVerifiedUser } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
const Banner = () => {
  return (
    <div className="relative bg-[url('/assets/tenis.jpg')] text-white flex justify-between flex-col items-center bg-no-repeat bg-cover gap-5 h-160 md:h-140">
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#000000] opacity-40"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-2xl text-center mt-25 md:mt-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-(--text3) mb-6"
          >
            Now booking 1,200+ venues
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="font1 text-4xl md:text-6xl font-black leading-[1.1] mb-6 uppercase tracking-tight"
          >
            Book the perfect{" "}
            <span className="text-[#ccff00] italic">
              sports <br /> arena{" "}
            </span>{" "}
            in seconds.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-slate-300 mb-9 max-w-lg mx-auto px-4 md:px-0 font-medium"
          >
            We combine premium high-performance facilities with seamless instant scheduling to deliver a state-of-the-art booking experience for athletes everywhere.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            viewport={{ once: true }}
            className="flex gap-4 items-center justify-center"
          >
            <Button className=" bg-[#ccff00] rounded-full text-black font-extrabold shadow-[0_0_15px_rgba(204,255,0,0.45)] hover:bg-[#ccff00]/90 transition-all cursor-pointer px-6 py-2.5 ">
              <Link
                href="/facilities"
                className="inline-flex items-center gap-1.5"
              >
                Explore Facilities <MdArrowRightAlt />
              </Link>
            </Button>
            <Button className="border border-slate-700 bg-transparent rounded-full hover:bg-slate-800/40 hover:border-slate-500 transition-all cursor-pointer px-6 py-2.5">
              <Link
                href="/facilities-add"
                className="inline-flex items-center text-white font-bold  "
              >
                List your facility
              </Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            viewport={{ once: true }}
            className="flex gap-4 items-center justify-center mt-7 mb-5 px-4 md:px-0"
          >
            <p className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
              <FaStar className="text-[#ccff00]" /> 4.9 average
            </p>
            <p className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
              <SlCalender className="text-[#ccff00]" />
              Instant booking
            </p>
            <p className="flex items-center gap-2 text-slate-300 text-xs font-semibold">
              <MdVerifiedUser className="text-[#ccff00]" />
              Verified venues
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
