import React, { useEffect, useState } from "react";

const loadingSteps = [
  "Analyzing job description...",
  "Parsing your resume...",
  "Identifying key skills & gaps...",
  "Mapping your experience...",
  "Crafting interview questions...",
  "Building your strategy...",
  "Finalizing your plan...",
];

const CheckIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LoadingDots = () => (
  <span className="loading-dots">
    <span />
    <span />
    <span />
  </span>
);

const MultiStepLoader = ({ loading }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);

  useEffect(() => {
    if (!loading) {
      setCurrentStep(0);
      setCompletedSteps([]);
      return;
    }

    let step = 0;

    const interval = setInterval(() => {
      // Mark current step as completed
      setCompletedSteps((c) => {
        if (c.includes(step)) return c; // guard against duplicates
        return [...c, step];
      });

      if (step >= loadingSteps.length - 1) {
        clearInterval(interval);
        return;
      }

      step += 1;
      setCurrentStep(step);
    }, 1800);

    return () => clearInterval(interval);
  }, [loading]);

  if (!loading) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&family=Syne:wght@400;600;700;800&display=swap');

        .msl-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #05070d;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Mono', monospace;
          overflow: hidden;
        }

        /* Animated grid background */
        .msl-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(99,179,237,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,179,237,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          animation: gridDrift 20s linear infinite;
        }

        @keyframes gridDrift {
          0% { transform: translate(0,0); }
          100% { transform: translate(48px, 48px); }
        }

        /* Glow blob */
        .msl-blob {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(56,128,255,0.12) 0%, transparent 70%);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: blobPulse 4s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes blobPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
        }

        .msl-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          padding: 0 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
        }

        .msl-header {
          margin-bottom: 40px;
        }

        .msl-header-label {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.2em;
          color: #3878ff;
          text-transform: uppercase;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .msl-header-label::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 1px;
          background: #3878ff;
        }

        .msl-title {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #eef2ff;
          line-height: 1.15;
          letter-spacing: -0.02em;
        }

        .msl-title span {
          background: linear-gradient(90deg, #3878ff, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Steps list */
        .msl-steps {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .msl-step {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 10px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.28;
          transform: translateX(-8px);
        }

        .msl-step.completed {
          opacity: 0.55;
          transform: translateX(0);
        }

        .msl-step.active {
          opacity: 1;
          transform: translateX(0);
          background: rgba(56, 120, 255, 0.08);
          border: 1px solid rgba(56, 120, 255, 0.18);
        }

        .msl-step.upcoming {
          transform: translateX(-8px);
        }

        /* Icon container */
        .msl-step-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .msl-step.completed .msl-step-icon {
          background: rgba(56,120,255,0.15);
          border: 1.5px solid rgba(56,120,255,0.4);
        }

        .msl-step.active .msl-step-icon {
          background: rgba(56,120,255,0.2);
          border: 1.5px solid #3878ff;
          box-shadow: 0 0 12px rgba(56,120,255,0.35);
        }

        .msl-step.upcoming .msl-step-icon {
          border: 1.5px solid rgba(255,255,255,0.1);
        }

        .msl-check-icon {
          width: 14px;
          height: 14px;
          color: #60a5fa;
          animation: checkPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes checkPop {
          0% { transform: scale(0) rotate(-20deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .msl-step-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }

        .msl-step.active .msl-step-dot {
          display: none;
        }

        /* Spinning ring for active */
        .msl-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(56,120,255,0.2);
          border-top-color: #3878ff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .msl-step-text {
          font-family: 'DM Mono', monospace;
          font-size: 13.5px;
          font-weight: 400;
          letter-spacing: 0.01em;
          line-height: 1;
          transition: color 0.3s ease;
          color: #94a3b8;
        }

        .msl-step.completed .msl-step-text {
          color: #64748b;
          text-decoration: line-through;
          text-decoration-color: rgba(100,116,139,0.4);
        }

        .msl-step.active .msl-step-text {
          color: #e2e8f0;
          font-weight: 500;
        }

        /* Progress bar */
        .msl-progress-wrap {
          margin-top: 36px;
          width: 100%;
        }

        .msl-progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .msl-progress-label {
          font-size: 11px;
          color: #475569;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .msl-progress-pct {
          font-size: 12px;
          color: #3878ff;
          font-weight: 500;
        }

        .msl-progress-track {
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.06);
          border-radius: 99px;
          overflow: hidden;
        }

        .msl-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #3878ff, #60a5fa);
          border-radius: 99px;
          transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 0 10px rgba(56,120,255,0.5);
        }

        /* Loading dots */
        .loading-dots {
          display: inline-flex;
          gap: 3px;
          align-items: center;
          margin-left: 4px;
          vertical-align: middle;
        }

        .loading-dots span {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #3878ff;
          animation: dotBounce 1.2s ease-in-out infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotBounce {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="msl-overlay">
        <div className="msl-blob" />

        <div className="msl-container">
          <div className="msl-header">
            <div className="msl-header-label">AI Processing</div>
            <h2 className="msl-title">
              Loading Your<br />
              <span>Interview Plan</span>
            </h2>
          </div>

          <div className="msl-steps">
            {loadingSteps.map((step, i) => {
              const isDone = completedSteps.includes(i);
              const isActive = currentStep === i;
              const stepClass = isDone ? "completed" : isActive ? "active" : "upcoming";

              return (
                <div key={i} className={`msl-step ${stepClass}`}>
                  <div className="msl-step-icon">
                    {isDone && <CheckIcon className="msl-check-icon" />}
                    {isActive && <div className="msl-spinner" />}
                    {!isDone && !isActive && <div className="msl-step-dot" />}
                  </div>
                  <span className="msl-step-text">{step}</span>
                </div>
              );
            })}
          </div>

          <div className="msl-progress-wrap">
            <div className="msl-progress-info">
              <span className="msl-progress-label">Progress</span>
              <span className="msl-progress-pct">
                {Math.round((completedSteps.length / loadingSteps.length) * 100)}%
              </span>
            </div>
            <div className="msl-progress-track">
              <div
                className="msl-progress-bar"
                style={{
                  width: `${(completedSteps.length / loadingSteps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MultiStepLoader;