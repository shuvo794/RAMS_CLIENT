"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BASE_URL, GET_ALL_PORTFOLIOS } from "@/lib/config";
import { Loader2 } from "lucide-react";

// interface PortfolioCategory {
//   id: number;
//   name: string;http://localhost:3001http://localhost:3001
// }

interface Portfolio {
  id: number;
  title: string;
  slug: string | null;
  description: string;
  image: string;
  industry: string;
  category: number;
}

interface Category2Props {
  // initialCategory?: string | number;
  // showCategoryButtons?: boolean;
  portfolioImages?: {
    url: string;
    alt: string;
  }[];
}

const LIMIT = 6;

export default function Category2({}: // initialCategory = "all",
// showCategoryButtons = true,
Category2Props) {
  // const [categories, setCategories] = useState<PortfolioCategory[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await fetch(GET_PORTFOLIO_CATEGORIES);
  //       if (!response.ok) throw new Error("Failed to fetch categories");
  //       const data = await response.json();
  //       if (data && data.portfolio_categories)
  //         setCategories(data.portfolio_categories);
  //     } catch (err) {
  //       console.error("Error fetching categories:", err);
  //       setError("Failed to load categories");
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    const fetchPortfolios = async () => {
      setIsLoading(true);
      try {
        const url = `${GET_ALL_PORTFOLIOS}?page=${currentPage}&limit=${LIMIT}`;
        console.log("Fetching from:", url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        if (data && data.portfolios) {
          setPortfolios(data.portfolios);
          setTotalPages(data.total_pages || 1);
        }
      } catch (err) {
        console.error("Error fetching portfolios:", err);
        setError("Failed to load portfolios");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolios();
  }, [currentPage]);

  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  // const handleCategoryChange = (categoryId: string | number) => {
  //   setActiveCategory(categoryId);
  //   setCurrentPage(1);
  // };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center mt-10 mb-10">
          <Loader2 className="w-10 h-10 animate-spin text-[#0066FF]" />
        </div>
      ) : (
        <>
          <div
            ref={topRef}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {portfolios.length > 0 ? (
              portfolios.map((portfolio) => {
                const portfolioUrl = portfolio.slug
                  ? `/Blog/${portfolio.slug}`
                  : `/Blog/${portfolio.id}`;
                return (
                  <Link
                    key={portfolio.id}
                    href={portfolioUrl}
                    className="group block"
                  >
                    <div className="relative overflow-hidden rounded-lg aspect-square">
                      <Image
                        src={
                          portfolio?.image &&
                          portfolio.image.startsWith("/media")
                            ? `${BASE_URL}${portfolio.image}`
                            : "/placeholder.svg?height=600&width=600"
                        }
                        alt={portfolio.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-lg font-semibold">
                          View Project
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-xl font-semibold mb-2">
                        {portfolio.title}
                      </h3>
                      <p className="text-gray-500 uppercase text-sm">
                        {portfolio.industry}
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">
                  No projects found in this category.
                </p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 gap-2">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="border px-4 py-2 rounded disabled:opacity-50 text-sm"
              >
                &lt; Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  Math.abs(pageNumber - currentPage) <= 1
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={cn(
                        "w-8 h-8 flex items-center justify-center rounded text-sm",
                        currentPage === pageNumber
                          ? "bg-gray-200 dark:bg-gray-800 font-semibold"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      {pageNumber}
                    </button>
                  );
                }

                if (
                  (pageNumber === currentPage - 2 && pageNumber > 1) ||
                  (pageNumber === currentPage + 2 && pageNumber < totalPages)
                ) {
                  return (
                    <span
                      key={pageNumber}
                      className="px-2 text-sm text-gray-500"
                    >
                      ...
                    </span>
                  );
                }

                return null;
              })}

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="border px-4 py-2 rounded disabled:opacity-50 text-sm"
              >
                Next &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
