"use client";
import React, { useState } from "react";
import PricingCard from "./PricingCard";

export default function OurPricing() {
  const [hoveredTitle, setHoveredTitle] = useState<string | null>(null);

  const plans = [
    {
      title: "Basic",
      price: 15,
      period: "Per Month",
      description: "Best for individuals",
      features: ["1 Page", "Responsive Design", "Billing", "Upload"],
      btnColor: "bg-gray-600 text-white",
      gradient: "from-blue-100 to-blue-300",
      hoverGradient: "from-blue-400 to-blue-700",
    },
    {
      title: "Premium",
      price: 30,
      period: "Per Month",
      description: "Most popular choice",
      features: ["10 Pages", "Responsive Design", "Reports", "Upload"],
      btnColor: "bg-blue-600 text-white",
      gradient: "from-blue-400 to-blue-700", // default
      hoverGradient: "from-blue-400 to-blue-700", // stays same
    },
    {
      title: "Standard",
      price: 50,
      period: "Per Month",
      description: "For small teams",
      features: ["5 Pages", "Responsive Design", "Billing", "Upload"],
      btnColor: "bg-gray-600 text-white",
      gradient: "from-blue-100 to-blue-300",
      hoverGradient: "from-blue-400 to-blue-700",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">Pricing Plans</h2>
        <p className="text-gray-600">
          Choose a plan that fits your needs. Hover over the cards to explore
          options.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {plans.map((plan) => (
          <PricingCard
            key={plan.title}
            {...plan}
            hoveredTitle={hoveredTitle}
            setHoveredTitle={setHoveredTitle}
          />
        ))}
      </div>
    </section>
  );
}
