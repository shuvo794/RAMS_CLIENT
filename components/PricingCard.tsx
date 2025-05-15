import React, { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";

interface PricingCardProps {
  title: string;
  price: string | number;
  period: string;
  description: string;
  features: string[];
  disabledIndexes?: number[];
  btnColor?: string;
  highlight?: boolean;
  gradient?: string;
  hoverGradient?: string;
  hoveredTitle?: string | null;
  setHoveredTitle?: (title: string | null) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  period,
  description,
  features,
  disabledIndexes = [],
  btnColor = "bg-gray-800 text-white",
  gradient = "from-blue-600 to-blue-600",
  hoverGradient = "from-blue-400 to-blue-700",
  hoveredTitle,
  setHoveredTitle,
}) => {
  const isPremium = title.toLowerCase() === "premium";
  const isHoveredByAnother = hoveredTitle && hoveredTitle !== title;

  const [isHovered, setIsHovered] = useState(false);

  const appliedGradient =
    isPremium && isHoveredByAnother
      ? "from-blue-100 to-blue-300"
      : isHovered
      ? hoverGradient
      : gradient;

  return (
    <motion.div
      onMouseEnter={() => {
        setIsHovered(true);
        setHoveredTitle?.(title);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredTitle?.(null);
      }}
      animate={{
        scale: isPremium ? 1.05 : isHovered ? 1.05 : 1,
      }}
      transition={{ duration: 0.3 }}
      className={`relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl transition-transform ${
        isHovered ? "z-10" : "z-0"
      }`}
    >
      {/* Gradient Header */}
      <div
        className={`relative bg-gradient-to-b ${appliedGradient} p-16 text-white text-center transition-colors duration-300`}
      >
        <h2 className="text-3xl font-light">${price}</h2>
        <h4 className="text-sm mb-2">{period}</h4>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>

      {/* Card Body */}
      <div className="bg-white p-6 text-center flex flex-col justify-between min-h-[550px]">
        <p className="text-sm text-gray-600 mb-6">{description}</p>
        <ul className="mb-6 text-left space-y-3">
          {features.map((feature, index) => {
            const isDisabled = disabledIndexes.includes(index);
            return (
              <li
                key={index}
                className={`flex items-center gap-2 ${
                  isDisabled
                    ? "text-gray-400 line-through"
                    : "text-gray-700 font-medium"
                }`}
              >
                {isDisabled ? (
                  <XCircle size={16} className="text-red-500" />
                ) : (
                  <CheckCircle size={16} className="text-blue-600" />
                )}
                {feature}
              </li>
            );
          })}
        </ul>
        <button
          className={`w-full py-3 rounded-lg shadow-md hover:opacity-90 transition-all font-semibold ${btnColor}`}
        >
          PURCHASE NOW
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
