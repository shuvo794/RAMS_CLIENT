import PageHeroSection from "@/components/PageHeroSection";
import ServiceDetails from "@/components/ServiceDetails";
// import WhyChooseUs from "@/components/WhyChooseUs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BASE_URL, GET_SERVICE_SLIDER } from "@/lib/config";

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
      next: { revalidate: 1 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    const data = await response.json();
    return data.service_sliders || [];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function generateStaticParams() {
  const services = await getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const services = await getAllServices();
  const resolvedParams = await params;
  const service = services.find(
    (service) => service.slug === resolvedParams.slug
  );

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  const title = `${service.title} - Our Services`;
  const description = service.details.slice(0, 160) + "...";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            title
          )}&description=${encodeURIComponent(description)}`,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [
        `/api/og?title=${encodeURIComponent(
          title
        )}&description=${encodeURIComponent(description)}`,
      ],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const services = await getAllServices();
  const resolvedParams = await params;
  const service = services.find(
    (service) => service.slug === resolvedParams.slug
  );

  if (!service) {
    notFound();
  }

  // Create WhyChooseUs data from service data
  // const whyChooseUsData = {
  //   title: `WHY CHOOSE OUR ${service.title.toUpperCase()}`,
  //   subtitle: "To develop a desired application",
  //   backgroundImage: service.image.startsWith("/media")
  //     ? `${BASE_URL}${service.image}`
  //     : "/placeholder.svg?height=800&width=1600",
  //   supportCard: {
  //     title: service.title,
  //     description:
  //       "Our team of expert consultants is available around the clock to provide strategic guidance and support for your business technology needs.",
  //     phone: "+123 456 7890",
  //   },
  // };

  return (
    <>
      <PageHeroSection
        title={service.title}
        backgroundImage="/webapp.jpg?height=1000&width=1600"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "SERVICES", href: "/services" },
          {
            label: service.title.toUpperCase(),
            href: `/services/${resolvedParams.slug}`,
          },
        ]}
      />

      <ServiceDetails
        image={
          service?.image?.startsWith("/media")
            ? `${BASE_URL}${service.image}`
            : "/placeholder.svg?height=800&width=1600"
        }
        title={service.title}
        description={service.details}
        currentService={service.title}
        services={services.map((s) => ({
          name: s.title,
          href: `/services/${s.slug}`,
        }))}
      />

      {/* <WhyChooseUs
        title={whyChooseUsData.title}
        subtitle={whyChooseUsData.subtitle}
        backgroundImage={whyChooseUsData.backgroundImage}
        supportCard={whyChooseUsData.supportCard}
      /> */}
    </>
  );
}
