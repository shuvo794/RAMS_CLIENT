import ContactUs from '@/components/ContactUs'
import PageHeroSection from '@/components/PageHeroSection'
import React from 'react'

const page = () => {
  return (
    <div>
        <PageHeroSection
                title="CONTACT US"
                backgroundImage="/services.jpg?height=800&width=1600"
                breadcrumbs={[
                  { label: "HOME", href: "/" },
                  { label: "Contact Us", href: "/contactus" },
                ]}
              />
        <ContactUs/>
    </div>
  )
}

export default page