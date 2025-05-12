"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHeroSection from "@/components/PageHeroSection";
import { GET_PORTFOLIOID } from "@/lib/config";

interface Blog {
  id: number;
  title: string;
  slug: string | null;
  description: string;
  image: string;
  industry: string;
  technology: string;
  site_link: string;
  tags?: string[];
}

interface Category {
  name: string;
}

export default function BlogItemPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([
    { name: "Technology" },
    { name: "Business" },
    { name: "Design" },
  ]);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
  };

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await fetch(`${GET_PORTFOLIOID}${id}`);
        if (!response.ok) throw new Error("Failed to fetch blog");
        const data = await response.json();
        setBlog(data || null);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!blog) return <p className="text-center mt-10">Project not found.</p>;

  return (
    <>
      <PageHeroSection
        title={blog.title}
        backgroundImage="/half-circle-bg.png"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "BLOG", href: "/Blog" },
          { label: blog.title.toUpperCase(), href: `/Blog/${id}` },
        ]}
      />

      <div className="bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Content */}
            <div className="w-full md:w-2/3">
              <div className="bg-blue-500 text-white mb-6 rounded overflow-hidden">
                <div className="relative aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <div className="border-2 border-white p-4 inline-block">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-sm flex justify-between items-center">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>AUGUST 7, 2023</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                    <span>1 COMMENT</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 text-xs uppercase tracking-wide font-semibold rounded">
                  Category Name
                </span>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-3">
                  Mauris quis scelerisque sapien
                </h3>
                <p className="text-gray-700 mb-4">{blog.description}</p>
                <ul className="list-none space-y-3 mb-6">
                  {[
                    "Quisque lacinia purus...",
                    "Sed ullamcorper augue...",
                    "Fusce hendrerit leo...",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-blue-600 mr-2 mt-1">■</div>
                      <div className="text-gray-700">{item}</div>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 mb-4">{blog.description}</p>
              </div>

              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 py-4 border-t border-gray-200">
                  <span className="text-sm text-gray-600">Tags:</span>
                  {blog.tags.map((tag, index) => (
                    <a
                      key={index}
                      href="#"
                      className="bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white px-2 py-1 text-xs rounded transition duration-200"
                    >
                      {tag}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full md:w-1/3">
              {/* Search */}
              <div className="bg-white p-4 rounded shadow mb-6">
                <div className="flex">
                  <input
                    type="text"
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-gray-200 px-4 py-2 rounded-r border border-gray-300 border-l-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Free Text */}
              <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="text-lg font-bold border-b text-[#2f32c5] border-blue-500 inline-block pb-1 mb-4">
                  Free Text
                </h3>
                <p className="text-gray-700 mb-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  vel odio vitae nisl venenatis ultricies.
                </p>
              </div>

              {/* Categories */}
              <div className="bg-white p-4 rounded shadow mb-6">
                <h3 className="text-lg font-bold border-b text-[#2f32c5] border-blue-500 inline-block pb-1 mb-4">
                  Categories
                </h3>
                <ul className="divide-y divide-gray-100">
                  {categories.map((category, index) => (
                    <li key={index} className="py-2">
                      <a
                        href="#"
                        className="flex items-center justify-between text-gray-700 hover:text-blue-600"
                      >
                        <span>{category.name}</span>
                        <span className="text-[#3752d3] font-bold text-sm">
                          &gt;
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
