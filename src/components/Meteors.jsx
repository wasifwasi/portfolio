import React, { useMemo } from "react";

const Meteors = ({ number = 20 }) => {
  const meteors = useMemo(() => {
    return Array.from({ length: number }, (_, i) => ({
      id: i,
      left: `${-10 + Math.random() * 120}%`,
      top: `${-15 - Math.random() * 30}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${1.5 + Math.random() * 3}s`,
      size: `${2 + Math.random() * 2}px`,
      tailWidth: `${60 + Math.random() * 80}px`,
    }));
  }, [number]);

  return (
    <>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="meteor"
          style={{
            left: m.left,
            top: m.top,
            animationDelay: m.delay,
            animationDuration: m.duration,
            width: m.size,
            height: m.size,
            "--meteor-tail": m.tailWidth,
          }}
        />
      ))}
    </>
  );
};

export default Meteors;
