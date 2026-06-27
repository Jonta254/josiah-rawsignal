"use client";
import { useState } from "react";
import SignalIntro from "./SignalIntro";
import ParticleCanvas from "./ParticleCanvas";

export default function ClientShell() {
  const [introDone, setIntroDone] = useState(false);

  if (!introDone) {
    return <SignalIntro onComplete={() => setIntroDone(true)} />;
  }
  return <ParticleCanvas />;
}
