"use client";
import React from "react";
import { motion } from "framer-motion";

export default function OurPricing() {
  const plans = [
    {
      name: "Basic",
      price: "$15",
      color: "bg-blue-300",
      features: [
        { name: "1 Pages/Screens", included: true },
        { name: "Responsive Design", included: true },
        { name: "Reports & Billing", included: false },
        { name: "Content Upload", included: true },
      ],
    },
    {
      name: "Premium",
      price: "$30",
      color: "bg-blue-600",
      featured: true,
      features: [
        { name: "10 Pages/Screens", included: true },
        { name: "Responsive Design", included: true },
        { name: "Reports & Billing", included: false },
        { name: "Content Upload", included: true },
      ],
    },
    {
      name: "Standard",
      price: "$50",
      color: "bg-blue-300",
      features: [
        { name: "5 Pages/Screens", included: true },
        { name: "Responsive Design", included: true },
        { name: "Reports & Billing", included: false },
        { name: "Content Upload", included: true },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Pricing Plans</h1>
          <div className="w-16 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            finibus mi id elit gravida, quis tincidunt purus fringilla.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3  p-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className={`rounded-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform ${
                plan.featured ? "md:-translate-y-6 scale-105 z-10" : ""
              }`}
            >
              {/* Card Header */}
              <div className="relative">
                <div
                  className={`${
                    plan.color
                  } pt-8 pb-16 px-4 text-center text-white ${
                    plan.featured ? "pt-12 pb-20" : ""
                  }`}
                >
                  <div className="text-lg font-medium">{plan.price}</div>
                  <div className="text-sm">Per Month</div>
                  <div className="text-2xl font-bold mt-1">{plan.name}</div>
                  {plan.featured && (
                    <div className="absolute top-0 right-0 text-red-800 py-1 px-3 rounded-bl-lg font-bold text-xs">
                      {/* Label like "Popular" can go here */}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-1 left-0 w-full overflow-hidden">
                  <svg
                    className="fill-current text-white"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                  >
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.32,118.92,163.89,86.92,321.39,56.44Z"></path>
                  </svg>
                </div>
              </div>

              {/* Card Body */}
              <div
                className={`bg-white p-6 flex flex-col justify-between h-[500px] ${
                  plan.featured ? "pt-10" : ""
                }`}
              >
                <p className="text-gray-600 text-sm mb-6">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates a vitae distinctio.
                </p>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      {feature.included ? (
                        <svg
                          className="w-5 h-5 text-green-500 mr-3 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-red-500 mr-3 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      )}
                      <span className="text-gray-700">{feature.name}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 px-4 rounded-lg uppercase font-bold text-white transition-colors ${
                    plan.featured
                      ? "bg-blue-600 hover:bg-blue-700 text-lg"
                      : "bg-gray-700 hover:bg-gray-800"
                  }`}
                >
                  {plan.featured ? "Get Premium Now" : "Purchase Now"}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
