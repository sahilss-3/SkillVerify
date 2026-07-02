import { useState, useRef } from "react";
import { MapPin, ExternalLink, Star, GitBranch, GitPullRequest, CheckCircle, Award, X, Upload, Camera, Phone, GraduationCap, User, Calendar, ImagePlus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const verifiedSkills = [
  { name: "Python", level: 87, verified: true, color: "#2563EB" },
  { name: "React", level: 79, verified: true, color: "#059669" },
  { name: "Node.js", level: 71, verified: true, color: "#7C3AED" },
  { name: "SQL", level: 64, verified: true, color: "#0891B2" },
  { name: "Machine Learning", level: 38, verified: false, color: "#F59E0B" },
  { name: "Docker", level: 48, verified: false, color: "#64748B" },
];

const projects = [
  {
    name: "AI Resume Analyzer",
    desc: "NLP-powered resume parsing with 94% accuracy",
    tags: ["Python", "spaCy", "FastAPI"],
    stars: 47,
    commits: 83,
  },
  {
    name: "Real-time Dashboard",
    desc: "React + WebSocket analytics platform",
    tags: ["React", "TypeScript", "Socket.io"],
    stars: 31,
    commits: 124,
  },
  {
    name: "Expense Tracker API",
    desc: "REST API with auth, PostgreSQL, Docker",
    tags: ["Node.js", "PostgreSQL", "Docker"],
    stars: 18,
    commits: 56,
  },
];

const heatmapData = Array.from({ length: 52 * 7 }, () => ({
  value: Math.random() > 0.6 ? Math.floor(Math.random() * 8) : 0,
}));

function HeatmapCell({ value }: { value: number }) {
  const opacity = value === 0 ? 0 : 0.15 + (value / 8) * 0.85;
  return (
    <div
      style={{
        width: 8,
        height: 8,
        borderRadius: 2,
        background: value === 0 ? "#F1F5F9" : `rgba(37,99,235,${opacity})`,
      }}
    />
  );
}

interface ProfileData {
  name: string;
  age: string;
  college: string;
  mobile: string;
  role: string;
  location: string;
  resumeName: string;
}

function EditProfileModal({
  profile,
  profileImage,
  onSave,
  onImageChange,
  onClose,
}: {
  profile: ProfileData;
  profileImage: string | null;
  onSave: (p: ProfileData) => void;
  onImageChange: (url: string) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ ...profile });
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeFile, setResumeFile] = useState(profile.resumeName);
  const [localImage, setLocalImage] = useState<string | null>(profileImage);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof ProfileData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("Please select a valid image file (JPG, PNG, WEBP).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Image must be under 5 MB.");
      return;
    }
    setImageError("");
    const reader = new FileReader();
    reader.onload = (ev) => {
      const url = ev.target?.result as string;
      setLocalImage(url);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (localImage) onImageChange(localImage);
    onSave({ ...form, resumeName: resumeFile });
    onClose();
  };

  const fields: { key: keyof ProfileData; label: string; icon: React.ReactNode; placeholder: string; type?: string }[] = [
    { key: "name", label: "Full Name", icon: <User size={15} color="#64748B" />, placeholder: "Alex Johnson" },
    { key: "age", label: "Age", icon: <Calendar size={15} color="#64748B" />, placeholder: "21", type: "number" },
    { key: "college", label: "College / University", icon: <GraduationCap size={15} color="#64748B" />, placeholder: "Stanford University" },
    { key: "mobile", label: "Mobile Number", icon: <Phone size={15} color="#64748B" />, placeholder: "+1 (555) 000-0000", type: "tel" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        zIndex: 100,
        display: "flex",
        alignItems: "flex-end",
        backdropFilter: "blur(3px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          width: "100%",
          background: "#ffffff",
          borderRadius: "24px 24px 0 0",
          maxHeight: "88%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Modal header */}
        <div
          style={{
            padding: "16px 20px 12px",
            borderBottom: "1px solid #F1F5F9",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
              Edit Profile
            </div>
            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>
              Update your personal information
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#F1F5F9",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={16} color="#64748B" />
          </button>
        </div>

        {/* Scrollable form */}
        <div style={{ overflowY: "auto", padding: "16px 20px 8px", flex: 1 }}>
          {/* Hidden image file input */}
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageSelect}
          />

          {/* Profile photo section */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: "#64748B", display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Profile Photo
            </label>

            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {/* Avatar preview */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 76,
                    height: 76,
                    borderRadius: "50%",
                    background: localImage ? "transparent" : "linear-gradient(135deg, #DBEAFE, #D1FAE5)",
                    border: `2.5px solid ${localImage ? "#2563EB" : "#E2E8F0"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    boxShadow: localImage ? "0 4px 16px rgba(37,99,235,0.2)" : "none",
                    transition: "all 0.3s",
                  }}
                >
                  {localImage ? (
                    <img
                      src={localImage}
                      alt="Profile"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: 26, fontWeight: 800, color: "#2563EB" }}>
                      {form.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                {/* Camera badge */}
                <button
                  onClick={() => imageInputRef.current?.click()}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #2563EB, #059669)",
                    border: "2.5px solid white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(37,99,235,0.3)",
                  }}
                >
                  <Camera size={12} color="white" />
                </button>
              </div>

              {/* Upload options */}
              <div style={{ flex: 1 }}>
                <button
                  onClick={() => imageInputRef.current?.click()}
                  style={{
                    width: "100%",
                    padding: "10px 14px",
                    borderRadius: 12,
                    border: "1.5px dashed #BFDBFE",
                    background: "#EFF6FF",
                    color: "#2563EB",
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    fontFamily: "inherit",
                    marginBottom: 6,
                    transition: "all 0.2s",
                  }}
                >
                  <ImagePlus size={16} />
                  {localImage ? "Change Photo" : "Upload Photo"}
                </button>
                {localImage && (
                  <button
                    onClick={() => { setLocalImage(null); if (imageInputRef.current) imageInputRef.current.value = ""; }}
                    style={{
                      width: "100%",
                      padding: "7px 14px",
                      borderRadius: 10,
                      border: "1px solid #FECACA",
                      background: "#FEF2F2",
                      color: "#EF4444",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Remove Photo
                  </button>
                )}
                <div style={{ fontSize: 10.5, color: "#94A3B8", marginTop: 5 }}>
                  JPG, PNG, WEBP · Max 5 MB
                </div>
              </div>
            </div>

            {imageError && (
              <div style={{ marginTop: 8, padding: "8px 12px", borderRadius: 8, background: "#FEF2F2", border: "1px solid #FECACA", fontSize: 12, color: "#DC2626", fontWeight: 500 }}>
                ⚠️ {imageError}
              </div>
            )}

            {localImage && !imageError && (
              <div style={{ marginTop: 8, padding: "7px 12px", borderRadius: 8, background: "#F0FDF4", border: "1px solid #A7F3D0", fontSize: 12, color: "#059669", fontWeight: 500 }}>
                ✅ New photo selected — tap Save to apply
              </div>
            )}
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-4">
            {fields.map((field) => (
              <div key={field.key}>
                <label
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#64748B",
                    display: "block",
                    marginBottom: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {field.label}
                </label>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      display: "flex",
                    }}
                  >
                    {field.icon}
                  </div>
                  <input
                    value={form[field.key]}
                    onChange={set(field.key)}
                    placeholder={field.placeholder}
                    type={field.type || "text"}
                    style={{
                      width: "100%",
                      padding: "11px 14px 11px 36px",
                      borderRadius: 12,
                      border: "1.5px solid #E2E8F0",
                      fontSize: 13.5,
                      outline: "none",
                      background: "#F8FAFC",
                      color: "#0F172A",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                      transition: "border-color 0.15s",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#2563EB")}
                    onBlur={(e) => (e.target.style.borderColor = "#E2E8F0")}
                  />
                </div>
              </div>
            ))}

            {/* Resume upload */}
            <div>
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#64748B",
                  display: "block",
                  marginBottom: 6,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Resume
              </label>
              <div
                onClick={() => {
                  setResumeUploaded(true);
                  setResumeFile(`resume_${form.name.toLowerCase().replace(" ", "_")}_v2.pdf`);
                }}
                style={{
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `2px dashed ${resumeUploaded ? "#059669" : "#CBD5E1"}`,
                  background: resumeUploaded ? "#F0FDF4" : "#FAFAFA",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: resumeUploaded ? "#DCFCE7" : "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {resumeUploaded ? (
                    <CheckCircle size={20} color="#059669" />
                  ) : (
                    <Upload size={20} color="#2563EB" />
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  {resumeUploaded ? (
                    <>
                      <div
                        style={{
                          fontSize: 12.5,
                          fontWeight: 700,
                          color: "#059669",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {resumeFile}
                      </div>
                      <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2 }}>
                        Tap to replace · PDF, DOC, DOCX
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>
                        {profile.resumeName || "Upload your resume"}
                      </div>
                      <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 2 }}>
                        Tap to upload · PDF, DOC, DOCX up to 5MB
                      </div>
                    </>
                  )}
                </div>
              </div>
              {resumeUploaded && (
                <div
                  style={{
                    marginTop: 8,
                    padding: "8px 12px",
                    borderRadius: 8,
                    background: "#F0FDF4",
                    border: "1px solid #A7F3D0",
                    fontSize: 11.5,
                    color: "#065F46",
                    fontWeight: 500,
                  }}
                >
                  ✅ AI will re-analyze your updated resume and refresh your Skill Score
                </div>
              )}
            </div>
          </div>

          <div style={{ height: 16 }} />
        </div>

        {/* Save button */}
        <div style={{ padding: "12px 20px 20px", borderTop: "1px solid #F1F5F9", flexShrink: 0 }}>
          <button
            onClick={handleSave}
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
              boxShadow: "0 4px 16px rgba(37,99,235,0.3)",
              fontFamily: "inherit",
            }}
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
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
              fontFamily: "inherit",
            }}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ProfileScreen({ peers = [], onConnectToggle }: { peers?: { id: string; connected: boolean }[]; onConnectToggle?: (id: string) => void }) {
  const [editOpen, setEditOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const connectionCount = peers.filter((p) => p.connected).length;
  const [profile, setProfile] = useState<ProfileData>({
    name: "Alex Johnson",
    age: "21",
    college: "Stanford University",
    mobile: "+1 (555) 123-4567",
    role: "CS Junior",
    location: "San Francisco, CA",
    resumeName: "resume_alex_johnson.pdf",
  });

  const initials = profile.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-y-auto"
      style={{ background: "#F8FAFC" }}
    >
      {/* Cover + profile */}
      <div
        style={{
          background: "linear-gradient(135deg, #1E3A8A, #2563EB 60%, #059669)",
          paddingTop: "calc(env(safe-area-inset-top, 0px) + 48px)",
          paddingBottom: 0,
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 20, right: 20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", top: 50, right: 50, width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />

        <div style={{ padding: "16px 20px 0", position: "relative" }}>
          <div className="flex items-end justify-between mb-0">
            <div style={{ position: "relative" }}>
              <div
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: "50%",
                  background: profileImage ? "transparent" : "linear-gradient(135deg, #DBEAFE, #D1FAE5)",
                  border: "3px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#2563EB",
                  overflow: "hidden",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                }}
              >
                {profileImage ? (
                  <img src={profileImage} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  initials
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#059669",
                  border: "2px solid white",
                }}
              />
            </div>
            <button
              onClick={() => setEditOpen(true)}
              style={{
                padding: "7px 14px",
                borderRadius: 20,
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.35)",
                color: "white",
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                backdropFilter: "blur(4px)",
                fontFamily: "inherit",
              }}
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "20px 20px 0 0",
            marginTop: 14,
            padding: "18px 20px 16px",
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
                {profile.name}
              </h1>
              <p style={{ fontSize: 13, color: "#64748B", marginTop: 2 }}>
                {profile.role} · {profile.college}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={11} color="#94A3B8" />
                <span style={{ fontSize: 11.5, color: "#94A3B8" }}>{profile.location}</span>
              </div>
              {/* Quick info pills */}
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    background: "#F1F5F9",
                    padding: "3px 9px",
                    borderRadius: 20,
                  }}
                >
                  <Calendar size={10} color="#64748B" />
                  <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>Age {profile.age}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    background: "#F1F5F9",
                    padding: "3px 9px",
                    borderRadius: 20,
                  }}
                >
                  <Phone size={10} color="#64748B" />
                  <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>{profile.mobile}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  background: "linear-gradient(135deg, #EFF6FF, #ECFDF5)",
                  padding: "5px 10px",
                  borderRadius: 20,
                  border: "1px solid #BFDBFE",
                }}
              >
                <Award size={11} color="#2563EB" />
                <span style={{ fontSize: 11, color: "#2563EB", fontWeight: 700 }}>Score: 82</span>
              </div>
              <div style={{ fontSize: 10.5, color: "#94A3B8", fontWeight: 500 }}>Top 18% Verified</div>
            </div>
          </div>

          {/* Resume pill */}
          <div
            style={{
              marginTop: 10,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 12px",
              borderRadius: 10,
              background: "#F0FDF4",
              border: "1px solid #A7F3D0",
            }}
          >
            <CheckCircle size={13} color="#059669" />
            <span style={{ fontSize: 11.5, color: "#065F46", fontWeight: 600, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {profile.resumeName}
            </span>
            <button
              onClick={() => setEditOpen(true)}
              style={{
                fontSize: 11,
                color: "#2563EB",
                fontWeight: 700,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                fontFamily: "inherit",
              }}
            >
              Update
            </button>
          </div>

          {/* GitHub stats row */}
          <div
            className="flex items-center"
            style={{
              marginTop: 14,
              padding: "12px 0",
              borderTop: "1px solid #F1F5F9",
              borderBottom: "1px solid #F1F5F9",
            }}
          >
            {[
              { icon: <GitBranch size={13} color="#64748B" />, v: "247", l: "Commits" },
              { icon: <ExternalLink size={13} color="#64748B" />, v: "12", l: "Repos" },
              { icon: <GitPullRequest size={13} color="#64748B" />, v: "8", l: "PRs" },
              { icon: <Star size={13} color="#64748B" />, v: `${connectionCount}`, l: "Connects" },
            ].map((stat, i) => (
              <div
                key={`stat-${i}`}
                style={{
                  flex: 1,
                  textAlign: "center",
                  borderRight: i < 3 ? "1px solid #F1F5F9" : "none",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>{stat.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "#0F172A" }}>{stat.v}</div>
                <div style={{ fontSize: 10, color: "#94A3B8", fontWeight: 500 }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "0 16px 90px" }}>
        {/* Verified Skills */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "0 0 18px 18px",
            padding: "16px 16px 20px",
            marginBottom: 14,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>Verified Skills</span>
            <span style={{ fontSize: 11.5, color: "#2563EB", fontWeight: 600 }}>6 skills</span>
          </div>
          <div className="flex flex-col gap-3.5">
            {verifiedSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "#374151" }}>{skill.name}</span>
                    {skill.verified ? (
                      <CheckCircle size={13} color="#059669" />
                    ) : (
                      <div style={{ fontSize: 9, background: "#FEF3C7", color: "#92400E", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>
                        PENDING
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: skill.color }}>{skill.level}%</span>
                </div>
                <div style={{ height: 7, borderRadius: 4, background: "#F1F5F9", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${skill.level}%`,
                      borderRadius: 4,
                      background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Heatmap */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 18,
            padding: 16,
            marginBottom: 14,
            boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>Coding Consistency</span>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: "#FFF7ED", padding: "4px 10px", borderRadius: 20 }}>
              <span style={{ fontSize: 14 }}>🔥</span>
              <span style={{ fontSize: 11, color: "#92400E", fontWeight: 700 }}>18-day streak</span>
            </div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2, overflowX: "auto", paddingBottom: 4 }}>
            {heatmapData.slice(0, 210).map((cell, i) => (
              <HeatmapCell key={`hm-${i}`} value={cell.value} />
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span style={{ fontSize: 10, color: "#94A3B8" }}>Less</span>
            {[0, 2, 4, 6, 8].map((v) => (
              <div key={`hml-${v}`} style={{ width: 8, height: 8, borderRadius: 2, background: v === 0 ? "#F1F5F9" : `rgba(37,99,235,${0.15 + (v / 8) * 0.85})` }} />
            ))}
            <span style={{ fontSize: 10, color: "#94A3B8" }}>More</span>
          </div>
        </div>

        {/* Projects */}
        <div style={{ marginBottom: 14 }}>
          <div className="flex items-center justify-between mb-3">
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A" }}>Project Highlights</span>
            <span style={{ fontSize: 11.5, color: "#2563EB", fontWeight: 600 }}>View all</span>
          </div>
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <div
                key={project.name}
                style={{
                  background: "#ffffff",
                  borderRadius: 16,
                  padding: 14,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  border: "1px solid #F1F5F9",
                }}
              >
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
                    <span key={tag} style={{ fontSize: 10.5, background: "#EFF6FF", color: "#2563EB", padding: "3px 8px", borderRadius: 5, fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                  <span style={{ fontSize: 10.5, color: "#94A3B8", marginLeft: "auto" }}>{project.commits} commits</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Readiness */}
        <div
          style={{
            background: "linear-gradient(135deg, #EFF6FF, #ECFDF5)",
            borderRadius: 18,
            padding: 16,
            border: "1px solid #BFDBFE",
          }}
        >
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>
            Career Readiness Indicators
          </div>
          {[
            { label: "Technical Skills", score: 82, note: "Strong foundation" },
            { label: "Project Portfolio", score: 74, note: "3 verified projects" },
            { label: "Learning Velocity", score: 88, note: "Excellent growth rate" },
            { label: "Collaboration", score: 61, note: "Needs more team projects" },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: 10 }}>
              <div className="flex justify-between mb-1">
                <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{item.label}</span>
                <span style={{ fontSize: 11.5, color: "#64748B", fontWeight: 500 }}>{item.note}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.6)", overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${item.score}%`,
                    borderRadius: 3,
                    background: item.score >= 80 ? "#059669" : item.score >= 65 ? "#2563EB" : "#F59E0B",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {editOpen && (
          <EditProfileModal
            profile={profile}
            profileImage={profileImage}
            onSave={(p) => setProfile(p)}
            onImageChange={(url) => setProfileImage(url)}
            onClose={() => setEditOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
