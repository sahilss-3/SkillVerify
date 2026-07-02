import { useState } from "react";
import { Sparkles, BookOpen, Rocket, Target, Clock, CheckCircle, ChevronRight, Star } from "lucide-react";

const projects = [
  {
    title: "ML Text Classifier",
    desc: "Build a spam/sentiment classifier using scikit-learn with a clean REST API",
    difficulty: "Intermediate",
    time: "1–2 weeks",
    tags: ["Python", "ML", "FastAPI"],
    trustGain: "+22",
    color: "#2563EB",
    bg: "#EFF6FF",
  },
  {
    title: "Full-Stack Todo w/ Auth",
    desc: "JWT auth, PostgreSQL, React frontend with real-time sync via WebSocket",
    difficulty: "Intermediate",
    time: "2 weeks",
    tags: ["Node.js", "React", "PostgreSQL"],
    trustGain: "+18",
    color: "#059669",
    bg: "#ECFDF5",
  },
  {
    title: "DevOps CI/CD Pipeline",
    desc: "GitHub Actions, Docker, deploy to Render or Railway with health checks",
    difficulty: "Advanced",
    time: "1 week",
    tags: ["Docker", "GitHub Actions", "CI/CD"],
    trustGain: "+15",
    color: "#7C3AED",
    bg: "#F5F3FF",
  },
  {
    title: "Data Dashboard",
    desc: "Python script pulls data from public API, stores in SQLite, visualized with Plotly",
    difficulty: "Beginner",
    time: "3–5 days",
    tags: ["Python", "SQL", "Plotly"],
    trustGain: "+12",
    color: "#0891B2",
    bg: "#F0F9FF",
  },
];

const roadmap = [
  {
    week: "Week 1–2",
    title: "Strengthen ML Evidence",
    tasks: ["Start sentiment analysis project", "Deploy to Hugging Face Spaces", "Write README with results"],
    status: "current",
  },
  {
    week: "Week 3–4",
    title: "System Design Basics",
    tasks: ["Study database indexing", "Learn caching patterns", "Mock system design interview"],
    status: "upcoming",
  },
  {
    week: "Week 5–6",
    title: "Testing & Documentation",
    tasks: ["Add pytest to existing projects", "Write API docs with Swagger", "Set up CI/CD"],
    status: "upcoming",
  },
  {
    week: "Week 7–8",
    title: "Internship Prep",
    tasks: ["Polish GitHub profile", "Practice LeetCode (25 problems)", "Reach out to 5 companies"],
    status: "locked",
  },
];

const tips = [
  { icon: "📝", title: "Fix Resume Claims", desc: "Remove ML from core skills; move to 'Exploring' section until strengthened", priority: "High" },
  { icon: "🌟", title: "Star Your Best Projects", desc: "Add detailed READMEs with screenshots to your top 3 repos", priority: "High" },
  { icon: "🤝", title: "Open Source Contributions", desc: "Make 5 small PRs to popular Python or React repos to show collaboration", priority: "Medium" },
  { icon: "📚", title: "LeetCode Consistency", desc: "Solve 2–3 problems daily; companies verify coding interview readiness", priority: "Medium" },
];

