import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useAdaptiveAnimation } from '../../hooks/useAdaptiveAnimation';

const SPRING_CONFIG = { damping: 100, stiffness: 400 };

function MagneticButton({ children, distance = 0.6, className = "" }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, SPRING_CONFIG);
  const springY = useSpring(y, SPRING_CONFIG);
  const [hasHover, setHasHover] = useState(false);
  const { shouldDisableDecorativeAnimation } = useAdaptiveAnimation();

  useEffect(() => {
    setHasHover(window.matchMedia('(hover: hover)').matches);
  }, []);

  const calculateDistance = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * distance);
    y.set((e.clientY - centerY) * distance);
  }, [distance, x, y]);

  useEffect(() => {
    if (!hasHover || !isHovered || shouldDisableDecorativeAnimation) return;

    document.addEventListener('pointermove', calculateDistance, { passive: true });
    return () => document.removeEventListener('pointermove', calculateDistance);
  }, [calculateDistance, hasHover, isHovered, shouldDisableDecorativeAnimation]);

  const handleLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleLeave}
      className={className}
      style={shouldDisableDecorativeAnimation ? undefined : { x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

export { MagneticButton };
