"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import PageHeroSection from "@/components/PageHeroSection";
import { BASE_URL, GET_PORTFOLIOID } from "@/lib/config";

interface Portfolio {
  id: number;
  title: string;
  slug: string | null;
  description: string;
  image: string;
  industry: string;
  technology: string;
  site_link: string;
}

export default function PortfolioItemPage() {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
console.log('portfolio',portfolio)
  useEffect(() => {
    if (!id) return;

    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${GET_PORTFOLIOID}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch portfolio");
        }
        const data = await response.json();
        setPortfolio(data || null);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
        setPortfolio(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!portfolio) return <p className="text-center mt-10">Project not found.</p>;

  return (
    <>
      <PageHeroSection
        title={portfolio.title}
        backgroundImage="/placeholder.svg?height=800&width=1600"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "PORTFOLIO", href: "/portfolio" },
          { label: portfolio.title.toUpperCase(), href: `/portfolio/${id}` },
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
                      portfolio.image?.startsWith("/media")
                        ? `${BASE_URL}${portfolio.image}`
                        : "/placeholder.svg?height=600&width=600"
                    }
                    alt={portfolio.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-6">{portfolio.title}</h1>
              <p dangerouslySetInnerHTML={{ __html: portfolio.description }} />
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Project:</h3>
                    <p className="text-gray-600">{portfolio.title}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Industry:</h3>
                    <p className="text-gray-600">{portfolio.industry}</p>
                  </div>
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Technology:</h3>
                    <p className="text-gray-600">{portfolio.technology}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Site Link:</h3>
                    <a
                      href={portfolio.site_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      {portfolio.site_link}
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
