"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { GET_HOMEPAGE_SLIDER } from "@/lib/config";

// Update the interface to handle multiple sliders
interface HomepageSlider {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  details: string;
}

// Define slide style variations
// const slideStyles = [
//   {
//     // BlueBay IT style - Blue gradient
//     bgClass: "bg-gradient-to-r from-[#0066FF] to-[#1A1A1A]",
//     titleClass: "text-white",
//     subtitleClass: "text-gray-100",
//     detailsClass: "text-gray-200",
//     iconColor: "#0066FF",
//     secondaryIconColor: "#FF00FF",
//     animationPrefix: "animate-fadeIn",
//     patternOpacity: "opacity-20",
//     imageEffect: "rounded-lg",
//   },
//   {
//     // DMS style - Teal/Medical gradient
//     bgClass: "bg-gradient-to-r from-[#0099CC] to-[#006699]",
//     titleClass: "text-white",
//     subtitleClass: "text-blue-100",
//     detailsClass: "text-blue-200",
//     iconColor: "#00FFFF",
//     secondaryIconColor: "#FFFFFF",
//     animationPrefix: "animate-fadeInUp",
//     patternOpacity: "opacity-10",
//     imageEffect: "rounded-lg shadow-lg",
//   },
//   {
//     // Modern Purple style
//     bgClass: "bg-gradient-to-br from-[#6600CC] to-[#9900FF]",
//     titleClass: "text-white",
//     subtitleClass: "text-purple-100",
//     detailsClass: "text-purple-200",
//     iconColor: "#BB00FF",
//     secondaryIconColor: "#FFCC00",
//     animationPrefix: "animate-fadeInRight",
//     patternOpacity: "opacity-15",
//     imageEffect: "rounded-lg rotate-1",
//   },
//   {
//     // Green Nature style
//     bgClass: "bg-gradient-to-r from-[#009966] to-[#006633]",
//     titleClass: "text-white",
//     subtitleClass: "text-green-100",
//     detailsClass: "text-green-200",
//     iconColor: "#00FF99",
//     secondaryIconColor: "#FFFF00",
//     animationPrefix: "animate-fadeInUp",
//     patternOpacity: "opacity-25",
//     imageEffect: "rounded-lg -rotate-1",
//   },
//   {
//     // Orange Warm style
//     bgClass: "bg-gradient-to-br from-[#FF6600] to-[#CC3300]",
//     titleClass: "text-white",
//     subtitleClass: "text-orange-100",
//     detailsClass: "text-orange-200",
//     iconColor: "#FFCC00",
//     secondaryIconColor: "#FF3300",
//     animationPrefix: "animate-fadeIn",
//     patternOpacity: "opacity-30",
//     imageEffect: "rounded-lg shadow-xl",
//   },
// ];

