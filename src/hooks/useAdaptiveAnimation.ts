import { useMemo } from 'react';
import { useDevicePerformance } from './useDevicePerformance';

type AdaptiveAnimation = {
  durationMultiplier: number;
  stagger: number;
  maxSimultaneousAnimations: number;
  shouldDisableDecorativeAnimation: boolean;
};

export function useAdaptiveAnimation(): AdaptiveAnimation {
  const { isMobile, isLowEndDevice, shouldReduceMotion } = useDevicePerformance();

  return useMemo(() => {
    if (shouldReduceMotion) {
      return {
        durationMultiplier: 0,
        stagger: 0,
        maxSimultaneousAnimations: 0,
        shouldDisableDecorativeAnimation: true,
      };
    }

    if (isLowEndDevice) {
      return {
        durationMultiplier: 0.65,
        stagger: 0.04,
        maxSimultaneousAnimations: 2,
        shouldDisableDecorativeAnimation: true,
      };
    }

    if (isMobile) {
      return {
        durationMultiplier: 0.8,
        stagger: 0.06,
        maxSimultaneousAnimations: 3,
        shouldDisableDecorativeAnimation: false,
      };
    }

    return {
      durationMultiplier: 1,
      stagger: 0.1,
      maxSimultaneousAnimations: 6,
      shouldDisableDecorativeAnimation: false,
    };
  }, [isLowEndDevice, isMobile, shouldReduceMotion]);
}
