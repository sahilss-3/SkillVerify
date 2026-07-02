import { useState } from "react";
import {
  Search, X, UserPlus, UserCheck, ChevronRight, ArrowLeft,
  Users, GraduationCap, MapPin, GitBranch, GitPullRequest,
  ExternalLink, Star, CheckCircle, Phone, Calendar, Award,
} from "lucide-react";
import { motion } from "framer-motion";
import ChallengeScreen from "./challengeScreen";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Peer {
  id: string;
  name: string;
  initials: string;
  college: string;
  role: string;
  location: string;
  age: string;
  mobile: string;
  bio: string;
  skillScore: number;
  trustScore: number;
  readiness: number;
  topSkills: { name: string; level: number; verified: boolean; color: string }[];
  streak: number;
  repos: number;
  commits: number;
  prs: number;
  stars: number;
  avatarGrad: string;
  connected: boolean;
  connectionIds: string[];
  resumeName: string;
  projects: { name: string; desc: string; tags: string[]; stars: number; commits: number }[];
}

// ─── Peer data ───────────────────────────────────────────────────────────────

export const ALL_PEERS: Peer[] = [
  {
    id: "p1", name: "Priya Sharma", initials: "PS", college: "IIT Bombay",
    role: "CS Senior", location: "Mumbai, IN", age: "22", mobile: "+91 98765 43210",
    bio: "Final-year CS student passionate about AI & ML. Building real-world NLP tools.",
    skillScore: 91, trustScore: 88, readiness: 86,
    topSkills: [
      { name: "Python", level: 92, verified: true, color: "#2563EB" },
      { name: "Machine Learning", level: 85, verified: true, color: "#059669" },
      { name: "TensorFlow", level: 78, verified: true, color: "#7C3AED" },
      { name: "SQL", level: 65, verified: false, color: "#F59E0B" },
    ],
    streak: 34, repos: 18, commits: 412, prs: 14, stars: 127,
    avatarGrad: "linear-gradient(135deg,#7C3AED,#2563EB)", connected: false,
    connectionIds: ["p2", "p3", "p5", "p7"], resumeName: "priya_sharma_resume.pdf",
    projects: [
      { name: "Sentiment Classifier", desc: "BERT-based NLP model deployed on Hugging Face with 94% accuracy", tags: ["Python", "NLP", "HuggingFace"], stars: 63, commits: 98 },
      { name: "ML Pipeline Dashboard", desc: "Real-time training metrics visualizer for TensorFlow models", tags: ["Python", "TensorFlow", "React"], stars: 41, commits: 72 },
    ],
  },
  {
    id: "p2", name: "Rohan Mehta", initials: "RM", college: "BITS Pilani",
    role: "CS Junior", location: "Pune, IN", age: "21", mobile: "+91 87654 32109",
    bio: "Full-stack developer focused on scalable web apps and clean APIs.",
    skillScore: 87, trustScore: 82, readiness: 79,
    topSkills: [
      { name: "React", level: 88, verified: true, color: "#2563EB" },
      { name: "Node.js", level: 81, verified: true, color: "#059669" },
      { name: "TypeScript", level: 74, verified: true, color: "#7C3AED" },
      { name: "PostgreSQL", level: 58, verified: false, color: "#F59E0B" },
    ],
    streak: 22, repos: 14, commits: 318, prs: 9, stars: 84,
    avatarGrad: "linear-gradient(135deg,#059669,#0891B2)", connected: false,
    connectionIds: ["p1", "p4", "p6"], resumeName: "rohan_mehta_resume.pdf",
    projects: [
      { name: "Real-time Chat App", desc: "WebSocket chat with React + Node.js, 500+ daily active users", tags: ["React", "Node.js", "Socket.io"], stars: 38, commits: 114 },
      { name: "E-Commerce API", desc: "RESTful API with JWT auth, Stripe payments, PostgreSQL", tags: ["Node.js", "PostgreSQL", "Stripe"], stars: 24, commits: 87 },
    ],
  },
  {
    id: "p3", name: "Aisha Khan", initials: "AK", college: "NIT Trichy",
    role: "CS Junior", location: "Chennai, IN", age: "21", mobile: "+91 76543 21098",
    bio: "Backend engineer with a love for distributed systems and cloud architecture.",
    skillScore: 85, trustScore: 91, readiness: 83,
    topSkills: [
      { name: "Java", level: 89, verified: true, color: "#2563EB" },
      { name: "Spring Boot", level: 83, verified: true, color: "#059669" },
      { name: "AWS", level: 76, verified: true, color: "#7C3AED" },
      { name: "Docker", level: 61, verified: false, color: "#F59E0B" },
    ],
    streak: 41, repos: 11, commits: 276, prs: 8, stars: 96,
    avatarGrad: "linear-gradient(135deg,#F59E0B,#EF4444)", connected: true,
    connectionIds: ["p1", "p5", "p8"], resumeName: "aisha_khan_resume.pdf",
    projects: [
      { name: "Microservices Platform", desc: "Spring Boot microservices with Kafka, Redis, and Docker Compose", tags: ["Java", "Spring Boot", "Kafka"], stars: 52, commits: 143 },
      { name: "AWS Serverless App", desc: "Lambda functions + API Gateway + DynamoDB event-driven backend", tags: ["AWS", "Lambda", "DynamoDB"], stars: 31, commits: 68 },
    ],
  },
  {
    id: "p4", name: "Dev Patel", initials: "DP", college: "IIIT Hyderabad",
    role: "CS Sophomore", location: "Hyderabad, IN", age: "20", mobile: "+91 65432 10987",
    bio: "DevOps enthusiast building container orchestration projects from scratch.",
    skillScore: 82, trustScore: 79, readiness: 75,
    topSkills: [
      { name: "Go", level: 80, verified: true, color: "#2563EB" },
      { name: "Docker", level: 77, verified: true, color: "#059669" },
      { name: "Kubernetes", level: 68, verified: false, color: "#7C3AED" },
      { name: "Python", level: 55, verified: false, color: "#F59E0B" },
    ],
    streak: 18, repos: 9, commits: 198, prs: 6, stars: 54,
    avatarGrad: "linear-gradient(135deg,#2563EB,#7C3AED)", connected: true,
    connectionIds: ["p2", "p7"], resumeName: "dev_patel_resume.pdf",
    projects: [
      { name: "K8s Cluster Manager", desc: "CLI tool for managing multi-cluster Kubernetes deployments written in Go", tags: ["Go", "Kubernetes", "CLI"], stars: 29, commits: 88 },
      { name: "Docker Registry UI", desc: "Self-hosted Docker registry with web dashboard", tags: ["Docker", "Go", "React"], stars: 18, commits: 61 },
    ],
  },
  {
    id: "p5", name: "Sara Chen", initials: "SC", college: "MIT",
    role: "CS Senior", location: "Boston, US", age: "23", mobile: "+1 617-555-0198",
    bio: "Systems programmer, open-source contributor, and Rust advocate.",
    skillScore: 94, trustScore: 93, readiness: 91,
    topSkills: [
      { name: "Rust", level: 95, verified: true, color: "#2563EB" },
      { name: "Systems Design", level: 90, verified: true, color: "#059669" },
      { name: "WASM", level: 82, verified: true, color: "#7C3AED" },
      { name: "C++", level: 78, verified: true, color: "#0891B2" },
    ],
    streak: 58, repos: 24, commits: 687, prs: 31, stars: 312,
    avatarGrad: "linear-gradient(135deg,#0891B2,#059669)", connected: false,
    connectionIds: ["p1", "p3", "p7", "p8"], resumeName: "sara_chen_resume.pdf",
    projects: [
      { name: "Rust HTTP Server", desc: "Zero-dependency async HTTP server in Rust, 10k+ GitHub stars", tags: ["Rust", "Async", "HTTP"], stars: 0, commits: 0 },
      { name: "WASM Runtime", desc: "Lightweight WebAssembly interpreter written in Rust", tags: ["Rust", "WASM", "Systems"], stars: 97, commits: 193 },
    ],
  },
  {
    id: "p6", name: "James Osei", initials: "JO", college: "University of Ghana",
    role: "CS Junior", location: "Accra, GH", age: "22", mobile: "+233 20 555 0174",
    bio: "Building fintech tools for the African market using Django and PostgreSQL.",
    skillScore: 78, trustScore: 74, readiness: 71,
    topSkills: [
      { name: "Python", level: 78, verified: true, color: "#2563EB" },
      { name: "Django", level: 72, verified: true, color: "#059669" },
      { name: "PostgreSQL", level: 65, verified: false, color: "#7C3AED" },
      { name: "React", level: 48, verified: false, color: "#F59E0B" },
    ],
    streak: 12, repos: 8, commits: 143, prs: 4, stars: 37,
    avatarGrad: "linear-gradient(135deg,#EF4444,#F59E0B)", connected: false,
    connectionIds: ["p2", "p8"], resumeName: "james_osei_resume.pdf",
    projects: [
      { name: "Mobile Money API", desc: "Django REST API integrating MTN Mobile Money and Vodafone Cash", tags: ["Python", "Django", "Payments"], stars: 21, commits: 74 },
      { name: "Farmer Market App", desc: "Platform connecting rural farmers to buyers with SMS support", tags: ["Django", "PostgreSQL", "Twilio"], stars: 14, commits: 48 },
    ],
  },
  {
    id: "p7", name: "Yuki Tanaka", initials: "YT", college: "Tokyo University",
    role: "CS Senior", location: "Tokyo, JP", age: "23", mobile: "+81 90-5555-0142",
    bio: "iOS developer with a focus on on-device ML and privacy-first apps.",
    skillScore: 89, trustScore: 85, readiness: 82,
    topSkills: [
      { name: "Swift", level: 91, verified: true, color: "#2563EB" },
      { name: "iOS Development", level: 87, verified: true, color: "#059669" },
      { name: "CoreML", level: 74, verified: true, color: "#7C3AED" },
      { name: "Objective-C", level: 61, verified: false, color: "#F59E0B" },
    ],
    streak: 29, repos: 16, commits: 354, prs: 12, stars: 168,
    avatarGrad: "linear-gradient(135deg,#7C3AED,#EF4444)", connected: false,
    connectionIds: ["p1", "p4", "p5"], resumeName: "yuki_tanaka_resume.pdf",
    projects: [
      { name: "On-Device Translator", desc: "CoreML-powered real-time camera translation app on App Store", tags: ["Swift", "CoreML", "Vision"], stars: 84, commits: 156 },
      { name: "Privacy Health Tracker", desc: "HealthKit app with zero cloud data, fully on-device", tags: ["Swift", "HealthKit", "SwiftUI"], stars: 61, commits: 112 },
    ],
  },
  {
    id: "p8", name: "Fatima Al-Rashid", initials: "FA", college: "AUB",
    role: "CS Junior", location: "Beirut, LB", age: "21", mobile: "+961 71 555 0133",
    bio: "Frontend developer building accessible, multilingual web experiences.",
    skillScore: 80, trustScore: 83, readiness: 76,
    topSkills: [
      { name: "React", level: 82, verified: true, color: "#2563EB" },
      { name: "GraphQL", level: 75, verified: true, color: "#059669" },
      { name: "Firebase", level: 68, verified: false, color: "#7C3AED" },
      { name: "TypeScript", level: 61, verified: false, color: "#F59E0B" },
    ],
    streak: 15, repos: 10, commits: 221, prs: 7, stars: 58,
    avatarGrad: "linear-gradient(135deg,#059669,#7C3AED)", connected: false,
    connectionIds: ["p3", "p5", "p6"], resumeName: "fatima_alrashid_resume.pdf",
    projects: [
      { name: "Multilingual CMS", desc: "Headless CMS with Arabic/English RTL support and GraphQL API", tags: ["React", "GraphQL", "i18n"], stars: 34, commits: 97 },
      { name: "Accessibility Audit Tool", desc: "Browser extension that scans pages for WCAG 2.1 violations", tags: ["JavaScript", "a11y", "Chrome"], stars: 18, commits: 71 },
    ],
  },
];

