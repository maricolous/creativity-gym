import { useRef, useEffect, useCallback } from "react";

export function useAudio(src, loop = true) {
  const ref = useRef(null);
  const prevSrc = useRef("");
  const mutedRef = useRef(false);

  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.pause();
        ref.current = null;
      }
    };
  }, []);

  const play = useCallback(
    (url) => {
      const target = url || src;
      if (!target) return;
      if (ref.current && prevSrc.current === target) {
        if (!ref.current.paused) return;
        ref.current.muted = mutedRef.current;
        ref.current.play().catch(() => {});
        return;
      }
      if (ref.current) {
        ref.current.pause();
        ref.current = null;
      }
      const a = new Audio(target);
      a.loop = loop;
      a.volume = 0.5;
      a.muted = mutedRef.current;
      a.play().catch(() => {});
      ref.current = a;
      prevSrc.current = target;
    },
    [src, loop],
  );

  const stop = useCallback(() => {
    if (ref.current) {
      ref.current.pause();
      ref.current.currentTime = 0;
      ref.current = null;
      prevSrc.current = "";
    }
  }, []);

  const fadeOut = useCallback((ms = 1000) => {
    if (!ref.current) return;
    const a = ref.current;
    const steps = 20;
    const stepTime = ms / steps;
    const volStep = a.volume / steps;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      a.volume = Math.max(0, a.volume - volStep);
      if (i >= steps) {
        clearInterval(iv);
        a.pause();
        a.currentTime = 0;
        ref.current = null;
        prevSrc.current = "";
      }
    }, stepTime);
  }, []);

  const setMuted = useCallback((muted) => {
    mutedRef.current = muted;
    if (ref.current) ref.current.muted = muted;
  }, []);

  return { play, stop, fadeOut, setMuted };
}
