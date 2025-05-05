import ClientsDetails from "@/components/ClientDetails";
import PageHeroSection from "@/components/PageHeroSection";
import React from "react";

const page = () => {
  return (
    <div>
      <PageHeroSection
        title="OUR CLIENTS"
        backgroundImage="/services.jpg?height=800&width=1600"
        breadcrumbs={[
          { label: "HOME", href: "/" },
          { label: "CLIENTS", href: "/Clients" },
        ]}
      />
      <ClientsDetails/>
    </div>
  );
};

export default page;
