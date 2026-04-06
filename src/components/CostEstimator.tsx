import { useState } from "react";

const bondTypeOptions = [
  { label: "Performance Bond", rateMin: 1, rateMax: 3 },
  { label: "Payment Bond", rateMin: 1, rateMax: 3 },
  { label: "Bid Bond", rateMin: 0, rateMax: 0 },
  { label: "License & Permit Bond", rateMin: 1, rateMax: 10 },
  { label: "Court Bond", rateMin: 2, rateMax: 5 },
  { label: "Maintenance Bond", rateMin: 1, rateMax: 3 },
  { label: "Subdivision Bond", rateMin: 1, rateMax: 4 },
];

const amountStops = [
  5_000, 10_000, 25_000, 50_000, 100_000, 250_000, 500_000, 1_000_000, 5_000_000,
];

const creditTiers = [
  { label: "Excellent (700+)", factor: 0.7 },
  { label: "Good (650-699)", factor: 1.0 },
  { label: "Fair (600-649)", factor: 1.5 },
  { label: "Poor (<600)", factor: 2.2 },
];

const tenureOptions = [
  { label: "< 1 year", multiplier: 1.3 },
  { label: "1-3 years", multiplier: 1.1 },
  { label: "3-5 years", multiplier: 1.0 },
  { label: "5-10 years", multiplier: 0.9 },
  { label: "10+ years", multiplier: 0.8 },
];

