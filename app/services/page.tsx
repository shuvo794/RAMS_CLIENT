import type { Metadata } from "next";
import Link from "next/link";
import PageHeroSection from "@/components/PageHeroSection";
import { BASE_URL, GET_SERVICE_SLIDER } from "@/lib/config";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Comprehensive IT services tailored to your business needs",
  openGraph: {
    title: "RAMS - Our Services",
    description: "Comprehensive IT services tailored to your business needs",
    images: [
      {
        url: "/api/og?title=Our Services&description=Comprehensive IT services tailored to your business needs",
      },
    ],
  },
  twitter: {
    title: "RAMS - Our Services",
    description: "Comprehensive IT services tailored to your business needs",
    images: [
      "/api/og?title=Our Services&description=Comprehensive IT services tailored to your business needs",
    ],
  },
};

interface ServiceSlider {
  id: number;
  title: string;
  slug: string;
  serial_number: number;
  image: string;
  details: string;
}

// Fetch all services
async function getAllServices(): Promise<ServiceSlider[]> {
  try {
    const response = await fetch(GET_SERVICE_SLIDER, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    const data = await response.json();
    // Sort by serial_number
    return (data.service_sliders || []).sort(
      (a: ServiceSlider, b: ServiceSlider) => a.serial_number - b.serial_number
    );
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export default async function ServicesPage() {
  const services = await getAllServices();
  console.log("all services", services);

  return (
    <>
      <PageHeroSection
        title="Our Services"
        backgroundImage="/placeholder.svg?height=800&width=1600"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "SERVICES", href: "/services" },
        ]}
      />

      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* <div className="text-center mb-12">
            <h2 className="text-[#0066FF] text-xl font-semibold mb-4">OUR SERVICES</h2>
            <h3 className="text-4xl font-bold relative inline-block pb-4">
              What We <span className="font-normal">Offer</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#0091cb]" />
            </h3>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={
                      service?.image?.startsWith("/media")
                        ? `${BASE_URL}${service.image}`
                        : "/placeholder.svg?height=300&width=500"
                    }
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p
                    className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: service.details }}
                  />

                  <Button asChild variant="outline" className="mt-2">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center"
                    >
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <WhyChooseUs
        title="WHY CHOOSE US"
        subtitle="We Provide Outsourced IT Services For your business"
        backgroundImage="/placeholder.svg?height=800&width=1600"
        supportCard={{
          title: "24/7 Customer support",
          description:
            "Gravity letters it amongst herself dearest an windows by. Wooded ladies she basket season age her uneasy saw. Discourse unwilling am no described dejection incommode no.",
          phone: "+123 456 7890",
        }}
      /> */}
    </>
  );
}
