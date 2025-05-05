import Gallery from "@/components/Gallery"
import PageHeroSection from "@/components/PageHeroSection"

export const metadata = {
  title: "Gallery - BlueBay IT",
  description: "View our gallery of projects and achievements",
}

export default function GalleryPage() {
  return (
    <>
      <PageHeroSection
        title="Our Gallery"
        backgroundImage="/placeholder.svg?height=800&width=1600"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "GALLERY", href: "/gallery" },
        ]}
      />
      <Gallery />
    </>
  )
}