function formatCurrency(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export default function CostEstimator() {
  const [bondTypeIdx, setBondTypeIdx] = useState(0);
  const [amountIdx, setAmountIdx] = useState(4);
  const [creditIdx, setCreditIdx] = useState(1);
  const [tenureIdx, setTenureIdx] = useState(2);
  const [showResults, setShowResults] = useState(false);

  const bondType = bondTypeOptions[bondTypeIdx];
  const bondAmount = amountStops[amountIdx];
  const credit = creditTiers[creditIdx];
  const tenure = tenureOptions[tenureIdx];

  const baseMin = bondType.rateMin / 100;
  const baseMax = bondType.rateMax / 100;
  const adjMin = baseMin * credit.factor * tenure.multiplier;
  const adjMax = baseMax * credit.factor * tenure.multiplier;

  let surcharge = 1;
  if (bondAmount < 640) surcharge = 1.15;

  const premMin = Math.round(bondAmount * adjMin * surcharge);
  const premMax = Math.round(bondAmount * adjMax * surcharge);
  const midpoint = Math.round((premMin + premMax) / 2);
  const brokerCut = Math.round(midpoint * 0.25);

  const isBidBond = bondType.rateMin === 0 && bondType.rateMax === 0;

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "'Space Grotesk', sans-serif",
    fontWeight: 700,
    fontSize: "14px",
    color: "#1B1F3B",
    marginBottom: "8px",
  };

  const btnBase = (active: boolean): React.CSSProperties => ({
    padding: "10px 18px",
    borderRadius: "12px",
    border: active ? "2px solid #3B82F6" : "1px solid #E2E8F0",
    background: active ? "#3B82F6" : "#FFFFFF",
    color: active ? "#FFFFFF" : "#1E293B",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.15s",
  });

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div style={{ display: "grid", gap: "24px", maxWidth: "680px" }}>
        {/* Bond Type */}
        <div>
          <label style={labelStyle}>Bond Type</label>
          <select
            value={bondTypeIdx}
            onChange={(e) => {
              setBondTypeIdx(Number(e.target.value));
              setShowResults(false);
            }}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "12px",
              border: "1px solid #E2E8F0",
              fontSize: "15px",
              color: "#1E293B",
              background: "#FFFFFF",
              outline: "none",
            }}
          >
            {bondTypeOptions.map((bt, i) => (
              <option key={i} value={i}>
                {bt.label} ({bt.rateMin}%&ndash;{bt.rateMax}%)
              </option>
            ))}
          </select>
        </div>

        {/* Bond Amount Slider */}
        <div>
          <label style={labelStyle}>
            Bond Amount: {formatCurrency(bondAmount)}
          </label>
          <input
            type="range"
            min={0}
            max={amountStops.length - 1}
            value={amountIdx}
            onChange={(e) => {
              setAmountIdx(Number(e.target.value));
              setShowResults(false);
            }}
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

        {/* Credit Tier */}
        <div>
          <label style={labelStyle}>Credit Tier</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {creditTiers.map((ct, i) => (
              <button
                key={i}
                onClick={() => {
                  setCreditIdx(i);
                  setShowResults(false);
                }}
                style={btnBase(i === creditIdx)}
              >
                {ct.label}
              </button>
            ))}
          </div>
        </div>

        {/* Years in Business */}
        <div>
          <label style={labelStyle}>Years in Business</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {tenureOptions.map((t, i) => (
              <button
                key={i}
                onClick={() => {
                  setTenureIdx(i);
                  setShowResults(false);
                }}
                style={btnBase(i === tenureIdx)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Calculate button */}
        <button
          onClick={() => setShowResults(true)}
          style={{
            padding: "14px 32px",
            borderRadius: "12px",
            border: "none",
            background: "#3B82F6",
            color: "#FFFFFF",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#2563EB")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "#3B82F6")
          }
        >
          Calculate Estimate
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div style={{ marginTop: "32px" }}>
          {isBidBond ? (
            <div
              style={{
                background: "#3B82F6",
                borderRadius: "20px",
                padding: "28px",
                color: "#FFFFFF",
              }}
            >
              <p
                style={{
                  fontSize: "14px",
                  opacity: 0.8,
                  marginBottom: "4px",
                }}
              >
                Bid Bonds
              </p>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "28px",
                }}
              >
                Typically Free
              </p>
              <p
                style={{
                  fontSize: "14px",
                  opacity: 0.8,
                  marginTop: "8px",
                }}
              >
                Bid bonds are usually issued at no cost when you have a surety
                relationship for performance and payment bonds.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {/* Premium range */}
              <div
                style={{
                  background: "#3B82F6",
                  borderRadius: "20px",
                  padding: "28px",
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
                  Estimated Annual Premium
                </p>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "28px",
                    lineHeight: 1.1,
                  }}
                >
                  {formatCurrency(premMin)} &ndash;{" "}
                  {formatCurrency(premMax)}
                </p>
              </div>

              {/* Broker commission */}
              <div
                style={{
                  background: "#F97316",
                  borderRadius: "20px",
                  padding: "28px",
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
                  Broker Gets (~25%)
                </p>
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "28px",
                    lineHeight: 1.1,
                  }}
                >
                  {formatCurrency(brokerCut)}
                </p>
              </div>

              {/* Factor breakdown */}
              <div
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "28px",
                  border: "1px solid #E2E8F0",
                  gridColumn: "1 / -1",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "15px",
                    color: "#1B1F3B",
                    marginBottom: "12px",
                  }}
                >
                  Your Factor Breakdown
                </p>
                <div
                  style={{
                    display: "grid",
                    gap: "8px",
                    fontSize: "14px",
                    color: "#1E293B",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Base rate range</span>
                    <span style={{ fontWeight: 600 }}>
                      {bondType.rateMin}% &ndash; {bondType.rateMax}%
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Credit adjustment</span>
                    <span style={{ fontWeight: 600 }}>
                      &times;{credit.factor.toFixed(1)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Tenure multiplier</span>
                    <span style={{ fontWeight: 600 }}>
                      &times;{tenure.multiplier.toFixed(1)}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Bond amount</span>
                    <span style={{ fontWeight: 600 }}>
                      {formatCurrency(bondAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Educational note */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  background: "#F8FAFC",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  fontSize: "14px",
                  color: "#64748B",
                  lineHeight: 1.65,
                }}
              >
                <strong style={{ color: "#1B1F3B" }}>
                  Why does the broker get {formatCurrency(brokerCut)}?
                </strong>{" "}
                Traditional brokers take 20&ndash;30% of your premium as
                commission &mdash; and you&rsquo;re already paying it whether
                you realize it or not.{" "}
                <a
                  href="/the-broker-problem"
                  style={{
                    color: "#3B82F6",
                    textDecoration: "underline",
                  }}
                >
                  Learn more about the broker problem &rarr;
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
