import { useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const add = (msg, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const remove = (id) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return { toasts, add, remove };
}