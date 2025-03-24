import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

export default function ImageGallery({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Swiper */}
      <Swiper
        spaceBetween={10}
        loop
        watchSlidesProgress
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="h-[280px]"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      {/* <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={6}
        slidesPerView={3.3}
        freeMode
        watchSlidesProgress
        slideToClickedSlide
        loop
        modules={[Thumbs]}
        className="cursor-pointer max-w-[360px] slider-thumb"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img src={src} alt={`Thumb ${index}`} className="w-[100px] h-[60px] object-cover rounded-lg" />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}
