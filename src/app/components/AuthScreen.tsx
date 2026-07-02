import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react";
import { LogoSmall } from "./Logo";

export function AuthScreen({ onNext }: { onNext: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-auto"
      style={{ background: "#ffffff", paddingTop: "calc(env(safe-area-inset-top, 0px) + 52px)" }}
    >
      {/* Top brand */}
      <div className="flex items-center gap-2.5 px-6 mb-6">
        <LogoSmall size={34} />
        <span style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.02em" }}>
          SkillVerify
        </span>
      </div>

      {/* Illustration */}
      <div className="px-6 mb-5 relative overflow-hidden" style={{ height: 120 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #EFF6FF 0%, #ECFDF5 100%)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <svg width="100%" height="120" viewBox="0 0 342 120" fill="none">
            {/* Person silhouette */}
            <circle cx="60" cy="38" r="18" fill="#2563EB" fillOpacity="0.15" />
            <ellipse cx="60" cy="80" rx="22" ry="14" fill="#2563EB" fillOpacity="0.1" />
            {/* Chart growth */}
            <polyline
              points="100,90 130,70 155,55 185,35 215,20 245,10"
              stroke="#2563EB"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <polygon
              points="100,90 130,70 155,55 185,35 215,20 245,10 245,100 100,100"
              fill="url(#authIllustrationGrad)"
              fillOpacity="0.12"
            />
            {/* AI nodes */}
            {[[245, 10], [215, 20], [185, 35]].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r={5} fill="#059669" />
                <circle cx={cx} cy={cy} r={9} fill="#059669" fillOpacity="0.2" />
              </g>
            ))}
            {/* Check badges */}
            <rect x="270" y="30" width="50" height="22" rx="11" fill="#059669" fillOpacity="0.15" />
            <text x="280" y="45" fontSize="10" fill="#059669" fontWeight="600">✓ Verified</text>
            <rect x="270" y="60" width="50" height="22" rx="11" fill="#2563EB" fillOpacity="0.12" />
            <text x="280" y="75" fontSize="10" fill="#2563EB" fontWeight="600">AI Rated</text>
            <defs>
              <linearGradient id="authIllustrationGrad" x1="100" y1="10" x2="100" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="px-6 mb-5">
        <div
          style={{
            display: "flex",
            background: "#F1F5F9",
            borderRadius: 14,
            padding: 4,
          }}
        >
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 11,
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                background: mode === m ? "#ffffff" : "transparent",
                color: mode === m ? "#0F172A" : "#64748B",
                boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {m === "login" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, x: mode === "login" ? -10 : 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="px-6 flex flex-col gap-3"
        >
          {/* Headline */}
          <div className="mb-1">
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
              {mode === "login" ? "Welcome back 👋" : "Join SkillVerify"}
            </h1>
            <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 3 }}>
              {mode === "login"
                ? "Sign in to your account to continue"
                : "Build your authentic skill profile today"}
            </p>
          </div>

          {/* Google button */}
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "11px 0",
              borderRadius: 12,
              border: "1.5px solid #E2E8F0",
              background: "#ffffff",
              fontSize: 13,
              fontWeight: 600,
              color: "#0F172A",
              cursor: "pointer",
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
            <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>OR</span>
            <div style={{ flex: 1, height: 1, background: "#E2E8F0" }} />
          </div>

          {/* Name field (signup only) */}
          {mode === "signup" && (
            <div>
              <label style={{ fontSize: 11.5, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: 12,
                  border: "1.5px solid #E2E8F0",
                  fontSize: 13,
                  outline: "none",
                  background: "#F8FAFC",
                  color: "#0F172A",
                  boxSizing: "border-box",
                }}
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@university.edu"
              type="email"
              style={{
                width: "100%",
                padding: "11px 14px",
                borderRadius: 12,
                border: "1.5px solid #E2E8F0",
                fontSize: 13,
                outline: "none",
                background: "#F8FAFC",
                color: "#0F172A",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ fontSize: 11.5, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "login" ? "Enter your password" : "Min. 8 characters"}
                type={showPassword ? "text" : "password"}
                style={{
                  width: "100%",
                  padding: "11px 42px 11px 14px",
                  borderRadius: 12,
                  border: "1.5px solid #E2E8F0",
                  fontSize: 13,
                  outline: "none",
                  background: "#F8FAFC",
                  color: "#0F172A",
                  boxSizing: "border-box",
                }}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#94A3B8",
                  display: "flex",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === "login" && (
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 12, color: "#2563EB", fontWeight: 600, cursor: "pointer" }}>
                Forgot password?
              </span>
            </div>
          )}

          {/* CTA button */}
          <button
            onClick={onNext}
            style={{
              width: "100%",
              padding: "13px 0",
              borderRadius: 14,
              border: "none",
              background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 16px rgba(37,99,235,0.35)",
              letterSpacing: "-0.01em",
            }}
          >
            {mode === "login" ? "Sign In" : "Create Account"}
            <ArrowRight size={16} />
          </button>

          {/* Trust indicators */}
          {mode === "signup" && (
            <div className="flex items-center gap-4 justify-center mt-1">
              {["Free to start", "No credit card", "Private & secure"].map((t) => (
                <div key={t} className="flex items-center gap-1">
                  <CheckCircle size={11} color="#059669" />
                  <span style={{ fontSize: 10.5, color: "#64748B", fontWeight: 500 }}>{t}</span>
                </div>
              ))}
            </div>
          )}

          <div className="pb-8" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
