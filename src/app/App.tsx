import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, User, Brain, Sparkles, Search, Target } from "lucide-react";
import { SplashScreen } from "./components/SplashScreen";
import { AuthScreen } from "./components/AuthScreen";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { DashboardScreen } from "./components/DashboardScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import { AIAnalysisScreen } from "./components/AIAnalysisScreen";
import { RecommendationsScreen } from "./components/RecommendationsScreen";
import { AIHelpScreen } from "./components/AIHelpScreen";
import { AnalysisLoadingScreen } from "./components/AnalysisLoadingScreen";
import { SearchScreen, ALL_PEERS, type Peer } from "./components/SearchScreen";



type FlowScreen = "splash" | "auth" | "onboarding" | "analysis" | "app";
type AppTab = "dashboard" | "profile" | "search" | "analysis" | "recommendations" | "help";

const TAB_NAV: { id: AppTab; label: string; icon: React.ElementType }[] = [
  { id: "dashboard", label: "Home", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: User },
  { id: "search", label: "Discover", icon: Search },
  { id: "analysis", label: "AI", icon: Brain },
  { id: "recommendations", label: "For You", icon: Sparkles },
];

function BottomNav({ active, onSelect }: { active: AppTab; onSelect: (t: AppTab) => void }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 68,
        background: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 100,
        paddingBottom: "env(safe-area-inset-bottom, 4px)",
      }}
    >
      {TAB_NAV.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              padding: "5px 2px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: 36,
                height: 26,
                borderRadius: 13,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: isActive ? "linear-gradient(135deg, #EFF6FF, #ECFDF5)" : "transparent",
                transition: "background 0.2s",
              }}
            >
              <Icon size={17} color={isActive ? "#2563EB" : "#94A3B8"} strokeWidth={isActive ? 2.5 : 1.8} />
            </div>
            <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500, color: isActive ? "#2563EB" : "#94A3B8", fontFamily: "inherit", letterSpacing: "0.01em" }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function AppScreens({ tab, peers, onConnectToggle, onTabChange }: { tab: AppTab; peers: Peer[]; onConnectToggle: (id: string) => void; onTabChange: (t: AppTab) => void }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        style={{ position: "absolute", inset: 0 }}
      >
        {tab === "dashboard" && <DashboardScreen peers={peers} onOpenSupport={() => onTabChange("help")} />}
        {tab === "profile" && <ProfileScreen peers={peers} onConnectToggle={onConnectToggle} />}
        {tab === "search" && <SearchScreen peers={peers} onConnectToggle={onConnectToggle} />}
        {tab === "analysis" && <AIAnalysisScreen />}
        {tab === "recommendations" && <RecommendationsScreen />}
        {tab === "help" && <AIHelpScreen />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [flow, setFlow] = useState<FlowScreen>("splash");
  const [tab, setTab] = useState<AppTab>("dashboard");
  const [peers, setPeers] = useState<Peer[]>(ALL_PEERS);

  const handleConnectToggle = (id: string) => {
    setPeers((prev) => prev.map((p) => p.id === id ? { ...p, connected: !p.connected } : p));
  };

  if (flow === "splash") {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#ffffff" }}>
        <SplashScreen onNext={() => setFlow("auth")} />
      </div>
    );
  }
  if (flow === "auth") {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#ffffff" }}>
        <AuthScreen onNext={() => setFlow("onboarding")} />
      </div>
    );
  }
  if (flow === "onboarding") {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#ffffff" }}>
        <OnboardingScreen onNext={() => setFlow("analysis")} />
      </div>
    );
  }
  if (flow === "analysis") {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#ffffff" }}>
        <AnalysisLoadingScreen onDone={() => setFlow("app")} />
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "#F8FAFC", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, bottom: 68 }}>
        <AppScreens tab={tab} peers={peers} onConnectToggle={handleConnectToggle} onTabChange={setTab} />
      </div>
      <BottomNav active={tab} onSelect={setTab} />
    </div>
  );
}
