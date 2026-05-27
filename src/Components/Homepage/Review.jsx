"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const reviews = [
  {
    id: 1,
    name: "Rafiul Islam",
    role: "Football Player",
    photo: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "Absolutely world-class facilities. The turf quality is unmatched and booking was seamless. Will definitely come back every weekend!",
    facility: "Green Arena",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Badminton Enthusiast",
    photo: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    text: "The indoor courts are spotless and well-maintained. Staff is super friendly and the lighting is perfect for evening sessions.",
    facility: "Smash Court",
  },
  {
    id: 3,
    name: "Tanvir Ahmed",
    role: "Cricket Coach",
    photo: "https://i.pravatar.cc/150?img=15",
    rating: 4,
    text: "Great practice nets and ample space for team drills. Booking system is very convenient. Highly recommended for serious players.",
    facility: "Cricket Hub",
  },
  {
    id: 4,
    name: "Sadia Rahman",
    role: "Yoga Instructor",
    photo: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    text: "The studio space is calm, clean and perfectly sized. Natural lighting makes every session feel refreshing. Love this place!",
    facility: "Yoga & Wellness Studio",
  },
  {
    id: 5,
    name: "Mehedi Hasan",
    role: "Basketball Player",
    photo: "https://i.pravatar.cc/150?img=18",
    rating: 4,
    text: "Solid court with good grip. The locker rooms are clean and the overall vibe is very professional. Great value for money.",
    facility: "Indoor Basketball Hub",
  },
  {
    id: 6,
    name: "Lamia Sultana",
    role: "Swimmer",
    photo: "https://i.pravatar.cc/150?img=44",
    rating: 5,
    text: "The pool is always crystal clear and the lanes are well-marked. Early morning slots are perfect. Best swimming facility in Dhaka!",
    facility: "Blue Wave Swimming Complex",
  },
];

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        className={`w-4 h-4 ${star <= rating ? "text-[#ccff00]" : "text-slate-800"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="bg-slate-900 rounded-2xl border border-slate-800/80 shadow-md p-6 flex flex-col gap-4 h-full hover:border-slate-750 transition-all duration-200">
    <StarRating rating={review.rating} />
    <p className="text-slate-300 text-sm leading-relaxed flex-1">
      "{review.text}"
    </p>
    <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
      <div className="w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center text-white text-xs font-bold shrink-0">
        <Image
          height={40}
          width={40}
          src={review.photo}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover border border-slate-800"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-white">{review.name}</p>
        <p className="text-xs text-slate-400">
          {review.role} · {review.facility}
        </p>
      </div>
    </div>
  </div>
);

const Review = () => {
  const [swiper, setSwiper] = useState(null);

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xs font-semibold tracking-widest text-[#ccff00] uppercase mb-2"
          >
            What People Say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white"
          >
            Player Reviews
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-400 text-sm mt-1.5"
          >
            Real experiences from real athletes across our facilities.
          </motion.p>
        </div>

        {/* Nav Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex gap-2 shrink-0"
        >
          <button
            onClick={() => swiper?.slidePrev()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => swiper?.slideNext()}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </motion.div>
      </div>

      {/* Swiper */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Swiper
          modules={[Autoplay, Pagination]}
          onSwiper={setSwiper}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewCard review={review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
};

export default Review;
