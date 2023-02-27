import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    document.documentElement.scrollTo({ top: 0, left: 0 });
    setTimeout(() => (document.documentElement.style.scrollBehavior = "smooth"), 10);
  }, [location]);

  return null;
};

export default ScrollToTop;
