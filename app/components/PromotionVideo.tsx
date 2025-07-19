"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
interface VideoType {
  video: string;
}

const promotionVideo: VideoType[] = [
  { video: "/assets/video1.mp4" },
  { video: "/assets/video3.mp4" },
  { video: "/assets/video1.mp4" },
  { video: "/assets/video1.mp4" },
  { video: "/assets/video1.mp4" },
  { video: "/assets/video1.mp4" },
 
];

const PromotionVideo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };
  const toggleMute = (video: HTMLVideoElement) => {
    video.muted = !video.muted;
  };
  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-brown-600 text-[40px] font-[500]">Wacth and Buy</h1>
      </div>
      <div className=" py-5 mt-3 relative">
        <div ref={scrollRef} className="flex gap-8 overflow-scroll py-5 scroll-smooth ">
          {promotionVideo.map((item, index) => (
            <video
              className="rounded-[15px] transform transition-transform duration-300 hover:scale-105 "
              key={index}
              width="170"
              muted
              loop
              autoPlay
              playsInline
              onClick={(e) => toggleMute(e.currentTarget)}
            >
              <source src={item.video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}
          <button onClick={handleScrollLeft} className="absolute top-[40%] left-0 bg-black/40 h-20 flex w-10 items-center justify-center rounded-e-[10px]">
            <ChevronLeft className="text-[#fff]"/>
            </button>
          <button onClick={handleScrollRight } className="absolute top-[40%] right-0 bg-black/40 h-20 flex w-10 items-center justify-center rounded-s-[10px]">
            <ChevronRight className="text-[#fff]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionVideo;
