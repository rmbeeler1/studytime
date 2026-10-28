{
 forces(o){ const on=t=>o.hl===t||o.quiz===t;
  return svgWrap(`<ellipse cx="300" cy="170" rx="112" ry="26" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <path d="M270 172 L340 172 L330 196 L262 196Z" style="fill:var(--surface);stroke:var(--ink)" stroke-width="2"/>
   <path d="M378 158 L398 118 L414 118 L402 160Z" style="fill:var(--surface);stroke:var(--ink)" stroke-width="2"/>
   ${ln(186,140,186,200,INK,4)}
   ${arr(300,140,300,52,on("Lift"))}${arr(300,200,300,290,on("Weight"))}${arr(184,170,72,170,on("Thrust"))}${arr(414,170,528,170,on("Drag"))}
   ${label(300,30,"Lift",o)}${label(300,318,"Weight",o)}${label(112,140,"Thrust",o)}${label(490,140,"Drag",o)}`); },
 airfoil(o){ const h=t=>o.hl===t||o.quiz===t;
  return svgWrap(`<path d="${P.aoa}" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   ${ln(200,150,493.4,212.4,h("chord line")?ACC:INK,h("chord line")?3.5:2,'stroke-dasharray="8 6"')}
   ${ln(53.3,118.8,200,150,MUT,1.5)}
   ${arr(30,150,182,150,h("relative wind"))}
   <path d="M100 150 A100 100 0 0 1 102.2 129.2" style="fill:none;stroke:${h("angle of attack")?ACC:INK}" stroke-width="${h("angle of attack")?4:2.5}"/>
   ${ln(150,82,102,132,INK,1.2)}${ln(360,108,350,180,INK,1.2)}${ln(205,262,200,156,INK,1.2)}${ln(512,268,494,216,INK,1.2)}
   ${label(150,70,"angle of attack",o)}${label(95,180,"relative wind",o)}${label(370,96,"chord line",o)}
   ${label(205,282,"leading edge",o)}${label(512,288,"trailing edge",o)}`); },
 parts(o){ const f=t=>(o.hl===t||o.quiz===t)?"fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)":"fill:var(--soft);stroke:var(--ink)";
  return svgWrap(`<path d="M220 30 L268 30 L272 310 L220 310Z" style="${f("Wing")}" stroke-width="2"/>
   <path d="M112 154 L112 186 L482 176 L482 164Z" style="${f("Fuselage")}" stroke-width="2"/>
   <path d="M440 112 L468 112 L474 228 L440 228Z" style="${f("Horizontal stabilizer")}" stroke-width="2"/>
   <path d="M100 126 L106 126 L106 214 L100 214Z" style="${f("Propeller")}" stroke-width="2"/>
   ${ln(103,124,110,72,INK,1.2)}${ln(268,50,330,50,INK,1.2)}${ln(360,166,360,122,INK,1.2)}${ln(457,229,457,272,INK,1.2)}
   ${label(110,58,"Propeller",o)}${label(386,50,"Wing",o)}${label(360,104,"Fuselage",o)}${label(430,300,"Horizontal stabilizer",o)}`); },
 camber(){ return svgWrap(`<path d="${P.up}" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/><path d="${P.upc}" style="fill:none;stroke:var(--c)" stroke-width="2.5" stroke-dasharray="6 5"/>
   <path d="${P.down}" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/><path d="${P.downc}" style="fill:none;stroke:var(--c)" stroke-width="2.5" stroke-dasharray="6 5"/>
   <text x="155" y="70" text-anchor="middle" font-size="29" style="fill:var(--ink)">Flaps up</text>
   <text x="445" y="70" text-anchor="middle" font-size="29" style="fill:var(--ink)">Flaps down</text>
   <text x="300" y="270" text-anchor="middle" font-size="26" style="fill:var(--c)">dashed line = camber line</text>
   <text x="445" y="230" text-anchor="middle" font-size="26" style="fill:var(--muted)">more curve, more lift</text>`,290); },
 liftcurve(){ return svgWrap(`${ln(70,290,560,290)}${ln(70,290,70,30)}
   <path d="M70 270 L410 80 Q440 60 462 78 Q478 92 500 150" style="fill:none;stroke:var(--c)" stroke-width="4"/>
   <circle cx="440" cy="68" r="7" style="fill:var(--c)"/>
   ${ln(440,75,440,290,MUT,1.5,'stroke-dasharray="5 5"')}
   <text x="440" y="46" text-anchor="middle" font-size="28" style="fill:var(--ink)">critical AOA</text>
   <text x="512" y="176" text-anchor="middle" font-size="28" style="fill:var(--c)">stall</text>
   <text x="315" y="322" text-anchor="middle" font-size="26" style="fill:var(--muted)">angle of attack</text>
   <text x="40" y="160" text-anchor="middle" font-size="26" style="fill:var(--muted)" transform="rotate(-90 40 160)">lift</text>`); },
 curve(o){ const k=o.hl==="drag"?"parasite drag":"lift"; let d="M80 290";
  for(let v=0;v<=1.0001;v+=.05){ d+=` L${80+v*440} ${290-v*v*240}`; }
  return svgWrap(`${ln(80,290,560,290)}${ln(80,290,80,30)}<path d="${d}" style="fill:none;stroke:var(--c)" stroke-width="4"/>
   <circle cx="300" cy="230" r="7" style="fill:var(--ink)"/><circle cx="520" cy="50" r="7" style="fill:var(--c)"/>
   ${ln(300,230,300,290,MUT,1.5,'stroke-dasharray="5 5"')}${ln(520,50,520,290,MUT,1.5,'stroke-dasharray="5 5"')}
   <text x="300" y="214" text-anchor="middle" font-size="28" style="fill:var(--ink)">1×</text>
   <text x="490" y="56" text-anchor="end" font-size="28" style="fill:var(--c)">4×</text>
   <text x="300" y="316" text-anchor="middle" font-size="26" style="fill:var(--muted)">${o.hl==="drag"?"80 kt":"speed"}</text>
   <text x="520" y="316" text-anchor="middle" font-size="26" style="fill:var(--muted)">${o.hl==="drag"?"160 kt":"2× speed"}</text>
   <text x="48" y="160" text-anchor="middle" font-size="26" style="fill:var(--muted)" transform="rotate(-90 48 160)">${k}</text>`); },
 lever(o){ const X=i=>60+i*3, solved=o.hl==="solved";
  const w=(i,r,t,n)=>`${ln(60,48+n*26,X(i),48+n*26,MUT,8,'stroke-linecap="round" opacity=".35"')}<text x="${X(i)+8}" y="${54+n*26}" font-size="25" style="fill:var(--ink)">+${i}</text>
   <circle cx="${X(i)}" cy="${196-r}" r="${r}" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/><text x="${X(i)}" y="${202-r}" text-anchor="middle" font-size="26" style="fill:var(--ink)">${t}</text>`;
  return svgWrap(`${ln(60,30,60,320,INK,2)}<text x="66" y="318" font-size="25" style="fill:var(--muted)">datum</text>
   ${w(50,24,"100",0)}${w(90,24,"100",1)}${w(150,32,"200",2)}
   <rect x="64" y="196" width="490" height="9" rx="4" style="fill:var(--ink)"/>
   <path d="M390 205 L372 240 L408 240Z" style="fill:var(--c)"/>
   <text x="390" y="264" text-anchor="middle" font-size="28" style="fill:var(--c)">CG</text>
   ${ln(60,286,384,286,ACC,3,'marker-end="MK_A"')}
   <text x="225" y="278" text-anchor="middle" font-size="28" style="fill:var(--c)">${solved?"+110 in":"? in"}</text>`); },
 cg(o){ const pos=o.hl==="fwd"?170:o.hl==="aft"?400:258, bad=o.hl==="fwd"||o.hl==="aft";
  return svgWrap(`<path d="M90 170 Q110 140 200 140 L470 150 L540 120 L555 120 L545 170 L470 175 Q300 196 140 192 Q95 190 90 170Z" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <rect x="220" y="236" width="110" height="10" rx="5" style="fill:color-mix(in srgb,var(--c) 30%,transparent)"/>
   <text x="275" y="272" text-anchor="middle" font-size="25" style="fill:var(--muted)">CG range</text>
   <circle cx="${pos}" cy="168" r="15" style="fill:${bad?"var(--c)":"var(--ink)"}"/><text x="${pos}" y="174" text-anchor="middle" font-size="22" style="fill:var(--surface)">CG</text>
   <circle cx="300" cy="168" r="15" style="fill:none;stroke:var(--ink)" stroke-width="2.5"/><text x="300" y="174" text-anchor="middle" font-size="22" style="fill:var(--ink)">CL</text>
   ${arr(300,150,300,62,false)}<text x="300" y="50" text-anchor="middle" font-size="26" style="fill:var(--ink)">lift</text>
   ${ln(pos,186,pos,236,MUT,1.5,'stroke-dasharray="4 4"')}
   ${o.hl==="fwd"?`${arr(530,112,530,62,true)}<text x="300" y="322" text-anchor="middle" font-size="25" style="fill:var(--c)">not enough nose-up force to flare</text>`:""}
   ${o.hl==="aft"?`${arr(530,180,530,240,true)}<text x="300" y="322" text-anchor="middle" font-size="25" style="fill:var(--c)">not enough nose-down force to recover</text>`:""}
   ${!bad?`<text x="300" y="322" text-anchor="middle" font-size="25" style="fill:var(--muted)">CL sits slightly aft of CG</text>`:""}`); },
 torque(){ return svgWrap(`${ln(80,190,520,190,INK,5,'stroke-linecap="round"')}
   <circle cx="300" cy="190" r="34" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   ${ln(300,110,300,270,INK,4)}
   <path d="M240 120 A90 90 0 0 1 368 128" style="fill:none;stroke:var(--ink)" stroke-width="3.5" marker-end="MK_I"/>
   <text x="300" y="86" text-anchor="middle" font-size="28" style="fill:var(--ink)">propeller turns clockwise (action)</text>
   <path d="M470 236 A190 190 0 0 1 130 236" style="fill:none;stroke:var(--c)" stroke-width="4" marker-end="MK_A"/>
   <text x="300" y="320" text-anchor="middle" font-size="28" style="fill:var(--c)">airplane rolls left (reaction)</text>`); },
 ground(){ const v=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" style="fill:none;stroke:var(--c)" stroke-width="2.5" stroke-dasharray="6 4"/>`;
  return svgWrap(`${ln(40,86,260,86,INK,4)}${v(40,94,26)}${v(260,94,26)}<text x="150" y="40" text-anchor="middle" font-size="26" style="fill:var(--ink)">high above ground</text>
   ${ln(340,252,560,252,INK,4)}${v(340,258,12)}${v(560,258,12)}<text x="450" y="200" text-anchor="middle" font-size="26" style="fill:var(--ink)">within half a wingspan</text>
   ${ln(20,282,580,282,INK,3)}<text x="300" y="320" text-anchor="middle" font-size="25" style="fill:var(--c)">smaller vortices, less induced drag</text>`); },
 washout(){ return svgWrap(`<path d="M60 40 L540 80 L540 130 L60 170Z" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <text x="70" y="30" font-size="25" style="fill:var(--ink)">wing root</text><text x="536" y="70" text-anchor="end" font-size="25" style="fill:var(--ink)">wing tip</text>
   <path d="${P.root}" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)" stroke-width="2"/>
   <path d="${P.tip}" style="fill:var(--surface);stroke:var(--ink)" stroke-width="2"/>
   <text x="130" y="306" text-anchor="middle" font-size="24" style="fill:var(--c)">higher AOA</text><text x="130" y="332" text-anchor="middle" font-size="24" style="fill:var(--c)">stalls first</text>
   <text x="465" y="306" text-anchor="middle" font-size="24" style="fill:var(--muted)">lower AOA</text><text x="465" y="332" text-anchor="middle" font-size="24" style="fill:var(--muted)">ailerons still work</text>`); },
 vector(){ return svgWrap(`${ln(110,230,470,110,ACC,5,'marker-end="MK_A"')}
   ${ln(100,262,456,143,MUT,1.5)}<text x="250" y="240" font-size="28" style="fill:var(--ink)" transform="rotate(-18 250 240)">length = magnitude</text>
   <text x="560" y="70" text-anchor="end" font-size="28" style="fill:var(--ink)">arrowhead = direction</text>`,300); },
}
