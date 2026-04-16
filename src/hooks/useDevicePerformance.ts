import { useEffect, useMemo, useState } from 'react';

type ConnectionInfo = {
  effectiveType?: string;
  saveData?: boolean;
};

type DevicePerformance = {
  isMobile: boolean;
  isLowEndDevice: boolean;
  shouldReduceMotion: boolean;
  hardwareConcurrency: number;
  connection: ConnectionInfo;
};

export function useDevicePerformance(): DevicePerformance {
  const [isMobile, setIsMobile] = useState(false);
  const [hardwareConcurrency, setHardwareConcurrency] = useState(8);
  const [connection, setConnection] = useState<ConnectionInfo>({});
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
      setHardwareConcurrency(navigator.hardwareConcurrency || 2);
      setShouldReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

      const nav = navigator as Navigator & {
        connection?: ConnectionInfo;
        mozConnection?: ConnectionInfo;
        webkitConnection?: ConnectionInfo;
      };
      const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
      setConnection(conn || {});
    };

    update();
    window.addEventListener('resize', update, { passive: true });

    return () => {
      window.removeEventListener('resize', update);
    };
  }, []);

  const isLowEndDevice = useMemo(() => {
    const slowNetwork = connection?.saveData || ['slow-2g', '2g', '3g'].includes(connection?.effectiveType || '');
    return isMobile && (hardwareConcurrency <= 4 || !!slowNetwork);
  }, [connection, hardwareConcurrency, isMobile]);

  return {
    isMobile,
    isLowEndDevice,
    shouldReduceMotion,
    hardwareConcurrency,
    connection,
  };
}
