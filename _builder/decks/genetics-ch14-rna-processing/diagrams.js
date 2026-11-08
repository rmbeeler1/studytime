{
 processing(){ const seg=(x,w,y,ex,t)=>`<rect x="${x}" y="${y}" width="${w}" height="30" style="fill:${ex?"color-mix(in srgb,var(--c) 30%,var(--surface))":"var(--soft)"};stroke:var(--ink)" stroke-width="2"/>${t?`<text x="${x+w/2}" y="${y+22}" text-anchor="middle" font-size="18" style="fill:var(--ink)">${t}</text>`:""}`;
  return svgWrap(`<text x="40" y="40" font-size="22" style="fill:var(--ink)">pre-mRNA (nucleus)</text>
   ${seg(60,110,60,true,"exon")}${seg(170,90,60,false,"intron")}${seg(260,110,60,true,"exon")}${seg(370,90,60,false,"intron")}${seg(460,90,60,true,"exon")}
   <text x="44" y="82" text-anchor="end" font-size="20" style="fill:var(--muted)">5′</text><text x="558" y="82" font-size="20" style="fill:var(--muted)">3′</text>
   ${arr(300,104,300,170,true)}<text x="318" y="132" font-size="21" style="fill:var(--c)">5′ cap, 3′ cleavage and</text><text x="318" y="158" font-size="21" style="fill:var(--c)">poly(A) tail, splicing</text>
   <circle cx="88" cy="215" r="20" style="fill:var(--c)"/><text x="88" y="221" text-anchor="middle" font-size="16" style="fill:var(--surface)">cap</text>
   ${seg(108,110,200,true,"exon")}${seg(218,110,200,true,"exon")}${seg(328,110,200,true,"exon")}
   <text x="444" y="222" font-size="20" style="fill:var(--c);font-family:var(--font-mono)">AAAAA</text>
   <text x="40" y="275" font-size="22" style="fill:var(--ink)">mature mRNA</text>
   <text x="300" y="320" text-anchor="middle" font-size="21" style="fill:var(--muted)">moved to the cytoplasm for translation</text>`); },
 mrna(o){ const f=t=>(o.hl===t||o.quiz===t)?"fill:color-mix(in srgb,var(--c) 35%,var(--surface));stroke:var(--c)":"fill:var(--soft);stroke:var(--ink)";
  return svgWrap(`<rect x="50" y="150" width="140" height="36" style="${f("5′ UTR")}" stroke-width="2"/>
   <rect x="190" y="150" width="230" height="36" style="${f("Coding region")}" stroke-width="2"/>
   <rect x="420" y="150" width="130" height="36" style="${f("3′ UTR")}" stroke-width="2"/>
   <text x="38" y="176" text-anchor="end" font-size="24" style="fill:var(--ink)">5′</text><text x="560" y="176" font-size="24" style="fill:var(--ink)">3′</text>
   ${ln(190,140,190,96,INK,2.5)}<text x="190" y="84" text-anchor="middle" font-size="21" style="fill:var(--muted)">start codon</text>
   ${ln(420,140,420,96,INK,2.5)}<text x="420" y="84" text-anchor="middle" font-size="21" style="fill:var(--muted)">stop codon</text>
   ${ln(54,200,186,200,MUT,2)}${ln(194,200,416,200,MUT,2)}${ln(424,200,546,200,MUT,2)}
   ${label(120,232,"5′ UTR",o)}${label(305,232,"Coding region",o)}${label(485,232,"3′ UTR",o)}
   <text x="300" y="310" text-anchor="middle" font-size="21" style="fill:var(--muted)">UTR = untranslated region</text>`); },
 cap(o){ const on=t=>o.hl===t, box=(x,y,w,t,hot)=>`<rect x="${x}" y="${y}" width="${w}" height="34" rx="4" style="fill:${hot?"color-mix(in srgb,var(--c) 35%,var(--surface))":"var(--soft)"};stroke:${hot?"var(--c)":"var(--ink)"}" stroke-width="2"/><text x="${x+w/2}" y="${y+24}" text-anchor="middle" font-size="20" style="fill:var(--ink)">${t}</text>`;
  const p=(x,hot)=>`<circle cx="${x}" cy="170" r="17" style="fill:${hot?"color-mix(in srgb,var(--c) 35%,var(--surface))":"var(--soft)"};stroke:${hot?"var(--c)":"var(--ink)"}" stroke-width="2"/><text x="${x}" y="177" text-anchor="middle" font-size="18" style="fill:var(--ink)">P</text>`;
  return svgWrap(`<text x="150" y="44" text-anchor="middle" font-size="22" style="fill:${on("G")?ACC:INK}">7-methylguanosine</text>
   ${box(120,72,60,"CH3",on("G"))}${ln(150,106,150,153,INK,2)}
   ${ln(60,170,560,170,INK,3)}<text x="40" y="178" text-anchor="end" font-size="22" style="fill:var(--ink)">5′</text><text x="566" y="178" font-size="22" style="fill:var(--ink)">3′</text>
   ${box(128,153,44,"G",on("G"))}${p(205,on("bond"))}${p(245,on("bond"))}${p(285,on("bond"))}
   ${box(322,153,40,"N",false)}${p(392,false)}${box(422,153,40,"N",false)}${p(492,false)}
   ${ln(190,204,300,204,on("bond")?ACC:INK,2.5)}<text x="245" y="238" text-anchor="middle" font-size="22" style="fill:${on("bond")?ACC:INK}">5′-5′ bond</text>
   ${ln(342,187,342,214,INK,2)}${ln(442,187,442,214,INK,2)}${box(312,214,60,"CH3",on("methyl"))}${box(412,214,60,"CH3",on("methyl"))}
   <text x="392" y="282" text-anchor="middle" font-size="22" style="fill:${on("methyl")?ACC:INK}">2′ methyl groups</text>
   <text x="300" y="325" text-anchor="middle" font-size="21" style="fill:var(--muted)">added soon after transcription initiation</text>`); },
 polya(){ return svgWrap(`<text x="40" y="40" font-size="22" style="fill:var(--ink)">pre-mRNA</text>
   <rect x="40" y="88" width="520" height="26" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <rect x="200" y="88" width="100" height="26" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)" stroke-width="2"/>
   <text x="250" y="108" text-anchor="middle" font-size="18" style="fill:var(--ink);font-family:var(--font-mono)">AAUAAA</text>
   <rect x="460" y="88" width="56" height="26" style="fill:var(--ink)"/>
   ${ln(300,78,410,78,MUT,2)}<text x="355" y="68" text-anchor="middle" font-size="20" style="fill:var(--muted)">11-30 nt</text>
   <text x="490" y="68" text-anchor="middle" font-size="20" style="fill:var(--muted)">U-rich</text>
   ${ln(410,142,410,120,ACC,3,'marker-end="MK_A"')}<text x="422" y="148" font-size="20" style="fill:var(--c)">cleavage site</text>
   ${arr(120,124,120,200,false)}<text x="138" y="180" font-size="20" style="fill:var(--ink)">cleave, then polyadenylate</text>
   <rect x="40" y="248" width="370" height="26" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <rect x="200" y="248" width="100" height="26" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)" stroke-width="2"/>
   <text x="250" y="268" text-anchor="middle" font-size="18" style="fill:var(--ink);font-family:var(--font-mono)">AAUAAA</text>
   <text x="414" y="269" font-size="20" style="fill:var(--c);font-family:var(--font-mono);font-weight:700">AAAAAAA</text>
   <ellipse cx="438" cy="226" rx="28" ry="17" style="fill:var(--soft);stroke:var(--c)" stroke-width="2"/><text x="438" y="232" text-anchor="middle" font-size="18" style="fill:var(--ink)">PBP</text>
   <ellipse cx="496" cy="226" rx="28" ry="17" style="fill:var(--soft);stroke:var(--c)" stroke-width="2"/><text x="496" y="232" text-anchor="middle" font-size="18" style="fill:var(--ink)">PBP</text>
   <text x="30" y="268" text-anchor="end" font-size="20" style="fill:var(--ink)">5′</text>
   <text x="300" y="320" text-anchor="middle" font-size="21" style="fill:var(--muted)">poly(A) tail: 50-250 A's, bound by PBPs</text>`); },
 exons(o){ const ex=o.hl==="exon", it=o.hl==="intron";
  const s=(x,w,y,isEx,t)=>`<rect x="${x}" y="${y}" width="${w}" height="34" style="fill:${isEx?(ex?"var(--c)":"color-mix(in srgb,var(--c) 30%,var(--surface))"):(it?"color-mix(in srgb,var(--c) 15%,var(--surface))":"var(--soft)")};stroke:${(isEx&&ex)||(!isEx&&it)?"var(--c)":"var(--ink)"}" stroke-width="2"/><text x="${x+w/2}" y="${y+24}" text-anchor="middle" font-size="18" style="fill:${isEx&&ex?"var(--surface)":"var(--ink)"}">${t}</text>`;
  return svgWrap(`<text x="40" y="44" font-size="22" style="fill:var(--ink)">gene (DNA)</text>
   ${s(40,90,70,true,"exon 1")}${s(130,110,70,false,"intron")}${s(240,90,70,true,"exon 2")}${s(330,110,70,false,"intron")}${s(440,100,70,true,"exon 3")}
   ${arr(300,120,300,196,true)}<text x="318" y="152" font-size="21" style="fill:var(--c)">transcription,</text><text x="318" y="178" font-size="21" style="fill:var(--c)">then RNA splicing</text>
   <text x="40" y="190" font-size="22" style="fill:var(--ink)">mRNA</text>
   ${s(140,90,210,true,"exon 1")}${s(230,90,210,true,"exon 2")}${s(320,100,210,true,"exon 3")}
   <text x="128" y="234" text-anchor="end" font-size="20" style="fill:var(--ink)">5′</text><text x="428" y="234" font-size="20" style="fill:var(--ink)">3′</text>
   <text x="300" y="296" text-anchor="middle" font-size="21" style="fill:var(--muted)">exons are in the mRNA; introns are not</text>`); },
 splicesites(o){ const f=t=>(o.hl===t||o.quiz===t)?ACC:INK;
  return svgWrap(`<rect x="40" y="150" width="110" height="34" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--ink)" stroke-width="2"/>
   <rect x="150" y="150" width="300" height="34" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <rect x="450" y="150" width="110" height="34" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--ink)" stroke-width="2"/>
   <text x="95" y="174" text-anchor="middle" font-size="18" style="fill:var(--ink)">exon 1</text><text x="300" y="174" text-anchor="middle" font-size="18" style="fill:var(--ink)">intron</text><text x="505" y="174" text-anchor="middle" font-size="18" style="fill:var(--ink)">exon 2</text>
   <text x="28" y="174" text-anchor="end" font-size="20" style="fill:var(--ink)">5′</text><text x="568" y="174" font-size="20" style="fill:var(--ink)">3′</text>
   ${ln(150,122,150,146,f("5′ splice site"),3,'marker-end="MK_I"')}${ln(450,122,450,146,f("3′ splice site"),3,'marker-end="MK_I"')}
   ${label(150,98,"5′ splice site",o)}${label(450,98,"3′ splice site",o)}
   <text x="150" y="214" text-anchor="middle" font-size="20" style="fill:var(--ink);font-family:var(--font-mono)">AG|GU</text>
   <text x="450" y="214" text-anchor="middle" font-size="20" style="fill:var(--ink);font-family:var(--font-mono)">CAG|G</text>
   <text x="370" y="214" text-anchor="middle" font-size="22" style="fill:${f("Branch point")};font-family:var(--font-mono);font-weight:700">A</text>
   ${ln(370,222,370,240,f("Branch point"),2)}${label(370,262,"Branch point",o)}
   <text x="300" y="322" text-anchor="middle" font-size="20" style="fill:var(--muted)">branch point A: 18-40 bp upstream of 3′ site</text>`); },
 lariat(){ return svgWrap(`<rect x="40" y="250" width="120" height="30" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--ink)" stroke-width="2"/>
   <text x="100" y="272" text-anchor="middle" font-size="18" style="fill:var(--ink)">exon 1</text>
   <text x="100" y="236" text-anchor="middle" font-size="18" style="fill:var(--muted)">cut at 5′ site</text>
   <circle cx="300" cy="140" r="62" style="fill:none;stroke:var(--c)" stroke-width="6"/>
   <path d="M344 184 Q380 232 420 260" style="fill:none;stroke:var(--c)" stroke-width="6"/>
   <rect x="420" y="250" width="130" height="30" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--ink)" stroke-width="2"/>
   <text x="485" y="272" text-anchor="middle" font-size="18" style="fill:var(--ink)">exon 2</text>
   <circle cx="344" cy="184" r="9" style="fill:var(--ink)"/>
   <text x="300" y="148" text-anchor="middle" font-size="24" style="fill:var(--ink)">lariat</text>
   <text x="358" y="178" font-size="22" style="fill:var(--ink)">A</text>
   <text x="396" y="60" font-size="20" style="fill:var(--c)">5′ phosphate of the</text>
   <text x="396" y="86" font-size="20" style="fill:var(--c)">intron's G bonds to</text>
   <text x="396" y="112" font-size="20" style="fill:var(--c)">the 2′ OH of the</text>
   <text x="396" y="138" font-size="20" style="fill:var(--c)">branch-point A</text>
   <text x="300" y="322" text-anchor="middle" font-size="21" style="fill:var(--muted)">then the 3′ site is cut and the exons join</text>`); },
 spliceosome(o){ const on=t=>o.hl===t||o.quiz===t, st=t=>on(t)?"fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)":"fill:var(--soft);stroke:var(--ink)";
  return svgWrap(`<rect x="40" y="200" width="100" height="30" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--ink)" stroke-width="2"/>
   <rect x="140" y="200" width="320" height="30" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>
   <rect x="460" y="200" width="100" height="30" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--ink)" stroke-width="2"/>
   <text x="90" y="222" text-anchor="middle" font-size="18" style="fill:var(--ink)">exon 1</text><text x="510" y="222" text-anchor="middle" font-size="18" style="fill:var(--ink)">exon 2</text>
   <text x="380" y="222" text-anchor="middle" font-size="20" style="fill:var(--ink);font-family:var(--font-mono);font-weight:700">A</text>
   <rect x="110" y="128" width="80" height="50" rx="12" style="${st("U1")}" stroke-width="2.5"/>${ln(150,178,150,198,INK,2)}${label(150,150,"U1",o)}
   <rect x="340" y="128" width="80" height="50" rx="12" style="${st("U2")}" stroke-width="2.5"/>${ln(380,178,380,198,INK,2)}${label(380,150,"U2",o)}
   <rect x="160" y="30" width="200" height="54" rx="12" style="${st("U4/U5/U6")}" stroke-width="2.5"/>${label(260,54,"U4/U5/U6",o)}
   ${arr(260,90,260,180,false)}
   <text x="300" y="282" text-anchor="middle" font-size="21" style="fill:var(--muted)">U1 at the 5′ splice site, U2 at the branch point</text>
   <text x="300" y="316" text-anchor="middle" font-size="21" style="fill:var(--muted)">then U4, U5 and U6 join as a complex</text>`); },
 altsplice(o){ const b=(x,y,w,t,hot)=>`<rect x="${x}" y="${y}" width="${w}" height="32" style="fill:${hot?"color-mix(in srgb,var(--c) 35%,var(--surface))":"var(--soft)"};stroke:var(--ink)" stroke-width="2"/><text x="${x+w/2}" y="${y+22}" text-anchor="middle" font-size="18" style="fill:var(--ink)">${t}</text>`;
  const i=(x,y,w)=>ln(x,y+16,x+w,y+16,MUT,3);
  return svgWrap(`<text x="40" y="38" font-size="22" style="fill:var(--ink)">pre-mRNA</text>
   ${b(70,56,100,"exon 1")}${i(170,56,80)}${b(250,56,100,"exon 2",true)}${i(350,56,80)}${b(430,56,100,"exon 3")}
   ${arr(220,98,150,170,o.hl==="123")}${arr(380,98,450,170,o.hl==="13")}
   ${b(30,186,80,"1")}${b(110,186,80,"2",true)}${b(190,186,80,"3")}
   ${b(380,186,80,"1")}${b(460,186,80,"3")}
   <text x="150" y="258" text-anchor="middle" font-size="22" style="fill:${o.hl==="123"?ACC:INK}">exons 1, 2, 3</text>
   <text x="460" y="258" text-anchor="middle" font-size="22" style="fill:${o.hl==="13"?ACC:INK}">exons 1, 3</text>
   <text x="300" y="316" text-anchor="middle" font-size="21" style="fill:var(--muted)">exon 2 removed with the introns on the right</text>`); },
 multi3(){ const b=(x,y,w,t,c)=>`<rect x="${x}" y="${y}" width="${w}" height="30" style="fill:${c?"color-mix(in srgb,var(--c) 30%,var(--surface))":"var(--soft)"};stroke:var(--ink)" stroke-width="2"/>${t?`<text x="${x+w/2}" y="${y+21}" text-anchor="middle" font-size="18" style="fill:var(--ink)">${t}</text>`:""}`;
  const tail=(x,y)=>`<text x="${x+6}" y="${y+21}" font-size="18" style="fill:var(--c);font-family:var(--font-mono);font-weight:700">AAAA</text>`;
  return svgWrap(`<text x="40" y="40" font-size="22" style="fill:var(--ink)">pre-mRNA</text>
   ${b(40,60,100,"exon 1")}${ln(140,75,200,75,MUT,3)}${b(200,60,360,"exon 2",true)}
   ${ln(360,40,360,56,ACC,3,'marker-end="MK_A"')}${ln(500,40,500,56,ACC,3,'marker-end="MK_A"')}
   <text x="344" y="38" text-anchor="end" font-size="20" style="fill:var(--c)">site 1</text><text x="516" y="38" font-size="20" style="fill:var(--c)">2</text>
   <text x="40" y="150" font-size="20" style="fill:var(--muted)">cut at site 1</text>
   ${b(40,164,100,"1")}${b(140,164,160,"2",true)}${tail(300,164)}
   <text x="40" y="236" font-size="20" style="fill:var(--muted)">cut at site 2</text>
   ${b(40,250,100,"1")}${b(140,250,300,"2",true)}${tail(440,250)}
   <text x="300" y="324" text-anchor="middle" font-size="21" style="fill:var(--muted)">mRNA products of different length</text>`); },
 calca(o){ const b=(x,y,t,hot)=>`<rect x="${x}" y="${y}" width="52" height="30" style="fill:${hot?"color-mix(in srgb,var(--c) 35%,var(--surface))":"var(--soft)"};stroke:var(--ink)" stroke-width="2"/><text x="${x+26}" y="${y+21}" text-anchor="middle" font-size="18" style="fill:var(--ink)">${t}</text>`;
  const row=(y,ex,hot)=>ex.map((e,k)=>b(140+k*58,y,e,hot)).join("");
  const th=o.hl==="thyroid", br=o.hl==="brain";
  return svgWrap(`<text x="30" y="96" font-size="20" style="fill:var(--ink)">pre-mRNA</text>${ln(140,90,520,90,MUT,2)}
   ${[1,2,3,4,5,6].map((e,k)=>b(140+k*64,75,e,false)).join("")}
   ${ln(358,44,358,70,ACC,3,'marker-end="MK_A"')}${ln(486,44,486,70,ACC,3,'marker-end="MK_A"')}
   <text x="300" y="36" text-anchor="middle" font-size="18" style="fill:var(--c)">3′ cleavage sites in exons 4 and 6</text>
   <text x="30" y="186" font-size="22" style="fill:${th?ACC:INK}">thyroid</text>${row(165,[1,2,3,4],th)}
   <text x="378" y="186" font-size="20" style="fill:${th?ACC:INK}">calcitonin</text>
   <text x="30" y="266" font-size="22" style="fill:${br?ACC:INK}">brain</text>${row(245,[1,2,3,5,6],br)}
   <text x="436" y="266" font-size="20" style="fill:${br?ACC:INK}">CGRP</text>
   <text x="300" y="322" text-anchor="middle" font-size="21" style="fill:var(--muted)">tissue-specific alternative processing</text>`); },
 trna(o){ const on=t=>o.hl===t||o.quiz===t, c=t=>on(t)?ACC:INK;
  const stem=(x1,y1,x2,y2,t)=>ln(x1,y1,x2,y2,c(t),7);
  const loop=(cx,cy,r,t)=>`<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:${c(t)}" stroke-width="7"/>`;
  return svgWrap(`${stem(300,48,300,150,"Acceptor arm")}
   <text x="288" y="56" text-anchor="end" font-size="20" style="fill:var(--ink)">5′</text>
   <text x="314" y="44" font-size="20" style="fill:var(--c);font-family:var(--font-mono);font-weight:700">3′ CCA</text>
   ${stem(296,150,196,150,"DHU arm")}${loop(166,150,30,"DHU arm")}
   ${stem(304,150,404,150,"TΨC arm")}${loop(434,150,30,"TΨC arm")}
   ${stem(300,150,300,236,"Anticodon arm")}${loop(300,264,28,"Anticodon arm")}
   ${stem(302,196,346,236,"Extra arm")}${loop(356,246,13,"Extra arm")}
   ${label(450,86,"Acceptor arm",o)}${label(130,216,"DHU arm",o)}${label(476,216,"TΨC arm",o)}
   ${label(146,280,"Anticodon arm",o)}${label(470,276,"Extra arm",o)}`); },
 ribosome(o){ const col=(cx,hot,head,L,Lr,S,Sr)=>`<text x="${cx}" y="36" text-anchor="middle" font-size="24" style="fill:${hot?ACC:INK}">${head}</text>
   <ellipse cx="${cx}" cy="112" rx="112" ry="56" style="fill:${hot?"color-mix(in srgb,var(--c) 30%,var(--surface))":"var(--soft)"};stroke:${hot?"var(--c)":"var(--ink)"}" stroke-width="2.5"/>
   <text x="${cx}" y="108" text-anchor="middle" font-size="28" style="fill:var(--ink)">${L}</text><text x="${cx}" y="136" text-anchor="middle" font-size="18" style="fill:var(--muted)">${Lr}</text>
   <ellipse cx="${cx}" cy="218" rx="90" ry="42" style="fill:${hot?"color-mix(in srgb,var(--c) 30%,var(--surface))":"var(--soft)"};stroke:${hot?"var(--c)":"var(--ink)"}" stroke-width="2.5"/>
   <text x="${cx}" y="214" text-anchor="middle" font-size="26" style="fill:var(--ink)">${S}</text><text x="${cx}" y="240" text-anchor="middle" font-size="18" style="fill:var(--muted)">${Sr}</text>`;
  return svgWrap(col(150,o.hl==="bact","Bacterial 70S","50S","23S, 5S rRNA","30S","16S rRNA")+col(450,o.hl==="euk","Eukaryotic 80S","60S","28S, 5.8S, 5S rRNA","40S","18S rRNA")
   +`<text x="300" y="306" text-anchor="middle" font-size="21" style="fill:var(--muted)">rRNA plus many proteins</text>
   <text x="300" y="332" text-anchor="middle" font-size="20" style="fill:var(--muted)">S = Svedberg unit</text>`); },
 rrna(){ const bar=(y,segs)=>`<rect x="40" y="${y}" width="520" height="20" style="fill:var(--soft);stroke:var(--ink)" stroke-width="2"/>`+segs.map(([x,w])=>`<rect x="${x}" y="${y}" width="${w}" height="20" style="fill:color-mix(in srgb,var(--c) 40%,var(--surface))"/>`).join("");
  const prod=(y,items)=>items.map(([x,w,t])=>`<rect x="${x}" y="${y}" width="${w}" height="30" rx="4" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--c)" stroke-width="2"/><text x="${x+w/2}" y="${y+22}" text-anchor="middle" font-size="18" style="fill:var(--ink)">${t}</text>`).join("");
  return svgWrap(`<text x="40" y="30" font-size="21" style="fill:var(--ink)">prokaryotic precursor (30S)</text>${bar(42,[[50,120],[200,60],[290,180],[500,50]])}
   ${arr(300,68,300,96,false)}${prod(100,[[50,120,"16S"],[200,60,"tRNA"],[290,180,"23S"],[500,50,"5S"]])}
   <text x="40" y="178" font-size="21" style="fill:var(--ink)">eukaryotic precursor (45S)</text>${bar(190,[[50,120],[250,80],[400,150]])}
   ${arr(300,216,300,244,false)}${prod(248,[[50,120,"18S"],[250,80,"5.8S"],[400,150,"28S"]])}
   <text x="300" y="320" text-anchor="middle" font-size="21" style="fill:var(--muted)">methylation, cleavage and trimming</text>`); },
}
