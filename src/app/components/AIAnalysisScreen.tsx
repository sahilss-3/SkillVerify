import { useState } from "react";
import { Brain, ChevronRight, AlertTriangle, CheckCircle, AlertCircle, Lightbulb, ArrowRight } from "lucide-react";

const skills = [
  {
    name: "Python",
    claimed: true,
    confidence: 87,
    level: "High Confidence",
    evidence: ["47 Python repos", "3,200+ lines written", "spaCy, pandas, numpy usage"],
    color: "#059669",
    icon: "✅",
  },
  {
    name: "React",
    claimed: true,
    confidence: 79,
    level: "Strong Evidence",
    evidence: ["12 React projects", "Hooks, context, routing", "TypeScript usage"],
    color: "#2563EB",
    icon: "✅",
  },
  {
    name: "Machine Learning",
    claimed: true,
    confidence: 34,
    level: "Weak Evidence",
    evidence: ["1 ML repo (low commits)", "No deployed models", "Tutorial code only"],
    color: "#EF4444",
    icon: "⚠️",
    warning: "Your GitHub shows mostly tutorial code. Real ML projects needed.",
  },
  {
    name: "SQL",
    claimed: true,
    confidence: 64,
    level: "Medium Confidence",
    evidence: ["PostgreSQL in 2 projects", "Basic queries found", "No complex joins shown"],
    color: "#F59E0B",
    icon: "🟡",
  },
  {
    name: "Docker",
    claimed: true,
    confidence: 48,
    level: "Limited Evidence",
    evidence: ["1 Dockerfile found", "Basic container setup only"],
    color: "#F59E0B",
    icon: "🟡",
  },
  {
    name: "Kubernetes",
    claimed: false,
    confidence: 0,
    level: "Not Detected",
    evidence: ["No Kubernetes usage found", "Not on resume"],
    color: "#94A3B8",
    icon: "❌",
  },
];

const radarData = [
  { subject: "Python", value: 87 },
  { subject: "React", value: 79 },
  { subject: "ML", value: 34 },
  { subject: "SQL", value: 64 },
  { subject: "Docker", value: 48 },
  { subject: "Node.js", value: 71 },
];

