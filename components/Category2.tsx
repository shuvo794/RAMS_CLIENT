"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { BASE_URL } from "@/lib/config";

interface Portfolio {
  id: number;
  title: string;
  slug?: string | null;
  description: string;
  image: string;
  date: string;
}

export default function Category2() {
  const topRef = useRef<HTMLDivElement>(null);

  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const staticData: Portfolio[] = [
    {
      id: 101,
      title: "Marketing",
      image: "/test.jpg",
      description: "Why You Should Focus on Improving Marketing.",
      date: "July 27, 2020",
    },
    {
      id: 102,
      title: "Technology ",
      image: "/test.jpg",
      description: "Showcasing a responsive e-commerce platform.",
      date: " August 11, 2020",
    },
    {
      id: 103,
      title: "Software ",
      image: "/test.jpg",
      description:
        "20 Questions You Should Always Ask About Security Software Before Buying It.",
      date: " August 11, 2020",
    },
    {
      id: 104,
      title: "Corporate Website",
      image: "/test.jpg",
      description:
        "The Ultimate Glossary of Terms About Software Launch Event.",
      date: " August 11, 2020",
    },
    {
      id: 105,
      title: "Photography Portfolio",
      image: "/test.jpg",
      description:
        "The Ultimate Glossary of Terms About Software Launch Event.",
      date: " August 11, 2020",
    },
    {
      id: 106,
      title: "Tech Blog",
      image: "/test.jpg",
      description: "How Technology Is Changing How We Treat Security Software.",
      date: " August 11, 2020",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setPortfolios(staticData);
      setIsLoading(false);
    }, 500); // simulate delay
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center mt-10 mb-10">
          <Loader2 className="w-10 h-10 animate-spin text-[#0066FF]" />
        </div>
      ) : (
        <div
          ref={topRef}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {portfolios.map((portfolio) => {
            const portfolioUrl = portfolio.slug
              ? `/Blog/${portfolio.slug}`
              : `/Blog/${portfolio.id}`;

            return (
              <Link
                key={portfolio.id}
                href={portfolioUrl}
                className="group block"
              >
                <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow h-[400px] flex flex-col">
                  <div className="relative h-48">
                    <Image
                      src={
                        portfolio.image?.startsWith("/media")
                          ? `${BASE_URL}${portfolio.image}`
                          : "/test.jpg"
                      }
                      alt={portfolio.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="p-6 text-xs mt-2 text-gray-400 mt-auto">
                    {portfolio.title} / {portfolio.date}
                  </p>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-lg font-bold mb-2">
                      {portfolio.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
