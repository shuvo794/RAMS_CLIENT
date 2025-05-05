"use client";
import { useState } from "react";

export default function OurToolkit() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toolkitItems = [
    {
      title: "Employee Management",
      description:
        "Measures and improves employee engagement through surveys, feedback, and analytics",
    },
    {
      title: "Agent Management",
      description:
        "Measures and improves employee engagement through surveys, feedback, and analytics.",
    },
    {
      title: "HRM Software",
      description:
        "Streamlines the onboarding process, including paperwork, training, and orientation.",
    },
    {
      title: "Payroll Software",
      description:
        "Automates payroll processes, including salary calculations, tax deductions, and direct deposits.",
    },
    {
      title: "Visa Management",
      description:
        "Fosters a culture of appreciation by allowing employees to recognize and reward each other.",
    },
    {
      title: "Report Management",
      description:
        "Manages employee benefits, such as health insurance, retirement plans, and other perks.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-indigo-900 text-white">
      {/* Settings Icon */}
      <div className="absolute top-4 left-4">
        <button
          className="bg-white p-2 rounded-md shadow-md"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <svg
            className="w-6 h-6 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div
          className="text-center mb-16 py-20 text-white"
          style={{
            backgroundImage: "url('/half-circle-bg.png')",
            backgroundSize: "cover",

            backgroundPosition: "center",
            minHeight: "300px",
            paddingTop: "200px",
          }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Our <span className="italic">Comprehensive</span> Toolkit
          </h1>
          <p className="max-w-2xl mx-auto">
            Here innovation meets efficiency in our Comprehensive Toolkit for
            RAMS Management. Designed to address the diverse needs of modern
            businesses.
          </p>
        </div>

        {/* Grid of toolkit items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {toolkitItems.map((item, index) => (
            <div
              key={index}
              className="bg-blue-800 bg-opacity-50 p-6 rounded-lg shadow-lg border border-blue-400 border-opacity-30"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-2 h-2 bg-white"></div>
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-blue-100">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
