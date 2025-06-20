"use client";

import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }) => {
  const [isOnClient, setIsOnClient] = useState(false);

  useEffect(() => {
    setIsOnClient(true);
  }, []);

  useEffect(() => {
    if (isOnClient) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    }
    return () => {
      document.body.style.overflow = "auto"; // Restore scroll
    };
  }, [isOnClient]);

  if (!isOnClient) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full z-[9999] bg-[#212121] touch-manipulation overscroll-none"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {children}
    </div>,
    document.body
  );
};

export default Portal;
