import React from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: 390, height: 844 }}
    >
      {/* Outer phone shell */}
      <div
        className="absolute inset-0 rounded-[52px]"
        style={{
          background: "linear-gradient(145deg, #2a2a2a, #111111)",
          boxShadow:
            "0 0 0 1.5px #3a3a3a, 0 30px 80px rgba(0,0,0,0.5), 0 10px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      />
      {/* Side buttons */}
      <div
        className="absolute rounded-l-full"
        style={{
          right: -3,
          top: 160,
          width: 4,
          height: 32,
          background: "#2a2a2a",
        }}
      />
      <div
        className="absolute rounded-r-full"
        style={{
          left: -3,
          top: 130,
          width: 4,
          height: 28,
          background: "#2a2a2a",
        }}
      />
      <div
        className="absolute rounded-r-full"
        style={{
          left: -3,
          top: 168,
          width: 4,
          height: 48,
          background: "#2a2a2a",
        }}
      />
      <div
        className="absolute rounded-r-full"
        style={{
          left: -3,
          top: 226,
          width: 4,
          height: 48,
          background: "#2a2a2a",
        }}
      />
      {/* Screen bezel */}
      <div className="absolute inset-[2px] rounded-[50px] bg-black overflow-hidden" />
      {/* Screen */}
      <div className="absolute inset-[3px] rounded-[49px] overflow-hidden bg-white">
        {/* Status bar */}
        <div
          className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8"
          style={{ paddingTop: 14, paddingBottom: 4 }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "inherit",
              letterSpacing: "-0.01em",
            }}
          >
            9:41
          </span>
          <div className="flex items-center gap-1.5">
            <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
              <rect x="0" y="3" width="3" height="9" rx="1" opacity="0.4" />
              <rect x="4.5" y="2" width="3" height="10" rx="1" opacity="0.6" />
              <rect x="9" y="0.5" width="3" height="11.5" rx="1" opacity="0.8" />
              <rect x="13.5" y="0" width="3" height="12" rx="1" />
            </svg>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
              <path d="M8 2.4C10.5 2.4 12.7 3.5 14.2 5.2L15.5 3.9C13.6 1.8 11 0.5 8 0.5C5 0.5 2.4 1.8 0.5 3.9L1.8 5.2C3.3 3.5 5.5 2.4 8 2.4Z" opacity="0.5"/>
              <path d="M8 5.2C9.7 5.2 11.2 6 12.3 7.2L13.6 5.9C12.1 4.3 10.2 3.3 8 3.3C5.8 3.3 3.9 4.3 2.4 5.9L3.7 7.2C4.8 6 6.3 5.2 8 5.2Z" opacity="0.7"/>
              <path d="M8 8C9 8 9.8 8.5 10.4 9.2L8 11.6L5.6 9.2C6.2 8.5 7 8 8 8Z"/>
            </svg>
            <div className="flex items-center gap-0.5">
              <div
                style={{
                  width: 24,
                  height: 12,
                  borderRadius: 3,
                  border: "1.5px solid currentColor",
                  opacity: 0.8,
                  padding: 1.5,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: "75%",
                    borderRadius: 1,
                    background: "currentColor",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Dynamic Island */}
        <div
          className="absolute z-50 bg-black rounded-full"
          style={{
            top: 12,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 34,
          }}
        />
        {/* Screen content */}
        <div className="absolute inset-0 overflow-hidden">{children}</div>
        {/* Home indicator */}
        <div
          className="absolute bottom-2 z-50"
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            width: 134,
            height: 5,
            borderRadius: 3,
            background: "rgba(0,0,0,0.2)",
          }}
        />
      </div>
    </div>
  );
}
