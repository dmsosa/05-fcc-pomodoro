import { useEffect, useRef } from "react";

export function useInterval(cb: () => void, d: number | null) {
  const callbackRef = useRef<() => void | null>(null);
  useEffect(() => {
    if (!cb) return;
    callbackRef.current = cb;
  }, [cb])
  useEffect(() => {
    if (!d) return;
    const callback = callbackRef.current;
    if (!callback) return;
    const id = setInterval( () => { callback() }, d);
    return () => clearInterval(id);
  }, [d])
}