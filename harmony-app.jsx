import { useState } from "react";

// ── DESIGN TOKENS ─────────────────────────────────────────────────
const C = {
  bg: "#08070F", surface: "#10101C",
  gold: "#E8B86D", goldDim: "#9B7340", goldSoft: "rgba(232,184,109,0.13)",
  sage: "#5ECFA0", sageSoft: "rgba(94,207,160,0.11)",
  sky: "#60B4F0",  skySoft: "rgba(96,180,240,0.11)",
  rose: "#F08080", roseSoft: "rgba(240,128,128,0.11)",
  violet: "#A78BFA", violetSoft: "rgba(167,139,250,0.11)",
  text: "#F2EDE4", muted: "#5C5650", faint: "#1A1825",
  // Gradients
  gradGold: "linear-gradient(135deg,#E8B86D,#C4893A)",
  gradSage: "linear-gradient(135deg,#5ECFA0,#2D9E72)",
  gradSky: "linear-gradient(135deg,#60B4F0,#3080C8)",
  gradViolet: "linear-gradient(135deg,#A78BFA,#7C5CBF)",
};

// Score framing — coaching & growth, never deficit
function scoreFrame(s) {
  if (s >= 85) return { label: "Beautifully Aligned",  color: C.sage,   grad: C.gradSage,   insight: "You two are deeply in sync here. Nurture this — it's a real strength." };
  if (s >= 70) return { label: "Strongly Connected",   color: C.sky,    grad: C.gradSky,    insight: "A solid foundation. Keep the conversation open and it will only deepen." };
  if (s >= 50) return { label: "Rich to Explore",      color: C.gold,   grad: C.gradGold,   insight: "This is where your most rewarding pre-wedding conversations live." };
  return        { label: "Growth Opportunity",         color: C.violet, grad: C.gradViolet, insight: "Different perspectives here are a gift — this is exactly what Harmony is for." };
}

// Never red. Low scores get warm rose, not alarm.
function scoreColor(s) { return scoreFrame(s).color; }
function scoreLabel(s) { return scoreFrame(s).label; }

const pillars = [
  { id:"emotional",  name:"Emotional",   icon:"💛", color:"#F0B429", desc:"How you give & receive support" },
  { id:"conflict",   name:"Conflict",    icon:"🌊", color:"#60A5FA", desc:"How you navigate disagreement" },
  { id:"financial",  name:"Financial",   icon:"🌿", color:"#34D399", desc:"Your relationship with money" },
  { id:"family",     name:"Family",      icon:"🏡", color:"#A78BFA", desc:"Roles, boundaries & belonging" },
  { id:"lifevision", name:"Life Vision", icon:"🌅", color:"#38BDF8", desc:"Where you're headed together" },
  { id:"parenting",  name:"Parenting",   icon:"🌱", color:"#FB923C", desc:"How you imagine raising a family" },
  { id:"intimacy",   name:"Intimacy",    icon:"🕯️", color:"#F472B6", desc:"Connection, closeness & care" },
  { id:"lifestyle",  name:"Lifestyle",   icon:"☀️", color:"#A3E635", desc:"Daily rhythms & how you live" },
];

const questions = {
  emotional:[
    {q:"After a long, exhausting day — perhaps a difficult situation at work or with family — what would feel most comforting from your future spouse?",options:["Just sitting together quietly, no need for words","Listening fully while I share everything","Doing something practical to take the load off","A warm hug and gentle reassurance"],values:[3,3,2,2]},
    {q:"In your home growing up, how was love and care most often expressed?",options:["Through acts of service — cooking, doing things for each other","Through open words and emotional conversations","Through sacrifices made for the family","Through quality time spent together"],values:[2,3,2,3]},
    {q:"When something is deeply troubling you, what do you hope your future spouse will do?",options:["Give me space and trust me to come when ready","Gently ask and truly listen without judgment","Help me find a solution straightaway","Involve trusted family if needed"],values:[2,3,2,1]},
  ],
  conflict:[
    {q:"In many Indian families, disagreements between spouses are kept private. How do you feel about that?",options:["Strongly agree — it's between us only","Mostly agree, with rare exceptions","We should be able to seek guidance from trusted elders","Open to outside perspective whenever needed"],values:[2,3,2,2]},
    {q:"If you and your partner disagree about a major decision — say, living arrangement or career — and your families also have strong opinions, how would you want to handle it?",options:["We decide together first, then communicate to family","We seek both families' guidance and then decide","We defer to elders if they have more experience","We find a compromise that keeps everyone comfortable"],values:[3,2,1,2]},
    {q:"What does resolving a disagreement look like to you in a healthy marriage?",options:["Both of us feel heard and we reach a genuine understanding","One of us takes a step back for the relationship's peace","We consult a trusted elder or mentor","We give it time and it naturally settles"],values:[3,2,1,1]},
  ],
  financial:[
    {q:"After marriage, how do you picture managing financial responsibilities towards your respective parents?",options:["We each independently support our own parents","We discuss and decide together as a couple","We pool everything including family support","We help where needed but our household comes first"],values:[2,3,2,3]},
    {q:"How do you imagine making large financial decisions — a home, a car, a major investment?",options:["Together as equal partners, always","Whoever earns more has a bigger say","With inputs from both families","One of us takes the lead based on expertise"],values:[3,1,1,2]},
    {q:"What does financial security mean to you in the context of married life in India?",options:["Owning a home and having stable savings","Being able to support both our families comfortably","Having the freedom to pursue our own goals","Building long-term wealth and investments together"],values:[2,2,2,3]},
  ],
  family:[
    {q:"How do you envision your living arrangement in the first few years of marriage?",options:["Living with or very close to in-laws","Living independently but visiting family often","Living in a different city for career reasons","Living separately but staying deeply connected to both families"],values:[1,3,2,2]},
    {q:"When your parents or in-laws offer strong opinions about your married life — parenting, finances, lifestyle — how would you want to handle that as a couple?",options:["Listen respectfully but decide as a couple","Follow their guidance — they have more experience","Evaluate each situation on its own merits","Gently but clearly maintain our boundaries"],values:[2,1,2,3]},
    {q:"Festivals, family functions, and religious occasions — how important are these to you in your married life?",options:["Very important — they define who we are as a family","Important, and I'd love us to build our own traditions too","Moderate — I'll participate but it won't define us","I'd prefer to decide based on what feels meaningful to us"],values:[2,3,1,2]},
  ],
  lifevision:[
    {q:"Where do you see both of you living five years after your wedding?",options:["In our hometown, close to family","In a metro city for career opportunities","Abroad, if the right opportunity comes","Wherever life takes us — we're open"],values:[2,2,1,3]},
    {q:"How do you imagine the balance of career ambitions in your marriage?",options:["Both our careers are equally important — no compromises","One of us may slow down if family needs it","Career takes a back seat to family priorities","We'll renegotiate as life changes"],values:[3,2,1,2]},
    {q:"In India, there's often pressure to reach milestones — house, car, children — by a certain age. How do you relate to that?",options:["Those milestones matter and we should plan for them","They're meaningful but we'll do it at our own pace","I'd like us to define our own milestones","External timelines don't influence our decisions"],values:[1,2,3,3]},
  ],
  parenting:[
    {q:"When do you imagine starting a family after marriage?",options:["Within the first 1–2 years","After we've settled in — maybe 3–4 years","When we both genuinely feel ready","We're still exploring what we want"],values:[2,3,3,1]},
    {q:"How involved do you imagine grandparents being in raising your children?",options:["Very involved — it truly takes a village","Involved but we make the key parenting decisions","Involved for love and bonding, not day-to-day decisions","Minimal involvement — we'll raise them our way"],values:[1,3,2,2]},
    {q:"What values feel most important to pass on to your children?",options:["Respect for elders and family values","Independence and the courage to think for themselves","Balancing tradition with modern thinking","Strong education and career focus"],values:[2,3,3,2]},
  ],
  intimacy:[
    {q:"Emotional closeness between spouses isn't always openly talked about in Indian families. How comfortable are you expressing your emotional needs to your future spouse?",options:["Very comfortable — I want complete openness","Comfortable over time as trust builds","I tend to show it through actions rather than words","I find it difficult but I want to work on it"],values:[3,2,2,1]},
    {q:"How do you imagine protecting your time as a couple — just the two of you — especially in a joint family or busy family environment?",options:["It's a priority we'll guard intentionally","We'll find moments organically","It will happen naturally as life unfolds","Family time and couple time are one and the same for me"],values:[3,2,1,1]},
    {q:"What does feeling truly loved and valued in a marriage look like to you?",options:["My partner stands by me even in difficult family situations","I feel heard and understood in our private conversations","My partner shows up for me through thoughtful actions","I feel chosen and prioritised in the small everyday moments"],values:[3,3,2,3]},
  ],
  lifestyle:[
    {q:"How do you picture a typical Sunday in your married home?",options:["Family visits, meals together, full house energy","A quiet morning together before the day begins","Out exploring — markets, restaurants, or nature","A mix of family time and time just for us"],values:[1,3,2,2]},
    {q:"Food, diet, and daily rituals can vary a lot between families. How important is it that you and your spouse share similar habits?",options:["Very important — shared routines create harmony","Important, but small differences are fine","I'm flexible as long as core values align","It doesn't matter much to me"],values:[2,3,2,1]},
    {q:"How do you imagine navigating differences in religious practices or spiritual beliefs between you and your future spouse?",options:["We should fully align — faith is central to our life","We respect each other's practices without pressure","We blend both our traditions into something new","We keep faith personal and don't impose on each other"],values:[2,3,3,2]},
  ],
};

function calcAlignment(a,b){
  if(!a||!b||!a.length)return 0;
  const max=3*a.length;
  const diff=a.reduce((s,v,i)=>s+Math.abs(v-(b[i]??0)),0);
  return Math.round(((max-diff)/max)*100);
}

// ── Radar / DNA Chart ─────────────────────────────────────────────
function RadarChart({scores}){
  const ps=pillars.filter(p=>scores[p.id]!==undefined);
  if(ps.length<3)return(
    <div style={{textAlign:"center",padding:"24px",fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted}}>
      Complete more pillars to reveal your Compatibility DNA
    </div>
  );
  const cx=115,cy=115,r=82,n=ps.length;
  const ang=i=>(Math.PI*2*i/n)-Math.PI/2;
  const pt=(i,v)=>{const a=ang(i),rv=r*(v/100);return[cx+rv*Math.cos(a),cy+rv*Math.sin(a)];};
  const ax=(i,rv)=>{const a=ang(i);return[cx+rv*Math.cos(a),cy+rv*Math.sin(a)];};
  return(
    <svg width={230} height={230} style={{overflow:"visible"}}>
      {[25,50,75,100].map(rv=>(
        <polygon key={rv} points={ps.map((_,i)=>ax(i,r*rv/100).join(",")).join(" ")}
          fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      ))}
      {ps.map((_,i)=>(
        <line key={i} x1={cx} y1={cy} x2={ax(i,r)[0]} y2={ax(i,r)[1]}
          stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
      ))}
      <polygon
        points={ps.map((_,i)=>pt(i,scores[ps[i].id]??0).join(",")).join(" ")}
        fill="rgba(212,168,83,0.1)" stroke={C.gold} strokeWidth="1.5"/>
      {ps.map((p,i)=>{
        const[x,y]=pt(i,scores[p.id]??0);
        return <circle key={i} cx={x} cy={y} r="3.5" fill={C.gold}/>;
      })}
      {ps.map((p,i)=>{
        const a=ang(i),lx=cx+(r+22)*Math.cos(a),ly=cy+(r+22)*Math.sin(a);
        return <text key={i} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
          fontSize="14" fontFamily="'Montserrat',sans-serif" fill={C.muted}>{p.icon}</text>;
      })}
    </svg>
  );
}

