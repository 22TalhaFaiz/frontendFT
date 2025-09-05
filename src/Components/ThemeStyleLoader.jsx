// components/ThemeStyleLoader.jsx
import { useEffect } from "react";

const ThemeStyleLoader = () => {
  useEffect(() => {
    const styles = [
      "/assets/css/bootstrap.min.css",
      "/assets/css/font-awesome.min.css",
      "/assets/css/flaticon.css",
      "/assets/css/owl.carousel.min.css",
      "/assets/css/barfiller.css",
      "/assets/css/magnific-popup.css",
      "/assets/css/slicknav.min.css",
      "/assets/css/style.css",
    ];

    const links = styles.map((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      link.type = "text/css";
      document.head.appendChild(link);
      return link;
    });

    // Cleanup on unmount
    return () => {
      links.forEach((link) => document.head.removeChild(link));
    };
  }, []);

  return null;
};

export default ThemeStyleLoader;
