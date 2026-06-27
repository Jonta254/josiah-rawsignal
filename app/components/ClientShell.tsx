"use client";
import { useState } from "react";
import RawSignalIntro from "./RawSignalIntro";
import ParticleCanvas from "./ParticleCanvas";

export default function ClientShell() {
  const [introDone, setIntroDone] = useState(false);

  if (!introDone) {
    return <RawSignalIntro onComplete={() => setIntroDone(true)} />;
  }
  return <ParticleCanvas />;
}
