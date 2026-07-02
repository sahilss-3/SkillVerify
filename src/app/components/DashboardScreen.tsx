import { Bell, Zap, TrendingUp, Brain, ChevronRight, Trophy, MessageCircle } from "lucide-react";
import type { Peer } from "./SearchScreen";

const activityData = [
  { day: "1", commits: 3 },
  { day: "5", commits: 7 },
  { day: "8", commits: 2 },
  { day: "10", commits: 9 },
  { day: "13", commits: 5 },
  { day: "15", commits: 11 },
  { day: "18", commits: 4 },
  { day: "20", commits: 8 },
  { day: "22", commits: 13 },
  { day: "25", commits: 6 },
  { day: "28", commits: 10 },
  { day: "30", commits: 14 },
];

const topSkills = [
  { name: "Python", score: 87, color: "#2563EB" },
  { name: "React", score: 79, color: "#059669" },
  { name: "Node.js", score: 71, color: "#7C3AED" },
  { name: "SQL", score: 64, color: "#F59E0B" },
  { name: "Docker", score: 48, color: "#EF4444" },
];

const insights = [
  { icon: "🔥", text: "Your Python proficiency is in the top 12% of CS students", color: "#FFF7ED", border: "#FED7AA" },
  { icon: "⚠️", text: "ML skills lack project evidence — add 1-2 projects", color: "#FFFBEB", border: "#FDE68A" },
  { icon: "💡", text: "React consistency streak: 18 days! Keep it up", color: "#F0FDF4", border: "#A7F3D0" },
];

function ScoreRing({ score, label, color, size = 80, uid }: { score: number; label: string; color: string; size?: number; uid: string }) {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const gradId = `scoreRingGrad-${uid}`;
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={color} stopOpacity={0.6} />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#F1F5F9" strokeWidth={7} />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={`url(#${gradId})`}
            strokeWidth={7}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size > 70 ? 20 : 15,
            fontWeight: 800,
            color: "#0F172A",
            letterSpacing: "-0.03em",
          }}
        >
          {score}
        </div>
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#64748B", marginTop: 5 }}>{label}</div>
    </div>
  );
}

// Custom SVG area chart — avoids recharts key conflicts
function ActivityChart({ data }: { data: { day: string; commits: number }[] }) {
  const W = 320;
  const H = 90;
  const pad = { top: 8, right: 8, bottom: 20, left: 4 };
  const innerW = W - pad.left - pad.right;
  const innerH = H - pad.top - pad.bottom;
  const maxVal = Math.max(...data.map((d) => d.commits));
  const xs = data.map((_, i) => pad.left + (i / (data.length - 1)) * innerW);
  const ys = data.map((d) => pad.top + (1 - d.commits / maxVal) * innerH);

  const linePath = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const areaPath = `${linePath} L${xs[xs.length - 1]},${H - pad.bottom} L${xs[0]},${H - pad.bottom} Z`;

  const gradId = "dashActivityAreaGrad";

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity={0.22} />
          <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {[0, 0.33, 0.66, 1].map((t, i) => (
        <line
          key={`grid-${i}`}
          x1={pad.left}
          y1={pad.top + t * innerH}
          x2={W - pad.right}
          y2={pad.top + t * innerH}
          stroke="#F1F5F9"
          strokeWidth={1}
        />
      ))}
      {/* Area fill */}
      <path d={areaPath} fill={`url(#${gradId})`} />
      {/* Line */}
      <path d={linePath} fill="none" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {/* Data points */}
      {xs.map((x, i) => (
        <circle key={`dot-${i}`} cx={x} cy={ys[i]} r={i === data.length - 1 ? 4 : 2.5} fill={i === data.length - 1 ? "#2563EB" : "#fff"} stroke="#2563EB" strokeWidth={1.5} />
      ))}
      {/* X axis labels */}
      {data.filter((_, i) => i % 3 === 0).map((d, i) => {
        const origIdx = i * 3;
        return (
          <text key={`label-${i}`} x={xs[origIdx]} y={H - 4} textAnchor="middle" fontSize={9} fill="#94A3B8">
            Jun {d.day}
          </text>
        );
      })}
    </svg>
  );
}

