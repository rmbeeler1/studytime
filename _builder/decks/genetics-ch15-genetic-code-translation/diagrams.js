{
 aminoacid(o){ const t=(x,y,s,sz)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${sz||30}" style="fill:var(--ink)">${s}</text>`;
  return svgWrap(`${t(300,182,"Cα")}${ln(240,172,272,172,INK,3)}${ln(330,172,366,172,INK,3)}${ln(300,140,300,110,INK,3)}${ln(300,190,300,226,INK,3)}
   ${t(192,182,"+H3N")}${t(418,182,"COO−")}${t(300,100,"H")}
   <text x="300" y="258" text-anchor="middle" font-size="32" style="fill:var(--c)">R</text>
   ${label(160,232,"Amino group",o)}${label(450,232,"Carboxyl group",o)}${label(300,48,"Hydrogen",o)}${label(300,300,"R group",o)}`); },
 peptide(){ const aa=(x,y,r,col)=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="22" style="fill:var(--ink);font-family:var(--font-mono)">${r}</text>`;
  return svgWrap(`<text x="40" y="44" font-size="22" style="fill:var(--ink)">two amino acids</text>
   <text x="40" y="96" font-size="22" style="fill:var(--ink);font-family:var(--font-mono)">H3N-CH(R1)-C<tspan style="fill:var(--c)">OOH</tspan> + <tspan style="fill:var(--c)">H</tspan>-NH-CH(R2)-COO</text>
   ${arr(300,120,300,190,true)}<text x="320" y="164" font-size="22" style="fill:var(--c)">− H2O</text>
   <text x="40" y="236" font-size="22" style="fill:var(--ink);font-family:var(--font-mono)">H3N-CH(R1)-<tspan style="fill:var(--c);font-weight:700">CO-NH</tspan>-CH(R2)-COO</text>
   <text x="300" y="282" text-anchor="middle" font-size="22" style="fill:var(--c)">peptide bond (C-N)</text>
   <text x="300" y="322" text-anchor="middle" font-size="21" style="fill:var(--muted)">carboxyl of one joins amino of the next</text>`); },
 polarity(){ let beads=""; for(let i=0;i<7;i++){ const x=110+i*64; beads+=`<circle cx="${x}" cy="160" r="24" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--ink)" stroke-width="2"/><text x="${x}" y="167" text-anchor="middle" font-size="18" style="fill:var(--ink)">aa${i+1}</text>`; if(i<6) beads+=ln(x+24,160,x+40,160,INK,3); }
  return svgWrap(`${beads}
   <text x="110" y="100" text-anchor="middle" font-size="24" style="fill:var(--ink)">N-terminus</text><text x="110" y="232" text-anchor="middle" font-size="22" style="fill:var(--c)">free amino, +</text>
   <text x="494" y="100" text-anchor="middle" font-size="24" style="fill:var(--ink)">C-terminus</text><text x="494" y="232" text-anchor="middle" font-size="22" style="fill:var(--c)">free carboxyl, −</text>
   <text x="300" y="300" text-anchor="middle" font-size="21" style="fill:var(--muted)">amino acids joined by peptide bonds</text>`); },
 pathway(o){ const xs=[60,220,380,540], names=["precursor","ornithine","citrulline","arginine"], b=o.hl;
  let s=names.map((n,i)=>`<text x="${xs[i]}" y="176" text-anchor="middle" font-size="${i?22:20}" style="fill:var(--ink)">${n}</text>`).join("");
  for(let i=0;i<3;i++){ const x1=xs[i]+(i?56:50), x2=xs[i+1]-58, mid=(x1+x2)/2, blocked=b===String(i+1);
   s+=ln(x1,168,x2,168,blocked?ACC:INK,3,`marker-end="${blocked?"MK_A":"MK_I"}"`);
   s+=`<text x="${mid}" y="120" text-anchor="middle" font-size="20" style="fill:var(--muted)">step ${i+1}</text><text x="${mid}" y="226" text-anchor="middle" font-size="20" style="fill:var(--muted)">gene ${"ABC"[i]}</text>`;
   if(blocked) s+=ln(mid-14,154,mid+14,182,ACC,5)+ln(mid+14,154,mid-14,182,ACC,5); }
  const grows={"1":"grows on ornithine, citrulline or arginine","2":"grows on citrulline or arginine","3":"grows on arginine only"};
  return svgWrap(`${s}<text x="300" y="300" text-anchor="middle" font-size="22" style="fill:${b?ACC:MUT}">${b?`step ${b} blocked: ${grows[b]}`:"each step needs its own enzyme"}</text>`); },
 cc103(){ const xs=[60,240,390,540], names=["precursor","B","A","C"], enz=["103","106","102"];
  let s=names.map((n,i)=>`<text x="${xs[i]}" y="176" text-anchor="middle" font-size="${i?30:22}" style="fill:${i?ACC:INK}">${n}</text>`).join("");
  for(let i=0;i<3;i++){ const x1=xs[i]+(i?24:62), x2=xs[i+1]-26; s+=ln(x1,166,x2,166,INK,3,'marker-end="MK_I"')+`<text x="${(x1+x2)/2}" y="128" text-anchor="middle" font-size="20" style="fill:var(--muted)">enzyme ${enz[i]}</text>`; }
  return svgWrap(`${s}<text x="300" y="246" text-anchor="middle" font-size="21" style="fill:var(--muted)">103 grows on A, B or C: earliest block</text>
   <text x="300" y="280" text-anchor="middle" font-size="21" style="fill:var(--muted)">106 grows on A or C; 102 only on C</text>`); },
 wobble(){ const pair=(x,cod)=>`<text x="${x}" y="110" text-anchor="middle" font-size="26" style="fill:var(--ink);font-family:var(--font-mono)">3′ AG<tspan style="fill:var(--c);font-weight:700">G</tspan> 5′</text>
   ${ln(x-36,124,x-36,146,MUT,2)}${ln(x,124,x,146,MUT,2)}${ln(x+36,124,x+36,146,ACC,3)}
   <text x="${x}" y="178" text-anchor="middle" font-size="26" style="fill:var(--ink);font-family:var(--font-mono)">5′ UC<tspan style="fill:var(--c);font-weight:700">${cod}</tspan> 3′</text>`;
  return svgWrap(`<text x="40" y="60" font-size="20" style="fill:var(--muted)">anticodon</text>
   ${pair(170,"C")}${pair(430,"U")}
   <text x="40" y="226" font-size="20" style="fill:var(--muted)">codon</text>
   <text x="170" y="226" text-anchor="middle" font-size="22" style="fill:var(--ink)">Ser</text><text x="430" y="226" text-anchor="middle" font-size="22" style="fill:var(--ink)">Ser</text>
   <text x="300" y="282" text-anchor="middle" font-size="21" style="fill:var(--c)">G in the anticodon pairs with C or U</text>
   <text x="300" y="316" text-anchor="middle" font-size="21" style="fill:var(--muted)">third codon position is the wobble position</text>`); },
 overlap(){ const seq="AUACGAGUC", x0=150, dx=44; let s="";
  [...seq].forEach((c,i)=>{ s+=`<text x="${x0+i*dx}" y="60" text-anchor="middle" font-size="26" style="fill:var(--ink);font-family:var(--font-mono)">${c}</text>`; });
  ["Ile","Arg","Val"].forEach((a,i)=>{ const xa=x0+i*3*dx-14, xb=x0+(i*3+2)*dx+14; s+=ln(xa,76,xb,76,ACC,3)+`<text x="${(xa+xb)/2}" y="108" text-anchor="middle" font-size="22" style="fill:var(--c)">${a}</text>`; });
  ["Ile","Tyr","Thr"].forEach((a,i)=>{ const xa=x0+i*dx-14, xb=x0+(i+2)*dx+14, y=176+i*48; s+=ln(xa,y,xb,y,MUT,3)+`<text x="${xb+12}" y="${y+8}" font-size="22" style="fill:var(--muted)">${a}</text>`; });
  return svgWrap(`<text x="20" y="108" font-size="20" style="fill:var(--c)">real code</text><text x="20" y="160" font-size="20" style="fill:var(--muted)">if overlapping</text>${s}
   <text x="300" y="326" text-anchor="middle" font-size="21" style="fill:var(--muted)">AUG start codon sets the reading frame</text>`); },
 translation(){ return svgWrap(`${ln(40,190,560,190,ACC,8)}<text x="30" y="198" text-anchor="end" font-size="20" style="fill:var(--ink)">5′</text><text x="566" y="198" font-size="20" style="fill:var(--ink)">3′</text>
   <rect x="120" y="178" width="56" height="24" rx="4" style="fill:var(--surface);stroke:var(--c)" stroke-width="2"/><text x="148" y="196" text-anchor="middle" font-size="16" style="fill:var(--ink);font-family:var(--font-mono)">AUG</text>
   <ellipse cx="380" cy="150" rx="70" ry="44" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/><ellipse cx="380" cy="222" rx="66" ry="24" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <text x="380" y="156" text-anchor="middle" font-size="20" style="fill:var(--ink)">ribosome</text>
   ${[0,1,2,3,4,5].map(i=>`<circle cx="${180+i*30}" cy="${80-Math.sin(i)*14}" r="12" style="fill:color-mix(in srgb,var(--c) 40%,var(--surface));stroke:var(--ink)" stroke-width="1.5"/>`).join("")}
   <text x="150" y="70" text-anchor="end" font-size="22" style="fill:var(--ink)">N</text><text x="350" y="92" font-size="20" style="fill:var(--ink)">C</text>
   ${arr(460,150,540,150,false)}<text x="500" y="128" text-anchor="middle" font-size="20" style="fill:var(--muted)">reads 5′→3′</text>
   <text x="300" y="300" text-anchor="middle" font-size="21" style="fill:var(--muted)">initiation, elongation, termination</text>`); },
 sd(){ const dx=18, row=(str,x0,y,hot)=>[...str].map((c,i)=>`<text x="${x0+i*dx}" y="${y}" text-anchor="middle" font-size="24" style="fill:${hot(i)?"var(--c)":"var(--ink)"};font-family:var(--font-mono);font-weight:${hot(i)?700:400}">${c}</text>`).join("");
  const m="AUGUACUAAGGAGGUUGUAUGGAACAAG", x0=60, X=i=>x0+i*dx;
  return svgWrap(`<text x="${X(0)-18}" y="120" text-anchor="end" font-size="20" style="fill:var(--ink)">5′</text>
   ${row(m,x0,120,i=>(i>=6&&i<=14)||(i>=18&&i<=20))}<text x="${X(27)+16}" y="120" font-size="20" style="fill:var(--ink)">3′</text>
   ${ln(X(6)-8,86,X(14)+8,86,ACC,2.5)}<text x="${X(10)}" y="72" text-anchor="middle" font-size="20" style="fill:var(--c)">Shine-Dalgarno</text>
   ${ln(X(18)-8,132,X(20)+8,132,ACC,2.5)}<text x="${X(19)}" y="160" text-anchor="middle" font-size="20" style="fill:var(--c)">initiation codon</text>
   ${row("AUUCCUCCA",X(6),196,()=>false)}
   <text x="${X(6)-18}" y="196" text-anchor="end" font-size="20" style="fill:var(--ink)">3′</text><text x="${X(14)+16}" y="196" font-size="20" style="fill:var(--ink)">5′</text>
   <text x="${X(10)}" y="236" text-anchor="middle" font-size="20" style="fill:var(--ink)">16S rRNA</text>
   <text x="300" y="300" text-anchor="middle" font-size="21" style="fill:var(--muted)">pairing places AUG on the small subunit</text>`); },
 euinit(){ return svgWrap(`${ln(60,170,500,170,ACC,8)}
   <circle cx="56" cy="170" r="20" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--ink)" stroke-width="2"/>
   <text x="74" y="120" text-anchor="middle" font-size="20" style="fill:var(--ink)">cap-binding</text><text x="74" y="144" text-anchor="middle" font-size="20" style="fill:var(--ink)">proteins</text>
   <rect x="230" y="158" width="58" height="24" rx="4" style="fill:var(--surface);stroke:var(--c)" stroke-width="2"/><text x="259" y="176" text-anchor="middle" font-size="16" style="fill:var(--ink);font-family:var(--font-mono)">AUG</text>
   <text x="504" y="176" font-size="18" style="fill:var(--c);font-family:var(--font-mono);font-weight:700">AAAA</text>
   <ellipse cx="520" cy="134" rx="22" ry="16" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/><ellipse cx="562" cy="134" rx="22" ry="16" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <text x="516" y="100" text-anchor="middle" font-size="20" style="fill:var(--ink)">poly(A) proteins</text>
   <ellipse cx="140" cy="200" rx="48" ry="20" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/><text x="140" y="250" text-anchor="middle" font-size="20" style="fill:var(--ink)">small subunit</text>
   ${arr(196,212,240,212,true)}<text x="300" y="250" font-size="20" style="fill:var(--c)">scans 5′ to 3′</text>
   <text x="300" y="306" text-anchor="middle" font-size="21" style="fill:var(--muted)">cap and poly(A) proteins recruit the ribosome</text>`); },
 kozak(){ return svgWrap(`<text x="300" y="70" text-anchor="middle" font-size="24" style="fill:var(--ink)">Kozak sequence</text>
   <text x="300" y="160" text-anchor="middle" font-size="46" style="fill:var(--ink);font-family:var(--font-mono)">5′-ACC<tspan style="fill:var(--c);font-weight:700">AUG</tspan>G-3′</text>
   ${ln(310,180,310,220,ACC,3)}<text x="310" y="250" text-anchor="middle" font-size="24" style="fill:var(--c)">start codon</text>
   <text x="300" y="310" text-anchor="middle" font-size="21" style="fill:var(--muted)">detected by the small subunit</text>`); },
 sites(o){ const box=(x,t)=>{const on=o.hl===t||o.quiz===t; return `<rect x="${x}" y="110" width="90" height="120" rx="8" style="fill:${on?"color-mix(in srgb,var(--c) 30%,var(--surface))":"var(--surface)"};stroke:${on?"var(--c)":"var(--ink)"}" stroke-width="2.5"/>`;};
  return svgWrap(`<path d="M140 230 L140 120 Q140 50 300 50 Q460 50 460 120 L460 230" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   ${box(160,"E site")}${box(255,"P site")}${box(350,"A site")}
   ${label(205,172,"E site",o)}${label(300,172,"P site",o)}${label(395,172,"A site",o)}
   ${ln(40,250,560,250,ACC,8)}<text x="30" y="258" text-anchor="end" font-size="20" style="fill:var(--ink)">5′</text><text x="566" y="258" font-size="20" style="fill:var(--ink)">3′</text>
   <rect x="140" y="266" width="320" height="30" rx="10" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   ${arr(470,300,550,300,false)}<text x="510" y="330" text-anchor="middle" font-size="18" style="fill:var(--muted)">moves 3 nt</text>
   <text x="300" y="34" text-anchor="middle" font-size="18" style="fill:var(--muted)">large subunit: rRNA makes the peptide bond</text>`); },
 term(){ return svgWrap(`<path d="M170 230 L170 120 Q170 60 300 60 Q430 60 430 120 L430 230" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <rect x="190" y="110" width="100" height="120" rx="8" style="fill:var(--surface);stroke:var(--ink)" stroke-width="2"/><rect x="310" y="110" width="100" height="120" rx="8" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)" stroke-width="2.5"/>
   <text x="240" y="152" text-anchor="middle" font-size="22" style="fill:var(--ink)">P</text><text x="360" y="152" text-anchor="middle" font-size="22" style="fill:var(--ink)">A</text>
   <text x="240" y="190" text-anchor="middle" font-size="18" style="fill:var(--ink)">tRNA +</text><text x="240" y="212" text-anchor="middle" font-size="18" style="fill:var(--ink)">chain</text>
   <rect x="330" y="166" width="60" height="52" rx="10" style="fill:var(--c)"/><text x="360" y="198" text-anchor="middle" font-size="18" style="fill:var(--surface)">RF-1</text>
   ${ln(40,250,560,250,ACC,8)}<text x="345" y="280" font-size="22" style="fill:var(--c);font-family:var(--font-mono);font-weight:700">UAG</text>
   <text x="300" y="34" text-anchor="middle" font-size="20" style="fill:var(--muted)">stop codon in the A site: no tRNA matches</text>
   <text x="300" y="318" text-anchor="middle" font-size="21" style="fill:var(--muted)">release factor frees the polypeptide</text>`); },
 polysome(){ let s=""; for(let i=0;i<5;i++){ const x=110+i*95, len=i*1.2; s+=`<ellipse cx="${x}" cy="190" rx="34" ry="22" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>`;
   for(let k=0;k<Math.round(len);k++) s+=`<circle cx="${x}" cy="${160-k*20}" r="8" style="fill:color-mix(in srgb,var(--c) 40%,var(--surface));stroke:var(--ink)" stroke-width="1.5"/>`; }
  return svgWrap(`${ln(40,212,560,212,ACC,8)}<text x="30" y="220" text-anchor="end" font-size="20" style="fill:var(--ink)">5′</text><text x="566" y="220" font-size="20" style="fill:var(--ink)">3′</text>${s}
   ${arr(120,260,480,260,false)}<text x="300" y="292" text-anchor="middle" font-size="20" style="fill:var(--muted)">direction of translation; chains grow longer</text>
   <text x="300" y="44" text-anchor="middle" font-size="22" style="fill:var(--ink)">one mRNA, many ribosomes</text>`); },
}