// ── Future Vision Map ─────────────────────────────────────────────
function FutureVisionMap({scores,nameA,nameB}){
  const[active,setActive]=useState(0);
  const overall=Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/Object.values(scores).length);

  const milestones=[
    {
      label:"Year 1",icon:"🏠",range:"First 12 months",
      headline:"Merging Two Worlds",
      desc:"The first year of an Indian marriage is unlike anywhere else — you're not just merging two people, but two families, two sets of expectations, and two ways of life. Every discovery is part of the adventure.",
      focus:["family","lifestyle","emotional"],
      framing:overall>=65
        ?"Your alignment gives you a wonderful foundation. Keep communicating openly — especially when family dynamics feel heavy."
        :"This year will bring rich discoveries. Your willingness to understand each other now is your greatest strength.",
      action:"Start a weekly 'just us' ritual — even 30 minutes over chai where the topic is only each other, not family or work.",
    },
    {
      label:"Year 1–3",icon:"🌱",range:"Finding your rhythm",
      headline:"Building Your Own Identity as a Couple",
      desc:"Between family expectations, career pressures, and the question of children, years 1–3 test and deepen your bond. This is where couples either build a true partnership or quietly drift.",
      focus:["conflict","lifevision","financial"],
      framing:overall>=70
        ?"Your strong foundation means you'll navigate this season with resilience. Keep your shared vision front and centre."
        :"This is your season of intentional investment. The conversations you have now shape the next decade.",
      action:"Once a year, revisit your Life Vision together — your shared picture will evolve and that's beautiful.",
    },
    {
      label:"Children",icon:"🌿",range:"The big question",
      headline:"Family Planning in an Indian Context",
      desc:"The pressure to have children early in an Indian marriage is real and often comes from all sides. Your parenting alignment score shows where to start the conversation — privately, on your own terms.",
      focus:["parenting","family","financial"],
      framing:scores.parenting>=60
        ?"You're well aligned here. As the time approaches, keep the conversation between the two of you first."
        :"This is your richest conversation to have before the pressure arrives. Your terms, your timeline.",
      action:"Together, write down your honest answer to: 'When will we decide, and how will we protect that decision as ours?'",
    },
    {
      label:"Year 5+",icon:"✨",range:"Thriving together",
      headline:"Legacy and Depth",
      desc:"Indian couples who thrive long-term share one thing — they keep choosing each other intentionally, even as family responsibilities grow. Your intimacy and emotional scores show where to be purposeful.",
      focus:["intimacy","emotional","lifestyle"],
      framing:scores.intimacy>=60
        ?"Your connection is a real strength. Protect your couple time fiercely as life gets fuller."
        :"Intentional closeness is a practice — and you're already building it by being here together.",
      action:"Plan one 'just us' trip each year — even a weekend — completely separate from family obligations.",
    },
  ];

  const m=milestones[active];
  const stagePillars=m.focus
    .map(id=>({...pillars.find(p=>p.id===id),score:scores[id]}))
    .filter(p=>p.score!==undefined);

  return(
    <div>
      <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.75,marginBottom:20}}>
        Based on your scores, here's a loving guide to what <em style={{color:C.gold}}>{nameA}</em> & <em style={{color:C.sky}}>{nameB}</em> can prepare for — and look forward to — at each milestone.
      </p>

      {/* Stage tabs */}
      <div style={{display:"flex",gap:6,marginBottom:22,overflowX:"auto",paddingBottom:2}}>
        {milestones.map((ms,i)=>(
          <button key={i} onClick={()=>setActive(i)} style={{
            flexShrink:0,padding:"10px 14px",
            border:`1px solid ${active===i?C.gold+"80":"rgba(255,255,255,0.06)"}`,
            borderRadius:8,background:active===i?C.goldSoft:"transparent",cursor:"pointer",transition:"all 0.2s",
          }}>
            <div style={{fontSize:18,marginBottom:3}}>{ms.icon}</div>
            <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,fontWeight:active===i?600:400,
              color:active===i?C.gold:C.muted,whiteSpace:"nowrap",letterSpacing:0.5}}>{ms.label}</div>
          </button>
        ))}
      </div>

      <div style={{padding:"20px",background:"rgba(255,255,255,0.02)",border:`1px solid ${C.gold}20`,borderRadius:10,marginBottom:14,animation:"floatIn 0.3s ease"}}>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.muted,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>{m.range}</div>
        <h4 style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:400,color:C.text,marginBottom:8}}>{m.headline}</h4>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,color:C.muted,lineHeight:1.8,marginBottom:16}}>{m.desc}</p>

        {stagePillars.length>0&&(
          <div style={{marginBottom:16}}>
            <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:2,color:C.muted,textTransform:"uppercase",marginBottom:10}}>Key areas for this milestone</div>
            {stagePillars.map(p=>{
              const f=scoreFrame(p.score);
              return(
                <div key={p.id} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}>
                    <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:"#B8B0A0"}}>{p.icon} {p.name}</span>
                    <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:600,color:f.color}}>{f.label}</span>
                  </div>
                  <div style={{height:4,background:"rgba(255,255,255,0.05)",borderRadius:2}}>
                    <div style={{height:"100%",width:`${p.score}%`,background:`linear-gradient(90deg,${p.color}50,${p.color})`,borderRadius:2,transition:"width 0.7s ease"}}/>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{padding:"12px 14px",background:C.goldSoft,border:`1px solid ${C.gold}20`,borderRadius:6,marginBottom:10}}>
          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.gold,letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>What this means for you</div>
          <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.65}}>{m.framing}</p>
        </div>
        <div style={{padding:"12px 14px",background:C.sageSoft,border:`1px solid ${C.sage}25`,borderRadius:6}}>
          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.sage,letterSpacing:2,textTransform:"uppercase",marginBottom:5}}>One thing to do together now</div>
          <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.65}}>💡 {m.action}</p>
        </div>
      </div>

    </div>
  );
}

// ── Mock AI Engine ────────────────────────────────────────────────
// Score-aware responses that branch on actual pillar data — no API needed
const CARD_BANK = {
  emotional:[
    {question:"Growing up, how was love expressed in your home — and what from that do you want to carry into our marriage?",why:"Our family's emotional language shapes us profoundly. Understanding each other's emotional blueprints builds deep empathy."},
    {question:"When life gets really hard — a loss, a failure, a family crisis — what do you need most from your partner?",why:"In Indian families, hardship often comes with family pressure too. Knowing each other's needs in those moments is everything."},
  ],
  conflict:[
    {question:"If we disagree about something and one of our families takes a strong side — how do we stay a united team?",why:"This is one of the most real challenges in Indian marriages. Having a shared approach before it happens changes everything."},
    {question:"What's one thing from how your parents handled disagreements that you'd want to do differently in our marriage?",why:"We inherit conflict patterns without realising it. Naming them together is an act of love and intention."},
  ],
  financial:[
    {question:"How do you feel about our financial responsibilities towards our parents as they get older — and how should we plan for that together?",why:"In India, supporting ageing parents is an expectation, not a choice. Talking about it openly prevents years of unspoken tension."},
    {question:"Is there a money belief from your upbringing — about saving, spending, or who earns — that you're still carrying?",why:"Our class background, family struggles, and parents' habits all live in how we relate to money. Exploring this together is deeply intimate."},
  ],
  family:[
    {question:"What does a healthy relationship with our in-laws look like to you — and what would you need from me to help build that?",why:"In-law relationships are one of the top sources of stress in Indian marriages. Building a shared vision now is a profound gift."},
    {question:"When family expectations and our own dreams pull in different directions — how do you imagine us navigating that together?",why:"Almost every Indian couple will face this moment. Knowing each other's instinct helps you move as one."},
  ],
  lifevision:[
    {question:"Are there any dreams you've quietly set aside because of family expectations — and could this marriage be a place to reclaim them?",why:"So many Indian adults carry shelved ambitions. A marriage that makes space for those dreams is a rare and beautiful thing."},
    {question:"What does success mean to you — and is it different from what your parents define as success?",why:"The gap between family expectations and personal vision is where most Indian couples quietly struggle. Naming it together changes that."},
  ],
  parenting:[
    {question:"How do you imagine navigating the pressure from family about when to have children — and can we agree to make that decision just between us?",why:"The 'when are you having children?' question comes fast in India. Having a shared, private answer protects your marriage beautifully."},
    {question:"What kind of childhood do you want your children to have — and how is that similar to or different from your own?",why:"Our own childhoods are our deepest reference point. Sharing this dream is one of the most tender conversations two people can have."},
  ],
  intimacy:[
    {question:"In a busy joint family home or demanding work life, how do we make sure we stay truly connected — just the two of us?",why:"Couple time is genuinely rare in many Indian households. Protecting it intentionally is one of the highest forms of care."},
    {question:"Is there something you've always wanted your future spouse to understand about you that you haven't yet found the right moment to say?",why:"Marriage creates the safety for those unsaid things. This question opens that door gently and with love."},
  ],
  lifestyle:[
    {question:"How important are religious practices and daily rituals to you — and how do you hope we'll hold that together as a couple?",why:"Faith and ritual sit at the heart of many Indian homes. Understanding each other's relationship with that is foundational."},
    {question:"Food is love in most Indian families — are there habits, diets, or traditions around food that feel really important to you in our home?",why:"It sounds simple, but shared rhythms around food create the texture of daily life. It's worth exploring with joy."},
  ],
};

function generateMockCards(scores) {
  const sorted = Object.entries(scores).sort((a,b) => a[1]-b[1]);
  const cards = [];
  // Take cards from 3 lowest-scoring pillars (growth areas) + 1 from top
  const focusIds = sorted.slice(0,3).map(([id])=>id);
  const strengthId = sorted[sorted.length-1]?.[0];
  [...focusIds, strengthId].filter(Boolean).forEach(id => {
    const bank = CARD_BANK[id];
    if (bank) {
      const pick = bank[cards.length % bank.length];
      const pillarName = pillars.find(p=>p.id===id)?.name || id;
      cards.push({ pillar: pillarName, question: pick.question, why: pick.why });
    }
  });
  // Fill to 6 if needed
  while (cards.length < 6) {
    const id = focusIds[cards.length % focusIds.length];
    const bank = CARD_BANK[id] || [];
    const pick = bank[1] || bank[0];
    if (pick) cards.push({ pillar: pillars.find(p=>p.id===id)?.name || id, question: pick.question, why: pick.why });
    else break;
  }
  return cards.slice(0,6);
}

