"use client"
import React from 'react';

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  label: string; 
}

const Button: React.FC<ButtonProps> = ({ type = "button", onClick, className, label }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-green-500 text-white py-3 px-4 rounded-md hover:bg-green-600 shadow-dark ${className}`}>
      {label} 
    </button>
  );
};

export default Button;
