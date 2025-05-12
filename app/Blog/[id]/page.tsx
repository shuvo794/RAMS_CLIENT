"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import PageHeroSection from "@/components/PageHeroSection";
import { BASE_URL, GET_PORTFOLIOID } from "@/lib/config";

interface Blog {
  id: number;
  title: string;
  slug: string | null;
  description: string;
  image: string;
  industry: string;
  technology: string;
  site_link: string;
}

export default function BlogItemPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  console.log("blog", blog);
  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const response = await fetch(`${GET_PORTFOLIOID}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
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
          { label: "BLOG", href: "/blog" },
          { label: blog.title.toUpperCase(), href: `/blog/${id}` },
        ]}
      />

      <section className="mt-10 mb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="max-w-md mx-auto lg:mx-0">
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={
                      blog.image?.startsWith("/media")
                        ? `${BASE_URL}${blog.image}`
                        : "/placeholder.svg?height=600&width=600"
                    }
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-6">{blog.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: blog.description }} />
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Project:</h3>
                    <p className="text-gray-600">{blog.title}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Industry:</h3>
                    <p className="text-gray-600">{blog.industry}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Technology:</h3>
                    <p className="text-gray-600">{blog.technology}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Site Link:</h3>
                    <a
                      href={blog.site_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {blog.site_link}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
