"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
// import useEmblaCarousel from "embla-carousel-react";
// import AutoplayPlugin from "embla-carousel-autoplay";
import { BASE_URL, GET_MODULES, GET_SERVICE_SLIDER } from "@/lib/config";
import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Image from "next/image";

// Add all icons to the library
library.add(fas, far, fab);

interface ServiceSlider {
  id: number;
  title: string;
  subtitle?: string;
  default_image: string;
  hover_image: string;
  description: string;
  serial_number: number;
  slug?: string;
}

export default function OurServices() {
  const [serviceSliders, setServiceSliders] = useState<ServiceSlider[]>([]);
  console.log("serviceSliders", serviceSliders);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  // Fetch service slider data
  useEffect(() => {
    const fetchServiceSliders = async () => {
      try {
        const response = await fetch(GET_MODULES);
        if (!response.ok) {
          throw new Error("Failed to fetch service sliders");
        }
        const data = await response.json();
        if (data && data?.modules) {
          // Sort by serial_number
          const sortedSliders = [...data?.modules].sort(
            (a, b) => a.serial_number - b.serial_number
          );
          setServiceSliders(sortedSliders);
        }
      } catch (err) {
        console.error("Error fetching service sliders:", err);
        setError("Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceSliders();
  }, []);

  // React.useEffect(() => {
  //   if (emblaApi) {
  //     const onSelect = () => {
  //       setActiveIndex(emblaApi.selectedScrollSnap());
  //     };
  //     emblaApi.on("select", onSelect);
  //     return () => {
  //       emblaApi.off("select", onSelect);
  //     };
  //   }
  // }, [emblaApi]);

  // const scrollTo = React.useCallback(
  //   (index: number) => emblaApi && emblaApi.scrollTo(index),
  //   [emblaApi]
  // );

  // Fallback services data if API fails
  // const fallbackServices = [
  //   {
  //     id: 1,
  //     serial_number: 1,
  //     title: "Software Development",
  //     description:
  //       "Expert software development services tailored to your business needs.",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "Software-Development",
  //     icon: "fa-solid fa-globe",
  //   },
  //   {
  //     id: 2,
  //     serial_number: 2,
  //     title: "Web Application",
  //     description: "Custom web applications built with modern technologies.",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "Web-Application",
  //     icon: "fa-solid fa-globe",
  //   },
  //   {
  //     id: 3,
  //     serial_number: 3,
  //     title: "Domain & Hosting",
  //     description: "Reliable domain and hosting solutions for your business.",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "Domain-Hosting",
  //     icon: "fa-solid fa-globe",
  //   },
  //   {
  //     id: 4,
  //     serial_number: 4,
  //     title: "Digital Marketing",
  //     description: "Strategic digital marketing to grow your online presence.",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "Digital-Marketing",
  //     icon: "fa-solid fa-globe",
  //   },
  //   {
  //     id: 5,
  //     serial_number: 5,
  //     title: "Dedicated Server Hosting",
  //     description: "We provide 100% Dell Branded PowerEdge C1100 Servers",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "/dedicated-server-hosting",
  //     icon: "fa-solid fa-globe",
  //   },
  //   {
  //     id: 6,
  //     serial_number: 6,
  //     title: "IT Training",
  //     description: "Professional IT training programs for individuals and teams.",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "IT-Training",
  //     icon: "fa-solid fa-globe",
  //   },
  // ];

  // const [setActiveIndex] = useState<number | null>(null);

  // const parseIconString = (iconString: string): IconProp => {
  //   if (!iconString) return ["fas", "circle-info"];

  //   // Handle strings like "fa-solid fa-globe" or "fas fa-globe"
  //   const parts = iconString.split(" ");

  //   if (parts.length === 2) {
  //     // Convert "fa-solid" or "fas" to "fas"
  //     let prefix = parts[0].replace("fa-", "");
  //     if (prefix === "solid") prefix = "fas";
  //     if (prefix === "regular") prefix = "far";
  //     if (prefix === "brands") prefix = "fab";

  //     // Remove "fa-" prefix from icon name
  //     const iconName = parts[1].replace("fa-", "");

  //     return [prefix as "fas" | "far" | "fab", iconName as IconName];
  //   }

  //   // Fallback for invalid format
  //   return ["fas", "circle-info"];
  // };

  // Use API data if available, otherwise use fallback
  const displayServices = serviceSliders.length > 0 ? serviceSliders : [];

  // Generate href based on title if slug is not available
  // const getServiceHref = (service: ServiceSlider) => {
  //   if (service.slug) {
  //     return `/services/${service.slug}`;
  //   }
  //   // Convert title to slug format
  //   return `/services/${service.slug}`;
  // };

  if (isLoading) {
    return (
      <section className="mt-10 mb-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-6 bg-gray-300  w-32 mx-auto mb-4"></div>
            <div className="h-10 bg-gray-300  w-64 mx-auto"></div>
            <div className="w-12 h-1 bg-gray-300 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-gray-100  p-8 h-64 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 mb-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#000000] text-2xl font-semibold mb-4">
            Our Module
          </h2>
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            finibus mi id elit gravida, quis tincidunt purus fringilla. Aenean
            convallis a neque non pellentesque.
          </p>
          <div className="w-12 h-1 bg-[#0066FF] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayServices?.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 20, y: 20 }}
              animate={{ opacity: 20, y: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden group h-[380px] flex flex-col justify-between bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-none border border-gray-200">
                {/* Hover Background Overlay */}
                <div className="absolute inset-0 bg-[#2530bd] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0" />

                {/* Image Container */}
                <div className="relative h-48 z-10 flex items-center justify-center">
                  <div className="relative w-[100px] h-[100px]">
                    <Image
                      src={
                        service.default_image?.startsWith("/media")
                          ? `${BASE_URL}${service.default_image}`
                          : service.default_image
                      }
                      alt="default icon"
                      width={100}
                      height={100}
                      className="object-cover  transition-opacity duration-300 opacity-100 group-hover:opacity-0 absolute inset-0"
                    />

                    <Image
                      src={
                        service.hover_image?.startsWith("/media")
                          ? `${BASE_URL}${service.hover_image}`
                          : service.hover_image
                      }
                      alt={service.title}
                      width={100}
                      height={100}
                      className="object-cover rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100 absolute inset-0 transform group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Card Content */}
                <CardContent className="relative px-4 pb-6 pt-4 text-center z-10 transition duration-300 group-hover:text-white flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 truncate">
                      {service.title}
                    </h3>
                    <div
                      className="text-gray-600 text-sm leading-relaxed transition duration-300 group-hover:text-white line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: service.description }}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