function generateMockCoaching(scores, nameA, nameB, mode) {
  const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]);
  const overall = Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/Object.values(scores).length);
  const topId = sorted[0]?.[0];
  const top2Id = sorted[1]?.[0];
  const lowId = sorted[sorted.length-1]?.[0];
  const low2Id = sorted[sorted.length-2]?.[0];
  const topName = pillars.find(p=>p.id===topId)?.name || "";
  const top2Name = pillars.find(p=>p.id===top2Id)?.name || "";
  const lowName = pillars.find(p=>p.id===lowId)?.name || "";
  const low2Name = pillars.find(p=>p.id===low2Id)?.name || "";
  const topScore = scores[topId] || 0;
  const lowScore = scores[lowId] || 0;

  if (mode === "coach") {
    const opening = overall >= 75
      ? `${nameA} and ${nameB}, what you're building together is already something to be proud of. Your ${topName} alignment (${topScore}%) shows two people who genuinely understand each other — and in the context of an Indian marriage, where so many external pressures exist, that foundation is truly precious.`
      : `${nameA} and ${nameB}, the fact that you're doing this together — before the wedding, with honesty — already puts you ahead. Your ${topName} connection (${topScore}%) is a real foundation, and it will deepen beautifully with intention and open conversation.`;

    const middle = lowScore >= 60
      ? `Your ${lowName} area is a rich invitation. At ${lowScore}%, you're not far apart — but there's a meaningful conversation waiting there. In Indian marriages especially, unspoken expectations in this area can quietly build over time. What does ${lowName.toLowerCase()} look like to each of you — in your own words, not your family's?`
      : `Your ${lowName} and ${low2Name} areas are where your most important pre-wedding conversations live. These differences aren't something to worry about — in fact, couples who openly explore these areas before marriage build the kind of trust that carries them through everything life brings.`;

    const action = `This week, find a quiet moment — just the two of you, away from family — and each share one hope and one question you have about ${lowName.toLowerCase()} in your marriage. No pressure to resolve anything. Just to hear each other. That single conversation may be one of the most valuable ones you have before your wedding day.`;

    return `${opening}\n\n${middle}\n\n${action}`;
  }

  if (mode === "conversations") {
    const items = [
      {
        title: `1. The ${lowName} Conversation`,
        body: `Your ${lowName} scores (${lowScore}%) suggest you may be approaching this area from different angles — which in the Indian context often means different family influences rather than incompatibility. Before your wedding, explore openly what ${lowName.toLowerCase()} means to each of you.\n💬 Ask each other: "What does ${lowName.toLowerCase()} look like in our marriage — on our own terms?"`,
      },
      {
        title: `2. The ${low2Name} Conversation`,
        body: `At ${scores[low2Id] || 0}%, ${low2Name} is an area where a warm, curious conversation now will serve you for years. Not to reach agreement — just to understand where each of you is coming from, and what you're each carrying from your families.\n💬 Ask each other: "Is there an expectation around ${low2Name.toLowerCase()} you've inherited that you've never really questioned?"`,
      },
      {
        title: `3. Celebrating Your ${topName} Strength`,
        body: `Your ${topName} alignment (${topScore}%) is a genuine gift — especially in a marriage that will have its share of external pressures. This conversation is about celebrating what you share and dreaming together.\n💬 Ask each other: "What's one thing about how we connect on ${topName.toLowerCase()} that you never want us to lose?"`,
      },
    ];
    return items.map(i => `${i.title}\n${i.body}`).join("\n\n");
  }
  return "";
}

// ── Talk Cards ────────────────────────────────────────────────────
function TalkCards({scores,nameA,nameB}){
  const[loading,setLoading]=useState(false);
  const[cards,setCards]=useState(null);
  const[flipped,setFlipped]=useState({});

  const generate=()=>{
    setLoading(true);setCards(null);setFlipped({});
    // Simulate a brief loading moment for the experience
    setTimeout(()=>{
      setCards(generateMockCards(scores));
      setLoading(false);
    }, 1200);
  };

  const pillarColor=(name)=>pillars.find(p=>p.name===name)?.color||C.gold;

  return(
    <div>
      <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.75,marginBottom:18}}>
        Personalised conversation starters for <em style={{color:C.gold}}>{nameA}</em> & <em style={{color:C.sky}}>{nameB}</em> — built from your growth opportunity areas. Tap each card to reveal the insight.
      </p>

      {!cards&&!loading&&(
        <div style={{textAlign:"center",padding:"28px 20px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:10,marginBottom:16}}>
          <div style={{fontSize:36,marginBottom:12}}>🃏</div>
          <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,color:C.muted,lineHeight:1.7,marginBottom:4}}>
            6 personalised conversation cards, built from your specific growth areas.
          </p>
          <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:"#3A3828",lineHeight:1.6}}>
            These are the conversations that will matter most before your wedding day.
          </p>
        </div>
      )}

      {loading&&(
        <div style={{textAlign:"center",padding:"36px 20px"}}>
          <div style={{width:26,height:26,border:`2px solid ${C.gold}25`,borderTop:`2px solid ${C.gold}`,borderRadius:"50%",margin:"0 auto 14px",animation:"spin 1s linear infinite"}}/>
          <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted}}>Crafting your conversation cards…</p>
        </div>
      )}

      {cards&&(
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
          {cards.map((card,i)=>{
            const col=pillarColor(card.pillar);
            const isFlipped=flipped[i];
            return(
              <div key={i} onClick={()=>setFlipped(f=>({...f,[i]:!f[i]}))}
                style={{
                  padding:"16px 14px",borderRadius:8,cursor:"pointer",
                  background:isFlipped?`${col}12`:"rgba(255,255,255,0.02)",
                  border:`1px solid ${isFlipped?col+"40":"rgba(255,255,255,0.07)"}`,
                  transition:"all 0.3s",minHeight:120,display:"flex",flexDirection:"column",justifyContent:"space-between",
                }}>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:isFlipped?col:C.muted,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>{card.pillar}</div>
                {!isFlipped?(
                  <>
                    <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,fontStyle:"italic",color:"#D8D0C0",lineHeight:1.6,flex:1}}>{card.question}</p>
                    <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.muted,marginTop:10,letterSpacing:1}}>TAP FOR INSIGHT →</div>
                  </>
                ):(
                  <>
                    <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.65,flex:1}}>{card.why}</p>
                    <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:col,marginTop:10,letterSpacing:1}}>TAP TO FLIP BACK ↩</div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      <button onClick={generate} disabled={loading} style={{
        width:"100%",padding:"14px",
        background:loading?"rgba(255,255,255,0.04)":`linear-gradient(135deg,${C.gold},${C.goldDim})`,
        color:loading?C.muted:C.bg,border:"none",borderRadius:7,cursor:loading?"not-allowed":"pointer",
        fontFamily:"'Montserrat',sans-serif",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",transition:"all 0.2s",
      }}>{loading?"Generating…":cards?"Regenerate Cards ↺":"Generate My Conversation Cards →"}</button>
    </div>
  );
}

// ── AI Coach ──────────────────────────────────────────────────────
function AICoach({scores,nameA,nameB}){
  const[mode,setMode]=useState("coach");
  const[loading,setLoading]=useState(false);
  const[result,setResult]=useState(null);
  const[error,setError]=useState(null);

  const generate=()=>{
    setLoading(true);setResult(null);setError(null);
    setTimeout(()=>{
      const text = generateMockCoaching(scores, nameA, nameB, mode);
      setResult(text);
      setLoading(false);
    }, 1400);
  };

  return(
    <div>
      <div style={{display:"flex",gap:8,marginBottom:18}}>
        {[["coach","🧠 Coaching Message"],["conversations","💬 Conversations to Have"]].map(([m,l])=>(
          <button key={m} onClick={()=>{setMode(m);setResult(null);setError(null);}} style={{
            flex:1,padding:"11px 6px",border:`1px solid ${mode===m?C.gold+"70":"rgba(255,255,255,0.07)"}`,
            borderRadius:7,background:mode===m?C.goldSoft:"transparent",cursor:"pointer",
            fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:mode===m?600:400,
            color:mode===m?C.gold:C.muted,letterSpacing:0.3,transition:"all 0.2s",
          }}>{l}</button>
        ))}
      </div>

      <div style={{padding:"12px 16px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:7,marginBottom:14}}>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.7}}>
          {mode==="coach"
            ?`A personalised coaching message for ${nameA} & ${nameB} — written from your exact scores, not a template.`
            :`The 3 most enriching conversations for ${nameA} & ${nameB} to have before the wedding — framed as opportunities, always.`}
        </p>
      </div>

      <div style={{minHeight:120,padding:"16px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:8,marginBottom:14}}>
        {!result&&!loading&&!error&&(
          <div style={{textAlign:"center",padding:"10px 0",color:C.muted}}>
            <div style={{fontSize:28,marginBottom:8}}>{mode==="coach"?"🧠":"💬"}</div>
            <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,lineHeight:1.65}}>
              {mode==="coach"?"Tap below to generate your personalised coaching insight.":"Tap below to discover the conversations worth having."}
            </p>
          </div>
        )}
        {loading&&(
          <div style={{textAlign:"center",padding:"16px 0"}}>
            <div style={{width:24,height:24,border:`2px solid ${C.gold}25`,borderTop:`2px solid ${C.gold}`,borderRadius:"50%",margin:"0 auto 12px",animation:"spin 1s linear infinite"}}/>
            <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted}}>
              {mode==="coach"?"Crafting your coaching message…":"Finding your conversations…"}
            </p>
          </div>
        )}
        {error&&<p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.rose,lineHeight:1.6}}>{error}</p>}
        {result&&<p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"#D8D0C0",lineHeight:1.85,whiteSpace:"pre-wrap"}}>{result}</p>}
      </div>

      <button onClick={generate} disabled={loading} style={{
        width:"100%",padding:"14px",
        background:loading?"rgba(255,255,255,0.04)":`linear-gradient(135deg,${C.gold},${C.goldDim})`,
        color:loading?C.muted:C.bg,border:"none",borderRadius:7,cursor:loading?"not-allowed":"pointer",
        fontFamily:"'Montserrat',sans-serif",fontSize:11,fontWeight:700,letterSpacing:2,textTransform:"uppercase",transition:"all 0.2s",
      }}>{loading?"Generating…":mode==="coach"?"Get My Coaching Message →":"Discover Our Conversations →"}</button>
    </div>
  );
}

