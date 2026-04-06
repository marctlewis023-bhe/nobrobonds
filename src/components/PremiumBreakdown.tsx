import { useState } from "react";

const stops = [
  500, 1_000, 2_500, 5_000, 7_500, 10_000, 15_000, 25_000, 50_000, 75_000,
  100_000,
];

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

const segments = [
  {
    label: "Risk Assessment",
    pct: 0.45,
    color: "#84CC16",
    desc: "Compensates the surety for the risk of guaranteeing your obligation.",
  },
  {
    label: "Broker Commission",
    pct: 0.3,
    color: "#F97316",
    desc: "Commission paid to the bond broker or agent who placed the bond.",
  },
  {
    label: "Carrier Profit",
    pct: 0.15,
    color: "#8B5CF6",
    desc: "Profit margin retained by the surety carrier after risk reserves.",
  },
  {
    label: "Admin & Filing",
    pct: 0.1,
    color: "rgba(30,41,59,0.15)",
    desc: "Covers filing fees, paperwork, underwriting overhead, and processing.",
  },
];

export default function PremiumBreakdown() {
  const [idx, setIdx] = useState(5);
  const premium = stops[idx];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Slider */}
      <div style={{ marginBottom: "32px" }}>
        <label
          style={{
            display: "block",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            color: "#1B1F3B",
            marginBottom: "8px",
          }}
        >
          Your Annual Premium
        </label>
        <input
          type="range"
          min={0}
          max={stops.length - 1}
          value={idx}
          onChange={(e) => setIdx(Number(e.target.value))}
          style={{ width: "100%", accentColor: "#3B82F6" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "11px",
            color: "#64748B",
            marginTop: "4px",
          }}
        >
          <span>$500</span>
          <span>$100K</span>
        </div>
      </div>

      {/* Big number */}
      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <span
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "48px",
            color: "#1B1F3B",
            lineHeight: 1,
          }}
        >
          {fmt(premium)}
        </span>
        <p
          style={{
            color: "#64748B",
            fontSize: "14px",
            marginTop: "4px",
          }}
        >
          annual premium
        </p>
      </div>

      {/* Breakdown bar */}
      <div
        style={{
          display: "flex",
          borderRadius: "12px",
          overflow: "hidden",
          height: "56px",
          marginBottom: "24px",
        }}
      >
        {segments.map((seg) => (
          <div
            key={seg.label}
            className="bar-segment"
            style={{
              width: `${seg.pct * 100}%`,
              background: seg.color,
              color:
                seg.color === "rgba(30,41,59,0.15)"
                  ? "#1E293B"
                  : "#FFFFFF",
              fontSize: "12px",
              padding: "4px",
            }}
          >
            <span>{Math.round(seg.pct * 100)}%</span>
          </div>
        ))}
      </div>

      {/* Detail cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        {segments.map((seg) => {
          const amount = Math.round(premium * seg.pct);
          return (
            <div
              key={seg.label}
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px",
                border: "1px solid #E2E8F0",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: seg.color,
                  marginBottom: "10px",
                }}
              />
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "#1B1F3B",
                  marginBottom: "2px",
                }}
              >
                {fmt(amount)}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: "#64748B",
                  fontWeight: 600,
                  marginBottom: "4px",
                }}
              >
                {seg.label}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#94A3B8",
                  lineHeight: 1.4,
                }}
              >
                {seg.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Summary callout */}
      <div
        style={{
          background: "#F8FAFC",
          borderRadius: "16px",
          padding: "20px 24px",
          fontSize: "14px",
          color: "#64748B",
          lineHeight: 1.65,
        }}
      >
        <strong style={{ color: "#1B1F3B" }}>The takeaway:</strong> Of
        your {fmt(premium)} premium, roughly{" "}
        <strong style={{ color: "#F97316" }}>
          {fmt(Math.round(premium * 0.3))}
        </strong>{" "}
        goes to a broker who may have spent 15 minutes on your application.
        The surety carrier &mdash; the one actually on the hook &mdash;
        keeps only{" "}
        <strong style={{ color: "#8B5CF6" }}>
          {fmt(Math.round(premium * 0.15))}
        </strong>
        .
      </div>
    </div>
  );
}
