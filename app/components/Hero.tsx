"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Pure Ayurvedic Wellness",
      subtitle: "NATURAL HEALING",
      description:
        "Ancient wisdom meets modern wellness for your daily routine",
      buttonText: "Shop Now",
      image:
        "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      gradient: "from-[#8B5E3C] to-[#4B3621]", // earthy brown shades
    },
    {
      id: 2,
      title: "Handcrafted with Love",
      subtitle: "PREMIUM QUALITY",
      description: "Each product carefully crafted using traditional methods",
      buttonText: "Explore Products",
      image:
        "https://images.pexels.com/photos/3685539/pexels-photo-3685539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      gradient: "from-[#D4AF37] to-[#B8860B]", // gold tones
    },
    {
      id: 3,
      title: "Natural Beauty Solutions",
      subtitle: "SKIN & HAIR CARE",
      description:
        "Transform your beauty routine with nature's finest ingredients",
      buttonText: "Discover Range",
      image:
        "https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      gradient: "from-[#7B3F00] to-[#3E2723]", // dark brown
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative h-screen">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="rounded-lg"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className={`relative h-screen w-full`}>
                {/* Gradient + background image overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                </div>

                {/* Floating blobs */}
                <div className="absolute top-20 left-20 w-20 h-20 bg-yellow-300/30 rounded-full animate-float"></div>
                <div
                  className="absolute bottom-40 right-32 w-32 h-32 bg-amber-200/30 rounded-full animate-float"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute top-1/2 left-1/4 w-16 h-16 bg-orange-200/30 rounded-full animate-float"
                  style={{ animationDelay: "2s" }}
                ></div>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-white animate-fade-in-up">
                      <h2 className="text-lg font-medium mb-2 text-yellow-200 tracking-wider">
                        {slide.subtitle}
                      </h2>
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                        {slide.title}
                      </h1>
                      <p className="text-lg sm:text-xl lg:text-2xl text-amber-100 mb-8 max-w-2xl font-light leading-relaxed">
                        {slide.description}
                      </p>

                      <Link
                        href="/products"
                        className="group bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                      >
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>

                      {/* Stats */}
                      <div className="flex justify-start space-x-8 text-center mt-12">
                        <div className="animate-scale-in">
                          <div className="text-3xl font-bold text-yellow-300 font-serif">
                            100%
                          </div>
                          <div className="text-yellow-100 text-sm">Natural</div>
                        </div>
                        <div className="animate-scale-in" style={{ animationDelay: "0.5s" }}>
                          <div className="text-3xl font-bold text-yellow-300 font-serif">
                            5000+
                          </div>
                          <div className="text-yellow-100 text-sm">Happy Customers</div>
                        </div>
                        <div className="animate-scale-in" style={{ animationDelay: "0.7s" }}>
                          <div className="text-3xl font-bold text-yellow-300 font-serif">
                            20+
                          </div>
                          <div className="text-yellow-100 text-sm">Premium Products</div>
                        </div>
                      </div>
                    </div>

                    {/* Product Image */}
                    <div className="hidden lg:block animate-slide-in-right">
                      <div className="relative">
                        <img
                          src="/assets/product-1.jpg"
                          alt="AYUMIST Products"
                          className="w-[300px] mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute -top-4 right-28 bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold animate-bounce-in">
                          New Arrival
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="custom-prev absolute top-1/2 left-4 -translate-y-1/2 z-20 w-9 h-9 bg-white/70 text-black rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition">
                  <ChevronLeft className="w-6 h-6" />
                </div>

                <div className="custom-next absolute top-1/2 right-4 -translate-y-1/2 z-20 w-9 h-9 bg-white/70 text-black rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition">
                  <ChevronRight className="w-6 h-6" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>


      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