const PEER_MAP: Record<string, Peer> = Object.fromEntries(ALL_PEERS.map((p) => [p.id, p]));

// ─── Heatmap helper (deterministic per peer) ─────────────────────────────────
function generateHeatmap(seed: number) {
  return Array.from({ length: 175 }, (_, i) => ({
    value: ((seed * 17 + i * 7) % 10) > 5 ? ((seed * 3 + i) % 8) : 0,
  }));
}

// ─── Peer Detail View — pixel-matches ProfileScreen layout ──────────────────

function PeerDetailView({
  peer,
  allPeers,
  onBack,
  onConnect,
}: {
  peer: Peer;
  allPeers: Peer[];
  onBack: () => void;
  onConnect: (id: string) => void;
}) {
  const [showChallenge, setShowChallenge] = useState(false);
  if (showChallenge) {
  return <ChallengeScreen />;
}
  const heatmap = generateHeatmap(peer.id.charCodeAt(1));
  const theirConnections = peer.connectionIds
    .map((id) => allPeers.find((p) => p.id === id) ?? PEER_MAP[id])
    .filter(Boolean) as Peer[];

  // Derive a unique accent colour per peer for their avatar circle
  const accentColors: Record<string, { bg: string; text: string }> = {
    p1: { bg: "#DBEAFE", text: "#2563EB" },
    p2: { bg: "#D1FAE5", text: "#059669" },
    p3: { bg: "#FEF3C7", text: "#D97706" },
    p4: { bg: "#EDE9FE", text: "#7C3AED" },
    p5: { bg: "#CFFAFE", text: "#0891B2" },
    p6: { bg: "#FEE2E2", text: "#EF4444" },
    p7: { bg: "#F3E8FF", text: "#9333EA" },
    p8: { bg: "#D1FAE5", text: "#059669" },
  };
  const accent = accentColors[peer.id] ?? { bg: "#DBEAFE", text: "#2563EB" };

  return (
       <div className="absolute inset-0 flex flex-col overflow-y-auto" style={{ background: "#F8FAFC" }}>
      {/* ── Cover — same blue-green gradient as ProfileScreen ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #1E3A8A, #2563EB 60%, #059669)",
          paddingTop: "calc(env(safe-area-inset-top,0px) + 52px)",
          paddingBottom: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles (same as ProfileScreen) */}
        <div style={{ position: "absolute", top: 20, right: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", top: 50, right: 50, width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        {/* Back bar */}
        <div style={{ padding: "0 20px", display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <button
            onClick={onBack}
            style={{ background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <ArrowLeft size={16} color="white" />
          </button>
          <span style={{ fontSize: 15, fontWeight: 700, color: "white" }}>Student Profile</span>
        </div>

        {/* ── White card — identical structure to ProfileScreen ── */}
        <div style={{ background: "#ffffff", borderRadius: "20px 20px 0 0", padding: "18px 20px 16px" }}>
          {/* Avatar (light bg + coloured initials) + Connect button */}
          <div className="flex items-end justify-between">
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: accent.bg,
                  border: "3px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 800,
                  color: accent.text,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
                }}
              >
                {peer.initials}
              </div>
              {/* Online dot */}
              <div style={{ position: "absolute", bottom: 2, right: 2, width: 16, height: 16, borderRadius: "50%", background: "#059669", border: "2px solid white" }} />
            </div>

            {/* Connect button (matches ProfileScreen "Edit Profile" position) */}
            <button
              onClick={() => onConnect(peer.id)}
              style={{
                padding: "7px 14px",
                borderRadius: 20,
                background: peer.connected ? "rgba(5,150,105,0.1)" : "rgba(255,255,255,0.15)",
                border: peer.connected ? "1px solid #A7F3D0" : "1px solid rgba(37,99,235,0.25)",
                color: peer.connected ? "#059669" : "#2563EB",
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontFamily: "inherit",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
              }}
            >
              {peer.connected ? <UserCheck size={13} /> : <UserPlus size={13} />}
              {peer.connected ? "Connected" : "Connect"}
            </button>
          </div>

          {/* Name block — same as ProfileScreen */}
          <div className="flex items-start justify-between" style={{ marginTop: 10 }}>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
                {peer.name}
              </h1>
              <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
                {peer.role} · {peer.college}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 5 }}>
                <MapPin size={11} color="#94A3B8" />
                <span style={{ fontSize: 11.5, color: "#94A3B8" }}>{peer.location}</span>
              </div>
              {/* Age + Mobile pills — identical to ProfileScreen */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, flexWrap: "wrap" as const }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#F1F5F9", padding: "3px 9px", borderRadius: 20 }}>
                  <Calendar size={10} color="#64748B" />
                  <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>Age {peer.age}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#F1F5F9", padding: "3px 9px", borderRadius: 20 }}>
                  <Phone size={10} color="#64748B" />
                  <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>{peer.mobile}</span>
                </div>
              </div>
            </div>
            {/* Score badge — top-right, same as ProfileScreen */}
            <div style={{ display: "flex", flexDirection: "column" as const, alignItems: "flex-end", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, background: "linear-gradient(135deg,#EFF6FF,#ECFDF5)", padding: "5px 10px", borderRadius: 20, border: "1px solid #BFDBFE" }}>
                <Award size={11} color="#2563EB" />
                <span style={{ fontSize: 11, color: "#2563EB", fontWeight: 700 }}>Score: {peer.skillScore}</span>
              </div>
              <div style={{ fontSize: 10.5, color: "#94A3B8", fontWeight: 500 }}>
                {peer.skillScore >= 90 ? "Top 5%" : peer.skillScore >= 85 ? "Top 12%" : "Top 20%"} Verified
              </div>
            </div>
          </div>

          {/* Resume pill — identical to ProfileScreen */}
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: "#F0FDF4", border: "1px solid #A7F3D0" }}>
            <CheckCircle size={13} color="#059669" />
            <span style={{ fontSize: 11.5, color: "#065F46", fontWeight: 600, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
              {peer.resumeName}
            </span>
            <span style={{ fontSize: 10.5, color: "#059669", fontWeight: 600 }}>✓ Verified</span>
          </div>

          {/* Stats row — identical icons & layout to ProfileScreen */}
          <div
            style={{ display: "flex", marginTop: 14, padding: "12px 0", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}
          >
            {[
              { icon: <GitBranch size={13} color="#64748B" />, v: String(peer.commits), l: "Commits" },
              { icon: <ExternalLink size={13} color="#64748B" />, v: String(peer.repos), l: "Repos" },
              { icon: <GitPullRequest size={13} color="#64748B" />, v: String(peer.prs), l: "PRs" },
              { icon: <Star size={13} color="#64748B" />, v: String(theirConnections.length), l: "Connects" },
            ].map((stat, i) => (
              <div key={`stat-${i}`} style={{ flex: 1, textAlign: "center", borderRight: i < 3 ? "1px solid #F1F5F9" : "none" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>{stat.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{stat.v}</div>
                <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 500 }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body content (same sections as ProfileScreen) ── */}
      <div style={{ padding: "0 16px 90px" }}>
         {/* Modern Profile Header */}
<div
  style={{
    background: "#ffffff",
    borderRadius: 26,
    overflow: "hidden",
    marginBottom: 18,
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)"
  }}
>

  {/* Top Blue Cover */}
  <div
    style={{
      height: 160,
      background: "linear-gradient(135deg,#2563EB,#06B6D4)",
      position: "relative"
    }}
  >

    {/* Profile Image */}
    <img
      src={`https://i.pravatar.cc/150?u=${peer.name}`}
      alt="profile"
      style={{
        width: 92,
        height: 92,
        borderRadius: "50%",
        border: "4px solid white",
        position: "absolute",
        left: 22,
        bottom: -42,
        objectFit: "cover"
      }}
    />

  </div>

  {/* Content */}
  <div style={{ padding: "56px 22px 22px" }}>

    {/* Name + Score */}
    <div
      className="flex items-start justify-between"
      style={{ marginBottom: 10 }}
    >

      <div>
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: "#0F172A"
          }}
        >
          {peer.name}
        </div>

        <div
          style={{
            color: "#64748B",
            fontSize: 14,
            marginTop: 4
          }}
        >
          AI/ML Enthusiast • MIT ADT University
        </div>

        <div
          style={{
            color: "#94A3B8",
            fontSize: 13,
            marginTop: 5
          }}
        >
          Nagpur, India
        </div>
      </div>

      <div
        style={{
          background: "#EFF6FF",
          color: "#2563EB",
          padding: "10px 16px",
          borderRadius: 16,
          fontWeight: 700,
          fontSize: 15
        }}
      >
        Score: 82
      </div>

    </div>

    {/* Buttons */}
    {/* Action Buttons */}
<div
  className="flex gap-3"
  style={{ marginTop: 18 }}
>

  {/* Connect */}
  <button
    onClick={() => alert("Connection Request Sent 🚀")}
    style={{
      flex: 1,
      background: "#2563EB",
      color: "white",
      border: "none",
      padding: "12px",
      borderRadius: 14,
      fontWeight: 700,
      cursor: "pointer"
    }}
  >
    Connect
  </button>

  {/* Challenge */}
<button
  onClick={() => setShowChallenge(true)}
  style={{
    flex: 1,
    background: "#0F172A",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: 14,
    fontWeight: 700,
    cursor: "pointer"
  }}
>
  Challenge
</button>

</div>

    {/* Stats */}
    <div
      className="flex justify-between"
      style={{
        marginTop: 24,
        textAlign: "center"
      }}
    >

      <div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>247</div>
        <div style={{ color: "#64748B", fontSize: 13 }}>Commits</div>
      </div>

      <div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>12</div>
        <div style={{ color: "#64748B", fontSize: 13 }}>Repos</div>
      </div>

      <div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>8</div>
        <div style={{ color: "#64748B", fontSize: 13 }}>PRs</div>
      </div>

      <div>
        <div style={{ fontSize: 22, fontWeight: 800 }}>21</div>
        <div style={{ color: "#64748B", fontSize: 13 }}>Connections</div>
      </div>

    </div>

  </div>
</div>
        {/* Verified Skills */}
        <div style={{ background: "#ffffff", borderRadius: "0 0 18px 18px", padding: "16px 16px 20px", marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>Verified Skills</span>
            <span style={{ fontSize: 11.5, color: "#2563EB", fontWeight: 600 }}>{peer.topSkills.length} skills</span>
          </div>
          <div className="flex flex-col gap-3.5">
            {peer.topSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>{skill.name}</span>
                    {skill.verified ? (
                      <CheckCircle size={13} color="#059669" />
                    ) : (
                      <div style={{ fontSize: 9, background: "#FEF3C7", color: "#92400E", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>PENDING</div>
                    )}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: skill.color }}>{skill.level}%</span>
                </div>
                <div style={{ height: 7, borderRadius: 4, background: "#F1F5F9", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${skill.level}%`, borderRadius: 4, background: `linear-gradient(90deg,${skill.color}88,${skill.color})` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coding Consistency / Heatmap */}
        <div style={{ background: "#ffffff", borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>Coding Consistency</span>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#FFF7ED", padding: "4px 10px", borderRadius: 20 }}>
              <span style={{ fontSize: 14 }}>🔥</span>
              <span style={{ fontSize: 11, color: "#92400E", fontWeight: 700 }}>{peer.streak}-day streak</span>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, paddingBottom: 4 }}>
            {heatmap.map((cell, i) => {
              const opacity = cell.value === 0 ? 0 : 0.15 + (cell.value / 8) * 0.85;
              return (
                <div
                  key={`hm-${i}`}
                  style={{ width: 8, height: 8, borderRadius: 2, background: cell.value === 0 ? "#F1F5F9" : `rgba(37,99,235,${opacity})` }}
                />
              );
            })}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span style={{ fontSize: 10, color: "#94A3B8" }}>Less</span>
            {[0, 2, 4, 6, 8].map((v) => (
              <div key={`hml-${v}`} style={{ width: 8, height: 8, borderRadius: 2, background: v === 0 ? "#F1F5F9" : `rgba(37,99,235,${0.15 + (v / 8) * 0.85})` }} />
            ))}
            <span style={{ fontSize: 10, color: "#94A3B8" }}>More</span>
          </div>
        </div>

        {/* Project Highlights */}
        <div style={{ marginBottom: 14 }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>Project Highlights</span>
            <span style={{ fontSize: 11.5, color: "#2563EB", fontWeight: 600 }}>View all</span>
          </div>
          <div className="flex flex-col gap-3">
            {peer.projects.map((project) => (
              <div key={project.name} style={{ background: "#ffffff", borderRadius: 16, padding: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9" }}>
                <div className="flex items-start justify-between mb-1.5">
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{project.name}</div>
                  <div className="flex items-center gap-1">
                    <Star size={11} color="#F59E0B" />
                    <span style={{ fontSize: 11, color: "#64748B", fontWeight: 600 }}>{project.stars}</span>
                  </div>
                </div>
                <p style={{ fontSize: 11.5, color: "#64748B", marginBottom: 8, lineHeight: 1.5 }}>{project.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 10.5, background: "#EFF6FF", color: "#2563EB", padding: "3px 8px", borderRadius: 5, fontWeight: 600 }}>{tag}</span>
                  ))}
                  <span style={{ fontSize: 10.5, color: "#94A3B8", marginLeft: "auto" }}>{project.commits} commits</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Their Connections */}
        {theirConnections.length > 0 && (
          <div style={{ background: "#ffffff", borderRadius: 18, padding: 16, marginBottom: 14, boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Users size={14} color="#2563EB" />
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>
                {peer.name.split(" ")[0]}'s Connections
              </span>
              <span style={{ fontSize: 11, color: "#94A3B8", fontWeight: 500, marginLeft: "auto" }}>{theirConnections.length} people</span>
            </div>
            <div className="flex flex-col gap-3">
              {theirConnections.map((conn) => (
                <div key={conn.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: conn.avatarGrad, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 800, flexShrink: 0, boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}>
                    {conn.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0F172A" }}>{conn.name}</div>
                    <div style={{ fontSize: 11, color: "#94A3B8", display: "flex", alignItems: "center", gap: 4, marginTop: 1 }}>
                      <GraduationCap size={10} color="#CBD5E1" /> {conn.college}
                    </div>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: conn.skillScore >= 90 ? "#059669" : "#2563EB", background: conn.skillScore >= 90 ? "#ECFDF5" : "#EFF6FF", padding: "3px 9px", borderRadius: 8, flexShrink: 0 }}>
                    {conn.skillScore}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Readiness (same as ProfileScreen) */}
        <div style={{ background: "linear-gradient(135deg,#EFF6FF,#ECFDF5)", borderRadius: 18, padding: 16, border: "1px solid #BFDBFE" }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Career Readiness</div>
          {[
            { label: "Skill Score", score: peer.skillScore, note: peer.skillScore >= 88 ? "Excellent" : "Strong foundation" },
            { label: "Trust Score", score: peer.trustScore, note: `${peer.trustScore}/100 verified` },
            { label: "Internship Readiness", score: peer.readiness, note: peer.readiness >= 85 ? "Ready now" : "Nearly ready" },
            { label: "Coding Consistency", score: Math.min(peer.streak * 2, 100), note: `${peer.streak}-day streak` },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: 10 }}>
              <div className="flex justify-between mb-1">
                <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{item.label}</span>
                <span style={{ fontSize: 11.5, color: "#64748B", fontWeight: 500 }}>{item.note}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.6)", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${item.score}%`, borderRadius: 3, background: item.score >= 80 ? "#059669" : item.score >= 65 ? "#2563EB" : "#F59E0B" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Peer card (search result) ───────────────────────────────────────────────

function PeerCard({ peer, onConnect, onView }: { peer: Peer; onConnect: (id: string) => void; onView: (p: Peer) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ background: "#ffffff", borderRadius: 18, padding: 14, boxShadow: "0 1px 8px rgba(0,0,0,0.06)", border: "1px solid #F1F5F9", marginBottom: 10 }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: peer.avatarGrad, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 16, fontWeight: 800, flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
          {peer.initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#0F172A" }}>{peer.name}</div>
            <div style={{ fontSize: 13, fontWeight: 900, color: peer.skillScore >= 90 ? "#059669" : peer.skillScore >= 80 ? "#2563EB" : "#F59E0B" }}>{peer.skillScore}</div>
          </div>
          <div style={{ fontSize: 11.5, color: "#64748B", marginBottom: 3 }}>{peer.role} · {peer.college}</div>
          <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 7, display: "flex", alignItems: "center", gap: 4 }}>
            <Users size={10} color="#CBD5E1" /> {peer.connectionIds.length} connections · 🔥 {peer.streak}d · Age {peer.age}
          </div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
            {peer.topSkills.slice(0, 3).map((s) => (
              <span key={s.name} style={{ fontSize: 10, background: "#EFF6FF", color: "#2563EB", padding: "2px 7px", borderRadius: 4, fontWeight: 600 }}>{s.name}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 7 }}>
            <button
              onClick={() => onConnect(peer.id)}
              style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: peer.connected ? "1.5px solid #A7F3D0" : "none", background: peer.connected ? "#F0FDF4" : "linear-gradient(135deg,#2563EB,#059669)", color: peer.connected ? "#059669" : "white", fontSize: 12, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 5, fontFamily: "inherit", transition: "all 0.2s" }}
            >
              {peer.connected ? <UserCheck size={13} /> : <UserPlus size={13} />}
              {peer.connected ? "Connected" : "Connect"}
            </button>
            <button
              onClick={() => onView(peer)}
              style={{ padding: "8px 14px", borderRadius: 10, border: "1.5px solid #E2E8F0", background: "#F8FAFC", color: "#475569", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit" }}
            >
              View <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main SearchScreen ────────────────────────────────────────────────────────

export function SearchScreen({
  peers,
  onConnectToggle,
}: {
  peers: Peer[];
  onConnectToggle: (id: string) => void;
}) {

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "connected">("all");
  const [viewingPeer, setViewingPeer] = useState<Peer | null>(null);

  const [githubUsername, setGithubUsername] = useState("");
  const [githubData, setGithubData] = useState<any>(null);

  const connectedCount = peers.filter((p) => p.connected).length;

  const filtered = peers.filter((p) => {
    const matchesFilter = filter === "all" || p.connected;

    const q = query.toLowerCase();

    return (
      matchesFilter &&
      (
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.college.toLowerCase().includes(q) ||
        p.topSkills.some((s) =>
          s.name.toLowerCase().includes(q)
        ) ||
        p.role.toLowerCase().includes(q)
      )
    );
  });

  // 🔥 GITHUB FETCH FUNCTION
  const fetchGithubProfile = async () => {
    try {

      const cleanUsername = githubUsername
        .replace("https://github.com/", "")
        .replace(/\//g, "");

      const response = await fetch(
        `http://127.0.0.1:8000/github/${cleanUsername}`
      );

      const data = await response.json();

      console.log(data);

      setGithubData(data);

    } catch (error) {
      console.log(error);
    }
  };

  // 🔥 PEER DETAIL VIEW
  if (viewingPeer) {
    const live =
      peers.find((p) => p.id === viewingPeer.id) ?? viewingPeer;

    return (
      <PeerDetailView
        peer={live}
        allPeers={peers}
        onBack={() => setViewingPeer(null)}
        onConnect={onConnectToggle}
      />
    );
  }

  return (
    <>

      {/* GITHUB SEARCH */}
      <div style={{ marginBottom: 20 }}>

        <input
          type="text"
          placeholder="Enter GitHub username"
          value={githubUsername}
          onChange={(e) =>
            setGithubUsername(e.target.value)
          }
          style={{
            padding: "12px",
            width: "70%",
            borderRadius: 10,
            border: "1px solid #ccc",
            marginRight: 10,
          }}
        />

        <button
          onClick={fetchGithubProfile}
          style={{
            padding: "12px 18px",
            borderRadius: 10,
            border: "none",
            background: "#2563EB",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Search
        </button>

        {/* GITHUB CARD */}
        {githubData && (
          <div
            style={{
              background: "white",
              padding: 20,
              borderRadius: 16,
              marginTop: 20,
            }}
          >

            <img
              src={githubData.profile_image}
              width="80"
              style={{ borderRadius: "50%" }}
            />

            <h2>{githubData?.username}</h2>

            <p>Followers: {githubData?.followers}</p>

            <p>Repos: {githubData?.public_repos}</p>

            <p>Stars: {githubData?.stars}</p>

            <p>Commits: {githubData?.commits}</p>

            <a
              href={githubData?.github_profile}
              target="_blank"
              rel="noreferrer"
            >
              Open GitHub
            </a>

          </div>
        )}
      </div>

      <div className="absolute inset-0 flex flex-col" style={{ background: "#F8FAFC" }}>
      <div style={{ paddingTop: "calc(env(safe-area-inset-top,0px) + 52px)", paddingLeft: 20, paddingRight: 20, paddingBottom: 12, background: "#ffffff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>Discover</h1>
            <p style={{ fontSize: 11.5, color: "#64748B", marginTop: 1 }}>Search students · {connectedCount} connection{connectedCount !== 1 ? "s" : ""}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#EFF6FF", padding: "5px 10px", borderRadius: 20 }}>
            <UserCheck size={13} color="#2563EB" />
            <span style={{ fontSize: 12, fontWeight: 700, color: "#2563EB" }}>{connectedCount}</span>
          </div>
        </div>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <Search size={15} color="#94A3B8" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, college, or skill…"
            style={{ width: "100%", padding: "11px 36px 11px 36px", borderRadius: 14, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none", background: "#F8FAFC", color: "#0F172A", boxSizing: "border-box", fontFamily: "inherit" }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", display: "flex" }}>
              <X size={14} color="#94A3B8" />
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          {[{ id: "all", label: `All (${peers.length})` }, { id: "connected", label: `Connected (${connectedCount})` }].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as typeof filter)}
              style={{ padding: "6px 14px", borderRadius: 20, border: `1.5px solid ${filter === f.id ? "#2563EB" : "#E2E8F0"}`, background: filter === f.id ? "linear-gradient(135deg,#EFF6FF,#ECFDF5)" : "#ffffff", color: filter === f.id ? "#2563EB" : "#64748B", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 90px" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 24px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#475569" }}>No results found</div>
            <div style={{ fontSize: 12.5, color: "#94A3B8", marginTop: 6 }}>Try a different name, college, or skill</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 11.5, color: "#94A3B8", fontWeight: 600, marginBottom: 10 }}>{filtered.length} student{filtered.length !== 1 ? "s" : ""} found</div>
            {filtered.map((peer) => (
              <PeerCard key={peer.id} peer={peer} onConnect={onConnectToggle} onView={setViewingPeer} />
            ))}
          </>
        )}
      </div>
    </div>

    </>
  );
}
