import type { Metadata } from "next";
import PageHeroSection from "@/components/PageHeroSection";
import Category2 from "@/components/Category2";

export const metadata: Metadata = {
  title: "Our Portfolio",
  description:
    "Explore our diverse range of successful IT projects and solutions",
  openGraph: {
    title: "RAMS - Our Portfolio",
    description:
      "Explore our diverse range of successful IT projects and solutions",
    images: [
      {
        url: "/api/og?title=Our Portfolio&description=Explore our diverse range of successful IT projects and solutions",
      },
    ],
  },
  twitter: {
    title: "RAMS - Our Portfolio",
    description:
      "Explore our diverse range of successful IT projects and solutions",
    images: [
      "/api/og?title=Our Portfolio&description=Explore our diverse range of successful IT projects and solutions",
    ],
  },
};

// Fetch categories for server component
// async function getCategories() {
//   try {
//     const response = await fetch(GET_PORTFOLIO_CATEGORIES, {
//       next: { revalidate: 3600 },
//     });
//     if (!response.ok) {
//       throw new Error("Failed to fetch categories");
//     }
//     const data = await response.json();
//     return data.portfolio_categories || [];
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// }

export default async function PortfolioPage() {
  // const categories = await getCategories();

  return (
    <>
      <PageHeroSection
        title="Our Portfolio"
        backgroundImage="/placeholder.svg?height=800&width=1600"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "PORTFOLIO", href: "/portfolio" },
        ]}
      />

      <section className="mt-10 mb-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[#0066FF] text-xl font-semibold mb-4">
              OUR PORTFOLIO
            </h2>
            <h3 className="text-4xl font-bold">
              Latest & <span className="font-normal">Greatest Projects</span>
            </h3>
          </div>

          <Category2 />
        </div>
      </section>
    </>
  );
}
