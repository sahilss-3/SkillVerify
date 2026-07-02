import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  time: string;
}

const FAQ_SUGGESTIONS = [
  "How is my Skill Score calculated?",
  "Why is my ML confidence low?",
  "How do I improve my Trust Score?",
  "What projects should I add?",
  "How do I connect GitHub?",
  "What is Internship Readiness?",
];

const AI_KNOWLEDGE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["skill score", "calculated", "score work", "how score"],
    answer:
      "Your **Skill Score** (out of 100) is calculated by analyzing three data sources:\n\n• 🔗 **GitHub activity** — commit frequency, repo quality, language diversity\n• 📄 **Resume parsing** — claimed skills, work experience, education\n• 🧠 **AI cross-verification** — how well your real code matches what you claim\n\nThe score updates automatically whenever you push new code or upload a new resume.",
  },
  {
    keywords: ["ml", "machine learning", "low confidence", "weak evidence", "ml confidence"],
    answer:
      "Your Machine Learning confidence is low because our AI only found **tutorial-style code** in your GitHub repos — no deployed models or original ML pipelines.\n\nTo boost it:\n1. Build a real project (e.g. a sentiment classifier with FastAPI)\n2. Deploy it to Hugging Face Spaces or Render\n3. Write a detailed README with results and metrics\n\nThis alone could add **+18–22 points** to your Trust Score! 🚀",
  },
  {
    keywords: ["trust score", "improve trust", "trust"],
    answer:
      "Your **Trust Score** measures how well your real work *proves* your claimed skills. Here's how to raise it:\n\n✅ Add 2–3 projects that directly show your claimed skills\n✅ Write clear READMEs with results and screenshots\n✅ Keep coding consistently (streak matters!)\n✅ Contribute to open-source repos\n✅ Upload an updated resume matching your GitHub\n\nYour current Trust Score is **85/100** — great foundation!",
  },
  {
    keywords: ["project", "add project", "what project", "suggest project", "build"],
    answer:
      "Based on your skill gaps, I recommend these projects:\n\n🔵 **Sentiment Analysis API** — Python + FastAPI + scikit-learn (closes your ML gap, +22 pts)\n\n🟢 **SQL Analytics Dashboard** — complex queries + PostgreSQL + visualization (+14 pts)\n\n🟣 **CI/CD Pipeline** — GitHub Actions + Docker + auto-deploy (+15 pts)\n\nStart with the Sentiment Analysis API for the biggest score impact!",
  },
  {
    keywords: ["github", "connect github", "link github", "github account"],
    answer:
      "To connect your GitHub account:\n\n1. Go to your **Profile** tab\n2. Tap **Edit Profile**\n3. Scroll to the GitHub section and tap **Connect GitHub**\n4. Authorize SkillVerify — we only request *read* access\n\nWe never modify your repos. Once connected, AI analysis runs automatically within **2–5 minutes**. 🔒",
  },
  {
    keywords: ["internship", "readiness", "internship readiness", "ready"],
    answer:
      "Your **Internship Readiness Score** (74/100) combines:\n\n📊 Technical skills depth — 74%\n📁 Portfolio quality — 68%\n🧩 System design basics — 45%\n🤝 Collaboration signals — 61%\n\nTo reach **90+**, focus on:\n• Adding 2 more strong projects\n• Practicing 25 LeetCode problems\n• Contributing to 1 open-source repo\n\nYou're about **4–6 weeks** away from being internship-ready! 💪",
  },
  {
    keywords: ["resume", "upload resume", "update resume", "cv"],
    answer:
      "To upload or update your resume:\n\n1. Tap the **Profile** tab in the bottom nav\n2. Tap **✏️ Edit Profile**\n3. Scroll down to the **Resume** section\n4. Tap the upload area and select your file (PDF, DOC, DOCX up to 5MB)\n\nAfter uploading, our AI will **re-analyze** your resume within minutes and refresh your Skill Score automatically. ✅",
  },
  {
    keywords: ["streak", "coding streak", "consistency", "daily"],
    answer:
      "Your current coding streak is **18 days** 🔥 — that's excellent!\n\nConsistency is one of the strongest signals we track. Recruiters love to see:\n\n• Daily or near-daily commits\n• Varied project types\n• Growing complexity over time\n\nTip: Even a small commit (fixing a bug, improving docs) counts toward your streak. Aim to keep it going — **30+ days** unlocks a special Verified Consistent badge on your profile!",
  },
  {
    keywords: ["badge", "verified badge", "verify", "verification"],
    answer:
      "SkillVerify awards **badges** when AI confirms your skills with real evidence:\n\n✅ **Verified** — skill proven by 2+ real projects\n🟡 **Pending** — skill claimed but evidence is thin\n⭐ **Expert** — top 10% in that skill among users\n🔥 **Consistent** — 30+ day coding streak\n\nYou currently have 4 Verified badges. Build 2 more projects to unlock **React Expert** status!",
  },
  {
    keywords: ["hello", "hi", "hey", "help", "support", "start", "what can"],
    answer:
      "Hi! 👋 I'm **SkillVerify AI**, your career intelligence assistant.\n\nI can help you with:\n\n• 📊 Understanding your scores\n• 🛠️ Improving your skill evidence\n• 📁 Adding and managing projects\n• 🔗 Connecting GitHub / uploading resume\n• 🎯 Planning your internship roadmap\n\nJust type your question or tap one of the suggestions below!",
  },
];

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const entry of AI_KNOWLEDGE) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.answer;
    }
  }
  return `Thanks for your question! 🤖\n\nI couldn't find a specific answer for **"${input}"**, but here's what I suggest:\n\n• Check the **AI Analysis** tab for personalized insights\n• Visit the **Recommendations** tab for your growth roadmap\n• Review your **Profile** to ensure all info is up to date\n\nFor anything else, try rephrasing your question or tap one of the quick suggestions below!`;
}

