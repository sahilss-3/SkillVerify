import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LogoMark } from "./Logo";

// Total target: ~2500ms across 11 steps (~227ms each, slight variation for feel)
const STEPS = [
  { id: "resume",     icon: "📄", label: "Scanning Resume",                  detail: "Extracting skills, experience & education…",          duration: 200 },
  { id: "github",     icon: "⚡", label: "Fetching GitHub Repositories",      detail: "Reading 12 repos and commit history…",                duration: 250 },
  { id: "commits",    icon: "🔁", label: "Analysing Commit Patterns",         detail: "Measuring frequency, consistency & language use…",    duration: 200 },
  { id: "complexity", icon: "🧩", label: "Evaluating Project Complexity",     detail: "Assessing architecture, dependencies & originality…", duration: 250 },
  { id: "skills",     icon: "🎯", label: "Cross-Verifying Claimed Skills",    detail: "Matching resume claims against real code evidence…",  duration: 230 },
  { id: "gaps",       icon: "🔍", label: "Detecting Skill Gaps",              detail: "Identifying missing evidence and weak areas…",        duration: 200 },
  { id: "trust",      icon: "🛡️", label: "Computing Trust Score",             detail: "Weighing 14 verification signals…",                  duration: 200 },
  { id: "readiness",  icon: "🚀", label: "Calculating Internship Readiness",  detail: "Benchmarking against 10,000+ student profiles…",     duration: 220 },
  { id: "insights",   icon: "🧠", label: "Generating AI Insights",            detail: "Crafting personalised recommendations…",             duration: 250 },
  { id: "roadmap",    icon: "🗺️", label: "Building Growth Roadmap",           detail: "Designing your 8-week improvement plan…",            duration: 200 },
  { id: "profile",    icon: "✨", label: "Finalising Your Profile",           detail: "Everything looks great — almost ready!",             duration: 200 },
];

const TOTAL_MS = STEPS.reduce((a, s) => a + s.duration, 0);

interface StepState {
  status: "pending" | "active" | "done";
  progress: number; // 0-100 within this step
}

