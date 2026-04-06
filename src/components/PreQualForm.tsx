import { useState } from "react";

/* ── Data ─────────────────────────────────────────────────────── */

const bondTypeChoices = [
  "Performance Bond",
  "Payment Bond",
  "Bid Bond",
  "License & Permit Bond",
  "Court Bond",
  "Maintenance Bond",
  "Subdivision Bond",
  "Other / Not Sure",
];

const amountStops = [
  5_000, 10_000, 25_000, 50_000, 100_000, 250_000, 500_000, 1_000_000,
  5_000_000,
];

const states = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado",
  "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois",
  "Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland",
  "Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana",
  "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York",
  "North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah",
  "Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

const industries = [
  "General Contracting",
  "Electrical",
  "Plumbing / Mechanical",
  "HVAC",
  "Roofing",
  "Paving / Earthwork",
  "Specialty Trade",
  "Professional Services",
  "Other",
];

const tenureLabels = [
  "< 1 year",
  "1-3 years",
  "3-5 years",
  "5-10 years",
  "10+ years",
];

const creditLabels = [
  "Excellent (700+)",
  "Good (650-699)",
  "Fair (600-649)",
  "Poor (<600)",
];

const revenueLabels = [
  "< $250K",
  "$250K-$500K",
  "$500K-$1M",
  "$1M-$5M",
  "$5M+",
];

/* ── Helpers ──────────────────────────────────────────────────── */