function now(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatMessage(text: string) {
  // Bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function ChatBubble({ msg }: { msg: Message }) {
  const isAI = msg.role === "ai";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      style={{
        display: "flex",
        gap: 8,
        alignItems: "flex-end",
        flexDirection: isAI ? "row" : "row-reverse",
        marginBottom: 12,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: isAI
            ? "linear-gradient(135deg, #2563EB, #059669)"
            : "linear-gradient(135deg, #7C3AED, #2563EB)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
        }}
      >
        {isAI ? <Bot size={15} color="white" /> : <User size={14} color="white" />}
      </div>

      <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column", alignItems: isAI ? "flex-start" : "flex-end" }}>
        <div
          style={{
            padding: "10px 13px",
            borderRadius: isAI ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
            background: isAI ? "#ffffff" : "linear-gradient(135deg, #2563EB, #1d4ed8)",
            color: isAI ? "#0F172A" : "#ffffff",
            fontSize: 13,
            lineHeight: 1.6,
            boxShadow: isAI ? "0 1px 6px rgba(0,0,0,0.08)" : "0 4px 12px rgba(37,99,235,0.3)",
            border: isAI ? "1px solid #F1F5F9" : "none",
            whiteSpace: "pre-line",
          }}
        >
          {formatMessage(msg.text)}
        </div>
        <div style={{ fontSize: 10, color: "#94A3B8", marginTop: 4, fontWeight: 500 }}>{msg.time}</div>
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-end", marginBottom: 12 }}>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #2563EB, #059669)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Bot size={15} color="white" />
      </div>
      <div
        style={{
          padding: "10px 16px",
          borderRadius: "4px 16px 16px 16px",
          background: "#ffffff",
          border: "1px solid #F1F5F9",
          boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          display: "flex",
          gap: 4,
          alignItems: "center",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EB" }}
          />
        ))}
      </div>
    </div>
  );
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "ai",
    text: "Hi! 👋 I'm SkillVerify AI, your career intelligence assistant.\n\nI can help you understand your scores, improve skill evidence, manage projects, and plan your internship roadmap.\n\nWhat would you like to know?",
    time: now(),
  },
];

export function AIHelpScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: `u-${Date.now()}`, role: "user", text: text.trim(), time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      const answer = getAIResponse(text.trim());
      const aiMsg: Message = { id: `a-${Date.now()}`, role: "ai", text: answer, time: now() };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, delay);
  };

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: "#F8FAFC" }}>
      {/* Header */}
      <div
        style={{
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
          background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 70%, #059669 100%)",
          paddingBottom: 16,
          paddingLeft: 20,
          paddingRight: 20,
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -20, right: -10, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
        <div style={{ position: "absolute", bottom: -10, right: 40, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

        <div className="flex items-center gap-3" style={{ position: "relative" }}>
          {/* AI avatar */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              background: "rgba(255,255,255,0.2)",
              border: "1.5px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}
          >
            <Bot size={22} color="white" />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "white", letterSpacing: "-0.01em" }}>
              SkillVerify AI
            </div>
            <div className="flex items-center gap-1.5" style={{ marginTop: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>
                Online · Responds instantly
              </span>
            </div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              background: "rgba(255,255,255,0.15)",
              padding: "5px 10px",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Sparkles size={12} color="#FCD34D" />
            <span style={{ fontSize: 11, color: "white", fontWeight: 600 }}>AI Powered</span>
          </div>
        </div>
      </div>

      {/* Quick suggestions */}
      <div
        style={{
          padding: "10px 12px 8px",
          borderBottom: "1px solid #F1F5F9",
          background: "#ffffff",
          flexShrink: 0,
        }}
      >
        <div style={{ fontSize: 10.5, color: "#94A3B8", fontWeight: 600, letterSpacing: "0.04em", marginBottom: 7 }}>
          QUICK QUESTIONS
        </div>
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
          {FAQ_SUGGESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              style={{
                flexShrink: 0,
                padding: "6px 12px",
                borderRadius: 20,
                border: "1.5px solid #DBEAFE",
                background: "#EFF6FF",
                color: "#2563EB",
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "inherit",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <ChevronRight size={11} />
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 14px 8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.map((msg) => (
          <ChatBubble key={msg.id} msg={msg} />
        ))}

        <AnimatePresence>
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
            >
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        style={{
          padding: "10px 12px 20px",
          background: "#ffffff",
          borderTop: "1px solid #F1F5F9",
          flexShrink: 0,
          display: "flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            background: "#F8FAFC",
            border: "1.5px solid #E2E8F0",
            borderRadius: 24,
            padding: "0 14px",
            transition: "border-color 0.15s",
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !typing && sendMessage(input)}
            placeholder="Ask anything about SkillVerify…"
            style={{
              flex: 1,
              border: "none",
              background: "transparent",
              fontSize: 13,
              color: "#0F172A",
              outline: "none",
              padding: "11px 0",
              fontFamily: "inherit",
            }}
          />
        </div>
        <button
          onClick={() => !typing && sendMessage(input)}
          disabled={!input.trim() || typing}
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            border: "none",
            background:
              input.trim() && !typing
                ? "linear-gradient(135deg, #2563EB, #059669)"
                : "#E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: input.trim() && !typing ? "pointer" : "default",
            flexShrink: 0,
            transition: "all 0.2s",
            boxShadow: input.trim() && !typing ? "0 4px 12px rgba(37,99,235,0.3)" : "none",
          }}
        >
          <Send size={17} color={input.trim() && !typing ? "white" : "#94A3B8"} />
        </button>
      </div>
    </div>
  );
}
