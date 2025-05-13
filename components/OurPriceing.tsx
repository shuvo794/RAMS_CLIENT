"use client";
import React from "react";

export default function OurPriceing() {
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
            finibus mi id elit gravida, quis tincidunt purus fringilla. Aenean
            convallis a neque non pellentesque.
          </p>
        </div>

        <div className="grid md:grid-cols-3  p-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg overflow-hidden shadow-lg transform transition-all ${
                plan.featured ? "md:-translate-y-4 scale-104" : ""
              }`}
            >
              {/* Card Header */}
              <div className="relative">
                <div
                  className={`${plan.color} pt-8 pb-16 px-4 text-center text-white`}
                >
                  <div className="text-lg font-medium">{plan.price}</div>
                  <div className="text-sm">Per Month</div>
                  <div className="text-2xl font-bold mt-1">{plan.name}</div>
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
                className={`bg-white p-4 flex flex-col justify-between ${
                  plan.featured ? "min-h-[400px]" : "min-h-[400px]"
                }`}
              >
                <p className="text-gray-600 text-sm mb-6">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptates a vitae distinctio.
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      {feature.included ? (
                        <svg
                          className="w-5 h-5 text-green-500 mr-2"
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
                          className="w-5 h-5 text-red-500 mr-2"
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
                  className={`w-full py-2 px-4 rounded uppercase font-medium text-white ${
                    plan.featured
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-700 hover:bg-gray-800"
                  }`}
                >
                  Purchase Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
