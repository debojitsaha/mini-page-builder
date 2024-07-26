import { cn } from "@/utils";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
}

export default function Toast({ message, type }: ToastProps) {
  return (
    <div
      className={cn(
        "px-6 py-3 rounded-md shadow-lg",
        {
          "border border-green-500 bg-white": type === "success",
          "border border-red-500 bg-white": type === "error",
          "border border-blue-500 bg-white": type === "info",
        },
        "transition-opacity duration-300"
      )}
    >
      {message}
    </div>
  );
}