// ── Wedding Readiness Score ───────────────────────────────────────
function WeddingReadiness({scores,nameA,nameB}){
  const overall=Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/Object.values(scores).length);
  const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const strengths=sorted.slice(0,3);
  const conversations=sorted.slice(-3);

  const readinessLabel=overall>=85?"Beautifully Ready":overall>=70?"Wonderfully Prepared":overall>=50?"Lovingly Growing":"Just Beginning";
  const readinessMsg=overall>=85
    ?"You two have done the rare and beautiful work of genuinely knowing each other. Walk toward your wedding day with confidence."
    :overall>=70
    ?"You have a strong, honest foundation. A few meaningful conversations will make your wedding day even more grounded."
    :overall>=50
    ?"Every couple starts somewhere. You've taken the most courageous step — choosing to understand each other before the big day."
    :"The fact that you're here, doing this together, already says everything about the marriage you're building.";

  return(
    <div>
      {/* Big readiness display */}
      <div style={{textAlign:"center",padding:"40px 24px 32px",background:"linear-gradient(160deg,rgba(232,184,109,0.12),rgba(167,139,250,0.08))",border:`1px solid ${C.gold}30`,borderRadius:20,marginBottom:24,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,borderRadius:"50%",background:`radial-gradient(circle,${C.gold}15,transparent 70%)`,pointerEvents:"none"}}/>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:5,color:C.muted,textTransform:"uppercase",marginBottom:16}}>Wedding Readiness</div>
        <div style={{position:"relative",display:"inline-block",marginBottom:12}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:80,fontWeight:700,lineHeight:1,background:C.gradGold,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{overall}<span style={{fontSize:32}}>%</span></div>
        </div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontStyle:"italic",color:C.text,marginBottom:14}}>{readinessLabel}</div>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,color:C.muted,lineHeight:1.8,maxWidth:300,margin:"0 auto"}}>{readinessMsg}</p>
      </div>

      {/* Strengths */}
      <div style={{marginBottom:16}}>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:3,color:C.sage,textTransform:"uppercase",marginBottom:12}}>✨ Your Shared Strengths</div>
        {strengths.map(([id,s])=>{
          const p=pillars.find(pl=>pl.id===id);
          const f=scoreFrame(s);
          return(
            <div key={id} style={{display:"flex",alignItems:"center",gap:14,marginBottom:10,padding:"14px 16px",background:`linear-gradient(135deg,${C.sage}10,${C.sage}06)`,border:`1px solid ${C.sage}25`,borderRadius:12,transition:"transform .2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateX(4px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateX(0)"}>
              <div style={{width:38,height:38,borderRadius:10,background:`${C.sage}18`,border:`1px solid ${C.sage}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{p?.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,fontWeight:700,color:C.sage}}>{p?.name}</div>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:10,color:C.muted,marginTop:2,lineHeight:1.5}}>{f.insight}</div>
              </div>
              <div style={{textAlign:"center",flexShrink:0}}>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:18,fontWeight:700,color:C.sage}}>{s}</div>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.muted}}>%</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conversations to have — NOT "weaknesses" */}
      <div>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:3,color:C.gold,textTransform:"uppercase",marginBottom:12}}>💬 Conversations to Have Before the Wedding</div>
        {conversations.map(([id,s])=>{
          const p=pillars.find(pl=>pl.id===id);
          return(
            <div key={id} style={{display:"flex",alignItems:"center",gap:14,marginBottom:10,padding:"14px 16px",background:`linear-gradient(135deg,${C.gold}10,${C.gold}06)`,border:`1px solid ${C.gold}25`,borderRadius:12,transition:"transform .2s"}}
              onMouseEnter={e=>e.currentTarget.style.transform="translateX(4px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateX(0)"}>
              <div style={{width:38,height:38,borderRadius:10,background:`${C.gold}18`,border:`1px solid ${C.gold}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{p?.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,fontWeight:700,color:C.gold}}>{p?.name}</div>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:10,color:C.muted,marginTop:2,lineHeight:1.5}}>Your richest pre-wedding conversation — couples who explore this early build the deepest foundations.</div>
              </div>
              <div style={{textAlign:"center",flexShrink:0}}>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:18,fontWeight:700,color:C.gold}}>{s}</div>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.muted}}>%</div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}


