"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const tabs = [
  "Training",
  "Competition",
  "Friendly Match",
  "Personal Time",
  "Programs",
];

const CoachingSection = () => {
  return (
    <section className="w-full bg-[#080d19] py-10 md:py-16 px-4 border-y border-slate-800/40">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight uppercase tracking-tight">
            Expert Coaching & <br />
            Facilities Built for Success.
          </h2>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {tabs.map((tab, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-300 cursor-pointer ${
                  i === 0
                    ? "bg-[#ccff00] text-black border-[#ccff00] font-bold shadow-[0_0_12px_rgba(204,255,0,0.35)]"
                    : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-10">
          {/* Left Large Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-6 rounded-3xl overflow-hidden relative h-[500px]"
          >
            <Image
              src="/assets/cycling.jpg"
              height={500}
              width={500}
              alt="Elite cycling track"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          </motion.div>

          {/* Right Side */}
          <div className="md:col-span-6 flex flex-col gap-4">
            {/* Top Right Image */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden h-[240px]"
              >
                <Image
                  src="/assets/basketball.jpg"
                  alt="Elite basketball court"
                  height={400}
                  width={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-550"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden h-[240px]"
              >
                <Image
                  src="/assets/football.jpg"
                  alt="Elite football stadium"
                  height={400}
                  width={400}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-550"
                />
              </motion.div>
            </div>

            {/* Bottom Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#8b5cf6] to-[#5b21b6] rounded-3xl p-6 text-white relative overflow-hidden min-h-[240px] flex flex-col justify-between shadow-lg"
            >
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight leading-snug">
                  All-in-One Athletic Excellence
                </h3>

                <p className="text-sm text-purple-100 mt-3 max-w-sm">
                  Our facility features elite training amenities, expert coaching, and premium spaces tailored for every athlete.
                </p>
              </div>

              <button className="w-fit mt-6 px-5 py-2 rounded-full border border-white/30 bg-white/10 hover:bg-white hover:text-black transition-all duration-300 text-sm font-bold cursor-pointer">
                Learn More →
              </button>

              {/* Decorative circle */}
              <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full border-[18px] border-white/15"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoachingSection;
