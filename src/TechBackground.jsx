import { motion } from "framer-motion";

export default function TechBackground() {
  const circuitColor = "rgba(255, 129, 129, 0.45)";
  const pulseColor = "#ffffff";
  const glowColor = "#ff5b5b";

  const pulseAnimation = {
    offsetDistance: ["0%", "100%"],
  };

  const pulseTransition = {
    duration: 4,
    repeat: Infinity,
    ease: "linear",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* --- Dense Circuit Grid Covering Everywhere --- */}
        <g stroke={circuitColor} strokeWidth="1.2" filter="url(#glow)">
          {/* Vertical Grid Lines */}
          <path d="M150 0V1080 M350 0V1080 M550 0V1080 M750 0V1080 M950 0V1080 M1150 0V1080 M1350 0V1080 M1550 0V1080 M1750 0V1080" />
          
          {/* Horizontal Grid Lines with Circuit Bends */}
          <path d="M0 120H1920 M0 280H1920 M0 440H1920 M0 600H1920 M0 760H1920 M0 920H1920" />

          {/* Intersecting Routing Traces */}
          <path d="M150 120L300 280H800V440H1200" />
          <path d="M1750 280L1550 440H950V600H550" />
          <path d="M350 760L550 920H1400V760H1800" />
          <path d="M950 120V280H1350V760H1750" />
        </g>

        {/* --- Secondary Dashed Trace Layer --- */}
        <g stroke={circuitColor} strokeWidth="0.8" strokeDasharray="5 10" opacity="0.6">
          <path d="M0 200H1920 M0 520H1920 M0 840H1920" />
          <path d="M250 0V1080 M850 0V1080 M1450 0V1080" />
        </g>

        {/* --- Surging Data Pulses --- */}
        <motion.circle
          r="5"
          fill={pulseColor}
          filter={`drop-shadow(0px 0px 8px ${glowColor})`}
          animate={pulseAnimation}
          transition={pulseTransition}
          style={{ offsetPath: `path('M150 120L300 280H800V440H1200')` }}
        />

        <motion.circle
          r="5"
          fill={pulseColor}
          filter={`drop-shadow(0px 0px 8px ${glowColor})`}
          animate={pulseAnimation}
          transition={{ ...pulseTransition, duration: 3, delay: 1 }}
          style={{ offsetPath: `path('M1750 280L1550 440H950V600H550')` }}
        />

        <motion.circle
          r="5"
          fill={pulseColor}
          filter={`drop-shadow(0px 0px 8px ${glowColor})`}
          animate={pulseAnimation}
          transition={{ ...pulseTransition, duration: 5, delay: 2 }}
          style={{ offsetPath: `path('M350 760L550 920H1400V760H1800')` }}
        />

        <motion.circle
          r="6"
          fill="#ffffff"
          filter={`drop-shadow(0px 0px 12px #ffffff)`}
          animate={pulseAnimation}
          transition={{ ...pulseTransition, duration: 4.5, delay: 0.5 }}
          style={{ offsetPath: `path('M950 120V280H1350V760H1750')` }}
        />
      </svg>
    </div>
  );
}