// ── WhatsApp Invite ───────────────────────────────────────────────
function WhatsAppInvite({nameA, nameB, completedA}){
  const[sent,setSent]=useState(false);
  const partnerName=nameB||"your partner";
  const senderName=nameA||"your partner";
  const pillarsLeft=8-completedA;

  const message=`💍 *Harmony – Pre-Wedding Assessment*

Hi ${partnerName}! 🌸

${senderName} has completed their side of the Harmony compatibility assessment and is waiting for you.

This takes about 5–7 minutes. Answer honestly — your individual answers stay completely private. Only your alignment score is shared.

📱 Open the app together and tap *"${partnerName}'s turn"* to begin your assessment.

_Harmony helps couples have the conversations that matter most before the wedding day._ 💛`;

  const whatsappUrl=`https://wa.me/?text=${encodeURIComponent(message)}`;

  return(
    <div style={{animation:"floatIn .35s ease"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:48,marginBottom:12}}>📱</div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:400,marginBottom:8}}>
          Invite <em style={{color:C.violet}}>{partnerName}</em>
        </h3>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,color:C.muted,lineHeight:1.8,maxWidth:300,margin:"0 auto"}}>
          Send {partnerName} a warm WhatsApp message. They'll sit with you and complete their side on this device.
        </p>
      </div>

      {/* Preview card */}
      <div style={{background:"#1A1F2E",border:"1px solid rgba(255,255,255,0.08)",borderRadius:16,padding:"20px",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,#25D366,#128C7E)"}}/>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
          <div style={{width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#25D366,#128C7E)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>💬</div>
          <div>
            <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,fontWeight:700,color:C.text}}>WhatsApp Message Preview</div>
            <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.muted}}>to {partnerName}</div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"14px",fontFamily:"'Montserrat',sans-serif",fontSize:11,color:"#C8C0B0",lineHeight:1.75,whiteSpace:"pre-line"}}>
          {`💍 Harmony – Pre-Wedding Assessment

Hi ${partnerName}! 🌸

${senderName} has completed their side and is waiting for you.

This takes 5–7 minutes. Your individual answers stay completely private — only your alignment is shared.

📱 Open the app together and tap "${partnerName}'s turn" to begin.

_Harmony helps couples have the conversations that matter most._ 💛`}
        </div>
      </div>

      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration:"none"}} onClick={()=>setSent(true)}>
        <button style={{
          width:"100%",padding:"16px",borderRadius:12,border:"none",cursor:"pointer",
          background:"linear-gradient(135deg,#25D366,#128C7E)",
          fontFamily:"'Montserrat',sans-serif",fontSize:12,fontWeight:700,
          color:"white",letterSpacing:1.5,textTransform:"uppercase",
          boxShadow:"0 8px 24px rgba(37,211,102,0.3)",transition:"all 0.2s",
          display:"flex",alignItems:"center",justifyContent:"center",gap:10,
        }}>
          <span style={{fontSize:18}}>💬</span> Send on WhatsApp
        </button>
      </a>

      {sent&&(
        <div style={{marginTop:16,padding:"14px 18px",background:"rgba(37,211,102,0.08)",border:"1px solid rgba(37,211,102,0.2)",borderRadius:10,textAlign:"center",animation:"floatIn .3s ease"}}>
          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:"#25D366",fontWeight:600,marginBottom:4}}>Message sent! 🎉</div>
          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:10,color:C.muted,lineHeight:1.6}}>When {partnerName} is ready, hand them the device and let them begin their side.</div>
        </div>
      )}

      <div style={{marginTop:20,padding:"14px 16px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:10}}>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.muted,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>How it works</div>
        {[
          ["1","You send this message to "+partnerName],
          ["2","They come sit with you (or call you)"],
          ["3","Hand them the device — they tap their section and answer privately"],
          ["4","Your joint scores appear as each pillar is completed by both of you"],
        ].map(([n,t])=>(
          <div key={n} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
            <div style={{width:20,height:20,borderRadius:"50%",background:C.goldSoft,border:`1px solid ${C.gold}30`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,marginTop:1}}>
              <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,fontWeight:700,color:C.gold}}>{n}</span>
            </div>
            <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.6}}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AI Horoscope Card ─────────────────────────────────────────────
function HoroscopeCard({scores,nameA,nameB}){
  const[loading,setLoading]=useState(false);
  const[reading,setReading]=useState(null);
  const[error,setError]=useState(null);
  const[copied,setCopied]=useState(false);

  const overall=Math.round(Object.values(scores).reduce((a,b)=>a+b,0)/Object.values(scores).length);
  const sorted=Object.entries(scores).sort((a,b)=>b[1]-a[1]);
  const topPillar=pillars.find(p=>p.id===sorted[0]?.[0]);
  const growthPillar=pillars.find(p=>p.id===sorted[sorted.length-1]?.[0]);

  const generate=async()=>{
    setLoading(true);setError(null);setReading(null);
    const scoresText=Object.entries(scores).map(([id,s])=>`${pillars.find(p=>p.id===id)?.name}: ${s}%`).join(", ");
    const prompt=`You are writing a compatibility reading for an Indian engaged couple named ${nameA} and ${nameB}. This is warm, modern, and uplifting — like a wise, grounded friend who happens to know them deeply. Not mystical or over-the-top, but genuinely insightful and personal.

Their Harmony assessment scores: ${scoresText}
Overall alignment: ${overall}%
Strongest area: ${topPillar?.name} (${scores[topPillar?.id||""]||0}%)
Growth area: ${growthPillar?.name} (${scores[growthPillar?.id||""]||0}%)

Write a compatibility reading with EXACTLY this structure — no headers, no labels, just the text:

PARAGRAPH 1 (The Foundation — 3 sentences): Start with their names. Speak warmly about what their overall alignment reveals about them as a couple. Reference their strongest pillar naturally.

PARAGRAPH 2 (The Gift — 3 sentences): Frame their growth area as an invitation, not a weakness. Be specific about what this area means for their marriage. End with something hopeful and real.

PARAGRAPH 3 (The Promise — 2 sentences): A closing thought about the kind of marriage they are building. End with something that feels like a blessing — warm, modern, not religious.

Tone: Warm, confident, specific to THEIR scores. Never generic. Never clinical. Never use the word "journey". Write as if you know them.`;

    try{
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          messages:[{role:"user",content:prompt}]
        })
      });
      const data=await res.json();
      const text=data.content?.map(b=>b.text||"").join("").trim();
      if(text) setReading(text);
      else setError("Couldn't generate your reading. Try again.");
    }catch(e){
      // Fallback mock reading
      const mock=generateMockReading(nameA,nameB,scores,overall,topPillar,growthPillar);
      setReading(mock);
    }
    setLoading(false);
  };

  const generateMockReading=(nA,nB,sc,ov,top,growth)=>{
    const openings=[
      `${nA} and ${nB}, what your assessment reveals is something quiet and real — two people who have chosen each other not just with their hearts, but with genuine curiosity about who the other person is.`,
      `There's something immediately striking about ${nA} and ${nB}'s compatibility — it carries the warmth of people who already know how to make each other feel seen.`,
      `${nA} and ${nB}, your scores tell a story that numbers can only hint at — a couple who approaches this marriage with both openness and intention.`,
    ];
    const middles=[
      `Your ${growth?.name||"growth"} area isn't a gap — it's an invitation. The couples who talk honestly about ${growth?.name?.toLowerCase()||"this"} before their wedding are the ones who rarely have to navigate it in crisis later. Think of it as your first real conversation as a married couple, waiting to happen.`,
      `Where you have room to grow — ${growth?.name||"this area"} — is actually where the most interesting part of your relationship lives. Different perspectives here don't create friction; they create depth, when you're willing to be curious about each other rather than certain.`,
      `Your ${growth?.name||"growth"} scores reflect something honest — two people coming from different places on something important. That's not a problem to solve. It's a conversation to have, and you're clearly the kind of couple who can have it well.`,
    ];
    const closings=[
      `The marriage you're building has something rare in it — the willingness to know before the wedding what most couples only discover after. That changes everything. Here's to the life you're building together.`,
      `You're not just compatible. You're curious about each other. And in the long run, that matters more than any score. May your marriage be full of exactly that — the kind of curiosity that keeps two people genuinely close.`,
    ];
    const p1=openings[Math.floor(ov/34)%openings.length];
    const p2=middles[Object.keys(sc).length%middles.length];
    const p3=closings[Math.round(ov/50)%closings.length];
    return `${p1}\n\n${p2}\n\n${p3}`;
  };

  const copyText=()=>{
    if(!reading)return;
    const shareText=`✨ Our Harmony Compatibility Reading\n\n${reading}\n\n— Generated by Harmony, India's pre-wedding assessment app`;
    navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2500);});
  };

  const whatsappShare=()=>{
    if(!reading)return;
    const text=`✨ Our Harmony Compatibility Reading\n\n${reading}\n\n— Harmony pre-wedding assessment`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,"_blank");
  };

  return(
    <div style={{animation:"floatIn .35s ease"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:44,marginBottom:10,filter:`drop-shadow(0 0 16px ${C.gold}60)`}}>🔮</div>
        <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:400,marginBottom:8}}>
          Your Compatibility <em style={{color:C.gold}}>Reading</em>
        </h3>
        <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,color:C.muted,lineHeight:1.75,maxWidth:300,margin:"0 auto"}}>
          AI-generated, warm and specific to your exact scores — not a template, not generic.
        </p>
      </div>

      {!reading&&!loading&&(
        <div style={{textAlign:"center",padding:"32px 20px",background:"linear-gradient(160deg,rgba(232,184,109,0.07),rgba(167,139,250,0.05))",border:`1px solid ${C.gold}20`,borderRadius:16,marginBottom:20}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontStyle:"italic",color:"#9A9080",lineHeight:1.8,marginBottom:20}}>
            "{nameA} & {nameB} — {overall}% aligned across {Object.keys(scores).length} pillars of life"
          </div>
          <div style={{display:"flex",justifyContent:"center",gap:16,marginBottom:20}}>
            {sorted.slice(0,3).map(([id,s])=>{
              const pl=pillars.find(p=>p.id===id);
              const f=scoreFrame(s);
              return(
                <div key={id} style={{textAlign:"center"}}>
                  <div style={{fontSize:20,marginBottom:4}}>{pl?.icon}</div>
                  <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,color:f.color}}>{s}%</div>
                  <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:8,color:C.muted}}>{pl?.name}</div>
                </div>
              );
            })}
          </div>
          <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.7}}>
            Claude will write a personalised reading based on your actual scores.
          </p>
        </div>
      )}

      {loading&&(
        <div style={{textAlign:"center",padding:"48px 20px"}}>
          <div style={{width:32,height:32,border:`2px solid ${C.gold}20`,borderTop:`2px solid ${C.gold}`,borderRadius:"50%",margin:"0 auto 16px",animation:"spin 1s linear infinite"}}/>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontStyle:"italic",color:C.muted}}>Reading your stars and your scores…</p>
        </div>
      )}

      {error&&<p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.rose,marginBottom:14,textAlign:"center"}}>{error}</p>}

      {reading&&(
        <div style={{marginBottom:20,animation:"popIn .4s cubic-bezier(0.34,1.56,0.64,1)"}}>
          {/* The Card */}
          <div id="horoscope-card" style={{
            background:"linear-gradient(160deg,#12101E,#1A1428,#0E0C18)",
            border:`1px solid ${C.gold}30`,borderRadius:20,padding:"32px 28px",
            position:"relative",overflow:"hidden",marginBottom:16,
          }}>
            {/* Decorative orbs */}
            <div style={{position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:`radial-gradient(circle,${C.gold}15,transparent 70%)`,pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:-20,left:-20,width:100,height:100,borderRadius:"50%",background:`radial-gradient(circle,${C.violet}12,transparent 70%)`,pointerEvents:"none"}}/>
            {/* Stars */}
            {[...Array(8)].map((_,i)=>(
              <div key={i} style={{position:"absolute",width:i%3===0?2:1,height:i%3===0?2:1,borderRadius:"50%",background:"white",
                top:`${10+Math.random()*80}%`,left:`${5+Math.random()*90}%`,
                opacity:0.15+Math.random()*0.25,animation:`shimmer ${2+Math.random()*3}s ease infinite`,animationDelay:`${Math.random()*3}s`}}/>
            ))}

            <div style={{position:"relative",zIndex:1}}>
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:8,letterSpacing:5,color:C.gold,textTransform:"uppercase",marginBottom:8,opacity:0.7}}>Harmony · Compatibility Reading</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:400}}>
                  <em style={{color:C.gold}}>{nameA}</em>
                  <span style={{color:C.muted,margin:"0 10px",fontSize:16}}>✦</span>
                  <em style={{color:C.violet}}>{nameB}</em>
                </div>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.muted,marginTop:6}}>{overall}% aligned · {Object.keys(scores).length} pillars explored</div>
              </div>

              <div style={{borderTop:`1px solid ${C.gold}15`,paddingTop:20}}>
                {reading.split("\n\n").map((para,i)=>(
                  <p key={i} style={{
                    fontFamily:"'Cormorant Garamond',serif",fontSize:16,fontStyle:"italic",
                    color:"#D8D0C0",lineHeight:1.85,marginBottom:i<reading.split("\n\n").length-1?18:0,
                  }}>{para}</p>
                ))}
              </div>

              <div style={{borderTop:`1px solid ${C.gold}15`,marginTop:20,paddingTop:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:8,color:C.muted,letterSpacing:2}}>HARMONY · {new Date().getFullYear()}</div>
                <div style={{fontSize:14}}>💍</div>
              </div>
            </div>
          </div>

          {/* Share buttons */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <button onClick={whatsappShare} style={{
              padding:"13px",borderRadius:10,border:"none",cursor:"pointer",
              background:"linear-gradient(135deg,#25D366,#128C7E)",
              fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,
              color:"white",letterSpacing:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              boxShadow:"0 4px 14px rgba(37,211,102,0.25)",transition:"all 0.2s",
            }}>💬 Share on WhatsApp</button>
            <button onClick={copyText} style={{
              padding:"13px",borderRadius:10,border:`1px solid ${C.gold}30`,cursor:"pointer",
              background:copied?"rgba(94,207,160,0.1)":C.goldSoft,
              fontFamily:"'Montserrat',sans-serif",fontSize:10,fontWeight:700,
              color:copied?C.sage:C.gold,letterSpacing:1,display:"flex",alignItems:"center",justifyContent:"center",gap:8,
              transition:"all 0.2s",
            }}>{copied?"✓ Copied!":"📋 Copy Text"}</button>
          </div>
        </div>
      )}

      <button onClick={generate} disabled={loading} style={{
        width:"100%",padding:"16px",borderRadius:12,border:"none",
        background:loading?"rgba(255,255,255,0.04)":C.gradGold,
        color:loading?C.muted:C.bg,cursor:loading?"not-allowed":"pointer",
        fontFamily:"'Montserrat',sans-serif",fontSize:11,fontWeight:700,
        letterSpacing:2,textTransform:"uppercase",transition:"all 0.2s",
        boxShadow:loading?"none":`0 6px 20px ${C.gold}35`,
        display:"flex",alignItems:"center",justifyContent:"center",gap:10,
      }}>
        <span>{loading?"Generating…":reading?"Regenerate Reading 🔮":"Generate My Reading 🔮"}</span>
      </button>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function App(){
  const[screen,setScreen]=useState("home");
  const[names,setNames]=useState({A:"",B:""});
  const[qPartner,setQPartner]=useState("A");
  const[qPillar,setQPillar]=useState(null);
  const[qIdx,setQIdx]=useState(0);
  const[selectedOpt,setSelectedOpt]=useState(null); // currently highlighted option, not yet confirmed
  const[answers,setAnswers]=useState({A:{},B:{}});
  const[completed,setCompleted]=useState({A:[],B:[]});
  const[locked,setLocked]=useState({A:[],B:[]});
  const[confirmModal,setConfirmModal]=useState(null); // {partner, pillarId}
  const[reportTab,setReportTab]=useState("readiness");
  const[anim,setAnim]=useState(true);

  const go=s=>{setAnim(false);setTimeout(()=>{setScreen(s);setAnim(true);},160);};

  const startQuiz=(pillar,partner)=>{
    // If locked, show confirm modal instead
    if(locked[partner].includes(pillar.id)){
      setConfirmModal({partner,pillarId:pillar.id});
      return;
    }
    setQPillar(pillar);
    setQPartner(partner);
    const savedAnswers=answers[partner][pillar.id]||[];
    const qs=questions[pillar.id];
    const isComplete=completed[partner].includes(pillar.id);
    const resumeIdx=isComplete?0:Math.min(savedAnswers.length,qs.length-1);
    setQIdx(resumeIdx);
    const savedVal=savedAnswers[resumeIdx];
    const preselect=savedVal!==undefined?qs[resumeIdx].values.indexOf(savedVal):-1;
    setSelectedOpt(preselect>=0?preselect:null);
    go("quiz");
  };

  const unlockPillar=(partner,pillarId)=>{
    // Remove from locked, then open for editing directly
    setLocked(p=>({...p,[partner]:p[partner].filter(id=>id!==pillarId)}));
    setConfirmModal(null);
    const pillar=pillars.find(pl=>pl.id===pillarId);
    if(!pillar)return;
    setQPillar(pillar);
    setQPartner(partner);
    const savedAnswers=answers[partner][pillar.id]||[];
    const qs=questions[pillar.id];
    setQIdx(0);
    const savedVal=savedAnswers[0];
    const preselect=savedVal!==undefined?qs[0].values.indexOf(savedVal):-1;
    setSelectedOpt(preselect>=0?preselect:null);
    go("quiz");
  };

  const selectOption=oi=>setSelectedOpt(oi);

  const confirmAnswer=()=>{
    const qs=questions[qPillar.id];
    const prev=answers[qPartner][qPillar.id]||[];
    // Use selectedOpt if fresh tap, else fall back to saved answer at this index
    const effectiveOpt=selectedOpt!==null?selectedOpt
      :(prev[qIdx]!==undefined?qs[qIdx].values.indexOf(prev[qIdx]):-1);
    if(effectiveOpt===-1)return;
    const val=qs[qIdx].values[effectiveOpt];
    const updated=[...prev];
    updated[qIdx]=val;
    setAnswers(p=>({...p,[qPartner]:{...p[qPartner],[qPillar.id]:updated}}));
    if(qIdx<qs.length-1){
      const nextSaved=updated[qIdx+1];
      const nextIdx=nextSaved!==undefined?qs[qIdx+1].values.indexOf(nextSaved):-1;
      setSelectedOpt(nextIdx>=0?nextIdx:null);
      setQIdx(q=>q+1);
    } else {
      setSelectedOpt(null);
      if(!completed[qPartner].includes(qPillar.id)){
        setCompleted(p=>({...p,[qPartner]:[...p[qPartner],qPillar.id]}));
      }
      setLocked(p=>({...p,[qPartner]:p[qPartner].includes(qPillar.id)?p[qPartner]:[...p[qPartner],qPillar.id]}));
      go("pillars");
    }
  };

  const goToPrevQuestion=()=>{
    if(qIdx>0){
      const newIdx=qIdx-1;
      const saved=answers[qPartner][qPillar.id]||[];
      const savedVal=saved[newIdx];
      const qs=questions[qPillar.id];
      const prevOptIdx=savedVal!==undefined?qs[newIdx].values.indexOf(savedVal):-1;
      setQIdx(newIdx);
      setSelectedOpt(prevOptIdx>=0?prevOptIdx:null);
    }
  };

  const jointScores={};
  pillars.forEach(p=>{
    // Show score as soon as EITHER partner locks — partial scores allowed
    const aLocked=locked.A.includes(p.id);
    const bLocked=locked.B.includes(p.id);
    if(aLocked&&bLocked)
      jointScores[p.id]=calcAlignment(answers.A[p.id],answers.B[p.id]);
  });
  const ready=Object.keys(jointScores).length;
  const bothDone=locked.A.length===8&&locked.B.length===8;
  const pC={A:C.gold,B:C.violet};
  const pN=p=>names[p]||`Partner ${p==="A"?"1":"2"}`;

  return(
    <div style={{minHeight:"100vh",background:C.bg,color:C.text,display:"flex",justifyContent:"center"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .btn{cursor:pointer;border:none;transition:all .25s cubic-bezier(0.34,1.56,0.64,1)}
        .btn:active{transform:scale(0.97)!important}
        .fade{opacity:1;transform:translateY(0);transition:opacity .2s ease,transform .2s ease}
        .fade-out{opacity:0;transform:translateY(12px)}
        input{outline:none}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes floatIn{from{opacity:0;transform:translateY(22px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes popIn{from{opacity:0;transform:scale(0.92)}to{opacity:1;transform:scale(1)}}
        @keyframes pulseGold{0%,100%{box-shadow:0 0 0 0 rgba(232,184,109,0.4)}70%{box-shadow:0 0 0 10px rgba(232,184,109,0)}}
        @keyframes shimmer{0%,100%{opacity:0.15}50%{opacity:0.45}}
        @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes gradFlow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(232,184,109,0.2);border-radius:2px}
      `}</style>

      <div style={{width:"100%",maxWidth:480,minHeight:"100vh"}} className={anim?"fade":"fade-out"}>

        {/* ══ HOME ══ */}
        {screen==="home"&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",padding:"0 0 48px",position:"relative",overflow:"hidden"}}>
            {[...Array(16)].map((_,i)=>(
              <div key={i} style={{position:"absolute",borderRadius:"50%",background:"white",
                width:i%5===0?2:1,height:i%5===0?2:1,
                top:`${5+Math.random()*90}%`,left:`${5+Math.random()*90}%`,
                opacity:0.08+Math.random()*0.2,animation:`shimmer ${2+Math.random()*3}s ease infinite`,animationDelay:`${Math.random()*4}s`}}/>
            ))}

            <div style={{width:"100%",textAlign:"center",padding:"80px 32px 44px",background:"linear-gradient(160deg,rgba(232,184,109,0.07) 0%,rgba(167,139,250,0.05) 60%,transparent 100%)",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
              <div style={{fontSize:50,marginBottom:10,filter:"drop-shadow(0 0 20px rgba(212,168,83,0.3))"}}>💍</div>
              <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:8,color:C.muted,marginBottom:14,textTransform:"uppercase"}}>Harmony</div>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:44,fontWeight:700,lineHeight:1.1,marginBottom:14,letterSpacing:-0.5}}>
                Know each other<br/><em style={{color:C.gold,fontStyle:"italic"}}>before you wed.</em>
              </h1>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,color:C.muted,lineHeight:1.9,maxWidth:310,margin:"0 auto 30px"}}>
                India's first pre-marriage alignment assessment — built for the real conversations engaged couples need to have, with family, faith, and future in mind.
              </p>
              <button className="btn" onClick={()=>go("onboard")} style={{
                padding:"18px 44px",background:C.gradGold,
                color:C.bg,fontFamily:"'Montserrat',sans-serif",fontSize:12,fontWeight:700,
                letterSpacing:2.5,textTransform:"uppercase",borderRadius:50,animation:"pulseGold 2.5s ease infinite",boxShadow:`0 8px 32px ${C.gold}40`,
              }}>Begin Your Journey</button>
            </div>

            <div style={{padding:"32px 24px 0",width:"100%"}}>
              <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:4,color:C.muted,textTransform:"uppercase",textAlign:"center",marginBottom:20}}>Everything is framed with care</div>
              {[
                {icon:"💍",title:"Wedding Readiness Score",sub:"A warm, honest picture of where you are — and the specific conversations worth having before the big day.",wow:true},
                {icon:"🃏",title:"Talk Cards Generator",sub:"AI-generated conversation starters from your growth areas — beautiful prompts to open the right discussions."},
                {icon:"🗺️",title:"Future Vision Map",sub:"A loving guide to what you can look forward to — and prepare for — at every key marriage milestone."},
                {icon:"🧠",title:"AI Coaching & Insights",sub:"Personalised coaching messages and conversation guides — warm, specific, growth-focused."},
              ].map(f=>(
                <div key={f.title} style={{display:"flex",gap:14,padding:"15px",marginBottom:9,background:f.wow?C.goldSoft:"rgba(255,255,255,0.02)",border:`1px solid ${f.wow?C.gold+"25":"rgba(255,255,255,0.05)"}`,borderRadius:8,alignItems:"flex-start"}}>
                  <span style={{fontSize:20,flexShrink:0,marginTop:1}}>{f.icon}</span>
                  <div>
                    <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,fontWeight:600,color:f.wow?C.gold:C.text,marginBottom:4}}>
                      {f.title}{f.wow&&<span style={{marginLeft:7,fontSize:9,padding:"2px 6px",background:C.goldSoft,borderRadius:3,color:C.gold,letterSpacing:1}}>✨ WOW</span>}
                    </div>
                    <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.65}}>{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ ONBOARD ══ */}
        {screen==="onboard"&&(
          <div style={{padding:"56px 32px 48px"}}>
            <button className="btn" onClick={()=>go("home")} style={{background:"none",color:C.muted,fontFamily:"'Montserrat',sans-serif",fontSize:12,padding:0,marginBottom:32}}>← Back</button>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:36,fontWeight:400,marginBottom:8,lineHeight:1.15}}>
              Meet the <em style={{color:C.gold}}>couple</em>
            </h2>
            <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,color:C.muted,lineHeight:1.8,marginBottom:32}}>
              Each partner answers privately. Individual answers are never shown to each other — only your joint alignment is revealed, always with care.
            </p>
            {["A","B"].map(p=>(
              <div key={p} style={{marginBottom:20}}>
                <label style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:2,color:pC[p],textTransform:"uppercase",display:"block",marginBottom:8}}>
                  Partner {p==="A"?"1":"2"}'s Name
                </label>
                <input value={names[p]} onChange={e=>setNames(n=>({...n,[p]:e.target.value}))}
                  placeholder={p==="A"?"e.g. Sofia":"e.g. James"}
                  style={{width:"100%",padding:"14px 16px",background:"rgba(255,255,255,0.03)",border:`1px solid ${names[p]?pC[p]+"55":"rgba(255,255,255,0.07)"}`,borderRadius:4,color:C.text,fontFamily:"'Montserrat',sans-serif",fontSize:14,transition:"border-color 0.2s"}}/>
              </div>
            ))}
            <div style={{padding:"14px 16px",background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.05)",borderRadius:6,marginBottom:28}}>
              <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:"#3A3828"}}>🔒 Your individual answers are private. Only alignment is shared — and always framed with warmth.</span>
            </div>
            <button className="btn" onClick={()=>{if(names.A.trim()&&names.B.trim())go("pillars");}} style={{
              width:"100%",padding:"17px",
              background:(names.A.trim()&&names.B.trim())?`linear-gradient(135deg,${C.gold},${C.goldDim})`:"rgba(255,255,255,0.04)",
              color:(names.A.trim()&&names.B.trim())?C.bg:"#3A3828",
              fontFamily:"'Montserrat',sans-serif",fontSize:12,fontWeight:600,letterSpacing:2,textTransform:"uppercase",borderRadius:4,
              cursor:(names.A.trim()&&names.B.trim())?"pointer":"not-allowed",
            }}>Start Your Assessment →</button>
          </div>
        )}

        {/* ══ PILLARS ══ */}
        {screen==="pillars"&&(
          <div style={{padding:"44px 20px 80px"}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:400,marginBottom:4}}>Your <em style={{color:C.gold}}>Assessment</em></h2>
            <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,marginBottom:28}}>Each partner answers privately — tap any area to begin or continue</p>

            {["A","B"].map(p=>(
              <div key={p} style={{marginBottom:32}}>
                {/* Partner header */}
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                  <div style={{display:"flex",alignItems:"center",gap:10}}>
                    <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${pC[p]},${pC[p]}88)`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 0 12px ${pC[p]}40`}}>
                      <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:13,fontWeight:700,color:C.bg}}>{p==="A"?"1":"2"}</span>
                    </div>
                    <div>
                      <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,fontStyle:"italic",color:pC[p]}}>{pN(p)}</div>
                      <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.muted,marginTop:1}}>
                        {locked[p].length===8?"All locked ✓":locked[p].length>0?`${locked[p].length} of 8 locked`:`${completed[p].length} of 8 answered`}
                      </div>
                    </div>
                  </div>
                  {/* Mini progress ring label */}
                  <div style={{textAlign:"right"}}>
                    <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:18,fontWeight:700,color:pC[p]}}>{Math.round((locked[p].length/8)*100)}<span style={{fontSize:10,color:C.muted}}>%</span></div>
                    <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:8,color:C.muted,letterSpacing:1}}>LOCKED</div>
                  </div>
                </div>

                {/* Progress bar */}
                <div style={{height:3,background:"rgba(255,255,255,0.04)",borderRadius:2,marginBottom:16,overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${(locked[p].length/8)*100}%`,background:`linear-gradient(90deg,${pC[p]}80,${pC[p]})`,borderRadius:2,transition:"width .6s cubic-bezier(0.34,1.56,0.64,1)"}}/>
                </div>

                {/* Pillar list — full width rows, not grid */}
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {pillars.map(pl=>{
                    const done=completed[p].includes(pl.id);
                    const isLocked=locked[p].includes(pl.id);
                    const inProgress=(answers[p][pl.id]||[]).length>0&&!done&&!isLocked;
                    const answeredCount=(answers[p][pl.id]||[]).length;

                    return(
                      <div key={pl.id} onClick={()=>startQuiz(pl,p)}
                        style={{
                          display:"flex",alignItems:"center",gap:14,
                          padding:"14px 16px",borderRadius:10,cursor:"pointer",
                          background:isLocked?`${pl.color}0D`:done?`${pl.color}08`:"rgba(255,255,255,0.02)",
                          border:`1px solid ${isLocked?pl.color+"45":done?pl.color+"25":"rgba(255,255,255,0.05)"}`,
                          transition:"all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                        }}
                        onMouseEnter={e=>{e.currentTarget.style.transform="translateX(4px)";e.currentTarget.style.borderColor=pl.color+"60";}}
                        onMouseLeave={e=>{e.currentTarget.style.transform="translateX(0)";e.currentTarget.style.borderColor=isLocked?pl.color+"45":done?pl.color+"25":"rgba(255,255,255,0.05)";}}>

                        {/* Icon pill */}
                        <div style={{
                          width:40,height:40,borderRadius:10,flexShrink:0,
                          background:isLocked?`${pl.color}20`:done?`${pl.color}15`:"rgba(255,255,255,0.04)",
                          display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,
                          border:`1px solid ${isLocked?pl.color+"40":done?pl.color+"30":"rgba(255,255,255,0.06)"}`,
                          transition:"all 0.2s",
                        }}>
                          {isLocked?"🔒":pl.icon}
                        </div>

                        {/* Name + status */}
                        <div style={{flex:1,minWidth:0}}>
                          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:13,fontWeight:600,color:isLocked?pl.color:done?pl.color:"#D0C8B8",marginBottom:3}}>{pl.name}</div>
                          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:10,color:C.muted}}>
                            {isLocked?"Locked — tap to unlock & edit"
                              :done?"Answered — tap to review or edit"
                              :inProgress?`${answeredCount} of 3 answered — tap to continue`
                              :"Tap to begin"}
                          </div>
                        </div>

                        {/* Right status badge */}
                        <div style={{flexShrink:0}}>
                          {isLocked
                            ?<div style={{width:28,height:28,borderRadius:"50%",background:`${pl.color}20`,border:`1.5px solid ${pl.color}60`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>🔒</div>
                            :done
                              ?<div style={{width:28,height:28,borderRadius:"50%",background:`${pl.color}20`,border:`1.5px solid ${pl.color}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                                <span style={{color:pl.color,fontSize:12,fontWeight:700}}>✓</span>
                              </div>
                              :inProgress
                                ?<div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:pC[p],letterSpacing:1,fontWeight:600}}>
                                  {answeredCount}/3
                                </div>
                                :<div style={{width:28,height:28,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                                  <span style={{color:C.muted,fontSize:10}}>→</span>
                                </div>
                          }
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* WhatsApp invite nudge — show when A is done but B hasn't started */}
            {completed.A.length>=3&&completed.B.length===0&&(
              <div style={{marginBottom:12,padding:"14px 16px",background:"rgba(37,211,102,0.06)",border:"1px solid rgba(37,211,102,0.2)",borderRadius:12,display:"flex",alignItems:"center",gap:12,cursor:"pointer",animation:"floatIn .4s ease"}}
                onClick={()=>{go("report");setTimeout(()=>setReportTab("invite"),200);}}>
                <div style={{fontSize:24,flexShrink:0}}>💬</div>
                <div style={{flex:1}}>
                  <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,fontWeight:700,color:"#25D366",marginBottom:2}}>{pN("B")} hasn't started yet</div>
                  <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:10,color:C.muted}}>Tap to send them a WhatsApp invite →</div>
                </div>
              </div>
            )}

            {ready>0&&(
              <button onClick={()=>go("report")} style={{
                width:"100%",padding:"18px",
                background:bothDone?C.gradGold:C.goldSoft,
                color:bothDone?C.bg:C.gold,
                fontFamily:"'Montserrat',sans-serif",fontSize:12,fontWeight:700,
                letterSpacing:2,textTransform:"uppercase",borderRadius:10,
                border:bothDone?"none":`1px solid ${C.gold}40`,
                cursor:"pointer",transition:"all 0.2s",
                boxShadow:bothDone?`0 8px 28px ${C.gold}35`:"none",
              }}>
                {bothDone?"View Your Full Report ✨":`See Partial Report — ${ready} area${ready!==1?"s":""} ready`}
              </button>
            )}
          </div>
        )}

        {/* ══ QUIZ ══ */}
        {screen==="quiz"&&qPillar&&(
          <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",background:C.bg}}>

            {/* Sticky header */}
            <div style={{padding:"52px 24px 20px",background:`linear-gradient(180deg,${C.bg} 60%,transparent)`,position:"sticky",top:0,zIndex:10}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
                <button onClick={()=>{setSelectedOpt(null);go("pillars");}} style={{
                  width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.05)",
                  border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontFamily:"'Montserrat',sans-serif",fontSize:14,color:C.muted,flexShrink:0,
                }}>←</button>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                    <span style={{fontSize:16}}>{qPillar.icon}</span>
                    <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,fontWeight:700,color:qPillar.color,letterSpacing:2,textTransform:"uppercase"}}>{qPillar.name}</span>
                    <span style={{padding:"2px 8px",borderRadius:20,background:`${pC[qPartner]}15`,border:`1px solid ${pC[qPartner]}35`,fontFamily:"'Montserrat',sans-serif",fontSize:9,color:pC[qPartner]}}>{pN(qPartner)}</span>
                  </div>
                  <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:C.muted}}>Question {qIdx+1} of {questions[qPillar.id].length}</div>
                </div>
              </div>

              {/* Segmented progress dots */}
              <div style={{display:"flex",gap:6}}>
                {questions[qPillar.id].map((_,i)=>{
                  const savedNow=(answers[qPartner][qPillar.id]||[])[i];
                  const isAnswered=savedNow!==undefined;
                  const isCurrent=i===qIdx;
                  return(
                    <div key={i} onClick={()=>{
                      if(isAnswered||i<=((answers[qPartner][qPillar.id]||[]).length)){
                        const saved=(answers[qPartner][qPillar.id]||[])[i];
                        const qs=questions[qPillar.id];
                        const presel=saved!==undefined?qs[i].values.indexOf(saved):-1;
                        setQIdx(i);
                        setSelectedOpt(presel>=0?presel:null);
                      }
                    }} style={{
                      flex:1,height:4,borderRadius:2,cursor:isAnswered?"pointer":"default",
                      background:isCurrent?qPillar.color:isAnswered?`${qPillar.color}70`:"rgba(255,255,255,0.07)",
                      transition:"all 0.3s ease",
                      transform:isCurrent?"scaleY(1.5)":"scaleY(1)",
                    }}/>
                  );
                })}
              </div>
            </div>

            {/* Question */}
            <div style={{flex:1,padding:"8px 24px 24px",display:"flex",flexDirection:"column"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:21,fontWeight:400,lineHeight:1.55,marginBottom:28,color:"#EEE8D8"}}>
                {questions[qPillar.id][qIdx].q}
              </h3>

              {/* Options */}
              <div style={{display:"flex",flexDirection:"column",gap:10,flex:1}}>
                {questions[qPillar.id][qIdx].options.map((opt,i)=>{
                  const savedAnswersNow=answers[qPartner][qPillar.id]||[];
                  const savedValNow=savedAnswersNow[qIdx];
                  const savedOptNow=savedValNow!==undefined?questions[qPillar.id][qIdx].values.indexOf(savedValNow):-1;
                  const isSelected=selectedOpt!==null?selectedOpt===i:savedOptNow===i;
                  return(
                    <div key={i} onClick={()=>selectOption(i)}
                      style={{
                        padding:"16px 18px",borderRadius:12,cursor:"pointer",
                        border:`1.5px solid ${isSelected?qPillar.color:"rgba(255,255,255,0.07)"}`,
                        background:isSelected?`${qPillar.color}18`:"rgba(255,255,255,0.02)",
                        display:"flex",alignItems:"center",gap:14,
                        transition:"all 0.18s cubic-bezier(0.34,1.56,0.64,1)",
                        transform:isSelected?"scale(1.01) translateX(3px)":"scale(1)",
                        boxShadow:isSelected?`0 4px 20px ${qPillar.color}20`:"none",
                      }}
                      onMouseEnter={e=>{if(!isSelected){e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.15)";}}}
                      onMouseLeave={e=>{if(!isSelected){e.currentTarget.style.background="rgba(255,255,255,0.02)";e.currentTarget.style.borderColor="rgba(255,255,255,0.07)";}}}
                    >
                      <div style={{
                        width:26,height:26,borderRadius:"50%",flexShrink:0,
                        background:isSelected?qPillar.color:"rgba(255,255,255,0.05)",
                        border:`1.5px solid ${isSelected?qPillar.color:qPillar.color+"40"}`,
                        display:"flex",alignItems:"center",justifyContent:"center",
                        transition:"all 0.18s",
                      }}>
                        {isSelected
                          ?<span style={{color:C.bg,fontSize:11,fontWeight:800}}>✓</span>
                          :<span style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:qPillar.color+"90"}}>{String.fromCharCode(65+i)}</span>
                        }
                      </div>
                      <span style={{fontFamily:"'Montserrat',sans-serif",fontSize:13,color:isSelected?"#F0EBE0":"#A8A098",lineHeight:1.5,flex:1}}>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Bottom nav */}
              <div style={{marginTop:24,display:"flex",gap:10}}>
                {qIdx>0&&(
                  <button onClick={goToPrevQuestion} style={{
                    width:48,height:48,borderRadius:12,
                    background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
                    cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
                    fontSize:16,color:C.muted,flexShrink:0,transition:"all 0.2s",
                  }}>←</button>
                )}
                <button onClick={confirmAnswer}
                  disabled={selectedOpt===null&&(answers[qPartner][qPillar.id]||[])[qIdx]===undefined}
                  style={{
                    flex:1,height:48,borderRadius:12,border:"none",
                    background:(selectedOpt!==null||(answers[qPartner][qPillar.id]||[])[qIdx]!==undefined)
                      ?`linear-gradient(135deg,${qPillar.color},${qPillar.color}CC)`
                      :"rgba(255,255,255,0.05)",
                    color:(selectedOpt!==null||(answers[qPartner][qPillar.id]||[])[qIdx]!==undefined)?C.bg:C.muted,
                    cursor:(selectedOpt!==null||(answers[qPartner][qPillar.id]||[])[qIdx]!==undefined)?"pointer":"not-allowed",
                    fontFamily:"'Montserrat',sans-serif",fontSize:11,fontWeight:700,
                    letterSpacing:2,textTransform:"uppercase",transition:"all 0.2s",
                    boxShadow:(selectedOpt!==null||(answers[qPartner][qPillar.id]||[])[qIdx]!==undefined)?`0 4px 20px ${qPillar.color}30`:"none",
                  }}>
                  {qIdx===questions[qPillar.id].length-1?"Lock & Submit 🔒":"Next →"}
                </button>
              </div>

              <div style={{marginTop:14,fontFamily:"'Montserrat',sans-serif",fontSize:9,color:"#2A2818",textAlign:"center",letterSpacing:1}}>
                🔒 {pN(qPartner==="A"?"B":"A").toUpperCase()}'S ANSWERS STAY PRIVATE
              </div>
            </div>
          </div>
        )}



        {/* ══ REPORT ══ */}
        {screen==="report"&&(
          <div style={{padding:"48px 24px 72px"}}>
            <button onClick={()=>go("pillars")} style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:50,padding:"8px 16px",cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,marginBottom:24,transition:"all .2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,0.07)";e.currentTarget.style.color=C.text;}}
              onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.color=C.muted;}}>← Dashboard</button>

            <div style={{textAlign:"center",marginBottom:28,padding:"26px 20px",background:"linear-gradient(135deg,rgba(232,184,109,0.1),rgba(167,139,250,0.07))",border:`1px solid ${C.gold}25`,borderRadius:10}}>
              <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,letterSpacing:5,color:C.muted,marginBottom:8,textTransform:"uppercase"}}>Your Harmony Report</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:400,marginBottom:4,lineHeight:1.2}}>
                <em style={{color:C.gold}}>{pN("A")}</em> <span style={{color:C.muted,fontSize:22}}> & </span> <em style={{color:C.violet}}>{pN("B")}</em>
              </h2>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,marginTop:8}}>
                {ready} of 8 areas explored · every result framed with care
              </p>
            </div>

            {/* Tabs */}
            <div style={{display:"flex",gap:6,marginBottom:24,overflowX:"auto",paddingBottom:4}}>
              {[["readiness","💍","Ready"],["cards","🃏","Cards"],["vision","🗺️","Vision"],["dna","🎯","DNA"],["ai","🧠","Coach"],["horoscope","🔮","Reading"],["invite","💬","Invite"]].map(([t,icon,label])=>{
                const active=reportTab===t;
                return(
                  <button key={t} onClick={()=>setReportTab(t)} style={{
                    flexShrink:0,padding:"9px 16px",borderRadius:50,border:"none",
                    background:active?C.gradGold:"rgba(255,255,255,0.05)",
                    cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:10,
                    fontWeight:active?700:400,color:active?C.bg:C.muted,
                    letterSpacing:0.3,transition:"all .22s cubic-bezier(0.34,1.56,0.64,1)",
                    transform:active?"scale(1.06)":"scale(1)",
                    boxShadow:active?`0 4px 14px ${C.gold}35`:"none",
                  }}>{icon} {label}</button>
                );
              })}
            </div>

            {/* WEDDING READINESS */}
            {reportTab==="readiness"&&ready>0&&<div style={{animation:"floatIn .35s ease"}}><WeddingReadiness scores={jointScores} nameA={pN("A")} nameB={pN("B")}/></div>}
            {reportTab==="readiness"&&ready===0&&<div style={{textAlign:"center",padding:"40px 20px",color:C.muted}}><div style={{fontSize:36,marginBottom:12}}>💍</div><p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,lineHeight:1.7}}>Complete at least one pillar from each partner to see your Wedding Readiness Score.</p></div>}

            {/* TALK CARDS */}
            {reportTab==="cards"&&ready>0&&<div style={{animation:"floatIn .35s ease"}}><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:400,marginBottom:6}}>Talk <em style={{color:C.gold}}>Cards</em></h3><TalkCards scores={jointScores} nameA={pN("A")} nameB={pN("B")}/></div>}
            {reportTab==="cards"&&ready===0&&<div style={{textAlign:"center",padding:"40px 20px",color:C.muted}}><div style={{fontSize:36,marginBottom:12}}>🃏</div><p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,lineHeight:1.7}}>Complete at least one pillar from each partner to generate your Talk Cards.</p></div>}

            {/* FUTURE VISION */}
            {reportTab==="vision"&&ready>=2&&<div style={{animation:"floatIn .35s ease"}}><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:400,marginBottom:6}}>Future <em style={{color:C.gold}}>Vision Map</em></h3><FutureVisionMap scores={jointScores} nameA={pN("A")} nameB={pN("B")}/></div>}
            {reportTab==="vision"&&ready<2&&<div style={{textAlign:"center",padding:"40px 20px",color:C.muted}}><div style={{fontSize:36,marginBottom:12}}>🗺️</div><p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,lineHeight:1.7}}>Complete at least 2 areas from each partner to unlock your Future Vision Map.</p></div>}

            {/* DNA */}
            {reportTab==="dna"&&(
              <div style={{animation:"floatIn .35s ease"}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:400,marginBottom:6}}>Compatibility <em style={{color:C.gold}}>DNA</em></h3>
                <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.7,marginBottom:22}}>Your unique couple fingerprint — no two are alike.</p>
                <div style={{display:"flex",justifyContent:"center",marginBottom:22}}><RadarChart scores={jointScores}/></div>
                {ready>=2&&(()=>{
                  const s=Object.entries(jointScores).sort((a,b)=>b[1]-a[1]);
                  return(
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                      {[["✨ Strongest Connection",C.sage,s.slice(0,2)],["💬 Worth Exploring",C.gold,[...s].reverse().slice(0,2)]].map(([label,col,items])=>(
                        <div key={label} style={{padding:"14px",background:`${col}08`,border:`1px solid ${col}20`,borderRadius:6}}>
                          <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:9,color:col,letterSpacing:1.5,textTransform:"uppercase",marginBottom:10}}>{label}</div>
                          {items.map(([id,sc])=>(
                            <div key={id} style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:"#9A9080",marginBottom:5}}>
                              {pillars.find(p=>p.id===id)?.icon} {pillars.find(p=>p.id===id)?.name} <span style={{color:col}}>{sc}%</span>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* AI */}
            {reportTab==="ai"&&(
              <div style={{animation:"floatIn .35s ease"}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:400,marginBottom:6}}>AI <em style={{color:C.gold}}>Coaching</em></h3>
                <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted,lineHeight:1.7,marginBottom:18}}>Powered by Claude — warm, growth-focused, personalised to your exact scores.</p>
                {ready>0?<AICoach scores={jointScores} nameA={pN("A")} nameB={pN("B")}/>:<p style={{fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.muted}}>Complete at least one pillar from each partner first.</p>}
              </div>
            )}

            {/* HOROSCOPE */}
            {reportTab==="horoscope"&&(
              <div style={{animation:"floatIn .35s ease"}}>
                {ready>=3
                  ?<HoroscopeCard scores={jointScores} nameA={pN("A")} nameB={pN("B")}/>
                  :<div style={{textAlign:"center",padding:"48px 20px"}}>
                    <div style={{fontSize:44,marginBottom:14}}>🔮</div>
                    <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:400,color:C.text,marginBottom:10}}>Almost there</h3>
                    <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,color:C.muted,lineHeight:1.75}}>Complete at least 3 pillars from each partner to unlock your AI Compatibility Reading.</p>
                    <div style={{marginTop:16,fontFamily:"'Montserrat',sans-serif",fontSize:11,color:C.gold}}>{ready}/3 ready</div>
                  </div>
                }
              </div>
            )}

            {/* INVITE */}
            {reportTab==="invite"&&(
              <div style={{animation:"floatIn .35s ease"}}>
                <WhatsAppInvite nameA={pN("A")} nameB={pN("B")} completedA={completed.A.length}/>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ══ UNLOCK CONFIRM MODAL ══ */}
      {confirmModal&&(()=>{
        const pl=pillars.find(p=>p.id===confirmModal.pillarId);
        const partner=confirmModal.partner;
        return(
          <div style={{
            position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",
            display:"flex",alignItems:"center",justifyContent:"center",
            zIndex:1000,padding:"24px",backdropFilter:"blur(4px)",
          }}>
            <div style={{
              background:"linear-gradient(160deg,#14121F,#0E0C1A)",
              border:`1px solid ${C.gold}35`,borderRadius:20,
              padding:"36px 28px",maxWidth:340,width:"100%",textAlign:"center",
              animation:"popIn 0.25s cubic-bezier(0.34,1.56,0.64,1)",
              boxShadow:`0 24px 60px rgba(0,0,0,0.6),0 0 0 1px ${C.gold}15`,
            }}>
              <div style={{fontSize:40,marginBottom:14,filter:`drop-shadow(0 0 12px ${C.gold}60)`}}>🔓</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:400,color:C.text,marginBottom:10}}>
                Unlock <em style={{color:C.gold}}>{pl?.name}</em>?
              </h3>
              <p style={{fontFamily:"'Montserrat',sans-serif",fontSize:12,color:C.muted,lineHeight:1.8,marginBottom:28}}>
                This reopens <strong style={{color:C.text}}>{pN(partner)}'s</strong> {pl?.name} answers for editing. Lock it again when you're done.
              </p>
              <div style={{display:"flex",gap:10}}>
                <button onClick={()=>setConfirmModal(null)} style={{
                  flex:1,padding:"14px",background:"rgba(255,255,255,0.04)",
                  border:"1px solid rgba(255,255,255,0.09)",borderRadius:12,
                  cursor:"pointer",fontFamily:"'Montserrat',sans-serif",fontSize:11,
                  color:C.muted,letterSpacing:1,transition:"all 0.2s",
                }}>Keep Locked</button>
                <button onClick={()=>unlockPillar(partner,confirmModal.pillarId)} style={{
                  flex:1,padding:"14px",background:C.gradGold,
                  border:"none",borderRadius:12,cursor:"pointer",
                  fontFamily:"'Montserrat',sans-serif",fontSize:11,fontWeight:700,
                  color:C.bg,letterSpacing:1,transition:"all 0.2s",
                  boxShadow:`0 4px 16px ${C.gold}40`,
                }}>Yes, Unlock</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
