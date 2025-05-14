"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GET_TESTIMONIALS } from "@/lib/config";
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
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(GET_TESTIMONIALS);
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        const data = await response.json();
        if (data && data.testimonials) {
          const sortedTestimonials = [...data.testimonials].sort(
            (a, b) => a.serial_number - b.serial_number
          );
          setTestimonials(sortedTestimonials);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Fallback testimonials if none are loaded
  const fallbackTestimonials = [
    {
      id: 1,
      name: "Sara Matt",
      designation: "Customer",
      review:
        "Fuisque tincidunt leo nisi, quis gravida elementum condimentum sit amet arcu in per. Vis in tritani debitis delicatissimi, error consequat eleifend cum ius, qui illud mucius constituto usu an. Mei rebum epicuri scaevola vix. An meam temporibus definitionem est.",
      image: "/placeholder.svg?height=80&width=80",
      serial_number: 1,
    },
    {
      id: 2,
      name: "Youmni Pat",
      designation: "Customer",
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in luctus consectetur. Phasmodium velit, aliquent est. In hac habitasse platea dictumst. Cras turpis malesuada porttitor et magna eius parturient metus.",
      image: "/placeholder.svg?height=80&width=80",
      serial_number: 2,
    },
    {
      id: 3,
      name: "Sheryn S",
      designation: "Data Science Enthusiast",
      review:
        "Nam rutrum, ante nec consequat volutpat, quam est sodales mauris, eget dignissim lacus sem at diam. Vivamus eget semper nisl. Nullam dignissim facilisi massa, eget aliquet massa vehicula sit.",
      image: "/placeholder.svg?height=80&width=80",
      serial_number: 3,
    },
    {
      id: 4,
      name: "Michael Dean",
      designation: "IT Manager",
      review:
        "Exceptional service and attention to detail. The team went above and beyond to ensure our project was delivered on time and within budget.",
      image: "/placeholder.svg?height=80&width=80",
      serial_number: 4,
    },
    {
      id: 5,
      name: "Jessica Wong",
      designation: "Marketing Director",
      review:
        "Their solutions have transformed our digital presence completely. We've seen a significant increase in engagement since implementing their recommendations.",
      image: "/placeholder.svg?height=80&width=80",
      serial_number: 5,
    },
  ];

  // Use the loaded testimonials or fallback if none are loaded
  const displayTestimonials =
    testimonials.length > 0 ? testimonials : fallbackTestimonials;

  // Calculate total pages - showing 3 testimonials per page
  const itemsPerPage = 3;
  const totalPages = Math.ceil(displayTestimonials.length / itemsPerPage);

  // Get current page testimonials
  const getCurrentPageItems = () => {
    const startIndex = currentPage * itemsPerPage;
    return displayTestimonials.slice(startIndex, startIndex + itemsPerPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0); // Loop back to first page
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(totalPages - 1); // Loop to last page
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-xl font-semibold mb-4 uppercase tracking-wider">
              Testimonials
            </h2>
            <h3 className="text-4xl font-bold relative inline-block pb-4">
              Happy Clients <span className="font-normal">Feedback</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white" />
            </h3>
            <p className="mt-4 max-w-2xl mx-auto text-blue-100">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              finibus mi et elit gravida, quis tincidunt purus fringilla. Aenean
              convallis a neque non pellentesque.
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-white" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-500 to-blue-700 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-xl font-semibold mb-4 uppercase tracking-wider">
            Testimonials
          </h2>
          <h3 className="text-4xl font-bold relative inline-block pb-4">
            Happy Clients <span className="font-normal">Feedback</span>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white" />
          </h3>
          <p className="mt-4 max-w-2xl mx-auto text-blue-100">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            finibus mi et elit gravida, quis tincidunt purus fringilla. Aenean
            convallis a neque non pellentesque.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {getCurrentPageItems().map((testimonial, index) => (
                <div
                  className="bg-white dark:bg-gray-800 rounded-lg p-12 shadow-lg text-gray-800 dark:text-gray-200 flex flex-col h-full relative"
                  key={index}
                >
                  <div className="mb-4 flex-grow text-center">
                    <p
                      className="italic text-gray-600 dark:text-gray-300 text-sm md:text-sm"
                      dangerouslySetInnerHTML={{ __html: testimonial.review }}
                    ></p>
                  </div>

                  <div className="mt-4 text-center">
                    <h4 className="font-bold text-gray-800 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      {testimonial.designation}
                    </p>
                  </div>

                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.854 3.146a.5.5 0 0 1 .146.354v3.5a.5.5 0 0 1-.5.5H5v1h1.5a.5.5 0 0 1 0 1H5a1 1 0 0 1-1-1V3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .354.146zM11.854 3.146a.5.5 0 0 1 .146.354v3.5a.5.5 0 0 1-.5.5H10v1h1.5a.5.5 0 0 1 0 1H10a1 1 0 0 1-1-1V3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .354.146z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center mt-8 space-x-3">
            {/* Page indicators */}
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index ? "bg-white scale-125" : "bg-white/30"
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              className="mr-2 bg-white/10 hover:bg-white/20 border-none text-white rounded-md"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              className="bg-white/10 hover:bg-white/20 border-none text-white rounded-md"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Background decorative elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-300 rounded-full opacity-10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-300 rounded-full opacity-10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
