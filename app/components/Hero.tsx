"use client";

import { useState, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Pure Ayurvedic Wellness",
      subtitle: "NATURAL HEALING",
      description: "Ancient wisdom meets modern wellness for your daily routine",
      buttonText: "Shop Now",
      image:
        "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bgColor: "from-brown-600 to-brown-800",
    },
    {
      title: "Handcrafted with Love",
      subtitle: "PREMIUM QUALITY",
      description: "Each product carefully crafted using traditional methods",
      buttonText: "Explore Products",
      image:
        "https://images.pexels.com/photos/3685539/pexels-photo-3685539.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bgColor: "from-gold-600 to-gold-800",
    },
    {
      title: "Natural Beauty Solutions",
      subtitle: "SKIN & HAIR CARE",
      description:
        "Transform your beauty routine with nature's finest ingredients",
      buttonText: "Discover Range",
      image:
        "https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      bgColor: "from-brown-700 to-brown-900",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="relative h-screen">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? "opacity-100 translate-x-0"
                : index < currentSlide
                ? "opacity-0 -translate-x-full"
                : "opacity-0 translate-x-full"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor}`}>
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${slide.image})` }}
              ></div>

              <div className="absolute top-20 left-20 w-20 h-20 bg-gold-300/30 rounded-full animate-float"></div>
              <div
                className="absolute bottom-40 right-32 w-32 h-32 bg-cream-300/30 rounded-full animate-float"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/2 left-1/4 w-16 h-16 bg-brown-200/30 rounded-full animate-float"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>

            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-white animate-fade-in-up">
                  <h2 className="text-lg font-medium mb-2 text-gold-300 tracking-wider">
                    {slide.subtitle}
                  </h2>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg sm:text-xl lg:text-2xl text-cream-100 mb-8 max-w-2xl font-light leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 items-start">
                    <Link
                      href="/products"
                      className="group bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                    >
                      <span>{slide.buttonText}</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>

                  <div className="flex justify-start space-x-8 text-center mt-12">
                    <div className="animate-scale-in" style={{ animationDelay: "0.5s" }}>
                      <div className="text-3xl font-bold text-gold-300 font-serif">100%</div>
                      <div className="text-cream-200 text-sm">Natural</div>
                    </div>
                    <div className="animate-scale-in" style={{ animationDelay: "0.7s" }}>
                      <div className="text-3xl font-bold text-gold-300 font-serif">5000+</div>
                      <div className="text-cream-200 text-sm">Happy Customers</div>
                    </div>
                    <div className="animate-scale-in" style={{ animationDelay: "0.9s" }}>
                      <div className="text-3xl font-bold text-gold-300 font-serif">20+</div>
                      <div className="text-cream-200 text-sm">Premium Products</div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block animate-slide-in-right">
                  <div className="relative">
                    <img
                      src="/assets/product-1.jpg"
                      alt="AYUMIST Products"
                      className="w-full max-w-lg mx-auto rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute -top-4 -right-4 bg-gold-500 text-white px-4 py-2 rounded-full font-semibold animate-bounce-in">
                      New Arrival
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20   hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 z-20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-gold-400 w-8"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;