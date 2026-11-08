{
 rearr(o){ const seg=(x,y,t,hot,dark)=>`<rect x="${x}" y="${y}" width="36" height="30" rx="4" style="fill:${hot?"color-mix(in srgb,var(--c) 35%,var(--surface))":dark?"var(--line)":"var(--soft)"};stroke:${hot?"var(--c)":"var(--ink)"}" stroke-width="2"/><text x="${x+18}" y="${y+22}" text-anchor="middle" font-size="18" style="fill:var(--ink)">${t}</text>`;
  const row=(y,name,letters,hot,dark)=>{ const on=o.hl===name||o.quiz===name;
    return label(112,y+15,name,o)+letters.map((l,i)=>seg(240+i*38,y,l,on&&hot.includes(i),dark&&dark.includes(i))).join(""); };
  return svgWrap(`<text x="240" y="36" font-size="18" style="fill:var(--muted)">original: A B C D E F G</text>
   ${row(70,"Deletion",["A","B","C","D","G"],[3,4])}
   <text x="440" y="92" font-size="18" style="fill:var(--muted)">E F lost</text>
   ${row(150,"Duplication",["A","B","C","D","E","F","E","F","G"],[6,7])}
   ${row(230,"Inversion",["A","B","C","F","E","D","G"],[3,4,5])}
   ${row(310,"Translocation",["A","B","C","D","Q","R","S"],[4,5,6],[4,5,6])}
   <text x="300" y="392" text-anchor="middle" font-size="20" style="fill:var(--muted)">Q R S came from a different chromosome</text>`,410); },
 subst(){ const codons=(y,list,hot)=>list.map((c,i)=>`<text x="${120+i*90}" y="${y}" text-anchor="middle" font-size="24" style="fill:${hot===i?"var(--c)":"var(--ink)"};font-family:var(--font-mono);font-weight:${hot===i?700:400}">${c}</text>`).join("");
  return svgWrap(`<text x="20" y="40" font-size="20" style="fill:var(--muted)">original</text>${codons(80,["GGG","AGT","GTA","GAT","CGT"],-1)}
   <text x="300" y="112" text-anchor="middle" font-size="20" style="fill:var(--ink)">GTA = Val</text>
   <text x="20" y="152" font-size="20" style="fill:var(--muted)">substitution</text>${codons(190,["GGG","AGT","GCA","GAT","CGT"],2)}
   <text x="300" y="222" text-anchor="middle" font-size="20" style="fill:var(--c)">GCA = Ala: one codon changed</text>
   <text x="20" y="262" font-size="20" style="fill:var(--muted)">another example</text>${codons(298,["GGG","AGT","GTG","GAT","CGT"],2)}
   <text x="300" y="330" text-anchor="middle" font-size="20" style="fill:var(--ink)">GTG = Val: same amino acid</text>`); },
 indel(){ const r=(y,codons,aas,hotFrom)=>codons.map((c,i)=>`<text x="${110+i*95}" y="${y}" text-anchor="middle" font-size="24" style="fill:${i>=hotFrom?"var(--c)":"var(--ink)"};font-family:var(--font-mono)">${c}</text><text x="${110+i*95}" y="${y+30}" text-anchor="middle" font-size="20" style="fill:${i>=hotFrom?"var(--c)":"var(--muted)"}">${aas[i]||""}</text>`).join("");
  return svgWrap(`<text x="20" y="34" font-size="20" style="fill:var(--muted)">original</text>${r(70,["GGG","AGT","GTA","GAT","CGT"],["Gly","Ser","Val","Asp","Arg"],9)}
   <text x="20" y="140" font-size="20" style="fill:var(--muted)">insertion of T</text>${r(176,["GGG","AGT","GTT","AGA","TCG"],["Gly","Ser","Val","Arg","Ser"],3)}
   <text x="20" y="246" font-size="20" style="fill:var(--muted)">deletion of T</text>${r(282,["GGG","AGT","GAG","ATC","GT"],["Gly","Ser","Glu","Ile","Val"],2)}`); },
 expand(){ const rep=(x,y,n,hot)=>{let s=""; for(let i=0;i<n;i++) s+=`<rect x="${x+i*34}" y="${y}" width="32" height="26" rx="3" style="fill:${hot&&i>=8?"color-mix(in srgb,var(--c) 40%,var(--surface))":"var(--soft)"};stroke:var(--ink)" stroke-width="1.5"/>`; return s;};
  return svgWrap(`<text x="20" y="40" font-size="20" style="fill:var(--ink)">template: 8 CAG repeats</text>${rep(40,56,8,false)}
   <path d="M330 150 L330 190 A20 20 0 1 0 370 190 L370 150" style="fill:none;stroke:var(--c)" stroke-width="5"/>
   <text x="390" y="170" font-size="20" style="fill:var(--c)">hairpin on</text><text x="390" y="196" font-size="20" style="fill:var(--c)">the new strand</text>
   <text x="40" y="170" font-size="20" style="fill:var(--muted)">polymerase re-copies</text><text x="40" y="196" font-size="20" style="fill:var(--muted)">part of the template</text>
   <text x="20" y="262" font-size="20" style="fill:var(--ink)">result: 13 repeats</text>${rep(40,278,13,true)}`); },
 triplet(){ const row=(y,seq,mark,res)=>{ let s=""; [...seq].forEach((c,i)=>{ const add=mark.includes(i); s+=`<text x="${60+i*24}" y="${y}" text-anchor="middle" font-size="22" style="fill:${add?"var(--c)":"var(--ink)"};font-family:var(--font-mono);font-weight:${add?700:400}">${c}</text>`; }); return s+`<text x="580" y="${y}" text-anchor="end" font-size="20" style="fill:${res==="normal"?"var(--c)":"var(--muted)"}">${res}</text>`; };
  return svgWrap(`<text x="20" y="40" font-size="20" style="fill:var(--muted)">reading the code in triplets</text>
   ${row(90,"ABCABCABCABCABCABC",[],"normal")}
   ${row(150,"ABCXABCABCABCABCAB",[3],"mutant")}
   ${row(210,"ABCXABCYABCABCABCA",[3,7],"mutant")}
   ${row(270,"ABCXABCYABCZABCABC",[3,7,11],"normal")}
   <text x="300" y="322" text-anchor="middle" font-size="20" style="fill:var(--c)">three additions restore the reading frame</text>`); },
 effects(o){ const col=(x,name,codon,aa,hot)=>{ const on=o.hl===name||o.quiz===name;
   return `<text x="${x}" y="120" text-anchor="middle" font-size="24" style="fill:var(--ink);font-family:var(--font-mono)">${codon.slice(0,1)}<tspan style="fill:var(--c);font-weight:700">${codon.slice(1,2)}</tspan>${codon.slice(2)}</text>
    ${arr(x,134,x,184,on)}<circle cx="${x}" cy="222" r="30" style="fill:${on?"color-mix(in srgb,var(--c) 35%,var(--surface))":"var(--soft)"};stroke:${on?"var(--c)":"var(--ink)"}" stroke-width="2"/>
    <text x="${x}" y="229" text-anchor="middle" font-size="18" style="fill:var(--ink)">${aa}</text>${label(x,290,name,o)}`; };
  return svgWrap(`<text x="300" y="40" text-anchor="middle" font-size="20" style="fill:var(--muted)">wild type: UCA = Ser</text>
   ${col(110,"Missense","UUA","Leu")}${col(300,"Nonsense","UAA","Stop")}${col(490,"Silent","UCG","Ser")}`); },
 te(o){ const box=(x,t,on)=>`<rect x="${x}" y="240" width="160" height="40" rx="4" style="fill:${on?"color-mix(in srgb,var(--c) 35%,var(--surface))":"var(--soft)"};stroke:${on?"var(--c)":"var(--ink)"}" stroke-width="2"/><text x="${x+80}" y="267" text-anchor="middle" font-size="18" style="fill:var(--ink)">${t}</text>`;
  const r=o.hl==="retro", d=o.hl==="dna";
  return svgWrap(`<text x="150" y="40" text-anchor="middle" font-size="22" style="fill:${r?ACC:INK}">Class I retrotransposon</text>
   <text x="150" y="70" text-anchor="middle" font-size="18" style="fill:var(--muted)">copy and paste via RNA</text>
   <text x="150" y="112" text-anchor="middle" font-size="18" style="fill:var(--ink)">encodes reverse transcriptase</text>
   <text x="150" y="138" text-anchor="middle" font-size="18" style="fill:var(--ink)">and endonuclease</text>
   ${box(10,"",false)}<text x="90" y="267" text-anchor="middle" font-size="18" style="fill:var(--ink)">stays</text>
   ${arr(110,232,110,170,r)}<text x="160" y="200" font-size="18" style="fill:${r?ACC:INK}">RNA copy</text>
   <text x="450" y="40" text-anchor="middle" font-size="22" style="fill:${d?ACC:INK}">Class II DNA transposon</text>
   <text x="450" y="70" text-anchor="middle" font-size="18" style="fill:var(--muted)">cut and paste via DNA</text>
   <text x="450" y="112" text-anchor="middle" font-size="18" style="fill:var(--ink)">encodes transposase,</text>
   <text x="450" y="138" text-anchor="middle" font-size="18" style="fill:var(--ink)">which cuts at inverted repeats</text>
   ${box(370,"",false)}<text x="450" y="267" text-anchor="middle" font-size="18" style="fill:var(--ink)">excised</text>
   ${arr(450,232,450,170,d)}<text x="470" y="200" font-size="18" style="fill:${d?ACC:INK}">moves</text>
   <text x="300" y="320" text-anchor="middle" font-size="20" style="fill:var(--muted)">both insert at a new genomic location</text>`); },
 acds(){ const el=(y,name,gap)=>`<text x="20" y="${y+20}" font-size="20" style="fill:var(--ink)">${name}</text>
   <rect x="120" y="${y}" width="30" height="28" style="fill:var(--c)"/><rect x="530" y="${y}" width="30" height="28" style="fill:var(--c)"/>
   ${gap?`<rect x="150" y="${y}" width="150" height="28" style="fill:var(--soft);stroke:var(--ink)" stroke-width="1.5"/><rect x="400" y="${y}" width="130" height="28" style="fill:var(--soft);stroke:var(--ink)" stroke-width="1.5"/><text x="350" y="${y+20}" text-anchor="middle" font-size="16" style="fill:var(--muted)">deleted</text>`
     :`<rect x="150" y="${y}" width="380" height="28" style="fill:color-mix(in srgb,var(--c) 30%,var(--surface));stroke:var(--ink)" stroke-width="1.5"/><text x="340" y="${y+20}" text-anchor="middle" font-size="16" style="fill:var(--ink)">intact transposase gene</text>`}`;
  return svgWrap(`${el(60,"Ac",false)}${el(160,"Ds",true)}
   ${arr(300,100,300,150,true)}<text x="318" y="132" font-size="18" style="fill:var(--c)">Ds hijacks Ac transposase</text>
   <text x="300" y="250" text-anchor="middle" font-size="20" style="fill:var(--muted)">terminal inverted repeats at both ends</text>
   <text x="300" y="290" text-anchor="middle" font-size="20" style="fill:var(--muted)">Ds is non-autonomous</text>`); },
}
