import type { Metadata } from "next";
import PageHeroSection from "@/components/PageHeroSection";
import Category2 from "@/components/Category2";

export const metadata: Metadata = {
  title: "Our Blog",
  description:
    "Explore our diverse range of successful IT projects and solutions",
  openGraph: {
    title: "RAMS - Our Blog",
    description:
      "Explore our diverse range of successful IT projects and solutions",
    images: [
      {
        url: "/api/og?title=Our Blog&description=Explore our diverse range of successful IT projects and solutions",
      },
    ],
  },
  twitter: {
    title: "RAMS - Our Blog",
    description:
      "Explore our diverse range of successful IT projects and solutions",
    images: [
      "/api/og?title=Our Blog&description=Explore our diverse range of successful IT projects and solutions",
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
//     return data.blog_categories || [];
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }
// }

export default async function BlogPage() {
  // const categories = await getCategories();

  return (
    <>
      <PageHeroSection
        title="Our Blog"
        backgroundImage="/half-circle-bg.png" // Make sure this path and file exist
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "BLOG", href: "/Blog" },
        ]}
      />

      <section className="mt-10 mb-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-[#0066FF] text-xl font-semibold mb-4">
              OUR BLOG
            </h2>
            {/* <h3 className="text-4xl font-bold">
              Latest & <span className="font-normal">Greatest Projects</span>
            </h3> */}
          </div>

          <Category2 />
        </div>
      </section>
    </>
  );
}
