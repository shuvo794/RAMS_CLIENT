import { useState } from "react";

interface PurchaseButtonProps {
  text?: string;
  baseColor?: string;
  hoverColor?: string;
  textColor?: string;
  isPrimary?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}

const PurchaseButton: React.FC<PurchaseButtonProps> = ({
  text = "PURCHASE NOW",
  baseColor = "bg-blue-600",
  hoverColor = "bg-blue-700",
  textColor = "text-white",
  isPrimary = false,
  fullWidth = true,
  onClick = () => {},
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  // Apply different styles based on state
  const buttonStyles = `
    ${fullWidth ? "w-full" : "px-8"} 
    py-3 
    rounded-lg 
    font-semibold 
    shadow-md 
    transition-all 
    duration-300
    ${textColor}
    ${isPressed ? "transform scale-95" : ""}
    ${isHovered ? hoverColor : baseColor}
    ${isPrimary ? "ring-2 ring-white/30" : ""}
    ${className}
  `;

  return (
    <button
      className={buttonStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default PurchaseButton;
