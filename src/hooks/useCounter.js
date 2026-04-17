import { useState, useEffect } from "react";
import { useInView } from "./useInView";

export function useCounter(target, duration = 1600) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (!inView) return;

    const num = parseInt(target, 10);
    const step = Math.ceil(num / (duration / 16));
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + step, num);
      setCount(current);
      if (current >= num) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return [ref, count];
}