import type { CSSProperties } from "react";

const SIGNALS = [
  { label: "Power", value: "240V", note: "Field logic", color: "var(--wire)" },
  { label: "Stack", value: "Next", note: "Interface systems", color: "var(--cyan)" },
  { label: "Craft", value: "Pixel", note: "Design discipline", color: "var(--violet)" },
  { label: "Range", value: "Trail", note: "Offline reset", color: "var(--emerald)" },
];

const MODES = [
  "Electrician: reads the physical world before touching the digital one.",
  "Developer: turns rough ideas into working tools with calm architecture.",
  "Designer: makes the system feel inevitable, legible, and alive.",
];

export default function SignalCockpit() {
  return (
    <section className="signal-cockpit" aria-label="Raw Signal operating profile">
      <div className="signal-cockpit__inner">
        <div className="signal-cockpit__copy">
          <p className="signal-eyebrow">RAWSIGNAL.OS / LIVE PROFILE</p>
          <h2>Not a niche. A working frequency.</h2>
          <p>
            Josiah Raw is the overlap between field craft and digital systems: wiring panels,
            building interfaces, shaping tools, then taking the whole thing outside to see if it still breathes.
          </p>
        </div>

        <div className="signal-cockpit__panel">
          <div className="signal-console-top">
            <span>signal integrity</span>
            <strong>98.7%</strong>
          </div>
          <div className="signal-meter" aria-hidden="true">
            <i style={{ width: "98.7%" }} />
          </div>
          <div className="signal-grid-readout">
            {SIGNALS.map((item) => (
              <div key={item.label} className="signal-readout" style={{ "--readout-color": item.color } as CSSProperties}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <em>{item.note}</em>
              </div>
            ))}
          </div>
          <div className="signal-mode-list">
            {MODES.map((mode, index) => (
              <div key={mode}>
                <span>0{index + 1}</span>
                <p>{mode}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}