function CustomRadar({ data }: { data: { subject: string; value: number }[] }) {
  const cx = 130;
  const cy = 110;
  const maxR = 80;
  const n = data.length;

  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  const toXY = (idx: number, r: number) => {
    const angle = startAngle + idx * angleStep;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  };

  // Grid rings
  const rings = [0.25, 0.5, 0.75, 1].map((t) =>
    data.map((_, i) => toXY(i, maxR * t))
  );

  // Data polygon
  const dataPoints = data.map((d, i) => toXY(i, (d.value / 100) * maxR));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + " Z";

  return (
    <svg width="100%" viewBox="0 0 260 220" style={{ overflow: "visible" }}>
      {/* Grid rings */}
      {rings.map((ring, ri) => (
        <polygon
          key={`ring-${ri}`}
          points={ring.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={1}
        />
      ))}
      {/* Axis spokes */}
      {data.map((_, i) => {
        const outer = toXY(i, maxR);
        return (
          <line key={`spoke-${i}`} x1={cx} y1={cy} x2={outer.x.toFixed(1)} y2={outer.y.toFixed(1)} stroke="#E2E8F0" strokeWidth={1} />
        );
      })}
      {/* Data area */}
      <path d={dataPath} fill="#2563EB" fillOpacity={0.12} stroke="#2563EB" strokeWidth={2} strokeLinejoin="round" />
      {/* Data dots */}
      {dataPoints.map((p, i) => (
        <circle key={`rdot-${i}`} cx={p.x} cy={p.y} r={4} fill="#2563EB" />
      ))}
      {/* Labels */}
      {data.map((d, i) => {
        const labelR = maxR + 18;
        const lp = toXY(i, labelR);
        const anchor = lp.x < cx - 5 ? "end" : lp.x > cx + 5 ? "start" : "middle";
        return (
          <text key={`rlabel-${i}`} x={lp.x.toFixed(1)} y={(lp.y + 4).toFixed(1)} textAnchor={anchor} fontSize={11} fontWeight={600} fill="#64748B">
            {d.subject}
          </text>
        );
      })}
    </svg>
  );
}

export function AIAnalysisScreen() {
  const [expanded, setExpanded] = useState<string | null>("Machine Learning");

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
        <div className="flex items-center gap-3 mb-1">
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              background: "linear-gradient(135deg, #2563EB, #059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Brain size={18} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: 19, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
              AI Skill Analysis
            </h1>
            <p style={{ fontSize: 11.5, color: "#64748B" }}>
              Claimed vs. Real Evidence · Updated 2h ago
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 90px" }}>
        {/* Overall verdict */}
        <div
          style={{
            background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%)",
            borderRadius: 18,
            padding: 16,
            marginBottom: 14,
            color: "white",
            boxShadow: "0 6px 20px rgba(37,99,235,0.3)",
          }}
        >
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: "0.05em", marginBottom: 6 }}>
            AI VERDICT
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.5, color: "rgba(255,255,255,0.95)" }}>
            Your Python and React skills are{" "}
            <span style={{ color: "#4ADE80" }}>well-supported</span> by real projects. However,{" "}
            <span style={{ color: "#FCD34D" }}>Machine Learning claims</span> lack substantial
            evidence. Adding 2 ML projects would significantly boost your trust score.
          </div>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.12)",
              borderRadius: 10,
              padding: "8px 12px",
              backdropFilter: "blur(4px)",
            }}
          >
            <Lightbulb size={13} color="#FCD34D" />
            <span style={{ fontSize: 11.5, color: "rgba(255,255,255,0.85)" }}>
              Trust Score would improve by +18 points with stronger ML evidence
            </span>
          </div>
        </div>

        {/* Radar chart */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 18,
            padding: "16px 8px 8px",
            marginBottom: 14,
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A", paddingLeft: 8, marginBottom: 4 }}>
            Skill Confidence Map
          </div>
          <CustomRadar data={radarData} />
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4 px-1">
          {[
            { icon: "✅", label: "High Confidence", color: "#059669" },
            { icon: "🟡", label: "Medium", color: "#F59E0B" },
            { icon: "⚠️", label: "Weak / Missing", color: "#EF4444" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1">
              <span style={{ fontSize: 12 }}>{l.icon}</span>
              <span style={{ fontSize: 10.5, color: "#64748B", fontWeight: 500 }}>{l.label}</span>
            </div>
          ))}
        </div>

        {/* Skills breakdown */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>
            Skill-by-Skill Analysis
          </div>
          <div className="flex flex-col gap-2">
            {skills.map((skill) => {
              const isExpanded = expanded === skill.name;
              return (
                <div
                  key={skill.name}
                  style={{
                    background: "#ffffff",
                    borderRadius: 14,
                    overflow: "hidden",
                    border: `1.5px solid ${isExpanded ? skill.color + "40" : "#F1F5F9"}`,
                    boxShadow: isExpanded ? `0 4px 16px ${skill.color}18` : "0 1px 4px rgba(0,0,0,0.04)",
                    transition: "all 0.2s",
                  }}
                >
                  <button
                    onClick={() => setExpanded(isExpanded ? null : skill.name)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 14px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: 17 }}>{skill.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{skill.name}</div>
                      <div style={{ fontSize: 11, color: skill.color, fontWeight: 600, marginTop: 1 }}>
                        {skill.level}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {skill.confidence > 0 && (
                        <div style={{ textAlign: "right" }}>
                          <div style={{ fontSize: 16, fontWeight: 800, color: skill.color }}>
                            {skill.confidence}%
                          </div>
                        </div>
                      )}
                      <ChevronRight
                        size={15}
                        color="#CBD5E1"
                        style={{ transform: isExpanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}
                      />
                    </div>
                  </button>

                  {/* Confidence bar */}
                  {skill.confidence > 0 && (
                    <div style={{ padding: "0 14px", paddingBottom: isExpanded ? 0 : 12 }}>
                      <div style={{ height: 5, borderRadius: 3, background: "#F1F5F9", overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${skill.confidence}%`,
                            borderRadius: 3,
                            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Expanded evidence */}
                  {isExpanded && (
                    <div style={{ padding: "10px 14px 14px" }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: "0.05em", marginBottom: 6 }}>
                        EVIDENCE FOUND
                      </div>
                      {skill.evidence.map((e, i) => (
                        <div key={i} className="flex items-center gap-2 mb-1.5">
                          <div style={{ width: 5, height: 5, borderRadius: "50%", background: skill.color, flexShrink: 0 }} />
                          <span style={{ fontSize: 12, color: "#475569" }}>{e}</span>
                        </div>
                      ))}
                      {skill.warning && (
                        <div
                          style={{
                            marginTop: 10,
                            padding: "10px 12px",
                            borderRadius: 10,
                            background: "#FEF2F2",
                            border: "1px solid #FECACA",
                            display: "flex",
                            gap: 8,
                            alignItems: "flex-start",
                          }}
                        >
                          <AlertTriangle size={13} color="#EF4444" style={{ flexShrink: 0, marginTop: 1 }} />
                          <span style={{ fontSize: 11.5, color: "#B91C1C", lineHeight: 1.5 }}>{skill.warning}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Missing skills */}
        <div
          style={{
            background: "#FFF7ED",
            borderRadius: 18,
            padding: 16,
            marginBottom: 14,
            border: "1px solid #FED7AA",
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle size={15} color="#F59E0B" />
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#92400E" }}>Skill Gaps Detected</span>
          </div>
          {["System Design fundamentals", "Unit testing (pytest/Jest)", "CI/CD pipeline experience", "API documentation"].map((gap) => (
            <div key={gap} className="flex items-center gap-3 mb-2">
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", flexShrink: 0 }} />
              <span style={{ fontSize: 12.5, color: "#78350F" }}>{gap}</span>
            </div>
          ))}
        </div>

        {/* AI suggested projects */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 18,
            padding: 16,
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={15} color="#2563EB" />
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>AI Project Suggestions</span>
          </div>
          {[
            {
              title: "Sentiment Analysis API",
              desc: "Build a REST API using scikit-learn to classify text sentiment",
              tags: ["Python", "ML", "FastAPI"],
              impact: "+22 trust pts",
            },
            {
              title: "SQL Analytics Dashboard",
              desc: "Create complex queries with joins, aggregations, and window functions",
              tags: ["SQL", "PostgreSQL"],
              impact: "+14 trust pts",
            },
          ].map((proj) => (
            <div
              key={proj.title}
              style={{
                padding: "12px 14px",
                borderRadius: 12,
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                marginBottom: 10,
              }}
            >
              <div className="flex items-start justify-between mb-1">
                <span style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{proj.title}</span>
                <span
                  style={{
                    fontSize: 10.5,
                    background: "#ECFDF5",
                    color: "#059669",
                    padding: "3px 8px",
                    borderRadius: 6,
                    fontWeight: 700,
                  }}
                >
                  {proj.impact}
                </span>
              </div>
              <p style={{ fontSize: 11.5, color: "#64748B", marginBottom: 8, lineHeight: 1.5 }}>{proj.desc}</p>
              <div className="flex flex-wrap gap-1">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10.5,
                      background: "#EFF6FF",
                      color: "#2563EB",
                      padding: "2px 7px",
                      borderRadius: 4,
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <button
            style={{
              width: "100%",
              padding: "11px 0",
              borderRadius: 12,
              border: "none",
              background: "linear-gradient(135deg, #2563EB, #059669)",
              color: "white",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            View Full Roadmap <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