export function AnalysisLoadingScreen({ onDone }: { onDone: () => void }) {
  const [stepStates, setStepStates] = useState<StepState[]>(
    STEPS.map(() => ({ status: "pending", progress: 0 }))
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [finished, setFinished] = useState(false);

  // Drive each step sequentially
  useEffect(() => {
    let elapsed = 0;
    let stepIdx = 0;
    let stepElapsed = 0;
    const TICK = 16; // ms per tick — smooth at fast speed

    const timer = setInterval(() => {
      elapsed += TICK;
      stepElapsed += TICK;
      const overall = Math.min((elapsed / TOTAL_MS) * 100, 100);
      setOverallProgress(overall);

      const stepDur = STEPS[stepIdx].duration;
      const stepPct = Math.min((stepElapsed / stepDur) * 100, 100);

      setStepStates((prev) => {
        const next = prev.map((s, i) => {
          if (i < stepIdx) return { status: "done" as const, progress: 100 };
          if (i === stepIdx) return { status: "active" as const, progress: stepPct };
          return { status: "pending" as const, progress: 0 };
        });
        return next;
      });
      setCurrentStep(stepIdx);

      if (stepElapsed >= stepDur) {
        stepIdx++;
        stepElapsed = 0;
        if (stepIdx >= STEPS.length) {
          clearInterval(timer);
          setOverallProgress(100);
          setStepStates(STEPS.map(() => ({ status: "done", progress: 100 })));
          setFinished(true);
          setTimeout(onDone, 900);
        }
      }
    }, TICK);

    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Top gradient band */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 260,
          background:
            "linear-gradient(160deg, #EFF6FF 0%, #ECFDF5 60%, #ffffff 100%)",
          zIndex: 0,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "calc(env(safe-area-inset-top, 0px) + 52px) 24px 32px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-block", marginBottom: 14 }}
          >
            <LogoMark size={64} radius={18} />
          </motion.div>

          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#0F172A",
              letterSpacing: "-0.03em",
              marginBottom: 6,
            }}
          >
            {finished ? "Profile Ready! 🎉" : "Building Your Profile"}
          </h1>
          <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>
            {finished
              ? "Your AI-powered career profile has been created."
              : "Our AI is analysing your data across multiple dimensions…"}
          </p>
        </div>

        {/* Overall progress bar */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span
              style={{ fontSize: 11, fontWeight: 700, color: "#64748B", letterSpacing: "0.04em" }}
            >
              OVERALL PROGRESS
            </span>
            <span
              style={{ fontSize: 12, fontWeight: 800, color: "#2563EB" }}
            >
              {Math.round(overallProgress)}%
            </span>
          </div>
          <div
            style={{
              height: 8,
              borderRadius: 6,
              background: "#F1F5F9",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                borderRadius: 6,
                background: "linear-gradient(90deg, #2563EB, #059669)",
                width: `${overallProgress}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Steps list */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <AnimatePresence initial={false}>
            {STEPS.map((step, i) => {
              const state = stepStates[i];
              const isDone = state.status === "done";
              const isActive = state.status === "active";
              const isPending = state.status === "pending";

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isPending ? 0.4 : 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "11px 14px",
                    borderRadius: 14,
                    background: isActive
                      ? "linear-gradient(135deg, #EFF6FF, #ECFDF5)"
                      : isDone
                      ? "#F8FAFC"
                      : "transparent",
                    border: isActive
                      ? "1.5px solid #BFDBFE"
                      : isDone
                      ? "1px solid #F1F5F9"
                      : "1px solid transparent",
                    transition: "all 0.3s ease",
                    boxShadow: isActive
                      ? "0 2px 12px rgba(37,99,235,0.1)"
                      : "none",
                  }}
                >
                  {/* Step icon / status indicator */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isDone
                        ? "linear-gradient(135deg, #059669, #10b981)"
                        : isActive
                        ? "linear-gradient(135deg, #2563EB, #1d4ed8)"
                        : "#F1F5F9",
                      boxShadow: isDone
                        ? "0 2px 8px rgba(5,150,105,0.25)"
                        : isActive
                        ? "0 2px 8px rgba(37,99,235,0.25)"
                        : "none",
                      transition: "all 0.3s",
                    }}
                  >
                    {isDone ? (
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <polyline
                          points="3,9 6.5,12.5 13,5"
                          stroke="white"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : isActive ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle
                            cx="8"
                            cy="8"
                            r="6"
                            stroke="rgba(255,255,255,0.3)"
                            strokeWidth="2"
                          />
                          <path
                            d="M8 2 A6 6 0 0 1 14 8"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </motion.div>
                    ) : (
                      <span style={{ fontSize: 16 }}>{step.icon}</span>
                    )}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: isDone
                          ? "#059669"
                          : isActive
                          ? "#1d4ed8"
                          : "#94A3B8",
                        transition: "color 0.3s",
                      }}
                    >
                      {step.label}
                    </div>
                    {(isActive || isDone) && (
                      <div
                        style={{
                          fontSize: 11,
                          color: isDone ? "#6B7280" : "#64748B",
                          marginTop: 2,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {isDone ? "Completed ✓" : step.detail}
                      </div>
                    )}

                    {/* Per-step progress bar */}
                    {isActive && (
                      <div
                        style={{
                          height: 3,
                          borderRadius: 2,
                          background: "#DBEAFE",
                          marginTop: 6,
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          style={{
                            height: "100%",
                            borderRadius: 2,
                            background: "linear-gradient(90deg, #2563EB, #059669)",
                            width: `${state.progress}%`,
                          }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Done badge */}
                  {isDone && (
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#059669",
                        background: "#DCFCE7",
                        padding: "3px 8px",
                        borderRadius: 20,
                        flexShrink: 0,
                      }}
                    >
                      Done
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom stat pills */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            gap: 8,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "12 Repos", icon: "⚡" },
            { label: "247 Commits", icon: "🔁" },
            { label: "6 Skills", icon: "🎯" },
            { label: "3 Projects", icon: "📁" },
          ].map((pill) => (
            <motion.div
              key={pill.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                padding: "5px 12px",
                borderRadius: 20,
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                fontSize: 11.5,
                fontWeight: 600,
                color: "#475569",
              }}
            >
              <span>{pill.icon}</span>
              {pill.label}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
