import React, { useState, useEffect } from "react";

const Assi_5 = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup - like component will unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // empty dependency=run once on mount

  return (
    <div>
      <p>
        window width: <strong>{width}px</strong>
      </p>
      
    </div>
  );
};

export default Assi_5;