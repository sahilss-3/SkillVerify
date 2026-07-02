import { useEffect, useState } from "react";

export default function ChallengeScreen() {
  const [timeLeft, setTimeLeft] = useState(9);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 || finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, finished]);

  const checkAnswer = () => {
    setFinished(true);

    if (selected === "JavaScript") {
      alert("🎉 Congratulations!\n\nYou earned +20 points 🚀");
    } else {
      alert("❌ Wrong Answer\n\nBetter luck next time!");
    }
  };

  const options = ["Python", "Java", "JavaScript", "C++"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0F3FBF",
        padding: 10,
        color: "white",
        fontFamily: "sans-serif",
        overflowY: "auto",
        paddingBottom: 90,
      }}
    >
      {/* Header */}
      <h1
        style={{
          fontSize: 24,
          fontWeight: 800,
          marginBottom: 10,
        }}
      >
        🏆 Challenge On
      </h1>

      {/* Small Timer Box */}
      <div
        style={{
          background: "#1D4ED8",
          padding: 10,
          borderRadius: 14,
          width: 100,
        }}
      >
        <div style={{ fontSize: 11 }}>
          Time Left
        </div>

        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            marginTop: 4,
          }}
        >
          00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
        </div>
      </div>

      {/* Question */}
      <h2
        style={{
          fontSize: 18,
          marginTop: 14,
          lineHeight: 1.3,
        }}
      >
        Q1. Which language is used in React?
      </h2>

      {/* Options Box */}
      <div
        style={{
          background: "white",
          color: "black",
          marginTop: 12,
          borderRadius: 18,
          padding: 14,
        }}
      >
        <h2
          style={{
            fontSize: 18,
            marginBottom: 8,
          }}
        >
          Options
        </h2>

        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => setSelected(option)}
            style={{
              border:
                selected === option
                  ? "2px solid #2563EB"
                  : "1px solid #D1D5DB",

              borderRadius: 10,
              padding: 10,
              marginTop: 8,
              fontSize: 15,
              cursor: "pointer",

              background:
                selected === option
                  ? "#DBEAFE"
                  : "white",
            }}
          >
            {String.fromCharCode(65 + index)}. {option}
          </div>
        ))}

        {/* Submit */}
        <button
          onClick={checkAnswer}
          style={{
            marginTop: 12,
            background: "#2563EB",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 700,
            cursor: "pointer",
            width: "100%",
          }}
        >
          Submit Answer →
        </button>
      </div>

      {/* Cameras */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginTop: 12,
        }}
      >
        {/* My Camera */}
        <div
          style={{
            flex: 1,
            background: "white",
            borderRadius: 12,
            padding: 8,
            color: "black",
          }}
        >
          <h3
            style={{
              fontSize: 12,
              marginBottom: 5,
            }}
          >
            📷 My Camera
          </h3>

          <div
            style={{
              height: 70,
              background: "#E5E7EB",
              borderRadius: 8,
            }}
          />
        </div>

        {/* Opponent */}
        <div
          style={{
            flex: 1,
            background: "white",
            borderRadius: 12,
            padding: 8,
            color: "black",
          }}
        >
          <h3
            style={{
              fontSize: 12,
              marginBottom: 5,
            }}
          >
            📷 Opponent
          </h3>

          <div
            style={{
              height: 70,
              background: "#E5E7EB",
              borderRadius: 8,
            }}
          />
        </div>
      </div>

      {/* Report Section */}
      <div
        style={{
          marginTop: 14,
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: 12,
            marginBottom: 8,
          }}
        >
          Report if opponent is cheating
        </p>

        <button
          onClick={() =>
            alert("🚨 Opponent Reported")
          }
          style={{
            background: "red",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 800,
            cursor: "pointer",
            width: "100%",
            maxWidth: 220,
          }}
        >
          🚨 REPORT
        </button>
      </div>
    </div>
  );
}