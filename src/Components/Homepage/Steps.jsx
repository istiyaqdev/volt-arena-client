"use client";
import { motion } from "framer-motion";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoSparklesSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";

const Steps = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-black uppercase tracking-tight text-white"
        >
          Book in three steps
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-slate-400 mt-2 font-semibold"
        >
          From search to first whistle in under a minute.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-slate-900/60 rounded-2xl p-6 flex flex-col items-start gap-4 border border-slate-800/80 hover:border-slate-700/80 hover:shadow-xl transition-all duration-300"
        >
          <div className="bg-[#8b5cf6]/10 p-3.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <span className="text-[#ccff00] text-xl">
              <IoSparklesSharp />
            </span>
          </div>
          <h3 className="font-extrabold text-white text-lg tracking-wide uppercase">
            1. Browse
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Filter by sport, location and price to find your perfect arena.
          </p>
        </motion.div>

        {/* Step 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="bg-slate-900/60 rounded-2xl p-6 flex flex-col items-start gap-4 border border-slate-800/80 hover:border-slate-700/80 hover:shadow-xl transition-all duration-300"
        >
          <div className="bg-[#8b5cf6]/10 p-3.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <span className="text-[#ccff00] text-xl">
              <SlCalender />
            </span>
          </div>
          <h3 className="font-extrabold text-white text-lg tracking-wide uppercase">
            2. Pick a slot
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Choose any available hour. Real-time slots, no double bookings.
          </p>
        </motion.div>

        {/* Step 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="bg-slate-900/60 rounded-2xl p-6 flex flex-col items-start gap-4 border border-slate-800/80 hover:border-slate-700/80 hover:shadow-xl transition-all duration-300"
        >
          <div className="bg-[#8b5cf6]/10 p-3.5 rounded-full shadow-[0_0_15px_rgba(139,92,246,0.1)]">
            <span className="text-[#ccff00] text-xl">
              <AiFillThunderbolt />
            </span>
          </div>
          <h3 className="font-extrabold text-white text-lg tracking-wide uppercase">
            3. Play
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Get instant confirmation. Show up, warm up, win.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Steps;
