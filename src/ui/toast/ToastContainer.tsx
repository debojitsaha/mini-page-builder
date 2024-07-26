import Toast from "./Toast";
import { ToastMessage } from "@/hooks/useToast";

interface ToastContainerProps {
  toasts: ToastMessage[];
}

export default function ToastContainer({ toasts }: ToastContainerProps) {
  return (
    <div className="fixed top-0 left-1/2 z-50 flex flex-col items-center p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
}