"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import AutoplayPlugin from "embla-carousel-autoplay";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GET_SERVICE_SLIDER } from "@/lib/config";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import type { IconProp, IconName } from "@fortawesome/fontawesome-svg-core";

// Add all icons to the library
library.add(fas, far, fab);

interface ServiceSlider {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  details: string;
  icon?: string; // <-- notice it's now optional `?`
  serial_number: number;
  slug?: string;
}

export default function OurServices() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [AutoplayPlugin({ delay: 5000, stopOnInteraction: false })]
  );

  const [serviceSliders, setServiceSliders] = useState<ServiceSlider[]>([]);
  console.log("serviceSliders", serviceSliders);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  // Fetch service slider data
  useEffect(() => {
    const fetchServiceSliders = async () => {
      try {
        const response = await fetch(GET_SERVICE_SLIDER);
        if (!response.ok) {
          throw new Error("Failed to fetch service sliders");
        }
        const data = await response.json();
        if (data && data.service_sliders) {
          // Sort by serial_number
          const sortedSliders = [...data.service_sliders].sort(
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

  React.useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setActiveIndex(emblaApi.selectedScrollSnap());
      };
      emblaApi.on("select", onSelect);
      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  // Fallback services data if API fails
  // const fallbackServices = [
  //   {
  //     id: 1,
  //     serial_number: 1,
  //     title: "Software Development",
  //     details:
  //       "Expert software development services tailored to your business needs.",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "Software-Development",
  //     icon: "fa-solid fa-globe",
  //   },
  //   {
  //     id: 2,
  //     serial_number: 2,
  //     title: "Web Application",
  //     details: "Custom web applications built with modern technologies.",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "Web-Application",
  //     icon: "fa-solid fa-globe",
  //   },
  //   {
  //     id: 3,
  //     serial_number: 3,
  //     title: "Domain & Hosting",
  //     details: "Reliable domain and hosting solutions for your business.",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "Domain-Hosting",
  //     icon: "fa-solid fa-globe",
  //   },
  //   {
  //     id: 4,
  //     serial_number: 4,
  //     title: "Digital Marketing",
  //     details: "Strategic digital marketing to grow your online presence.",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "Digital-Marketing",
  //     icon: "fa-solid fa-globe",
  //   },
  //   {
  //     id: 5,
  //     serial_number: 5,
  //     title: "Dedicated Server Hosting",
  //     details: "We provide 100% Dell Branded PowerEdge C1100 Servers",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "/dedicated-server-hosting",
  //     icon: "fa-solid fa-globe",
  //   },
  //   {
  //     id: 6,
  //     serial_number: 6,
  //     title: "IT Training",
  //     details: "Professional IT training programs for individuals and teams.",
  //     image: "/placeholder.svg?height=100&width=100",
  //     slug: "IT-Training",
  //     icon: "fa-solid fa-globe",
  //   },
  // ];

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const parseIconString = (iconString: string): IconProp => {
    if (!iconString) return ["fas", "circle-info"];

    // Handle strings like "fa-solid fa-globe" or "fas fa-globe"
    const parts = iconString.split(" ");

    if (parts.length === 2) {
      // Convert "fa-solid" or "fas" to "fas"
      let prefix = parts[0].replace("fa-", "");
      if (prefix === "solid") prefix = "fas";
      if (prefix === "regular") prefix = "far";
      if (prefix === "brands") prefix = "fab";

      // Remove "fa-" prefix from icon name
      const iconName = parts[1].replace("fa-", "");

      return [prefix as "fas" | "far" | "fab", iconName as IconName];
    }

    // Fallback for invalid format
    return ["fas", "circle-info"];
  };

  // Use API data if available, otherwise use fallback
  const displayServices = serviceSliders.length > 0 ? serviceSliders : [];

  // Generate href based on title if slug is not available
  const getServiceHref = (service: ServiceSlider) => {
    if (service.slug) {
      return `/services/${service.slug}`;
    }
    // Convert title to slug format
    return `/services/${service.slug}`;
  };

  if (isLoading) {
    return (
      <section className="mt-10 mb-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-6 bg-gray-300 rounded w-32 mx-auto mb-4"></div>
            <div className="h-10 bg-gray-300 rounded w-64 mx-auto"></div>
            <div className="w-12 h-1 bg-gray-300 mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-lg p-8 h-64 animate-pulse"
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-none shadow-lg relative group transition-all duration-300 hover:bg-gradient-to-b hover:from-[#0066FF] hover:to-[#3d61d9] hover:text-white">
                <CardContent className="flex flex-col justify-between items-center text-center p-6 h-full">
                  <div className="mb-6 w-24 h-24 relative">
                    {service.icon && (
                      <FontAwesomeIcon
                        icon={parseIconString(service.icon)}
                        size="4x"
                        className="text-[#0066FF] group-hover:text-white"
                      />
                    )}
                  </div>

                  <div dangerouslySetInnerHTML={{ __html: service.title }} />

                  <div className="overflow-hidden h-24">
                    <p
                      className="text-gray-600 group-hover:text-white/90 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: service.details }}
                    />
                  </div>

                  {/* <div className="mt-4">
                    <Link href={getServiceHref(service)}>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-gray-600 group-hover:text-[#008fca]"
                      >
                        <ChevronRight />
                      </Button>
                    </Link>
                  </div> */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
