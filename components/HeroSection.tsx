"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { BASE_URL, GET_BANNER } from "@/lib/config";

// Update the interface to handle multiple sliders
interface HomepageSlider {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  background_image: string;
  description: string;
}

export default function HeroSection() {
  const [sliderData, setSliderData] = useState<HomepageSlider[]>([]);

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch(GET_BANNER);
        if (!response.ok) {
          throw new Error("Failed to fetch slider data");
        }
        const data = await response.json();
        setSliderData(data?.banners);
      } catch (err) {
      } finally {
      }
    };

    fetchSliderData();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <div className="relative">
        <section
          style={{
            backgroundImage: `url(${BASE_URL}${
              sliderData[0]?.background_image ?? ""
            })`,
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
                    {sliderData[0]?.title}
                  </h1>
                </div>
                <p
                  className="text-base leading-relaxed text-white"
                  dangerouslySetInnerHTML={{
                    __html: sliderData[0]?.description || "",
                  }}
                ></p>
              </div>

              {/* Right Image */}
              <div className="w-full lg:w-2/3">
                <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh]">
                  <Image
                    src={`${BASE_URL}${sliderData[0]?.image ?? ""}`}
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
