"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BASE_URL, GET_BANNER } from "@/lib/config";

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
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    const fetchSliderData = async () => {
      try {
        const response = await fetch(GET_BANNER);
        if (!response.ok) {
          throw new Error("Failed to fetch slider data");
        }
        const data = await response.json();
        setSliderData(data?.banners || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // Done loading
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
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-20">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-10">
              {/* Left Text Content */}
              <div className="w-full lg:w-1/3">
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="bg-gray-300 h-8 w-3/4 rounded" />
                    <div className="bg-gray-300 h-4 w-full rounded" />
                    <div className="bg-gray-300 h-4 w-2/3 rounded" />
                    <div className="bg-gray-300 h-4 w-1/2 rounded" />
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>

              {/* Right Image */}
              <div className="w-full lg:w-2/3">
                <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh]">
                  {loading ? (
                    <div className="relative w-full h-[70vh] sm:h-[80vh] lg:h-[90vh] flex justify-center items-center">
                      <div className="bg-gray-300 h-[50vh] w-[50%] rounded animate-pulse"></div>
                    </div>
                  ) : (
                    <Image
                      src={`${BASE_URL}${sliderData[0]?.image ?? ""}`}
                      alt="Hero Image"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 66vw"
                      priority
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
