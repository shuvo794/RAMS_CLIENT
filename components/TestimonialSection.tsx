"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BASE_URL, GET_TESTIMONIALS } from "@/lib/config";
import { Loader2 } from "lucide-react";

interface Testimonial {
  id: number;
  review: string;
  name: string;
  designation: string;
  serial_number: number;
  image: string;
}

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  // Removed unused error state

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(GET_TESTIMONIALS);
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        if (data && data.testimonials) {
          // Sort by serial_number
          const sortedTestimonials = [...data.testimonials].sort(
            (a, b) => a.serial_number - b.serial_number
          );
          setTestimonials(sortedTestimonials);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        console.error("Failed to load testimonials");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Debug log to check if testimonials are loaded and activeIndex changes
  useEffect(() => {
    console.log(
      "Testimonials:",
      testimonials.length,
      "Active Index:",
      activeIndex
    );
  }, [testimonials, activeIndex]);

  const nextTestimonial = () => {
    if (testimonials.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length <= 1) return;
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Fallback testimonial if none are loaded
  const fallbackTestimonial = {
    id: 0,
    name: "Sarah Johnson",
    designation: "CEO, TechVision Inc.",
    review:
      "BlueBay IT Solutions transformed our digital infrastructure completely. Their team's expertise in software development and IT consulting helped us streamline operations and increase efficiency by 40%.",
    image: "/placeholder.svg?height=80&width=80",
    serial_number: 0,
  };

  // Use the current testimonial or fallback if none are loaded
  const currentTestimonial =
    testimonials.length > 0 ? testimonials[activeIndex] : fallbackTestimonial;

  if (isLoading) {
    return (
      <section className="mt-10 mb-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-[#0066FF] text-xl font-semibold mb-4">
              TESTIMONIALS
            </h2>
            <h3 className="text-4xl font-bold relative inline-block pb-4">
              What Our <span className="font-normal">Clients Say</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#0091cb]" />
            </h3>
          </div>
          <div className="flex justify-center items-center mt-10 mb-10">
            <Loader2 className="w-10 h-10 animate-spin text-[#0066FF]" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 mb-10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-[#0066FF] text-xl font-semibold mb-4">
            TESTIMONIALS
          </h2>
          <h3 className="text-4xl font-bold relative inline-block pb-4">
            What Our <span className="font-normal">Clients Say</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#0091cb]" />
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Column - Adjusted size to match testimonial card */}
          <div className="relative lg:order-2">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0066FF] rounded-full opacity-10 blur-xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#FF4B93] rounded-full opacity-10 blur-xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-lg overflow-hidden shadow-xl max-w-md mx-auto"
              >
                <div className="aspect-square relative">
                  <Image
                    src={
                      currentTestimonial.image.startsWith("/media")
                        ? `${BASE_URL}${currentTestimonial.image}`
                        : "/placeholder.svg?height=600&width=600"
                    }
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Testimonial Column */}
          <div className="lg:order-1">
            <div className="relative bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg max-w-md mx-auto lg:ml-auto lg:mr-0">
              <Quote className="absolute top-6 left-6 w-12 h-12 text-gray-200 dark:text-gray-700" />

              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[200px]"
                  >
                    <p
                      className="text-gray-600 dark:text-gray-300 text-lg mb-6"
                      dangerouslySetInnerHTML={{
                        __html: currentTestimonial.review,
                      }}
                    ></p>

                    <div className="flex items-center">
                      <div className="mr-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden relative">
                          <Image
                            src={
                              currentTestimonial.image.startsWith("/media")
                                ? `${BASE_URL}${currentTestimonial.image}`
                                : "/placeholder.svg?height=80&width=80"
                            }
                            alt={currentTestimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">
                          {currentTestimonial.name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          {currentTestimonial.designation}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end mt-6 space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
                disabled={testimonials.length <= 1}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
                disabled={testimonials.length <= 1}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
