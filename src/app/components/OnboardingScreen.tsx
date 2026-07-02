import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Github,
  Code2,
  Target,
  Layers,
  Upload,
  Check,
  ArrowRight,
} from "lucide-react";

const STEPS = [
  { id: 0, icon: FileText, title: "Upload Resume", subtitle: "Let AI analyze your experience" },
  { id: 1, icon: Github, title: "Connect Github", subtitle: "Verify your coding activity" },
  { id: 2, icon: Code2, title: "Technical Interests", subtitle: "Select your skill areas" },
  { id: 3, icon: Target, title: "Career Goals", subtitle: "Where do you want to go?" },
  { id: 4, icon: Layers, title: "Skill Categories", subtitle: "What do you specialize in?" },
];

const INTERESTS = [
  "Python", "JavaScript", "React", "Machine Learning", "Data Science",
  "Node.js", "TypeScript", "SQL", "AWS", "Docker", "Go", "Rust",
  "Swift", "Kotlin", "GraphQL", "Kubernetes",
];

const GOALS = [
  { label: "Software Engineer", icon: "💻", desc: "Backend / Frontend / Full-stack" },
  { label: "Data Scientist", icon: "📊", desc: "ML / Analytics / Research" },
  { label: "DevOps Engineer", icon: "⚙️", desc: "Infrastructure / Cloud / CI/CD" },
  { label: "Product Manager", icon: "🎯", desc: "Technical PM / Strategy" },
];

const CATEGORIES = [
  { label: "Web Development", color: "#2563EB" },
  { label: "Mobile Apps", color: "#7C3AED" },
  { label: "AI / ML", color: "#059669" },
  { label: "Data Engineering", color: "#F59E0B" },
  { label: "Cloud & DevOps", color: "#EF4444" },
  { label: "Cybersecurity", color: "#0891B2" },
];

