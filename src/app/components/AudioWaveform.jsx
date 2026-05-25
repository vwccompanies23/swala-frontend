"use client";

export default function AudioWaveform({
  color = "bg-red-500",
  animated = true,
  size = "md",
}) {

  const bars = [
    10,
    18,
    14,
    24,
    16,
    28,
    12,
    20,
    15,
    26,
    13,
    22,
  ];

  const heights = {
    sm: "h-6",
    md: "h-8",
    lg: "h-12",
  };

  return (

    <div
      className={`flex items-end gap-[3px] ${
        heights[size]
      }`}
    >

      {bars.map((height, index) => (

        <div
          key={index}
          className={`w-1 ${color} rounded-full ${
            animated
              ? "animate-pulse"
              : ""
          }`}
          style={{
            height: `${height}px`,
            animationDelay: `${index * 0.08}s`,
            animationDuration: "0.8s",
          }}
        />

      ))}

    </div>

  );

}