function Leaderboard({ peers }: { peers: Peer[] }) {
  const connected = peers.filter((p) => p.connected);
  // Add "you" entry
  const you = { id: "you", name: "You", initials: "AJ", skillScore: 82, trustScore: 85, readiness: 74, avatarGrad: "linear-gradient(135deg,#2563EB,#059669)", connected: true };
  const all = [you, ...connected].sort((a, b) => b.skillScore - a.skillScore);

  if (connected.length === 0) {
    return (
      <div style={{ background: "#ffffff", borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Trophy size={15} color="#F59E0B" />
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>Connections Leaderboard</span>
        </div>
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>🏆</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#475569" }}>No connections yet</div>
          <div style={{ fontSize: 11.5, color: "#94A3B8", marginTop: 4 }}>Connect with peers in Discover to see their growth here</div>
        </div>
      </div>
    );
  }

  const medalColors = ["#F59E0B", "#94A3B8", "#CD7F32"];

  return (
    <div style={{ background: "#ffffff", borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy size={15} color="#F59E0B" />
          <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>Connections Leaderboard</span>
        </div>
        <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500 }}>{connected.length} connected</span>
      </div>

      {all.slice(0, 5).map((p, i) => {
        const isYou = p.id === "you";
        const medal = i < 3 ? medalColors[i] : null;
        return (
          <div
            key={p.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 10px",
              borderRadius: 12,
              marginBottom: 6,
              background: isYou ? "linear-gradient(135deg,#EFF6FF,#ECFDF5)" : "#F8FAFC",
              border: isYou ? "1.5px solid #BFDBFE" : "1px solid transparent",
            }}
          >
            {/* Rank */}
            <div style={{
              width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
              background: medal ? medal : "#F1F5F9",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: medal ? 13 : 11, fontWeight: 800,
              color: medal ? "white" : "#94A3B8",
            }}>
              {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
            </div>

            {/* Avatar */}
            <div style={{
              width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
              background: p.avatarGrad,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: 12, fontWeight: 800,
            }}>
              {p.initials}
            </div>

            {/* Name + bar */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12.5, fontWeight: isYou ? 800 : 600, color: isYou ? "#1d4ed8" : "#0F172A" }}>
                  {p.name} {isYou && <span style={{ fontSize: 10, background: "#DBEAFE", color: "#2563EB", padding: "1px 5px", borderRadius: 4, marginLeft: 3, fontWeight: 700 }}>YOU</span>}
                </span>
                <span style={{ fontSize: 13, fontWeight: 800, color: p.skillScore >= 90 ? "#059669" : p.skillScore >= 80 ? "#2563EB" : "#F59E0B" }}>
                  {p.skillScore}
                </span>
              </div>
              <div style={{ height: 4, borderRadius: 2, background: "#F1F5F9", overflow: "hidden", marginTop: 4 }}>
                <div style={{
                  height: "100%", width: `${p.skillScore}%`, borderRadius: 2,
                  background: isYou ? "linear-gradient(90deg,#2563EB,#059669)" : "linear-gradient(90deg,#94A3B8,#CBD5E1)",
                }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function DashboardScreen({ peers = [], onOpenSupport }: { peers?: Peer[]; onOpenSupport?: () => void }) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-auto"
      style={{ background: "#F8FAFC" }}
    >
      {/* Header */}
      <div
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 52px)",
          paddingLeft: 24,
          paddingRight: 24,
          paddingBottom: 16,
          background: "#ffffff",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600, letterSpacing: "0.04em" }}>
              GOOD MORNING
            </p>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.03em", marginTop: 2 }}>
              Alex Johnson 👋
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Support button */}
            <button
              onClick={onOpenSupport}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #EFF6FF, #ECFDF5)",
                border: "1.5px solid #BFDBFE",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(37,99,235,0.12)",
                position: "relative",
              }}
              title="AI Support"
            >
              <MessageCircle size={17} color="#2563EB" />
              {/* live dot */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 9, height: 9, borderRadius: "50%", background: "#059669", border: "2px solid white" }} />
            </button>
            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <Bell size={22} color="#64748B" />
              <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: "50%", background: "#EF4444", border: "1.5px solid white" }} />
            </div>
            {/* Avatar */}
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #2563EB, #059669)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 14, fontWeight: 700 }}>
              AJ
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 16px 90px" }}>
        {/* Main score card */}
        <div
          style={{
            background: "linear-gradient(135deg, #1E3A8A 0%, #1d4ed8 50%, #059669 100%)",
            borderRadius: 20,
            padding: 20,
            marginBottom: 14,
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(37,99,235,0.25)",
          }}
        >
          <div style={{ position: "absolute", top: -30, right: -30, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
          <div style={{ position: "absolute", bottom: -20, left: 60, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
          <div style={{ position: "relative" }}>
            <div className="flex items-center gap-2 mb-3">
              <Brain size={14} color="rgba(255,255,255,0.8)" />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontWeight: 600, letterSpacing: "0.06em" }}>
                SKILLVERIFY SCORE
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div style={{ fontSize: 54, fontWeight: 900, color: "white", letterSpacing: "-0.04em", lineHeight: 1 }}>
                  82
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", marginTop: 4 }}>
                  out of 100 · Top 18%
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "rgba(255,255,255,0.15)",
                  padding: "6px 12px",
                  borderRadius: 20,
                }}
              >
                <TrendingUp size={13} color="#4ADE80" />
                <span style={{ fontSize: 12, color: "#4ADE80", fontWeight: 700 }}>+7 this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Three score rings */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Skill Score", score: 78, color: "#2563EB", uid: "skill" },
            { label: "Trust Score", score: 85, color: "#059669", uid: "trust" },
            { label: "Readiness", score: 74, color: "#7C3AED", uid: "ready" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "#ffffff",
                borderRadius: 16,
                padding: "14px 8px",
                textAlign: "center",
                boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
              }}
            >
              <ScoreRing score={item.score} label={item.label} color={item.color} size={72} uid={item.uid} />
            </div>
          ))}
        </div>

        {/* Coding Activity */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 18,
            padding: "16px 16px 12px",
            marginBottom: 14,
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>Coding Activity</div>
              <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 1 }}>Last 30 days · 247 commits</div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                background: "#F0FDF4",
                padding: "4px 10px",
                borderRadius: 20,
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#059669" }} />
              <span style={{ fontSize: 11, color: "#059669", fontWeight: 600 }}>Active</span>
            </div>
          </div>
          <ActivityChart data={activityData} />
        </div>

        {/* Technology Strengths */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 18,
            padding: 16,
            marginBottom: 14,
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>Technology Strengths</div>
            <span style={{ fontSize: 11.5, color: "#2563EB", fontWeight: 600, cursor: "pointer" }}>View all</span>
          </div>
          <div className="flex flex-col gap-3">
            {topSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-1">
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#475569" }}>{skill.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: skill.color }}>{skill.score}%</span>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: "#F1F5F9", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${skill.score}%`,
                      borderRadius: 3,
                      background: `linear-gradient(90deg, ${skill.color}BB, ${skill.color})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div style={{ marginBottom: 14 }}>
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} color="#F59E0B" />
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>AI Insights</span>
          </div>
          <div className="flex flex-col gap-2">
            {insights.map((insight, i) => (
              <div
                key={`insight-${i}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  padding: "12px 14px",
                  borderRadius: 14,
                  background: insight.color,
                  border: `1px solid ${insight.border}`,
                }}
              >
                <span style={{ fontSize: 16 }}>{insight.icon}</span>
                <p style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.5, flex: 1, fontWeight: 500 }}>
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <Leaderboard peers={peers} />

        {/* Growth actions */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ padding: "14px 16px 0", fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>
            Growth Actions
          </div>
          {[
            { icon: "📁", label: "Add a new project", sub: "Strengthen ML evidence", color: "#EFF6FF" },
            { icon: "🎯", label: "Weekly coding goal", sub: "15/20 commits this week", color: "#F0FDF4" },
            { icon: "📚", label: "Learn Kubernetes", sub: "Recommended for DevOps path", color: "#FFF7ED" },
          ].map((item, i) => (
            <div
              key={`action-${i}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderBottom: i < 2 ? "1px solid #F1F5F9" : "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  background: item.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                }}
              >
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#0F172A" }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>{item.sub}</div>
              </div>
              <ChevronRight size={16} color="#CBD5E1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