export default function HeroSection() {
  const [sliderData, setSliderData] = useState<HomepageSlider[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [setIsLoading] = useState(true);
  // const [setError] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch(GET_HOMEPAGE_SLIDER);
        if (!response.ok) {
          throw new Error("Failed to fetch slider data");
        }
        const data = await response.json();
        setSliderData(data.homepage_sliders);
      } catch (err) {
        console.error("Error fetching slider data:", err);
        // setError("Failed to load content");
      } finally {
        // setIsLoading(false);
      }
    };

    fetchSliderData();
  }, []);

  // Function to safely parse HTML content
  // const createMarkup = (htmlContent: string) => {
  //   return { __html: htmlContent };
  // };

  // Navigation functions with transition effect
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) =>
        prev === sliderData.length - 1 ? 0 : prev + 1
      );
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, sliderData.length]);

  // const prevSlide = () => {
  //   if (isTransitioning) return;
  //   setIsTransitioning(true);
  //   setTimeout(() => {
  //     setCurrentSlide((prev) =>
  //       prev === 0 ? sliderData.length - 1 : prev - 1
  //     );
  //     setIsTransitioning(false);
  //   }, 300);
  // };

  // Auto slide change
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, sliderData, isTransitioning, nextSlide]);

  // Get current slide style
  // const currentStyle = slideStyles[currentSlide % slideStyles.length];

  // Generate floating icons based on current style
  // const renderFloatingIcons = () => {
  //   const icons = [
  //     // Info icon
  //     {
  //       position: "absolute left-10 top-10 animate-float-slow z-20",
  //       color: currentStyle.iconColor,
  //       svg: (
  //         <svg
  //           width="24"
  //           height="24"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M12 16V12"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //           <path
  //             d="M12 8H12.01"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //         </svg>
  //       ),
  //     },
  //     // Plus icon
  //     {
  //       position: "absolute right-10 top-20 animate-float-medium z-20",
  //       color: currentStyle.secondaryIconColor,
  //       svg: (
  //         <svg
  //           width="24"
  //           height="24"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M17 20H7C4 20 2 18 2 15V9C2 6 4 4 7 4H17C20 4 22 6 22 9V15C22 18 20 20 17 20Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M12 10V14"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //           <path
  //             d="M8 12H16"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //         </svg>
  //       ),
  //     },
  //     // Square icon
  //     {
  //       position: "absolute left-5 top-1/3 animate-float z-20",
  //       color: currentStyle.iconColor,
  //       svg: (
  //         <svg
  //           width="24"
  //           height="24"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //     },
  //     // Home icon
  //     {
  //       position: "absolute left-20 bottom-20 animate-float-slow z-20",
  //       color: currentStyle.secondaryIconColor,
  //       svg: (
  //         <svg
  //           width="24"
  //           height="24"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //           <path
  //             d="M9 22V12H15V22"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //         </svg>
  //       ),
  //     },
  //     // Sun icon
  //     {
  //       position: "absolute right-40 bottom-40 animate-float-medium z-20",
  //       color: currentStyle.iconColor,
  //       svg: (
  //         <svg
  //           width="24"
  //           height="24"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M12 2V4"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //           <path
  //             d="M12 20V22"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //           <path
  //             d="M4.93 4.93L6.34 6.34"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //           <path
  //             d="M17.66 17.66L19.07 19.07"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //           <path
  //             d="M2 12H4"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //           <path
  //             d="M20 12H22"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //           <path
  //             d="M6.34 17.66L4.93 19.07"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //           <path
  //             d="M19.07 4.93L17.66 6.34"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //           />
  //         </svg>
  //       ),
  //     },
  //     // Share icon
  //     {
  //       position: "absolute left-40 bottom-10 animate-float z-20",
  //       color: currentStyle.secondaryIconColor,
  //       svg: (
  //         <svg
  //           width="24"
  //           height="24"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M8.59 13.51L15.42 17.49"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //           <path
  //             d="M15.41 6.51L8.59 10.49"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //           />
  //         </svg>
  //       ),
  //     },
  //     // Briefcase icon
  //     {
  //       position: "absolute right-20 top-10 animate-float-slow z-20",
  //       color: currentStyle.iconColor,
  //       svg: (
  //         <svg
  //           width="24"
  //           height="24"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //           <path
  //             d="M16 21V5C16 4.46957 15.7893 3.96086 15.4142 3.58579C15.0391 3.21071 14.5304 3 14 3H10C9.46957 3 8.96086 3.21071 8.58579 3.58579C8.21071 3.96086 8 4.46957 8 5V21"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //         </svg>
  //       ),
  //     },
  //     // Globe icon
  //     {
  //       position: "absolute right-10 bottom-10 animate-float-medium z-20",
  //       color: currentStyle.secondaryIconColor,
  //       svg: (
  //         <svg
  //           width="24"
  //           height="24"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           xmlns="http://www.w3.org/2000/svg"
  //         >
  //           <path
  //             d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //           <path
  //             d="M2 12H22"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //           <path
  //             d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
  //             stroke="currentColor"
  //             strokeWidth="2"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //           />
  //         </svg>
  //       ),
  //     },
  //   ];

  //   return icons.map((icon, index) => (
  //     <div key={`icon-${index}-${currentSlide}`} className={icon.position}>
  //       <div className={`text-[${icon.color}] bg-white/10 p-2 rounded-full`}>
  //         {icon.svg}
  //       </div>
  //     </div>
  //   ));
  // };

  return (
    <main className="min-h-screen bg-white">
      <div className="relative">
        <section
          style={{
            backgroundImage: 'url("/bg-hr.png")',
            backgroundSize: "cover",
            backgroundPosition: "left",
            backgroundRepeat: "no-repeat",
            padding: "2rem 0",
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
              {/* Left Text Content */}
              <div className="w-full lg:w-1/3">
                <div className="mb-2">
                  <h1 className="text-3xl sm:text-2xl md:text-4xl font-bold leading-tight text-white">
                    Efficient Rams Solutions for{" "}
                    <span className="text-white">Modern Workforces</span>
                  </h1>
                </div>
                <p className="text-base leading-relaxed text-white">
                  In today fast-paced business environment, efficiency is key.
                  Our HR solutions are crafted to streamline your processes,
                  from recruitment to retirement. Experience a seamless workflow
                  that enhances productivity, reduces administrative overhead,
                  and empowers your team to focus on what matters
                </p>
              </div>

              {/* Right Image */}
              <div className="w-full lg:w-2/3">
                <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh]">
                  <Image
                    src="/hero-hr.png"
                    alt="HR Illustration"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 66vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
