"use client";

export default function OurToolkit() {
  // const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toolkitItems = [
    {
      title: "Employee Engagement",
      description: "Boosts morale through surveys and feedback",
      icon: "👥",
    },
    {
      title: "Agent Management",
      description: "Tracks goals and reviews agent performance",
      icon: "📊",
    },

    {
      title: "Visa Entry",
      description: "Simplifies onboarding with streamlined documentation",
      icon: "🚀",
    },
    {
      title: "Payroll Software",
      description:
        "Automates payroll processes, including salary calculations, tax deductions, and direct deposits.",
      icon: "💰",
    },
    {
      title: "Passenger Management",
      description: "Organizes and monitors passenger-related processes",
      icon: "🏆",
    },
    {
      title: "Account Management",
      description: "Oversees employee benefits and financial accounts",
      icon: "🏥",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-700 to-indigo-900 text-white py-12">
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-10">
        <h1 className="text-5xl font-bold mb-4">
          Our <span className="italic">Comprehensive</span> Toolkit
        </h1>
        <p className="max-w-2xl mx-auto">
          Here innovation meets efficiency in our Comprehensive Toolkit for HR
          Management. Designed to address the diverse needs of modern
          businesses.
        </p>
      </div>

      {/* Grid of toolkit items */}
      <div className="container mx-auto px-4 pt-16">
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
