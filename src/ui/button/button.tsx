import { cn } from "@/utils";
import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost" | "danger";
  children: React.ReactNode;
};

export default function Button({
  variant = "primary",
  onClick,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "font-semibold w-full sm:w-fit text-center px-4 py-2 rounded-md flex justify-center items-center gap-2 transition-colors duration-200",
        {
          "bg-blue-700 text-white hover:bg-blue-600": variant === "primary",
          "bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white":
            variant === "outline",
          "bg-transparent text-red-500 hover:bg-gray-500  hover:bg-opacity-5":
            variant === "ghost",
          "bg-red-500 text-white hover:bg-red-600": variant === "danger",
        }
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
