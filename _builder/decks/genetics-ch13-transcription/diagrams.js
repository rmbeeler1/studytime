{
 nucleotide(o){ const f=t=>(o.hl===t||o.quiz===t)?"fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)":"fill:var(--soft);stroke:var(--ink)";
  return svgWrap(`${ln(205,170,250,170)}${ln(250,170,262,196)}${ln(352,196,420,128)}
   <circle cx="150" cy="170" r="55" style="${f("Phosphate")}" stroke-width="2.5"/>
   <path d="M307 150 L360 190 L340 252 L274 252 L254 190Z" style="${f("Sugar")}" stroke-width="2.5"/>
   <rect x="400" y="60" width="140" height="70" rx="4" style="${f("Base")}" stroke-width="2.5"/>
   ${label(150,268,"Phosphate",o)}${label(307,296,"Sugar",o)}${label(470,165,"Base",o)}`); },
 sugar(){ const pent=(x,lab,two)=>`<path d="M${x} 80 L${x+75} 135 L${x+48} 222 L${x-48} 222 L${x-75} 135Z" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2.5"/>
   <text x="${x}" y="75" text-anchor="middle" font-size="24" style="fill:var(--ink)">O</text>
   <text x="${x+40}" y="250" text-anchor="middle" font-size="22" style="fill:var(--muted)">2′</text>
   <rect x="${x+16}" y="258" width="70" height="40" rx="8" style="fill:color-mix(in srgb,var(--c) ${two==="OH"?35:12}%,var(--surface));stroke:var(--c)" stroke-width="2"/>
   <text x="${x+51}" y="287" text-anchor="middle" font-size="26" style="fill:var(--ink)">${two}</text>
   <text x="${x}" y="40" text-anchor="middle" font-size="28" style="fill:var(--ink)">${lab}</text>`;
  return svgWrap(pent(160,"Ribose (RNA)","OH")+pent(440,"Deoxyribose (DNA)","H")+`<text x="300" y="330" text-anchor="middle" font-size="22" style="fill:var(--c)">the 2′ OH makes RNA more reactive</text>`); },
 bases(o){ const hx=(cx,cy,r)=>{let p=[];for(let i=0;i<6;i++){const a=Math.PI/180*(60*i+30);p.push((cx+r*Math.cos(a)).toFixed(1)+" "+(cy+r*Math.sin(a)).toFixed(1));}return "M"+p.join(" L")+"Z";};
  const pu=(cx,l)=>{const on=o.hl==="purine"||o.hl===l, st=on?"fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)":"fill:var(--soft);stroke:var(--ink)";
    return `<path d="${hx(cx,170,34)}" style="${st}" stroke-width="2.5"/><path d="M${cx+29} 153 L${cx+70} 140 L${cx+86} 170 L${cx+70} 200 L${cx+29} 187Z" style="${st}" stroke-width="2.5"/><text x="${cx+20}" y="248" text-anchor="middle" font-size="30" style="fill:var(--ink)">${l}</text>`;};
  const py=(cx,l,n)=>{const on=o.hl==="pyrimidine"||o.hl===l, st=on?"fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)":"fill:var(--soft);stroke:var(--ink)";
    return `<path d="${hx(cx,170,34)}" style="${st}" stroke-width="2.5"/><text x="${cx}" y="248" text-anchor="middle" font-size="30" style="fill:var(--ink)">${l}</text><text x="${cx}" y="280" text-anchor="middle" font-size="18" style="fill:var(--muted)">${n}</text>`;};
  return svgWrap(`<text x="130" y="70" text-anchor="middle" font-size="26" style="fill:var(--ink)">Purines: 2 rings</text>
   <text x="430" y="70" text-anchor="middle" font-size="26" style="fill:var(--ink)">Pyrimidines: 1 ring</text>
   ${pu(50,"A")}${pu(170,"G")}${py(340,"C","both")}${py(430,"T","DNA only")}${py(520,"U","RNA only")}
   <text x="300" y="325" text-anchor="middle" font-size="22" style="fill:var(--muted)">A, G and C are shared by DNA and RNA</text>`); },
 flow(){ const box=(y,t,on)=>`<rect x="230" y="${y}" width="140" height="48" rx="8" style="fill:${on?"var(--c)":"var(--soft)"};stroke:var(--ink)" stroke-width="2"/><text x="300" y="${y+33}" text-anchor="middle" font-size="26" style="fill:${on?"var(--surface)":"var(--ink)"}">${t}</text>`;
  return svgWrap(`${box(20,"DNA",false)}${box(146,"RNA",true)}${box(272,"Protein",false)}
   ${arr(300,70,300,140,true)}${arr(300,196,300,266,false)}
   <text x="320" y="112" font-size="24" style="fill:var(--c)">transcription</text><text x="320" y="238" font-size="24" style="fill:var(--ink)">translation</text>
   <path d="M228 56 C150 70 150 0 228 30" style="fill:none;stroke:var(--muted)" stroke-width="2.5" marker-end="MK_I"/>
   <text x="160" y="110" text-anchor="end" font-size="22" style="fill:var(--muted)">replication</text>`); },
 template(o){ const h=t=>o.hl===t;
  return svgWrap(`${ln(60,90,540,90,INK,6)}${ln(60,220,540,220,INK,6)}
   <text x="40" y="98" text-anchor="end" font-size="24" style="fill:var(--ink)">5′</text><text x="560" y="98" font-size="24" style="fill:var(--ink)">3′</text>
   <text x="40" y="228" text-anchor="end" font-size="24" style="fill:var(--ink)">3′</text><text x="560" y="228" font-size="24" style="fill:var(--ink)">5′</text>
   <text x="300" y="60" text-anchor="middle" font-size="${h("nontemplate")?28:24}" style="fill:${h("nontemplate")?ACC:INK}">nontemplate strand (same sequence as RNA)</text>
   <text x="300" y="268" text-anchor="middle" font-size="${h("template")?28:24}" style="fill:${h("template")?ACC:INK}">template strand (read 3′ to 5′)</text>
   ${ln(100,170,470,170,ACC,6,'marker-end="MK_A"')}
   <text x="82" y="178" text-anchor="end" font-size="24" style="fill:var(--c)">5′</text><text x="492" y="178" font-size="24" style="fill:var(--c)">3′</text>
   <text x="300" y="150" text-anchor="middle" font-size="22" style="fill:var(--c)">RNA grows 5′ to 3′, antiparallel to template</text>
   <text x="300" y="320" text-anchor="middle" font-size="21" style="fill:var(--muted)">new nucleotides always join the 3′ end</text>`); },
 gene(o){ const f=t=>(o.hl===t||o.quiz===t)?"fill:var(--c)":"fill:var(--soft)";
  return svgWrap(`<text x="300" y="40" text-anchor="middle" font-size="22" style="fill:var(--muted)">upstream ← → downstream</text>
   <rect x="40" y="140" width="140" height="34" style="${f("Promoter")};stroke:var(--ink)" stroke-width="2"/>
   <rect x="180" y="140" width="250" height="34" style="${f("RNA-coding region")};stroke:var(--ink)" stroke-width="2"/>
   <rect x="430" y="140" width="80" height="34" style="${f("Terminator")};stroke:var(--ink)" stroke-width="2"/>
   ${ln(510,157,570,157,INK,2)}${ln(20,157,40,157,INK,2)}
   ${ln(180,174,180,200,INK,2.5)}${ln(180,200,214,200,INK,2.5,'marker-end="MK_I"')}
   <text x="180" y="230" text-anchor="middle" font-size="20" style="fill:var(--muted)">start site</text>
   ${label(95,110,"Promoter",o)}${label(330,110,"RNA-coding region",o)}${label(470,232,"Terminator",o)}
   <rect x="180" y="276" width="330" height="18" rx="4" style="fill:color-mix(in srgb,var(--c) 40%,var(--surface))"/>
   <text x="170" y="292" text-anchor="end" font-size="20" style="fill:var(--ink)">RNA 5′</text><text x="518" y="292" font-size="20" style="fill:var(--ink)">3′</text>`); },
 bprom(o){ const f=t=>(o.quiz===t)?"fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)":"fill:var(--soft);stroke:var(--ink)";
  return svgWrap(`<text x="245" y="44" text-anchor="middle" font-size="22" style="fill:var(--muted)">promoter</text>${ln(40,58,450,58,MUT,2)}
   ${ln(20,150,580,150,INK,3)}
   <rect x="100" y="130" width="120" height="40" rx="4" style="${f("TTGACA")}" stroke-width="2"/>
   <rect x="280" y="130" width="120" height="40" rx="4" style="${f("TATAAT")}" stroke-width="2"/>
   ${label(160,104,"TTGACA",o)}${label(340,104,"TATAAT",o)}
   <text x="160" y="210" text-anchor="middle" font-size="28" style="fill:var(--ink)">−35</text>
   <text x="340" y="210" text-anchor="middle" font-size="28" style="fill:var(--ink)">−10</text>
   ${ln(470,150,470,240,INK,2.5)}${ln(470,240,520,240,INK,2.5,'marker-end="MK_I"')}
   <text x="470" y="275" text-anchor="middle" font-size="26" style="fill:var(--ink)">+1 start</text>
   <text x="300" y="322" text-anchor="middle" font-size="21" style="fill:var(--muted)">sigma lets the holoenzyme recognize these</text>`); },
 eprom(o){ const f=t=>(o.hl===t||o.quiz===t)?"fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)":"fill:var(--soft);stroke:var(--ink)";
  const el=(x,t,pos)=>`<rect x="${x-48}" y="140" width="96" height="40" rx="4" style="${f(t)}" stroke-width="2"/><text x="${x}" y="222" text-anchor="middle" font-size="26" style="fill:var(--ink)">${pos}</text>`;
  return svgWrap(`${ln(10,160,590,160,INK,3)}${el(75,"BRE","−35")}${el(215,"TATA box","−25")}${el(375,"Initiator","+1")}${el(525,"DPE","+30")}
   ${label(75,110,"BRE",o)}${label(215,110,"TATA box",o)}${label(375,110,"Initiator",o)}${label(525,110,"DPE",o)}
   <text x="300" y="275" text-anchor="middle" font-size="22" style="fill:var(--muted)">core promoter: binding sites for general TFs</text>
   <text x="300" y="315" text-anchor="middle" font-size="22" style="fill:var(--c)">TFIID (via TBP) binds the TATA box first</text>`); },
 polymerase(o){ const sub=(x,y,r,t,on)=>`<circle cx="${x}" cy="${y}" r="${r}" style="fill:${on?"color-mix(in srgb,var(--c) 30%,var(--surface))":"var(--soft)"};stroke:${on?"var(--c)":"var(--ink)"}" stroke-width="2"/><text x="${x}" y="${y+9}" text-anchor="middle" font-size="26" style="fill:var(--ink)">${t}</text>`;
  const core=(cx,on)=>sub(cx-48,165,36,"β′",on)+sub(cx+48,165,36,"β",on)+sub(cx,118,32,"α",on)+sub(cx,212,32,"α",on)+sub(cx,165,22,"ω",on);
  const holo=o.hl==="holo", sig=o.hl==="sigma";
  return svgWrap(`${core(120,false)}<text x="120" y="290" text-anchor="middle" font-size="24" style="fill:var(--ink)">core enzyme</text>
   ${sub(300,90,30,"σ",sig)}<text x="300" y="50" text-anchor="middle" font-size="22" style="fill:${sig?ACC:INK}">sigma factor</text>
   ${arr(240,165,340,165,false)}
   ${core(440,holo)}${sub(510,165,30,"σ",holo||sig)}<text x="460" y="290" text-anchor="middle" font-size="24" style="fill:${holo?ACC:INK}">holoenzyme</text>
   <text x="300" y="330" text-anchor="middle" font-size="21" style="fill:var(--muted)">core makes RNA; sigma finds the promoter</text>`); },
 rho(){ return svgWrap(`${ln(20,80,580,80,INK,3)}${ln(20,104,580,104,INK,3)}
   <ellipse cx="450" cy="100" rx="100" ry="44" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <text x="450" y="40" text-anchor="middle" font-size="22" style="fill:var(--ink)">RNA polymerase (paused)</text>
   <path d="M60 300 Q250 260 470 106" style="fill:none;stroke:var(--c)" stroke-width="6"/>
   <text x="40" y="308" text-anchor="end" font-size="22" style="fill:var(--c)">5′</text><text x="480" y="136" font-size="22" style="fill:var(--c)">3′</text>
   <rect x="120" y="262" width="80" height="20" rx="6" style="fill:none;stroke:var(--muted)" stroke-width="2" stroke-dasharray="5 4"/>
   <text x="160" y="320" text-anchor="middle" font-size="22" style="fill:var(--muted)">rut site</text>
   <circle cx="300" cy="230" r="26" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)" stroke-width="2.5"/>
   <text x="300" y="238" text-anchor="middle" font-size="22" style="fill:var(--ink)">rho</text>
   ${arr(330,212,390,172,true)}<text x="590" y="250" text-anchor="end" font-size="21" style="fill:var(--c)">moves 5′ to 3′; its helicase</text><text x="590" y="276" text-anchor="end" font-size="21" style="fill:var(--c)">releases the RNA</text>`); },
 hairpin(){ let pairs=""; for(let i=0;i<4;i++){ pairs+=ln(270,200-i*28,330,200-i*28,MUT,2); }
  return svgWrap(`<path d="M60 230 L270 230 L270 110 A30 30 0 1 1 330 110 L330 230 L430 230" style="fill:none;stroke:var(--c)" stroke-width="6"/>${pairs}
   <text x="40" y="238" text-anchor="end" font-size="22" style="fill:var(--c)">5′</text>
   <text x="438" y="238" font-size="24" style="fill:var(--ink)">UUUUUU 3′</text>
   <text x="160" y="140" text-anchor="middle" font-size="24" style="fill:var(--ink)">hairpin from</text><text x="160" y="168" text-anchor="middle" font-size="24" style="fill:var(--ink)">inverted repeats</text>
   <text x="300" y="290" text-anchor="middle" font-size="22" style="fill:var(--muted)">intramolecular base pairing makes the stem</text>
   <text x="300" y="322" text-anchor="middle" font-size="22" style="fill:var(--c)">weak U-A pairs let the RNA fall off</text>`); },
 rat1(){ return svgWrap(`${ln(20,80,580,80,INK,3)}${ln(20,104,580,104,INK,3)}
   <ellipse cx="470" cy="94" rx="80" ry="38" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/><text x="470" y="40" text-anchor="middle" font-size="22" style="fill:var(--ink)">RNA Pol II keeps going</text>
   ${ln(40,280,200,280,ACC,6)}<text x="30" y="288" text-anchor="end" font-size="20" style="fill:var(--c)">5′</text><text x="208" y="288" font-size="20" style="fill:var(--c)">3′</text>
   <text x="120" y="320" text-anchor="middle" font-size="21" style="fill:var(--muted)">released pre-mRNA</text>
   <path d="M250 240 Q360 200 470 112" style="fill:none;stroke:var(--c)" stroke-width="6" stroke-dasharray="2 0"/>
   <text x="232" y="230" text-anchor="end" font-size="20" style="fill:var(--muted)">cleavage site</text>
   <circle cx="300" cy="216" r="24" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)" stroke-width="2.5"/><text x="300" y="223" text-anchor="middle" font-size="18" style="fill:var(--ink)">Rat1</text>
   ${arr(330,196,385,166,true)}<text x="590" y="262" text-anchor="end" font-size="21" style="fill:var(--c)">5′ to 3′ exonuclease degrades</text><text x="590" y="288" text-anchor="end" font-size="21" style="fill:var(--c)">the RNA until it reaches Pol II</text>`); },
 consensus(){ const rows=["TATAAAAG","TCCAATGC","AATAGCCG","TACAGGAC"], cons=["T","A","Y","A","R","N","A","C/G"];
  let s=""; rows.forEach((r,i)=>{ [...r].forEach((ch,j)=>{ s+=`<text x="${150+j*52}" y="${60+i*42}" text-anchor="middle" font-size="26" style="fill:var(--ink);font-family:ui-monospace,Menlo,monospace">${ch}</text>`; }); });
  cons.forEach((ch,j)=>{ s+=`<text x="${150+j*52}" y="${250}" text-anchor="middle" font-size="${ch.length>1?22:28}" style="fill:var(--c);font-family:ui-monospace,Menlo,monospace;font-weight:700">${ch}</text>`; });
  return svgWrap(`${s}${ln(110,214,560,214,INK,2.5)}<text x="100" y="250" text-anchor="end" font-size="22" style="fill:var(--ink)">5′</text><text x="570" y="250" font-size="22" style="fill:var(--ink)">3′</text>
   <text x="300" y="300" text-anchor="middle" font-size="21" style="fill:var(--muted)">majority first. R = purine, Y = pyrimidine,</text>
   <text x="300" y="326" text-anchor="middle" font-size="21" style="fill:var(--muted)">N = any, C/G = split between groups</text>`); },
}
