"use client";
import { useState } from "react";

export default function OurToolkit() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toolkitItems = [
    {
      title: "Performance Management",
      description:
        "Helps set performance goals, track progress, conduct performance reviews, and provide feedback.",
      icon: "📊"
    },
    {
      title: "Employee Engagement",
      description:
        "Measures and improves employee engagement through surveys, feedback, and analytics.",
      icon: "👥"
    },
    {
      title: "Onboarding Software",
      description:
        "Streamlines the onboarding process, including paperwork, training, and orientation.",
      icon: "🚀"
    },
    {
      title: "Payroll Software",
      description:
        "Automates payroll processes, including salary calculations, tax deductions, and direct deposits.",
      icon: "💰"
    },
    {
      title: "Employee Recognition",
      description:
        "Fosters a culture of appreciation by allowing employees to recognize and reward each other.",
      icon: "🏆"
    },
    {
      title: "Benefits Administration",
      description:
        "Manages employee benefits, such as health insurance, retirement plans, and other perks.",
      icon: "🏥"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-indigo-900 text-white py-12">
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl font-bold mb-2">
          Our <span className="italic">Comprehensive</span> Toolkit
        </h1>
        <p className="max-w-2xl mx-auto">
          Here innovation meets efficiency in our Comprehensive Toolkit for HR Management.
          Designed to address the diverse needs of modern businesses.
        </p>
      </div>

      {/* Grid of toolkit items */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {toolkitItems.map((item, index) => (
            <div
              key={index}
              className="bg-blue-800 bg-opacity-20 p-6 rounded-lg backdrop-blur-sm border border-blue-400 border-opacity-30 hover:bg-opacity-30 transition-all duration-300"
            >
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-sm flex items-center justify-center text-xs">
                    ▪
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
              </div>
              <p className="text-blue-100 pl-9">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-blue-600 -z-10 transform -skew-y-3"></div>
    </div>
  );
}