export function OnboardingScreen({ onNext }: { onNext: () => void }) {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(["Python", "React", "Machine Learning"]);
  const [selectedGoal, setSelectedGoal] = useState("Software Engineer");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Web Development", "AI / ML"]);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [githubConnected, setGithubConnected] = useState(false);
  const [githubInput, setGithubInput] = useState("");
  const [githubInputMode, setGithubInputMode] = useState(false);
  const [githubError, setGithubError] = useState("");

  const toggleInterest = (i: string) => {
    setSelectedInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const toggleCategory = (c: string) => {
    setSelectedCategories((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleGithubConnect = () => {
    const val = githubInput.trim();
    if (!val) {
      setGithubError("Please enter your Github username or profile link.");
      return;
    }
    // Basic validation: no spaces, reasonable length
    const username = val.replace(/^https?:\/\/(www\.)?github\.com\//i, "").replace(/\/$/, "");
    if (/\s/.test(username) || username.length < 1) {
      setGithubError("That doesn't look like a valid Github username.");
      return;
    }
    setGithubInput(username);
    setGithubConnected(true);
    setGithubInputMode(false);
    setGithubError("");
  };

  const advance = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else onNext();
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#ffffff" }}>
      {/* Header */}
      <div style={{ paddingTop: "calc(env(safe-area-inset-top, 0px) + 52px)", paddingLeft: 24, paddingRight: 24, paddingBottom: 0 }}>
        {/* Progress dots */}
        <div className="flex items-center gap-2 mb-4">
          {STEPS.map((s) => (
            <div
              key={s.id}
              style={{
                height: 4,
                flex: 1,
                borderRadius: 2,
                background:
                  s.id < step
                    ? "#059669"
                    : s.id === step
                    ? "linear-gradient(90deg, #2563EB, #059669)"
                    : "#E2E8F0",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, letterSpacing: "0.05em" }}>
          STEP {step + 1} OF {STEPS.length}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-y-auto" style={{ padding: "12px 24px 0" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.22 }}
          >
            {/* Step header */}
            <div className="flex items-center gap-3 mb-5">
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #EFF6FF, #ECFDF5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {(() => {
                  const Icon = STEPS[step].icon;
                  return <Icon size={22} color="#2563EB" />;
                })()}
              </div>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
                  {STEPS[step].title}
                </h2>
                <p style={{ fontSize: 12.5, color: "#64748B", marginTop: 2 }}>
                  {STEPS[step].subtitle}
                </p>
              </div>
            </div>

            {/* Step 0: Upload Resume */}
            {step === 0 && (
              <div className="flex flex-col gap-3">
                <div
                  onClick={() => setFileUploaded(true)}
                  style={{
                    border: `2px dashed ${fileUploaded ? "#059669" : "#CBD5E1"}`,
                    borderRadius: 16,
                    padding: 28,
                    textAlign: "center",
                    background: fileUploaded ? "#F0FDF4" : "#FAFAFA",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {fileUploaded ? (
                    <>
                      <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: "#059669" }}>
                        resume_alex_johnson.pdf
                      </div>
                      <div style={{ fontSize: 11.5, color: "#6B7280", marginTop: 4 }}>
                        2.3 MB · Uploaded successfully
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload size={32} color="#94A3B8" style={{ margin: "0 auto 10px" }} />
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: "#475569" }}>
                        Drop your resume here
                      </div>
                      <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 4 }}>
                        PDF, DOC, DOCX up to 5MB
                      </div>
                      <button
                        style={{
                          marginTop: 12,
                          padding: "8px 20px",
                          borderRadius: 10,
                          background: "linear-gradient(135deg, #2563EB, #1d4ed8)",
                          color: "white",
                          fontSize: 12,
                          fontWeight: 600,
                          border: "none",
                          cursor: "pointer",
                        }}
                      >
                        Browse Files
                      </button>
                    </>
                  )}
                </div>
                <div
                  style={{
                    padding: 14,
                    background: "#F0F9FF",
                    borderRadius: 12,
                    border: "1px solid #BAE6FD",
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: 16 }}>🤖</span>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0369A1" }}>
                      AI will analyze:
                    </div>
                    <div style={{ fontSize: 11.5, color: "#0369A1", marginTop: 3, lineHeight: 1.6 }}>
                      Skills, experience, education, projects, and work history to build your initial profile.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Connect Github */}
            {step === 1 && (
              <div className="flex flex-col gap-3">
                {/* Connected state */}
                {githubConnected ? (
                  <div
                    style={{
                      padding: 20,
                      borderRadius: 16,
                      background: "#F0FDF4",
                      border: "1.5px solid #059669",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          background: "#0F172A",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Github size={26} color="white" />
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: "#059669" }}>
                          @{githubInput.replace("https://github.com/", "").replace(/\/$/, "") || "alexjohnson"} connected!
                        </div>
                        <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 2 }}>
                          Github profile verified ✅
                        </div>
                      </div>
                    </div>
<div
  style={{
    display: "flex",
    justifyContent: "space-around",
    padding: "12px 0",
    borderTop: "1px solid #D1FAE5",
  }}
>
  {[
 { l: "Repos", v: "0" },
{ l: "Followers", v: "0" },
{ l: "Stars", v: "0" },
{ l: "Commits", v: "0" },
].map((s) => (
  <div key={s.l} style={{ textAlign: "center" }}>
    <div
      style={{
        fontSize: 17,
        fontWeight: 800,
        color: "#0F172A",
      }}
    >
      {s.v}
    </div>

    <div
      style={{
        fontSize: 10,
        color: "#94A3B8",
        fontWeight: 500,
        marginTop: 2,
      }}
    >
      {s.l}
    </div>
  </div>
))}
</div>
                    <button
                      onClick={() => { setGithubConnected(false); setGithubInputMode(false); setGithubInput(""); }}
                      style={{
                        marginTop: 12,
                        width: "100%",
                        padding: "8px 0",
                        borderRadius: 10,
                        border: "1px solid #A7F3D0",
                        background: "transparent",
                        color: "#059669",
                        fontSize: 12.5,
                        fontWeight: 600,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Change Account
                    </button>
                  </div>
                ) : !githubInputMode ? (
                  /* Initial state — prompt to connect */
                  <div
                    style={{
                      padding: 24,
                      borderRadius: 16,
                      background: "#F8FAFC",
                      border: "1.5px solid #E2E8F0",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "#0F172A",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 14px",
                      }}
                    >
                      <Github size={32} color="white" />
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 6 }}>
                      Connect your Github account
                    </div>
                    <div style={{ fontSize: 12.5, color: "#64748B", marginBottom: 18, lineHeight: 1.5 }}>
                      We'll analyze your repos, commits, and coding patterns to verify your skills
                    </div>
                    <button
                      onClick={() => setGithubInputMode(true)}
                      style={{
                        padding: "12px 28px",
                        borderRadius: 12,
                        background: "#0F172A",
                        color: "white",
                        fontSize: 13.5,
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontFamily: "inherit",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                      }}
                    >
                      <Github size={17} /> Connect Github
                    </button>
                  </div>
                ) : (
                  /* Input mode — enter username or URL */
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        padding: 20,
                        borderRadius: 16,
                        background: "#ffffff",
                        border: "1.5px solid #BFDBFE",
                        boxShadow: "0 4px 16px rgba(37,99,235,0.1)",
                      }}
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "#0F172A",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <Github size={20} color="white" />
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>Enter Github Details</div>
                          <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 1 }}>Username or full profile URL</div>
                        </div>
                      </div>

                      {/* Input */}
                      <div style={{ marginBottom: 6 }}>
                        <label style={{ fontSize: 11, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 7, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                          Github Username or Profile Link
                        </label>
                        <div style={{ position: "relative" }}>
                          <div
                            style={{
                              position: "absolute",
                              left: 12,
                              top: "50%",
                              transform: "translateY(-50%)",
                              fontSize: 13,
                              color: "#94A3B8",
                              fontWeight: 500,
                              pointerEvents: "none",
                            }}
                          >
                            {githubInput.startsWith("http") ? "" : "@"}
                          </div>
                          <input
                            autoFocus
                            value={githubInput}
                            onChange={(e) => { setGithubInput(e.target.value); setGithubError(""); }}
                            placeholder="e.g. alexjohnson or github.com/alexjohnson"
                            style={{
                              width: "100%",
                              padding: githubInput.startsWith("http") ? "12px 14px" : "12px 14px 12px 28px",
                              borderRadius: 12,
                              border: `1.5px solid ${githubError ? "#EF4444" : "#E2E8F0"}`,
                              fontSize: 13.5,
                              outline: "none",
                              background: "#F8FAFC",
                              color: "#0F172A",
                              boxSizing: "border-box" as const,
                              fontFamily: "inherit",
                            }}
                            onKeyDown={(e) => e.key === "Enter" && handleGithubConnect()}
                          />
                        </div>
                        {githubError && (
                          <div style={{ fontSize: 11.5, color: "#EF4444", marginTop: 5, fontWeight: 500 }}>
                            ⚠️ {githubError}
                          </div>
                        )}
                      </div>

                      {/* Examples */}
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 6, fontWeight: 500 }}>
                          Accepted formats:
                        </div>
                        {["alexjohnson", "https://github.com/alexjohnson"].map((ex) => (
                          <button
                            key={ex}
                            onClick={() => { setGithubInput(ex); setGithubError(""); }}
                            style={{
                              display: "block",
                              fontSize: 11.5,
                              color: "#2563EB",
                              background: "#EFF6FF",
                              border: "none",
                              borderRadius: 6,
                              padding: "4px 10px",
                              cursor: "pointer",
                              fontFamily: "monospace",
                              marginBottom: 4,
                              fontWeight: 500,
                            }}
                          >
                            {ex}
                          </button>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          onClick={() => { setGithubInputMode(false); setGithubError(""); setGithubInput(""); }}
                          style={{
                            flex: 1,
                            padding: "11px 0",
                            borderRadius: 12,
                            border: "1.5px solid #E2E8F0",
                            background: "transparent",
                            color: "#64748B",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "inherit",
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleGithubConnect}
                          style={{
                            flex: 2,
                            padding: "11px 0",
                            borderRadius: 12,
                            border: "none",
                            background: githubInput.trim()
                              ? "linear-gradient(135deg, #0F172A, #1E293B)"
                              : "#E2E8F0",
                            color: githubInput.trim() ? "white" : "#94A3B8",
                            fontSize: 13.5,
                            fontWeight: 700,
                            cursor: githubInput.trim() ? "pointer" : "default",
                            fontFamily: "inherit",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            boxShadow: githubInput.trim() ? "0 4px 12px rgba(0,0,0,0.2)" : "none",
                          }}
                        >
                          <Github size={15} /> Verify & Connect
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* What we analyze */}
                {!githubConnected && (
                  <div
                    style={{
                      padding: 14,
                      background: "#F0F9FF",
                      borderRadius: 12,
                      border: "1px solid #BAE6FD",
                    }}
                  >
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: "#0369A1", marginBottom: 8 }}>
                      🤖 What AI will analyze from Github:
                    </div>
                    {["Commit history & frequency", "Language proficiency by repo", "Project complexity & originality", "Open source contributions"].map((item) => (
                      <div key={item} className="flex items-center gap-2 mb-1.5">
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2563EB", flexShrink: 0 }} />
                        <span style={{ fontSize: 12, color: "#0369A1", fontWeight: 500 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Technical Interests */}
            {step === 2 && (
              <div>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => {
                    const selected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        style={{
                          padding: "7px 14px",
                          borderRadius: 20,
                          fontSize: 12.5,
                          fontWeight: 600,
                          border: `1.5px solid ${selected ? "#2563EB" : "#E2E8F0"}`,
                          background: selected
                            ? "linear-gradient(135deg, #EFF6FF, #DBEAFE)"
                            : "#F8FAFC",
                          color: selected ? "#2563EB" : "#64748B",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          transition: "all 0.15s",
                        }}
                      >
                        {selected && <Check size={11} />}
                        {interest}
                      </button>
                    );
                  })}
                </div>
                <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: "#F0FDF4", fontSize: 12, color: "#059669", fontWeight: 500 }}>
                  {selectedInterests.length} skills selected — AI will verify these against your Github
                </div>
              </div>
            )}

            {/* Step 3: Career Goals */}
            {step === 3 && (
              <div className="flex flex-col gap-3">
                {GOALS.map((goal) => {
                  const selected = selectedGoal === goal.label;
                  return (
                    <button
                      key={goal.label}
                      onClick={() => setSelectedGoal(goal.label)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "14px 16px",
                        borderRadius: 14,
                        border: `1.5px solid ${selected ? "#2563EB" : "#E2E8F0"}`,
                        background: selected ? "linear-gradient(135deg, #EFF6FF, #F0FDF4)" : "#FAFAFA",
                        cursor: "pointer",
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      <div style={{ fontSize: 26 }}>{goal.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: selected ? "#2563EB" : "#0F172A" }}>
                          {goal.label}
                        </div>
                        <div style={{ fontSize: 11.5, color: "#64748B", marginTop: 2 }}>{goal.desc}</div>
                      </div>
                      {selected && (
                        <div
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #2563EB, #059669)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Check size={12} color="white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Step 4: Skill Categories */}
            {step === 4 && (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((cat) => {
                    const selected = selectedCategories.includes(cat.label);
                    return (
                      <button
                        key={cat.label}
                        onClick={() => toggleCategory(cat.label)}
                        style={{
                          padding: "16px 12px",
                          borderRadius: 14,
                          border: `1.5px solid ${selected ? cat.color : "#E2E8F0"}`,
                          background: selected ? `${cat.color}10` : "#F8FAFC",
                          cursor: "pointer",
                          textAlign: "center",
                          transition: "all 0.15s",
                        }}
                      >
                        {selected && (
                          <div className="flex justify-end" style={{ marginBottom: 4 }}>
                            <Check size={12} color={cat.color} />
                          </div>
                        )}
                        <div style={{ fontSize: 12.5, fontWeight: 700, color: selected ? cat.color : "#475569" }}>
                          {cat.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div style={{ padding: 12, borderRadius: 10, background: "#F0F9FF", fontSize: 12, color: "#0369A1", fontWeight: 500, lineHeight: 1.5 }}>
                  🎯 AI will generate a personalized skill verification roadmap based on your selections.
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: "12px 24px 20px" }}>
        <button
          onClick={advance}
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: 14,
            border: "none",
            background: "linear-gradient(135deg, #2563EB, #059669)",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
          }}
        >
          {step < STEPS.length - 1 ? "Continue" : "Build My Profile"}
          <ArrowRight size={16} />
        </button>
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            style={{
              width: "100%",
              marginTop: 8,
              padding: "10px 0",
              borderRadius: 12,
              border: "none",
              background: "transparent",
              color: "#94A3B8",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

