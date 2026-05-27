"use client";

import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import FeaturedCard from "./FeaturedCard";

const FeaturedSlider = ({ facilities }) => {
  const [swiper, setSwiper] = useState(null);

  return (
    <div className="relative">
      <button
        onClick={() => swiper?.slidePrev()}
        className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer shadow-lg"
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
        className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white transition-all cursor-pointer shadow-lg"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      <Swiper
        modules={[Autoplay, Pagination]}
        onSwiper={setSwiper}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="pb-10"
      >
        {facilities.map((facility) => (
          <SwiperSlide key={facility._id}>
            <FeaturedCard facility={facility} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedSlider;
