import { useState, useCallback, useEffect } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

export default function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, 3000); // Auto close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [toasts, removeToast]);

  return { toasts, addToast, removeToast };
}