function fmt(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function scoreTier(score: number) {
  if (score >= 75)
    return {
      label: "Strong",
      color: "#84CC16",
      bg: "rgba(132,204,22,0.1)",
    };
  if (score >= 50)
    return {
      label: "Qualified",
      color: "#3B82F6",
      bg: "rgba(59,130,246,0.1)",
    };
  if (score >= 25)
    return {
      label: "Needs Work",
      color: "#F97316",
      bg: "rgba(249,115,22,0.1)",
    };
  return {
    label: "Difficult",
    color: "#EF4444",
    bg: "rgba(239,68,68,0.1)",
  };
}

/* ── Styles ───────────────────────────────────────────────────── */

const labelSt: React.CSSProperties = {
  display: "block",
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 700,
  fontSize: "14px",
  color: "#1B1F3B",
  marginBottom: "8px",
};

const cardSt: React.CSSProperties = {
  background: "#FFFFFF",
  borderRadius: "20px",
  border: "1px solid #E2E8F0",
  padding: "28px",
};

function choiceBtn(active: boolean): React.CSSProperties {
  return {
    padding: "10px 18px",
    borderRadius: "12px",
    border: active ? "2px solid #3B82F6" : "1px solid #E2E8F0",
    background: active ? "#3B82F6" : "#FFFFFF",
    color: active ? "#FFFFFF" : "#1E293B",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.15s",
  };
}

function gridBtn(active: boolean): React.CSSProperties {
  return {
    ...choiceBtn(active),
    width: "100%",
    textAlign: "center" as const,
  };
}

/* ── Component ────────────────────────────────────────────────── */

export default function PreQualForm() {
  const [step, setStep] = useState(1);

  // Step 1
  const [bondTypeIdx, setBondTypeIdx] = useState(-1);
  // Step 2
  const [amountIdx, setAmountIdx] = useState(4);
  // Step 3
  const [stateIdx, setStateIdx] = useState(-1);
  const [industryIdx, setIndustryIdx] = useState(-1);
  const [tenureIdx, setTenureIdx] = useState(-1);
  // Step 4
  const [creditIdx, setCreditIdx] = useState(-1);
  const [revenueIdx, setRevenueIdx] = useState(-1);
  const [priorClaims, setPriorClaims] = useState(false);
  const [bankruptcy, setBankruptcy] = useState(false);

  /* ── Scoring ───────────────────────────────────────── */

  function calcScore() {
    let score = 0;

    // Credit (40 pts)
    const creditPts = [40, 30, 18, 5];
    if (creditIdx >= 0) score += creditPts[creditIdx];

    // Tenure (20 pts)
    const tenurePts = [4, 10, 14, 18, 20];
    if (tenureIdx >= 0) score += tenurePts[tenureIdx];

    // Revenue / bond ratio (25 pts)
    const bondAmount = amountStops[amountIdx];
    const revMid = [125_000, 375_000, 750_000, 3_000_000, 7_500_000];
    if (revenueIdx >= 0) {
      const ratio = revMid[revenueIdx] / bondAmount;
      if (ratio >= 5) score += 25;
      else if (ratio >= 2) score += 20;
      else if (ratio >= 1) score += 14;
      else if (ratio >= 0.5) score += 8;
      else score += 3;
    }

    // Risk flags (deductive from 15)
    let riskPts = 15;
    if (priorClaims) riskPts -= 8;
    if (bankruptcy) riskPts -= 10;
    score += Math.max(riskPts, 0);

    return Math.min(Math.max(score, 0), 100);
  }

  function getBreakdown() {
    const creditPts = [40, 30, 18, 5];
    const tenurePts = [4, 10, 14, 18, 20];
    const bondAmount = amountStops[amountIdx];
    const revMid = [125_000, 375_000, 750_000, 3_000_000, 7_500_000];

    const credit = creditIdx >= 0 ? creditPts[creditIdx] : 0;
    const tenure = tenureIdx >= 0 ? tenurePts[tenureIdx] : 0;

    let revScore = 0;
    if (revenueIdx >= 0) {
      const ratio = revMid[revenueIdx] / bondAmount;
      if (ratio >= 5) revScore = 25;
      else if (ratio >= 2) revScore = 20;
      else if (ratio >= 1) revScore = 14;
      else if (ratio >= 0.5) revScore = 8;
      else revScore = 3;
    }

    let risk = 15;
    if (priorClaims) risk -= 8;
    if (bankruptcy) risk -= 10;
    risk = Math.max(risk, 0);

    return [
      { label: "Credit", pts: credit, max: 40 },
      { label: "Tenure", pts: tenure, max: 20 },
      { label: "Revenue/Bond Ratio", pts: revScore, max: 25 },
      { label: "Risk Flags", pts: risk, max: 15 },
    ];
  }

  function getTips() {
    const tips: string[] = [];
    if (creditIdx >= 2)
      tips.push(
        "Improving your credit score above 700 can significantly lower your premium rate."
      );
    if (tenureIdx <= 1)
      tips.push(
        "Sureties favor established businesses. Keep building your track record."
      );
    if (priorClaims)
      tips.push(
        "Prior claims are a red flag for sureties. Provide documentation showing resolution."
      );
    if (bankruptcy)
      tips.push(
        "A bankruptcy on record makes bonding harder. Some sureties specialize in post-bankruptcy accounts."
      );
    if (revenueIdx <= 1 && amountIdx >= 5)
      tips.push(
        "Your revenue-to-bond ratio is low. Consider smaller projects to build capacity."
      );
    if (tips.length === 0)
      tips.push(
        "Your profile looks strong. Focus on maintaining clean financials and credit."
      );
    return tips;
  }

  function getPremiumEstimate() {
    const bondAmount = amountStops[amountIdx];
    const creditFactors = [0.7, 1.0, 1.5, 2.2];
    const tenureMultipliers = [1.3, 1.1, 1.0, 0.9, 0.8];
    const cf = creditIdx >= 0 ? creditFactors[creditIdx] : 1.0;
    const tm = tenureIdx >= 0 ? tenureMultipliers[tenureIdx] : 1.0;
    const low = Math.round(bondAmount * 0.01 * cf * tm);
    const high = Math.round(bondAmount * 0.03 * cf * tm);
    return { low, high };
  }

  /* ── Validation ─────────────────────────────────────── */

  function canAdvance() {
    if (step === 1) return bondTypeIdx >= 0;
    if (step === 2) return true;
    if (step === 3)
      return stateIdx >= 0 && industryIdx >= 0 && tenureIdx >= 0;
    if (step === 4) return creditIdx >= 0 && revenueIdx >= 0;
    return true;
  }

  /* ── Render ─────────────────────────────────────────── */

  const score = calcScore();
  const tier = scoreTier(score);
  const breakdown = getBreakdown();
  const tips = getTips();
  const est = getPremiumEstimate();

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        maxWidth: "680px",
      }}
    >
      {/* Progress bar (steps 1-4) */}
      {step < 5 && (
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
              color: "#64748B",
              marginBottom: "6px",
            }}
          >
            <span>Step {step} of 4</span>
            <span>{Math.round((step / 4) * 100)}%</span>
          </div>
          <div
            style={{
              height: "6px",
              borderRadius: "3px",
              background: "#E2E8F0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(step / 4) * 100}%`,
                background: "#3B82F6",
                borderRadius: "3px",
                transition: "width 0.3s",
              }}
            />
          </div>
        </div>
      )}

      {/* Step 1: Bond Type */}
      {step === 1 && (
        <div>
          <label style={labelSt}>What type of bond do you need?</label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "8px",
            }}
          >
            {bondTypeChoices.map((bt, i) => (
              <button
                key={i}
                onClick={() => setBondTypeIdx(i)}
                style={gridBtn(i === bondTypeIdx)}
              >
                {bt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Bond Amount */}
      {step === 2 && (
        <div>
          <label style={labelSt}>
            What bond amount do you need? {fmt(amountStops[amountIdx])}
          </label>
          <input
            type="range"
            min={0}
            max={amountStops.length - 1}
            value={amountIdx}
            onChange={(e) => setAmountIdx(Number(e.target.value))}
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
            <span>$5K</span>
            <span>$5M</span>
          </div>
        </div>
      )}

      {/* Step 3: Business Info */}
      {step === 3 && (
        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <label style={labelSt}>State</label>
            <select
              value={stateIdx}
              onChange={(e) => setStateIdx(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                fontSize: "15px",
                color: "#1E293B",
                background: "#FFFFFF",
              }}
            >
              <option value={-1}>Select state...</option>
              {states.map((s, i) => (
                <option key={s} value={i}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelSt}>Industry</label>
            <select
              value={industryIdx}
              onChange={(e) => setIndustryIdx(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                fontSize: "15px",
                color: "#1E293B",
                background: "#FFFFFF",
              }}
            >
              <option value={-1}>Select industry...</option>
              {industries.map((ind, i) => (
                <option key={ind} value={i}>
                  {ind}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelSt}>Years in Business</label>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
            >
              {tenureLabels.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setTenureIdx(i)}
                  style={choiceBtn(i === tenureIdx)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Financial Profile */}
      {step === 4 && (
        <div style={{ display: "grid", gap: "20px" }}>
          <div>
            <label style={labelSt}>Credit Range</label>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
            >
              {creditLabels.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setCreditIdx(i)}
                  style={choiceBtn(i === creditIdx)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelSt}>Annual Revenue</label>
            <div
              style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
            >
              {revenueLabels.map((r, i) => (
                <button
                  key={i}
                  onClick={() => setRevenueIdx(i)}
                  style={choiceBtn(i === revenueIdx)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "14px",
                color: "#1E293B",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={priorClaims}
                onChange={(e) => setPriorClaims(e.target.checked)}
                style={{
                  accentColor: "#3B82F6",
                  width: "18px",
                  height: "18px",
                }}
              />
              I have prior bond claims
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "14px",
                color: "#1E293B",
                cursor: "pointer",
              }}
            >
              <input
                type="checkbox"
                checked={bankruptcy}
                onChange={(e) => setBankruptcy(e.target.checked)}
                style={{
                  accentColor: "#3B82F6",
                  width: "18px",
                  height: "18px",
                }}
              />
              I have a bankruptcy on record
            </label>
          </div>
        </div>
      )}

      {/* Step 5: Results */}
      {step === 5 && (
        <div style={{ display: "grid", gap: "16px" }}>
          {/* Score card */}
          <div
            style={{
              ...cardSt,
              background: tier.bg,
              borderColor: tier.color,
              textAlign: "center",
              padding: "36px 28px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#64748B",
                marginBottom: "4px",
              }}
            >
              Your Pre-Qualification Score
            </p>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "64px",
                color: tier.color,
                lineHeight: 1,
              }}
            >
              {score}
            </p>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "18px",
                color: tier.color,
                marginTop: "4px",
              }}
            >
              {tier.label}
            </p>
          </div>

          {/* Premium estimate */}
          <div
            style={{
              ...cardSt,
              background: "#3B82F6",
              borderColor: "#3B82F6",
              color: "#FFFFFF",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                opacity: 0.8,
                marginBottom: "4px",
              }}
            >
              Estimated Premium Range
            </p>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "28px",
                lineHeight: 1.1,
              }}
            >
              {fmt(est.low)} &ndash; {fmt(est.high)}
            </p>
            <p
              style={{
                fontSize: "13px",
                opacity: 0.7,
                marginTop: "6px",
              }}
            >
              on a {fmt(amountStops[amountIdx])}{" "}
              {bondTypeChoices[bondTypeIdx] || "bond"}
            </p>
          </div>

          {/* Score breakdown bars */}
          <div style={cardSt}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                color: "#1B1F3B",
                marginBottom: "16px",
              }}
            >
              Score Breakdown
            </p>
            <div style={{ display: "grid", gap: "12px" }}>
              {breakdown.map((b) => (
                <div key={b.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: "13px",
                      marginBottom: "4px",
                    }}
                  >
                    <span
                      style={{
                        color: "#1E293B",
                        fontWeight: 600,
                      }}
                    >
                      {b.label}
                    </span>
                    <span style={{ color: "#64748B" }}>
                      {b.pts} / {b.max}
                    </span>
                  </div>
                  <div
                    style={{
                      height: "8px",
                      borderRadius: "4px",
                      background: "#E2E8F0",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(b.pts / b.max) * 100}%`,
                        background:
                          b.pts / b.max >= 0.7
                            ? "#84CC16"
                            : b.pts / b.max >= 0.4
                              ? "#3B82F6"
                              : "#F97316",
                        borderRadius: "4px",
                        transition: "width 0.4s",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Improvement tips */}
          <div style={cardSt}>
            <p
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                color: "#1B1F3B",
                marginBottom: "12px",
              }}
            >
              How to Improve
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: "20px",
                display: "grid",
                gap: "8px",
                fontSize: "14px",
                color: "#1E293B",
                lineHeight: 1.55,
              }}
            >
              {tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div
            style={{
              background: "#F8FAFC",
              borderRadius: "16px",
              padding: "16px 20px",
              fontSize: "12px",
              color: "#94A3B8",
              lineHeight: 1.55,
            }}
          >
            This pre-qualification is for educational purposes only and does
            not constitute a bond offer, commitment, or guarantee of terms.
            Actual underwriting will require a full financial review by a
            licensed surety company.
          </div>
        </div>
      )}

      {/* Navigation */}
      {step < 5 && (
        <div
          style={{
            display: "flex",
            justifyContent: step > 1 ? "space-between" : "flex-end",
            marginTop: "28px",
            gap: "12px",
          }}
        >
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{
                padding: "12px 28px",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                background: "#FFFFFF",
                color: "#1E293B",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Back
            </button>
          )}
          <button
            onClick={() => setStep(step + 1)}
            disabled={!canAdvance()}
            style={{
              padding: "12px 28px",
              borderRadius: "12px",
              border: "none",
              background: canAdvance() ? "#3B82F6" : "#CBD5E1",
              color: "#FFFFFF",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              cursor: canAdvance() ? "pointer" : "not-allowed",
              transition: "background 0.15s",
            }}
          >
            {step === 4 ? "See Results" : "Continue"}
          </button>
        </div>
      )}

      {step === 5 && (
        <button
          onClick={() => {
            setStep(1);
            setBondTypeIdx(-1);
            setAmountIdx(4);
            setStateIdx(-1);
            setIndustryIdx(-1);
            setTenureIdx(-1);
            setCreditIdx(-1);
            setRevenueIdx(-1);
            setPriorClaims(false);
            setBankruptcy(false);
          }}
          style={{
            marginTop: "20px",
            padding: "12px 28px",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            background: "#FFFFFF",
            color: "#1E293B",
            fontWeight: 600,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          Start Over
        </button>
      )}
    </div>
  );
}
