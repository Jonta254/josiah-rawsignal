import type { Metadata } from "next";
import Link from "next/link";

/* ── SVG UI Mockups ─────────────────────────────────────────────── */
function BrowserFrame({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 900 520" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* Browser chrome */}
      <rect width="900" height="520" rx="12" fill="#0A0A14" />
      <rect width="900" height="40" rx="12" fill="#14141E" />
      <rect width="900" height="28" y="12" fill="#14141E" />
      {/* Traffic lights */}
      <circle cx="22" cy="20" r="5" fill="#FF5F57" />
      <circle cx="38" cy="20" r="5" fill="#FEBC2E" />
      <circle cx="54" cy="20" r="5" fill="#28C840" />
      {/* URL bar */}
      <rect x="76" y="10" width="640" height="20" rx="5" fill={`rgba(${hexToRgb(color)},0.08)`} />
      <rect x="76" y="10" width="640" height="20" rx="5" stroke={`rgba(${hexToRgb(color)},0.2)`} strokeWidth="1" fill="none" />
      {/* Content area */}
      <rect x="0" y="40" width="900" height="480" fill="#08080F" />
      {children}
    </svg>
  );
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r},${g},${b}`;
}

const PREVIEWS: Record<string, React.ReactNode> = {
  electracore: (
    <BrowserFrame color="#D4A843">
      {/* Sidebar nav */}
      <rect x="0" y="40" width="180" height="480" fill="#0D0D18" />
      <text x="20" y="80" fill="#D4A843" fontSize="13" fontFamily="monospace" fontWeight="700">⚡ ElectraCore</text>
      {["Calculators","Guides","Learning","Load Analysis","Job Billing"].map((t,i)=>(
        <g key={t}>
          <rect x="8" y={102+i*42} width="164" height="34" rx="6" fill={i===0?"rgba(212,168,67,0.12)":"transparent"} />
          <text x="20" y={124+i*42} fill={i===0?"#D4A843":"rgba(255,255,255,0.35)"} fontSize="11" fontFamily="monospace">{t}</text>
        </g>
      ))}
      {/* Main area */}
      <text x="210" y="80" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="monospace" letterSpacing="2">VOLTAGE DROP CALCULATOR</text>
      <rect x="200" y="90" width="680" height="1" fill="rgba(212,168,67,0.2)" />
      {/* Input fields */}
      {[["Supply Voltage (V)","230"],["Current (A)","15"],["Cable Length (m)","45"],["Cable CSA (mm²)","2.5"]].map(([label,val],i)=>(
        <g key={label}>
          <text x="210" y={130+i*62} fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">{label}</text>
          <rect x="210" y={138+i*62} width="280" height="36" rx="7" fill="rgba(212,168,67,0.06)" stroke="rgba(212,168,67,0.22)" strokeWidth="1" />
          <text x="222" y={161+i*62} fill="#F2F4FC" fontSize="13" fontFamily="monospace">{val}</text>
        </g>
      ))}
      {/* Result */}
      <rect x="530" y="118" width="330" height="180" rx="10" fill="rgba(212,168,67,0.06)" stroke="rgba(212,168,67,0.2)" strokeWidth="1" />
      <text x="550" y="148" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="monospace" letterSpacing="2">RESULT</text>
      <text x="550" y="210" fill="#D4A843" fontSize="42" fontFamily="monospace" fontWeight="700">3.2</text>
      <text x="650" y="210" fill="rgba(212,168,67,0.6)" fontSize="16" fontFamily="monospace">V drop</text>
      <text x="550" y="240" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="monospace">1.39% of 230V — within 3% limit</text>
      <rect x="550" y="260" width="90" height="22" rx="4" fill="rgba(52,211,153,0.12)" />
      <text x="567" y="275" fill="#34D399" fontSize="10" fontFamily="monospace">✓ SAFE</text>
      {/* Formula */}
      <text x="210" y="388" fill="rgba(255,255,255,0.2)" fontSize="10" fontFamily="monospace">Formula applied: Vd = (2 × L × I × R) / 1000</text>
      <rect x="210" y="400" width="660" height="36" rx="7" fill="rgba(212,168,67,0.04)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      <text x="222" y="422" fill="rgba(255,255,255,0.3)" fontSize="11" fontFamily="monospace">Vd = (2 × 45 × 15 × 0.00741) / 1000 = 0.10V per metre … total 3.2V</text>
    </BrowserFrame>
  ),
  digilearn: (
    <BrowserFrame color="#0284C7">
      {/* Top nav */}
      <rect x="0" y="40" width="900" height="52" fill="#0C1422" />
      <text x="24" y="72" fill="#0284C7" fontSize="14" fontFamily="monospace" fontWeight="700">DigiLearn</text>
      {["Courses","Tracks","Community","For Teams"].map((t,i)=>(
        <text key={t} x={130+i*90} y="72" fill="rgba(255,255,255,0.4)" fontSize="11" fontFamily="monospace">{t}</text>
      ))}
      <rect x="770" y="56" width="110" height="28" rx="6" fill="#0284C7" />
      <text x="795" y="74" fill="#fff" fontSize="11" fontFamily="monospace">Enrol Free</text>
      {/* Hero strip */}
      <rect x="0" y="92" width="900" height="90" fill="rgba(2,132,199,0.06)" />
      <text x="24" y="130" fill="#F2F4FC" fontSize="18" fontFamily="monospace" fontWeight="700">100+ Free Courses for the AI Era</text>
      <text x="24" y="154" fill="rgba(255,255,255,0.35)" fontSize="11" fontFamily="monospace">Web Dev · Data Science · AI Ethics · Healthcare IT · Fintech · Public Policy</text>
      {/* Filter chips */}
      {["All","AI Tools","Data Science","Databases","Ethics","Finance","Healthcare"].map((t,i)=>(
        <g key={t}>
          <rect x={24+i*110} y="198" width="100" height="24" rx="12" fill={i===0?"#0284C7":"rgba(255,255,255,0.05)"} stroke={i===0?"#0284C7":"rgba(255,255,255,0.1)"} strokeWidth="1" />
          <text x={28+i*110} y="214" fill={i===0?"#fff":"rgba(255,255,255,0.45)"} fontSize="9.5" fontFamily="monospace">{t}</text>
        </g>
      ))}
      {/* Course cards */}
      {[
        { x:24,  title:"Python for Data Science", tag:"Data Science", lvl:"Beginner", col:"#0284C7" },
        { x:316, title:"Machine Learning Fundamentals", tag:"ML/AI", lvl:"Intermediate", col:"#7C3AED" },
        { x:608, title:"AI Ethics & Governance", tag:"Ethics", lvl:"All Levels", col:"#EA580C" },
      ].map((c)=>(
        <g key={c.x}>
          <rect x={c.x} y="240" width="272" height="200" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <rect x={c.x} y="240" width="272" height="80" rx="10" fill={`rgba(${hexToRgb(c.col)},0.12)`} />
          <rect x={c.x} y="306" width="272" height="14" fill={`rgba(${hexToRgb(c.col)},0.12)`} />
          <text x={c.x+14} y="272" fill={c.col} fontSize="22" fontFamily="monospace">📊</text>
          <text x={c.x+14} y="348" fill="#F2F4FC" fontSize="11" fontFamily="monospace" fontWeight="700">{c.title}</text>
          <rect x={c.x+14} y="360" width="60" height="16" rx="8" fill={`rgba(${hexToRgb(c.col)},0.15)`} />
          <text x={c.x+18} y="371" fill={c.col} fontSize="8.5" fontFamily="monospace">{c.tag}</text>
          <text x={c.x+14} y="400" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">{c.lvl} · FREE</text>
          <rect x={c.x+14} y="414" width="244" height="3" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x={c.x+14} y="414" width="80" height="3" rx="2" fill={c.col} />
        </g>
      ))}
    </BrowserFrame>
  ),
  traildesk: (
    <BrowserFrame color="#34D399">
      {/* Sidebar */}
      <rect x="0" y="40" width="220" height="480" fill="#060C0A" />
      <text x="18" y="78" fill="#34D399" fontSize="13" fontFamily="monospace" fontWeight="700">⛰ TrailDesk</text>
      {["My Trips","Plan Route","Gear Lists","Emergency","Offline Maps"].map((t,i)=>(
        <g key={t}>
          <rect x="8" y={100+i*44} width="204" height="36" rx="7" fill={i===0?"rgba(52,211,153,0.1)":"transparent"} />
          <text x="20" y={122+i*44} fill={i===0?"#34D399":"rgba(255,255,255,0.3)"} fontSize="11" fontFamily="monospace">{t}</text>
        </g>
      ))}
      {/* Status */}
      <rect x="10" y="440" width="200" height="64" rx="8" fill="rgba(52,211,153,0.06)" />
      <circle cx="24" cy="460" r="5" fill="#34D399" />
      <text x="34" y="464" fill="#34D399" fontSize="9" fontFamily="monospace">GPS ACTIVE</text>
      <text x="14" y="486" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">50+ offline regions ready</text>
      {/* Map area */}
      <rect x="220" y="40" width="680" height="480" fill="#0A1210" />
      {/* Terrain grid */}
      {[0,1,2,3,4].map(i=>(
        <line key={`h${i}`} x1="220" y1={100+i*80} x2="900" y2={100+i*80} stroke="rgba(52,211,153,0.06)" strokeWidth="1" />
      ))}
      {[0,1,2,3,4,5,6].map(i=>(
        <line key={`v${i}`} x1={320+i*90} y1="40" x2={320+i*90} y2="520" stroke="rgba(52,211,153,0.06)" strokeWidth="1" />
      ))}
      {/* Contour lines */}
      <path d="M240 460 Q350 420 440 380 Q520 340 580 290 Q640 240 700 200 Q760 160 840 140" fill="none" stroke="rgba(52,211,153,0.15)" strokeWidth="2" />
      <path d="M240 480 Q360 440 460 400 Q540 360 600 310 Q660 260 720 220 Q780 180 860 160" fill="none" stroke="rgba(52,211,153,0.1)" strokeWidth="1.5" />
      <path d="M240 440 Q340 400 420 360 Q500 320 560 270 Q620 220 680 180 Q740 140 820 120" fill="none" stroke="rgba(52,211,153,0.1)" strokeWidth="1.5" />
      {/* Trail route */}
      <path d="M280 470 L340 430 L420 390 L480 350 L540 300 L600 260 L660 220 L720 185 L780 160 L840 148" fill="none" stroke="#34D399" strokeWidth="3" strokeDasharray="8,4" />
      {/* Waypoints */}
      {[{x:280,y:470,l:"Start"},{x:480,y:350,l:"Mackinnon Pass"},{x:840,y:148,l:"End"}].map(({x,y,l})=>(
        <g key={l}>
          <circle cx={x} cy={y} r="7" fill="#34D399" opacity="0.9" />
          <circle cx={x} cy={y} r="12" fill="#34D399" opacity="0.2" />
          <rect x={x+14} y={y-10} width={l.length*6.5+12} height="20" rx="4" fill="rgba(6,12,10,0.85)" />
          <text x={x+20} y={y+4} fill="#34D399" fontSize="9" fontFamily="monospace">{l}</text>
        </g>
      ))}
      {/* Stats panel */}
      <rect x="620" y="360" width="260" height="128" rx="10" fill="rgba(6,12,10,0.88)" stroke="rgba(52,211,153,0.2)" strokeWidth="1" />
      <text x="636" y="382" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">MILFORD TRACK — DAY 3</text>
      {[{l:"Distance",v:"19.4 km"},{l:"Elevation",v:"+1,154 m"},{l:"Duration",v:"7h 20m"},{l:"Conditions",v:"Clear"}].map(({l,v},i)=>(
        <g key={l}>
          <text x="636" y={402+i*20} fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace">{l}</text>
          <text x="776" y={402+i*20} fill="#34D399" fontSize="9" fontFamily="monospace" textAnchor="end">{v}</text>
        </g>
      ))}
    </BrowserFrame>
  ),
  safesignal: (
    <BrowserFrame color="#FF6B35">
      {/* Dark header */}
      <rect x="0" y="40" width="900" height="56" fill="#0C0608" />
      <text x="24" y="75" fill="#FF6B35" fontSize="14" fontFamily="monospace" fontWeight="700">⚠ SafeSignal</text>
      <rect x="760" y="54" width="120" height="28" rx="6" fill="rgba(255,107,53,0.15)" stroke="rgba(255,107,53,0.4)" strokeWidth="1" />
      <text x="778" y="72" fill="#FF6B35" fontSize="10" fontFamily="monospace">▶ Start Session</text>
      {/* Status bar */}
      <rect x="0" y="96" width="900" height="40" fill="#08030A" />
      {[{l:"Active Workers",v:"6",c:"#34D399"},{l:"Late Check-ins",v:"1",c:"#FEBC2E"},{l:"Alert Running",v:"0",c:"rgba(255,255,255,0.2)"},{l:"Last Check-in",v:"2m ago",c:"rgba(255,255,255,0.5)"}].map(({l,v,c},i)=>(
        <g key={l}>
          <text x={30+i*220} y="112" fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace">{l}</text>
          <text x={30+i*220} y="126" fill={c} fontSize="11" fontFamily="monospace" fontWeight="700">{v}</text>
        </g>
      ))}
      {/* Worker grid */}
      {[
        {n:"Derek Walsh",r:"Panel Room B2",t:14,status:"safe",last:"1m"},
        {n:"Marcus Riley",r:"Rooftop HVAC",t:30,status:"safe",last:"8m"},
        {n:"Sandra Obote",r:"Main Distribution",t:15,status:"late",last:"19m"},
        {n:"Tom Kahu",r:"Sub-station 4",t:60,status:"safe",last:"22m"},
        {n:"Elena Vasquez",r:"Cable Tray Level 3",t:30,status:"safe",last:"12m"},
        {n:"Jake Morrison",r:"Emergency Lighting",t:15,status:"safe",last:"5m"},
      ].map(({n,r,t,status,last},i)=>{
        const row = Math.floor(i/3), col = i%3;
        const x = 24 + col*290, y = 148 + row*156;
        const sc = status==="safe"?"#34D399":status==="late"?"#FEBC2E":"#FF3B3B";
        return (
          <g key={n}>
            <rect x={x} y={y} width="272" height="136" rx="10" fill={status==="late"?"rgba(254,188,46,0.05)":"rgba(255,255,255,0.025)"} stroke={status==="late"?"rgba(254,188,46,0.2)":"rgba(255,255,255,0.06)"} strokeWidth="1" />
            <circle cx={x+18} cy={y+20} r="6" fill={sc} opacity="0.9" />
            <circle cx={x+18} cy={y+20} r="11" fill={sc} opacity={status==="late"?0.25:0.1} />
            <text x={x+34} y={y+24} fill="#F2F4FC" fontSize="11" fontFamily="monospace" fontWeight="700">{n}</text>
            <text x={x+12} y={y+46} fill="rgba(255,255,255,0.3)" fontSize="9.5" fontFamily="monospace">{r}</text>
            <rect x={x+12} y={y+60} width="248" height="3" rx="2" fill="rgba(255,255,255,0.06)" />
            <rect x={x+12} y={y+60} width={248*(t===15?0.88:t===30?0.73:0.62)} height="3" rx="2" fill={sc} />
            <text x={x+12} y={y+85} fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="monospace">Check-in every {t}min · Last: {last} ago</text>
            <rect x={x+12} y={y+100} width={status==="late"?80:60} height="20" rx="4" fill={`rgba(${status==="late"?"254,188,46":"52,211,153"},0.1)`} />
            <text x={x+18} y={y+113} fill={sc} fontSize="9" fontFamily="monospace">{status==="late"?"⚠ LATE":"✓ CHECKED IN"}</text>
          </g>
        );
      })}
    </BrowserFrame>
  ),
  "apprentice-log": (
    <BrowserFrame color="#00C8FF">
      {/* Header */}
      <rect x="0" y="40" width="900" height="56" fill="#080C14" />
      <text x="24" y="76" fill="#00C8FF" fontSize="14" fontFamily="monospace" fontWeight="700">A ApprenticeLog</text>
      {["Dashboard","Hours Log","Skills","Supervisor","Reports"].map((t,i)=>(
        <text key={t} x={180+i*105} y="76" fill={i===0?"#00C8FF":"rgba(255,255,255,0.35)"} fontSize="11" fontFamily="monospace">{t}</text>
      ))}
      {/* Progress ring area */}
      <rect x="24" y="114" width="260" height="340" rx="12" fill="rgba(0,200,255,0.04)" stroke="rgba(0,200,255,0.12)" strokeWidth="1" />
      <text x="154" y="145" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" textAnchor="middle" letterSpacing="2">TOTAL PROGRESS</text>
      {/* SVG progress ring */}
      <circle cx="154" cy="230" r="72" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12" />
      <circle cx="154" cy="230" r="72" fill="none" stroke="#00C8FF" strokeWidth="12" strokeDasharray="452" strokeDashoffset="158" strokeLinecap="round" transform="rotate(-90 154 230)" />
      <text x="154" y="220" fill="#F2F4FC" fontSize="28" fontFamily="monospace" fontWeight="700" textAnchor="middle">65%</text>
      <text x="154" y="244" fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace" textAnchor="middle">2,340 / 3,600 hrs</text>
      {/* Competency bars */}
      <text x="36" y="318" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="monospace" letterSpacing="1">COMPETENCIES</text>
      {[{l:"Wiring & Installation",p:78},{l:"Protection Systems",p:60},{l:"Testing & Inspection",p:45},{l:"3-Phase Systems",p:30}].map(({l,p},i)=>(
        <g key={l}>
          <text x="36" y={340+i*30} fill="rgba(255,255,255,0.45)" fontSize="9.5" fontFamily="monospace">{l}</text>
          <rect x="36" y={346+i*30} width="224" height="4" rx="2" fill="rgba(255,255,255,0.06)" />
          <rect x="36" y={346+i*30} width={224*p/100} height="4" rx="2" fill={p>70?"#34D399":p>50?"#00C8FF":"rgba(0,200,255,0.5)"} />
          <text x="266" y={350+i*30} fill="rgba(255,255,255,0.3)" fontSize="9" fontFamily="monospace" textAnchor="end">{p}%</text>
        </g>
      ))}
      {/* Log entries table */}
      <rect x="300" y="114" width="580" height="340" rx="12" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      <text x="318" y="140" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace" letterSpacing="2">RECENT LOG ENTRIES</text>
      <rect x="300" y="148" width="580" height="1" fill="rgba(255,255,255,0.06)" />
      {/* Table header */}
      {["Task","Hours","Date","Status"].map((h,i)=>(
        <text key={h} x={318+[0,290,370,460][i]} y="166" fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="monospace" letterSpacing="1">{h}</text>
      ))}
      {/* Log rows */}
      {[
        {task:"Cable installation — conduit run, Level 3",h:"6.5",d:"Mon 30 Jun",s:"signed"},
        {task:"Switchboard wiring — main distribution board",h:"4.0",d:"Tue 1 Jul",s:"signed"},
        {task:"Testing and tagging — portable appliances",h:"3.5",d:"Wed 2 Jul",s:"pending"},
        {task:"Motor circuit installation — 3 phase",h:"5.0",d:"Thu 3 Jul",s:"pending"},
        {task:"Fault finding — single phase motor circuit",h:"2.0",d:"Fri 4 Jul",s:"pending"},
      ].map(({task,h,d,s},i)=>{
        const y = 185+i*44;
        const sc = s==="signed"?"#34D399":"#FEBC2E";
        return (
          <g key={task}>
            <rect x="300" y={y-14} width="580" height="40" fill={i%2===0?"rgba(255,255,255,0.01)":"transparent"} />
            <text x="318" y={y+6} fill="rgba(255,255,255,0.55)" fontSize="10" fontFamily="monospace">{task.slice(0,42)}{task.length>42?"…":""}</text>
            <text x="608" y={y+6} fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">{h}</text>
            <text x="688" y={y+6} fill="rgba(255,255,255,0.3)" fontSize="10" fontFamily="monospace">{d}</text>
            <rect x="778" y={y-4} width={s==="signed"?56:60} height="18" rx="4" fill={`rgba(${s==="signed"?"52,211,153":"254,188,46"},0.1)`} />
            <text x="786" y={y+8} fill={sc} fontSize="9" fontFamily="monospace">{s==="signed"?"✓ Signed":"⏳ Pending"}</text>
          </g>
        );
      })}
    </BrowserFrame>
  ),
  electrimap: (
    <BrowserFrame color="#F0C030">
      <rect x="0" y="40" width="900" height="480" fill="#06060E" />
      <text x="30" y="88" fill="#F0C030" fontSize="16" fontFamily="monospace" fontWeight="700">⚡ ElectriMap</text>
      <text x="30" y="110" fill="rgba(255,255,255,0.25)" fontSize="11" fontFamily="monospace">The electrical platform for the full job lifecycle</text>
      {["Circuit Diagrams","Load Calculator","Wiring Guides","Cost Estimator","Job Billing","Learning"].map((t,i)=>{
        const col = i%3, row = Math.floor(i/3);
        const x = 30 + col*290, y = 140 + row*140;
        return (
          <g key={t}>
            <rect x={x} y={y} width="270" height="120" rx="10" fill="rgba(240,192,48,0.04)" stroke="rgba(240,192,48,0.12)" strokeWidth="1" />
            <text x={x+14} y={y+36} fill="#F0C030" fontSize="20">{"⚡📐📋💰🧾📚"[i]}</text>
            <text x={x+14} y={y+60} fill="#F2F4FC" fontSize="12" fontFamily="monospace" fontWeight="700">{t}</text>
            <rect x={x+14} y={y+76} width={200*[0.8,0.65,0.9,0.55,0.7,0.45][i]} height="3" rx="2" fill="#F0C030" opacity="0.4" />
            <text x={x+14} y={y+100} fill="rgba(255,255,255,0.2)" fontSize="9" fontFamily="monospace">In development</text>
          </g>
        );
      })}
    </BrowserFrame>
  ),
};

const PROJECTS: Record<string, {
  title: string; tagline: string; role: string; timeline: string;
  tools: string[]; status: string; accent: string; accentRgb: string;
  liveUrl?: string;
  challenge: string; approach: { step: string; detail: string }[];
  outcome: string; prev?: string; next?: string;
}> = {
  electracore: {
    title: "ElectraCore",
    tagline: "The complete electrical platform for students, engineers, and trade workers.",
    role: "Product Designer + Developer",
    timeline: "Ongoing · 2025–2026",
    tools: ["Next.js", "TypeScript", "React", "PWA", "Figma", "Offline-first"],
    status: "Live",
    accent: "#D4A843",
    accentRgb: "212,168,67",
    liveUrl: "https://electracore.vercel.app",
    challenge: "Students, apprentices, engineers, and electricians all need electrical reference tools — but the existing options are either too narrow (one calculator), too expensive (professional software), or written for the textbook rather than the job site. 8 years of field work made the gaps obvious: no single place for calculations, guides, and practical knowledge that works offline and actually makes sense.",
    approach: [
      { step: "Platform scope from real problems", detail: "Built around the six problems that come up every day on site: instant calculations (Ohm's law, voltage drop, cable sizing, LED resistors, power factor), wiring connection guides with colour codes and diagrams, structured learning from fundamentals to advanced protection theory, load analysis for design, project cost estimation, and job billing. Not a whiteboard exercise — a list from the field." },
      { step: "Calculators that show their working", detail: "Every calculator displays the formula being applied and explains the result in plain language. A student learning Ohm's law sees the same tool a working electrician trusts on site — with the formula visible, not hidden." },
      { step: "Accessible by default, Pro for depth", detail: "Core calculators and guides are free and open — no account required. Learning paths, calculation history, PDF export, and the full guide library sit behind a Pro subscription at $15/mo. The platform has to prove its value before asking for payment." },
    ],
    outcome: "Platform live at electracore.vercel.app. 8 working calculators, 15 wiring guides across 5 categories, and 9 structured learning paths with 40+ topics. Monetisation: Free for core tools, Pro ($15/mo), Business ($45/mo) for team billing and client portal.",
    prev: "apprentice-log",
    next: "digilearn",
  },
  electrimap: {
    title: "ElectriMap",
    tagline: "The electrical platform built by an electrician, for electricians.",
    role: "Product Designer + Developer",
    timeline: "Ongoing · 2025–2026",
    tools: ["React Native", "TypeScript", "SQLite", "PWA", "Figma", "Offline-first"],
    status: "In Progress",
    accent: "#F0C030",
    accentRgb: "240,192,48",
    challenge: "Electricians lack a single tool that covers the full job lifecycle — from reading a schematic on-site to billing the client when it's done. Existing solutions are either desktop-only, paper-based, or built by people who have never touched a wire. The gap is real: 8 years of field work confirmed it.",
    approach: [
      { step: "Platform scope from the field", detail: "Designed around six core needs proven by real work: circuit diagramming, load and cable calculations, wiring connection guides, material cost estimation, project mapping, and client billing. Not features from a whiteboard — problems from a job site." },
      { step: "Learning as a monetisation layer", detail: "Built a structured electrical training module covering residential, commercial, and electronic wiring. Practical scenarios, code-referenced guides, and certification-path tracking — priced as a Pro subscription. Real knowledge, not YouTube repackaged." },
      { step: "Offline-first, always", detail: "SQLite for local storage, background sync when a connection appears. Every feature works in a basement, a conduit trench, or a rural site with no signal. The tool has to be trusted before it can be paid for." },
    ],
    outcome: "Core platform architecture defined. Circuit diagramming, connection guides, and cost estimation features scoped and in active development. Learning module designed and ready for content. Monetisation model: free tier for diagramming, Pro ($15/mo) for calculations and learning, Business ($45/mo) for team billing and client portal.",
  },
  digilearn: {
    title: "DigiLearn",
    tagline: "100+ free courses for the AI era — from web dev to data science, ethics, healthcare, and public policy.",
    role: "Product Designer + Full-Stack Developer",
    timeline: "Ongoing · 2025–2026",
    tools: ["Next.js 16", "TypeScript", "React 19", "Tailwind CSS", "Vercel"],
    status: "Live",
    accent: "#0284C7",
    accentRgb: "2,132,199",
    liveUrl: "https://digilearn.vercel.app",
    challenge: "The tools most people need to thrive in an AI-driven economy are locked behind $500 Udemy courses, confusing YouTube rabbit holes, or platforms that assume you already have a degree. People in emerging markets, career changers, and self-taught builders need a single place that covers everything — and is actually free.",
    approach: [
      { step: "Breadth with real depth", detail: "Built out 12 course categories covering AI tools, web development, data science, databases, cybersecurity, AI ethics, fintech, healthcare technology, and civic/public policy. Every category has 5–10 structured courses, not just titles with no content." },
      { step: "Career-path framing", detail: "Courses are mapped to real outcomes — finance, healthcare, technology, public policy. A student learning SQL knows whether they're heading toward data analysis at a bank or open data work for a government agency." },
      { step: "Free by default, no dark patterns", detail: "The platform is fully free with no paywalls, no forced signups, no countdown timers. The goal is reach first, credibility second. Monetisation through certification and team plans is the long-term direction." },
    ],
    outcome: "Platform live with 100+ courses across 12 categories including tracks for AI Ethics, Databases (SQL through vector DBs), Finance & Fintech, Healthcare IT, and Policy & Civic Tech. All free to access.",
    prev: "electracore",
    next: "traildesk",
  },
  traildesk: {
    title: "TrailDesk",
    tagline: "Offline-first trail journaling, GPS overlays, and emergency check-ins — for people who actually go outside.",
    role: "Product Designer + Developer",
    timeline: "Ongoing · 2026",
    tools: ["Next.js", "TypeScript", "Mapbox GL", "PWA", "Offline Storage", "Vercel"],
    status: "Live",
    accent: "#34D399",
    accentRgb: "52,211,153",
    liveUrl: "https://traildesk.vercel.app",
    challenge: "Every outdoor app is either too lightweight (Instagram) or too data-heavy (Garmin). None of them solve the actual problems: maps that work underground, packing lists that sync across a group, and an emergency contact system that fires if you don't check in at a waypoint. The gap is a serious safety and experience tool, not a fitness tracker.",
    approach: [
      { step: "Offline-first as a non-negotiable", detail: "Download topo maps before you leave. Routes, waypoints, and terrain data cached locally — the app works in a gorge at 2am with zero signal. Built on service workers and local storage, sync only when connected." },
      { step: "Emergency contacts as a core feature, not an afterthought", detail: "Set your planned route and check-in schedule before you leave. If you miss a waypoint check-in, your nominated contact gets an alert with your last known GPS position — not a vague notification, a coordinate." },
      { step: "Trip archive for everything that happens", detail: "Log every trip with notes, photos pinned to GPS coordinates, GPX tracks, and conditions. Your own personal atlas — useful before repeating a route, vital if search and rescue ever needs it." },
    ],
    outcome: "Full-featured outdoor companion live at traildesk.vercel.app. 100% offline-capable with downloaded map regions, smart gear checklists by trip type, GPX import/export (Strava, Garmin, AllTrails), group trip sharing, and an emergency contact system with GPS check-in alerts.",
    prev: "digilearn",
    next: "safesignal",
  },
  safesignal: {
    title: "SafeSignal",
    tagline: "Dead-man check-ins, GPS location, and escalating alerts for lone trade and field workers.",
    role: "Product Designer + Developer",
    timeline: "Ongoing · 2026",
    tools: ["Next.js", "TypeScript", "Twilio SMS", "PostgreSQL", "PWA", "Vercel"],
    status: "Live",
    accent: "#FF6B35",
    accentRgb: "255,107,53",
    liveUrl: "https://safesignal.vercel.app",
    challenge: "Electricians, HVAC engineers, and construction workers routinely work alone in high-risk environments — panel rooms, rooftops, confined spaces, remote sites. The industry standard for lone worker safety is a phone call to the office or a walkie-talkie from 1994. When something goes wrong, nobody knows where the worker is or how long they've been unresponsive. That is not a compliance problem — it is a life safety problem.",
    approach: [
      { step: "Dead-man timer as the core primitive", detail: "Worker opens the app, sets a check-in interval (15, 30, or 60 minutes), and taps Start. Every interval, SafeSignal logs GPS location and marks them safe. If they miss a check-in, the alert chain starts — no manual input needed once the session is running." },
      { step: "Escalating alert chain, not a single ping", detail: "Missed check-in → grace period → SMS to emergency contact → phone call → second contact. Each step waits for a response before escalating. If a contact responds, the chain stops. If nobody responds, the worker's last GPS position is sent to all contacts." },
      { step: "Manager dashboard for teams", detail: "Supervisors see every worker's status in real time — green is checked in, amber is late, red means the alert chain is running. Compliance reports export to PDF, formatted for UK HSE, Australia SafeWork, and Canadian OHS standards." },
    ],
    outcome: "Live at safesignal.vercel.app. Solo ($8/worker/month) and Team ($14/worker/month) plans. Dead-man timer with GPS, escalating SMS + call alerts, manager dashboard, compliance report export. Works offline — timer keeps running and alerts queue to send when connection returns.",
    prev: "traildesk",
    next: "apprentice-log",
  },
  "apprentice-log": {
    title: "ApprenticeLog",
    tagline: "Digital logbook for trade apprentices — hours, skill sign-offs, and compliance reports in one place.",
    role: "Product Designer + Developer",
    timeline: "Ongoing · 2026",
    tools: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "PDF Generation", "Vercel"],
    status: "Live",
    accent: "#00C8FF",
    accentRgb: "0,200,255",
    liveUrl: "https://apprentice-log.vercel.app",
    challenge: "Trade apprentices are still logging hours in paper books that go missing, spreadsheets nobody can find, and PDF templates that don't match what the certificate board actually wants. Supervisors sign off skills in a notebook they've lost three times. Training providers chase apprentices for logbooks the week before assessment. The entire system is broken and it hasn't changed in forty years.",
    approach: [
      { step: "Digital-first logbook with supervisor sign-off", detail: "Apprentices log work hours by task type, trade area, and site. Supervisors get a separate portal — they approve, reject, and annotate sign-offs digitally with timestamps. No paper books. No 'I'll sign it next week.' Everything is time-stamped and permanent." },
      { step: "Compliance export formatted to the authority's actual requirements", detail: "One-click PDF export formatted exactly to the state certificate board layout — no reformatting, no rejected submissions. The report generation engine knows the format difference between NSW Fair Trading, VIC Apprenticeships, and Queensland WHSQ." },
      { step: "TAFE and college cohort view", detail: "Assessors get a read-only view of every apprentice in their cohort. Progress bars, outstanding sign-offs, missed milestones. No chasing. No spreadsheets. Just a dashboard that shows who is on track and who needs intervention." },
    ],
    outcome: "Live at apprentice-log.vercel.app. Hours logging with competency tracking, digital supervisor sign-off with timestamps, milestone notifications (25%/50%/75% of required hours), compliance PDF export per jurisdiction, TAFE cohort dashboard, and multi-site supervisor portal.",
    prev: "safesignal",
    next: "electracore",
  },
};

export function generateStaticParams() {
  return Object.keys(PROJECTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS[slug];
  if (!p) return { title: "Project not found" };
  return { title: p.title, description: p.tagline };
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = PROJECTS[slug];

  if (!p) {
    return (
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--void)", gap: 20 }}>
        <h1 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "5rem", color: "var(--chalk)" }}>Not Found</h1>
        <Link href="/portfolio" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "var(--copper)", letterSpacing: "0.1em" }}>← Back to Work</Link>
      </section>
    );
  }

  const preview = PREVIEWS[slug];

  return (
    <>
      <style>{`
        .cs-approach-item { transition: padding-left 0.3s ease; }
        .cs-approach-item:hover { padding-left: 8px; }
        .cs-back-link { transition: color 180ms, gap 180ms; }
        .cs-back-link:hover { color: var(--chalk) !important; }
        .cs-nav-link { transition: opacity 180ms, transform 180ms; }
        .cs-nav-link:hover { opacity: 1 !important; transform: translateX(4px); }
        .cs-nav-link-prev:hover { transform: translateX(-4px) !important; }
        .tool-tag { transition: background 180ms, border-color 180ms; }
        .tool-tag:hover { background: rgba(${p.accentRgb},0.12) !important; border-color: rgba(${p.accentRgb},0.4) !important; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "72vh", display: "flex", alignItems: "flex-end",
        position: "relative", overflow: "hidden",
        background: `
          radial-gradient(ellipse 60% 55% at 80% 0%,   rgba(${p.accentRgb},0.12) 0%, transparent 60%),
          radial-gradient(ellipse 50% 45% at 5%  75%,  rgba(${p.accentRgb},0.07) 0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 50% 100%, rgba(0,0,0,0.3) 0%, transparent 50%),
          linear-gradient(165deg, #030215 0%, #04010F 50%, #020108 100%)
        `,
        padding: "clamp(7rem,13vw,10rem) clamp(1.25rem,5vw,3rem) clamp(4rem,7vw,6rem)",
      }}>
        {/* Dot grid */}
        <div aria-hidden="true" style={{ position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:"radial-gradient(rgba(255,255,255,0.04) 1px,transparent 1px)",
          backgroundSize:"36px 36px",
          maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)" }} />
        {/* Bottom fade */}
        <div aria-hidden="true" style={{ position:"absolute",bottom:0,left:0,right:0,height:"40%",
          background:"linear-gradient(to top,rgba(3,2,21,0.96) 0%,transparent 100%)", pointerEvents:"none" }} />
        {/* Accent line */}
        <div aria-hidden="true" style={{ position:"absolute",top:0,left:"5%",right:"5%",height:1,
          background:`linear-gradient(to right,transparent,rgba(${p.accentRgb},0.3) 40%,rgba(${p.accentRgb},0.55) 50%,rgba(${p.accentRgb},0.3) 60%,transparent)` }} />

        <div style={{ maxWidth:1280, margin:"0 auto", width:"100%", position:"relative", zIndex:1 }}>
          {/* Back */}
          <Link href="/portfolio" className="cs-back-link" style={{
            display:"inline-flex", alignItems:"center", gap:8, marginBottom:32,
            fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.14em",
            color:"rgba(255,255,255,0.35)", textDecoration:"none",
          }}>
            ← BACK TO WORK
          </Link>

          {/* Eyebrow */}
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.22em",
            color:p.accent, marginBottom:20, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ display:"inline-block", width:28, height:1,
              background:`linear-gradient(to right,${p.accent},transparent)` }} />
            CASE STUDY · {p.status.toUpperCase()}
          </div>

          {/* Title */}
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(3.5rem,12vw,10rem)", lineHeight:0.86,
            letterSpacing:"0.01em", color:"#F2F4FC", marginBottom:16 }}>
            {p.title}
          </h1>

          {/* Tagline */}
          <p style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
            fontSize:"clamp(1rem,2.2vw,1.35rem)", color:"rgba(255,255,255,0.55)",
            maxWidth:540, lineHeight:1.55, marginBottom: p.liveUrl ? 24 : 40 }}>
            {p.tagline}
          </p>

          {/* Live link */}
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener" style={{
              display:"inline-flex", alignItems:"center", gap:8, marginBottom:24,
              fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.12em",
              color:p.accent, textDecoration:"none",
              border:`1px solid rgba(${p.accentRgb},0.4)`, borderRadius:100,
              padding:"6px 16px", background:`rgba(${p.accentRgb},0.08)`,
              transition:"background 0.2s",
            }}>
              ↗ VIEW LIVE APP
            </a>
          )}

          {/* Meta bar */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:"clamp(1.5rem,3vw,3rem)",
            padding:"clamp(1.25rem,2.5vw,1.75rem) clamp(1.5rem,3vw,2rem)",
            background:"rgba(255,255,255,0.025)", border:"1px solid rgba(255,255,255,0.07)",
            borderRadius:16, backdropFilter:"blur(16px)" }}>
            {[
              { label: "Role",     value: p.role     },
              { label: "Timeline", value: p.timeline },
              { label: "Status",   value: p.status   },
            ].map((m) => (
              <div key={m.label}>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                  letterSpacing:"0.18em", color:"rgba(255,255,255,0.25)",
                  textTransform:"uppercase", marginBottom:6 }}>{m.label}</p>
                <p style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(0.7rem,1.2vw,0.8125rem)",
                  color:"rgba(255,255,255,0.7)", fontWeight:500, letterSpacing:"0.04em" }}>{m.value}</p>
              </div>
            ))}
            <div>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                letterSpacing:"0.18em", color:"rgba(255,255,255,0.25)",
                textTransform:"uppercase", marginBottom:8 }}>Tools</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {p.tools.map((t) => (
                  <span key={t} className="tool-tag" style={{
                    fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                    letterSpacing:"0.07em", padding:"3px 10px", borderRadius:100,
                    background:`rgba(${p.accentRgb},0.07)`, color:p.accent,
                    border:`1px solid rgba(${p.accentRgb},0.22)`,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────── */}
      <article style={{
        background:`
          radial-gradient(ellipse 55% 45% at 90% 0%, rgba(${p.accentRgb},0.05) 0%,transparent 55%),
          radial-gradient(ellipse 40% 35% at 5% 60%, rgba(${p.accentRgb},0.03) 0%,transparent 50%),
          #04050E
        `,
        padding:"clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem)",
        position:"relative",
      }}>
        <div style={{ maxWidth:860, margin:"0 auto" }}>

          {/* Challenge */}
          <section style={{ marginBottom:"clamp(3rem,7vw,6rem)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
              <span style={{ display:"inline-block", width:1.5, height:28, background:p.accent, borderRadius:1 }} />
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
                letterSpacing:"0.22em", color:p.accent, textTransform:"uppercase" }}>
                The Challenge
              </span>
            </div>
            <p style={{ fontFamily:"'Playfair Display',serif",
              fontSize:"clamp(1.05rem,2vw,1.25rem)", lineHeight:1.85,
              color:"rgba(255,255,255,0.65)", maxWidth:"70ch" }}>
              {p.challenge}
            </p>
          </section>

          {/* Divider */}
          <div style={{ height:1, marginBottom:"clamp(3rem,7vw,6rem)",
            background:`linear-gradient(to right,transparent,rgba(${p.accentRgb},0.18) 40%,rgba(${p.accentRgb},0.32) 50%,rgba(${p.accentRgb},0.18) 60%,transparent)` }} />

          {/* Project preview — SVG mockup or fallback */}
          <section style={{ marginBottom:"clamp(3rem,7vw,6rem)" }}>
            <div style={{
              position:"relative",
              height:"clamp(280px,42vw,480px)",
              borderRadius:20, overflow:"hidden",
              border:`1px solid rgba(${p.accentRgb},0.18)`,
              background:"#08080F",
              boxShadow:`0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(${p.accentRgb},0.08)`,
            }}>
              {preview ? (
                <div style={{ position:"absolute", inset:0 }}>{preview}</div>
              ) : (
                <>
                  <div aria-hidden="true" style={{ position:"absolute", inset:0,
                    background:`linear-gradient(135deg,rgba(${p.accentRgb},0.15) 0%,transparent 55%)` }} />
                  <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"6rem",
                      color:`rgba(${p.accentRgb},0.12)`, letterSpacing:"0.05em" }}>{p.title}</span>
                  </div>
                </>
              )}
              <div aria-hidden="true" style={{ position:"absolute", bottom:0, left:0, right:0, height:"30%",
                background:"linear-gradient(to top,rgba(3,2,21,0.55) 0%,transparent 100%)", pointerEvents:"none" }} />
            </div>
          </section>

          {/* Approach */}
          <section style={{ marginBottom:"clamp(3rem,7vw,6rem)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:32 }}>
              <span style={{ display:"inline-block", width:1.5, height:28, background:p.accent, borderRadius:1 }} />
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10,
                letterSpacing:"0.22em", color:p.accent, textTransform:"uppercase" }}>
                My Approach
              </span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {p.approach.map((a, i) => (
                <div key={a.step} className="cs-approach-item" style={{
                  display:"grid", gridTemplateColumns:"28px 1fr",
                  gap:"0 clamp(1.25rem,3vw,2rem)",
                  padding:"clamp(1.25rem,2.5vw,1.75rem) 0",
                  borderBottom:"1px solid rgba(255,255,255,0.05)",
                }}>
                  <div style={{ paddingTop:4 }}>
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif",
                      fontSize:"clamp(1.5rem,2.5vw,2rem)", lineHeight:1,
                      color:`rgba(${p.accentRgb},0.25)` }}>
                      0{i+1}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily:"'Orbitron',sans-serif",
                      fontSize:"clamp(0.7rem,1.2vw,0.8125rem)", fontWeight:500,
                      letterSpacing:"0.08em", color:"rgba(255,255,255,0.6)",
                      marginBottom:10 }}>{a.step}</h3>
                    <p style={{ fontSize:"clamp(0.875rem,1.4vw,0.9375rem)", lineHeight:1.85,
                      color:"rgba(255,255,255,0.4)" }}>{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Outcome */}
          <section style={{
            padding:"clamp(1.75rem,4vw,2.5rem) clamp(1.75rem,4vw,2.5rem)",
            background:`rgba(${p.accentRgb},0.04)`,
            border:`1px solid rgba(${p.accentRgb},0.16)`,
            borderRadius:16,
            borderLeft:`3px solid ${p.accent}`,
          }}>
            <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
              letterSpacing:"0.22em", color:p.accent, textTransform:"uppercase",
              marginBottom:16 }}>The Outcome</p>
            <blockquote style={{ fontFamily:"'Playfair Display',serif", fontStyle:"italic",
              fontSize:"clamp(1rem,2vw,1.2rem)", color:"rgba(255,255,255,0.7)",
              lineHeight:1.7, margin:0 }}>
              {p.outcome}
            </blockquote>
          </section>
        </div>
      </article>

      {/* ── Prev / Next ───────────────────────────────────────────── */}
      <nav style={{
        background:"#02010A",
        borderTop:"1px solid rgba(255,255,255,0.05)",
        padding:"clamp(2.5rem,5vw,4rem) clamp(1.25rem,5vw,3rem)",
      }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"flex",
          justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>

          {p.prev ? (
            <Link href={`/portfolio/${p.prev}`} className="cs-nav-link cs-nav-link-prev" style={{
              display:"flex", flexDirection:"column", gap:6, textDecoration:"none",
              opacity:0.5,
            }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                letterSpacing:"0.18em", color:"rgba(255,255,255,0.4)" }}>← PREVIOUS</span>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.25rem,2.5vw,1.75rem)",
                color:"var(--chalk)" }}>
                {PROJECTS[p.prev]?.title ?? "Previous"}
              </span>
            </Link>
          ) : <div />}

          <Link href="/portfolio" className="cs-all-work" style={{ fontFamily:"'JetBrains Mono',monospace",
            fontSize:10, letterSpacing:"0.18em", color:"rgba(255,255,255,0.3)",
            textDecoration:"none" }}>
            ALL WORK
          </Link>
          <style>{`.cs-all-work:hover{color:var(--copper)!important;}`}</style>

          {p.next ? (
            <Link href={`/portfolio/${p.next}`} className="cs-nav-link" style={{
              display:"flex", flexDirection:"column", gap:6, textDecoration:"none",
              opacity:0.5, alignItems:"flex-end",
            }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9,
                letterSpacing:"0.18em", color:"rgba(255,255,255,0.4)" }}>NEXT →</span>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.25rem,2.5vw,1.75rem)",
                color:"var(--chalk)" }}>
                {PROJECTS[p.next]?.title ?? "Next"}
              </span>
            </Link>
          ) : <div />}
        </div>
      </nav>
    </>
  );
}
