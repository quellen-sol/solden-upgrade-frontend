import { useEffect, useState } from "react";

type WindowSize = {
  width?: number;
  height?: number;
  isMobile?: boolean;
};

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<WindowSize>({});
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 715,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return windowSize;
};