export function RecommendationsScreen() {
  const [activeTab, setActiveTab] = useState<"projects" | "roadmap" | "tips">("projects");

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-auto"
      style={{ background: "#F8FAFC" }}
    >
      {/* Header */}
      <div
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 52px)",
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 16,
          background: "#ffffff",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg, #059669, #2563EB)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={18} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 19, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
              AI Recommendations
            </h1>
            <p style={{ fontSize: 11.5, color: "#64748B" }}>Personalized career growth plan</p>
          </div>
        </div>

        {/* Score impact teaser */}
        <div
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            background: "linear-gradient(135deg, #EFF6FF, #ECFDF5)",
            border: "1px solid #BFDBFE",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Rocket size={15} color="#2563EB" />
          <span style={{ fontSize: 12.5, color: "#1E40AF", fontWeight: 600 }}>
            Complete all recommendations → Score: 82 → <span style={{ color: "#059669" }}>94</span>
          </span>
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: 0,
          padding: "10px 16px",
          background: "#ffffff",
          borderBottom: "1px solid #F1F5F9",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {[
          { id: "projects", label: "Projects", icon: <BookOpen size={13} /> },
          { id: "roadmap", label: "Roadmap", icon: <Target size={13} /> },
          { id: "tips", label: "Quick Tips", icon: <Star size={13} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              padding: "8px 0",
              borderRadius: 10,
              border: "none",
              background: activeTab === tab.id ? "linear-gradient(135deg, #EFF6FF, #ECFDF5)" : "transparent",
              color: activeTab === tab.id ? "#2563EB" : "#94A3B8",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 16px 90px" }}>
        {/* Projects tab */}
        {activeTab === "projects" && (
          <div className="flex flex-col gap-3">
            <div style={{ fontSize: 12, color: "#64748B", fontWeight: 500, marginBottom: 2 }}>
              4 projects recommended based on your skill gaps
            </div>
            {projects.map((proj) => (
              <div
                key={proj.title}
                style={{
                  background: "#ffffff",
                  borderRadius: 18,
                  overflow: "hidden",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  border: "1px solid #F1F5F9",
                }}
              >
                {/* Color accent bar */}
                <div style={{ height: 4, background: `linear-gradient(90deg, ${proj.color}, ${proj.color}88)` }} />
                <div style={{ padding: "14px 14px 14px" }}>
                  <div className="flex items-start justify-between mb-1.5">
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{proj.title}</div>
                    <div
                      style={{
                        fontSize: 11,
                        background: "#ECFDF5",
                        color: "#059669",
                        padding: "3px 8px",
                        borderRadius: 6,
                        fontWeight: 700,
                        flexShrink: 0,
                        marginLeft: 8,
                      }}
                    >
                      {proj.trustGain} pts
                    </div>
                  </div>
                  <p style={{ fontSize: 12.5, color: "#64748B", lineHeight: 1.5, marginBottom: 10 }}>{proj.desc}</p>

                  <div className="flex items-center gap-3 mb-10px">
                    <div className="flex items-center gap-1">
                      <Clock size={11} color="#94A3B8" />
                      <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>{proj.time}</span>
                    </div>
                    <div
                      style={{
                        fontSize: 10.5,
                        background: proj.bg,
                        color: proj.color,
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontWeight: 600,
                      }}
                    >
                      {proj.difficulty}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5" style={{ marginTop: 8 }}>
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 10.5,
                          background: "#F8FAFC",
                          color: "#475569",
                          padding: "3px 8px",
                          borderRadius: 5,
                          fontWeight: 600,
                          border: "1px solid #E2E8F0",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    style={{
                      marginTop: 12,
                      width: "100%",
                      padding: "9px 0",
                      borderRadius: 10,
                      border: `1.5px solid ${proj.color}40`,
                      background: proj.bg,
                      color: proj.color,
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 5,
                    }}
                  >
                    Start Project <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Roadmap tab */}
        {activeTab === "roadmap" && (
          <div>
            <div style={{ fontSize: 12, color: "#64748B", fontWeight: 500, marginBottom: 14 }}>
              8-week personalized improvement plan
            </div>
            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div
                style={{
                  position: "absolute",
                  left: 19,
                  top: 20,
                  bottom: 20,
                  width: 2,
                  background: "linear-gradient(180deg, #2563EB, #059669 50%, #E2E8F0)",
                }}
              />

              {roadmap.map((phase, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16 }}>
                  {/* Dot */}
                  <div style={{ flexShrink: 0, zIndex: 1 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background:
                          phase.status === "current"
                            ? "linear-gradient(135deg, #2563EB, #059669)"
                            : phase.status === "upcoming"
                            ? "#ffffff"
                            : "#F1F5F9",
                        border: `2.5px solid ${phase.status === "current" ? "transparent" : phase.status === "upcoming" ? "#2563EB" : "#E2E8F0"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: phase.status === "current" ? "0 4px 12px rgba(37,99,235,0.35)" : "none",
                      }}
                    >
                      {phase.status === "current" ? (
                        <Rocket size={16} color="white" />
                      ) : phase.status === "locked" ? (
                        <span style={{ fontSize: 16 }}>🔒</span>
                      ) : (
                        <span style={{ fontSize: 14, color: "#2563EB", fontWeight: 800 }}>{i + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    style={{
                      flex: 1,
                      background: phase.status === "current" ? "#ffffff" : phase.status === "locked" ? "#F8FAFC" : "#ffffff",
                      borderRadius: 14,
                      padding: "12px 14px",
                      border: `1.5px solid ${phase.status === "current" ? "#BFDBFE" : "#F1F5F9"}`,
                      boxShadow: phase.status === "current" ? "0 4px 16px rgba(37,99,235,0.1)" : "0 1px 4px rgba(0,0,0,0.04)",
                      opacity: phase.status === "locked" ? 0.7 : 1,
                    }}
                  >
                    <div style={{ fontSize: 10.5, color: phase.status === "current" ? "#2563EB" : "#94A3B8", fontWeight: 700, letterSpacing: "0.05em", marginBottom: 3 }}>
                      {phase.week.toUpperCase()} {phase.status === "current" && "· IN PROGRESS"}
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>{phase.title}</div>
                    {phase.tasks.map((task, j) => (
                      <div key={j} className="flex items-center gap-2 mb-1.5">
                        <CheckCircle
                          size={13}
                          color={phase.status === "current" && j === 0 ? "#059669" : "#CBD5E1"}
                        />
                        <span
                          style={{
                            fontSize: 12,
                            color: phase.status === "current" && j === 0 ? "#374151" : "#64748B",
                            fontWeight: phase.status === "current" && j === 0 ? 600 : 400,
                            textDecoration: phase.status === "current" && j === 0 ? "none" : "none",
                          }}
                        >
                          {task}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips tab */}
        {activeTab === "tips" && (
          <div className="flex flex-col gap-3">
            <div style={{ fontSize: 12, color: "#64748B", fontWeight: 500, marginBottom: 2 }}>
              AI-curated internship prep advice
            </div>
            {tips.map((tip) => (
              <div
                key={tip.title}
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: "14px 14px",
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  border: "1px solid #F1F5F9",
                  display: "flex",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 12,
                    background: tip.priority === "High" ? "#FFF7ED" : "#F0F9FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                >
                  {tip.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{tip.title}</span>
                    <span
                      style={{
                        fontSize: 9.5,
                        background: tip.priority === "High" ? "#FEF3C7" : "#DBEAFE",
                        color: tip.priority === "High" ? "#92400E" : "#1E40AF",
                        padding: "2px 6px",
                        borderRadius: 4,
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {tip.priority.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>{tip.desc}</p>
                </div>
              </div>
            ))}

            {/* Progress summary */}
            <div
              style={{
                background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
                borderRadius: 18,
                padding: 16,
                color: "white",
                marginTop: 4,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "rgba(255,255,255,0.9)" }}>
                Your Internship Readiness
              </div>
              {[
                { label: "Technical Skills", pct: 74 },
                { label: "Portfolio Quality", pct: 68 },
                { label: "Interview Prep", pct: 45 },
                { label: "Networking", pct: 30 },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: 8 }}>
                  <div className="flex justify-between mb-1">
                    <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.8)" }}>{item.label}</span>
                    <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.9)", fontWeight: 700 }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${item.pct}%`,
                        borderRadius: 3,
                        background: item.pct >= 70 ? "#4ADE80" : item.pct >= 50 ? "#FCD34D" : "#F87171",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
