import { motion } from "motion/react";
import { LogoMark } from "./Logo";

export function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: "#ffffff", paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)" }}
      onClick={onNext}
    >
      {/* Background glow */}
      <div
        className="absolute"
        style={{
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(37,99,235,0.12) 0%, rgba(5,150,105,0.08) 50%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative flex items-center justify-center mb-8"
      >
        {/* Glow ring */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute"
          style={{
            width: 110,
            height: 110,
            borderRadius: "28px",
            background:
              "linear-gradient(135deg, rgba(37,99,235,0.28), rgba(5,150,105,0.22))",
            filter: "blur(18px)",
          }}
        />
        <LogoMark size={88} radius={24} />
      </motion.div>

      {/* Brand name */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-3"
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #0F172A 30%, #2563EB 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          SkillVerify
        </div>
        <div
          style={{
            fontSize: 13.5,
            color: "#64748B",
            fontWeight: 500,
            marginTop: 6,
            letterSpacing: "0.01em",
          }}
        >
          AI-Powered Career Intelligence
        </div>
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        style={{
          fontSize: 13,
          color: "#94A3B8",
          textAlign: "center",
          maxWidth: 240,
          lineHeight: 1.6,
          marginBottom: 60,
        }}
      >
        Build authentic skill profiles<br />powered by real work.
      </motion.p>

      {/* Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute"
        style={{ bottom: 100 }}
      >
        <svg width="260" height="140" viewBox="0 0 260 140" fill="none">
          {/* Grid lines */}
          {[0, 1, 2, 3].map((i) => (
            <line
              key={i}
              x1="20"
              y1={20 + i * 30}
              x2="240"
              y2={20 + i * 30}
              stroke="#E2E8F0"
              strokeWidth="1"
            />
          ))}
          {/* Chart bars */}
          {[
            { x: 30, h: 60, c: "#2563EB" },
            { x: 60, h: 90, c: "#059669" },
            { x: 90, h: 45, c: "#2563EB" },
            { x: 120, h: 100, c: "#059669" },
            { x: 150, h: 70, c: "#2563EB" },
            { x: 180, h: 110, c: "#059669" },
            { x: 210, h: 80, c: "#2563EB" },
          ].map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={120 - b.h}
              width={20}
              height={b.h}
              rx={5}
              fill={b.c}
              opacity={0.15 + i * 0.08}
            />
          ))}
          {/* Line chart */}
          <polyline
            points="30,75 60,45 90,90 120,30 150,60 180,25 210,50 240,35"
            stroke="url(#splashLineGrad)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Dots on line */}
          {[
            [30, 75],
            [60, 45],
            [90, 90],
            [120, 30],
            [150, 60],
            [180, 25],
            [210, 50],
            [240, 35],
          ].map(([cx, cy], i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i === 5 ? 5 : 3}
              fill={i === 5 ? "#059669" : "white"}
              stroke={i === 5 ? "#059669" : "#2563EB"}
              strokeWidth={i === 5 ? 0 : 2}
            />
          ))}
          <defs>
            <linearGradient id="splashLineGrad" x1="0" y1="0" x2="260" y2="0">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute flex gap-1.5"
        style={{ bottom: 72 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1, 0.8] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563EB, #059669)",
            }}
          />
        ))}
      </motion.div>

      {/* Tap to continue hint */}
      <div
        style={{
          position: "absolute",
          bottom: 45,
          fontSize: 11,
          color: "#CBD5E1",
          letterSpacing: "0.03em",
        }}
      >
        TAP TO CONTINUE
      </div>
    </div>
  );
}
