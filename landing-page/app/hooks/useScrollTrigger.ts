// src/hooks/useScrollTrigger.ts
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useScrollTrigger = (element: HTMLElement | null, animationFn: () => void) => {
  useEffect(() => {
    if (!element) return;

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: animationFn,
      once: true
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [element, animationFn]);
};