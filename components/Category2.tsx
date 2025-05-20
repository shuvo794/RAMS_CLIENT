"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { BASE_URL, GET_BLOGS } from "@/lib/config";

interface Blog {
  id: number;
  title: string;
  slug?: string | null;
  description: string;
  image: string;
  date: string;
  serial_number: number;
}

export default function Category2() {
  const topRef = useRef<HTMLDivElement>(null);

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  useEffect(() => {
    const fetchServiceSliders = async () => {
      try {
        const response = await fetch(GET_BLOGS);
        if (!response.ok) {
          throw new Error("Failed to fetch service sliders");
        }
        const data = await response.json();
        if (data && data?.blogs) {
          const sortedSliders = [...data.blogs].sort(
            (a, b) => a.serial_number - b.serial_number
          );
          setBlogs(sortedSliders);
        } else {
          setError("No blogs found");
        }
      } catch (err) {
        console.error("Error fetching service sliders:", err);
        setError("Failed to load blogs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServiceSliders();
  }, []);

  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const renderSkeleton = () => {
    return Array.from({ length: 9 }).map((_, index) => (
      <div
        key={index}
        className="bg-white dark:bg-gray-800 shadow-md h-[320px] animate-pulse rounded"
      >
        <div className="bg-gray-300 h-48 w-full rounded-t"></div>
        <div className="p-4">
          <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
          <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div
        ref={topRef}
        className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {isLoading || error || blogs.length === 0
          ? renderSkeleton()
          : paginatedBlogs.map((blog) => {
              const blogUrl = blog.slug
                ? `/Blog/${blog.slug}`
                : `/Blog/${blog.id}`;

              return (
                <Link key={blog.id} href={blogUrl} className="group block">
                  <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow h-[320px] flex flex-col">
                    <div className="relative h-48">
                      <Image
                        src={
                          blog.image?.startsWith("/media")
                            ? `${BASE_URL}${blog.image}`
                            : "/test.jpg"
                        }
                        alt={blog.title}
                        width={500}
                        height={500}
                        className="object-cover"
                      />
                    </div>
                    <p className="p-2 text-xl font-bold text-gray-800 mt-auto">
                      {blog.title}
                    </p>
                  </div>
                </Link>
              );
            })}
      </div>

      {/* Pagination Controls */}
      {!isLoading && blogs.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
