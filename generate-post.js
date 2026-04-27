#!/usr/bin/env node

/**
 * WIN THE DAY — Automated Blog Post Generator
 * Steve Enns | wintheday.me
 *
 * SETUP:
 *   npm install @anthropic-ai/sdk
 *   export ANTHROPIC_API_KEY=your_key_here
 *
 * RUN MANUALLY:
 *   node generate-post.js
 *
 * SCHEDULE (crontab -e) — Tue/Thu/Sat at 7am:
 *   0 7 * * 2,4,6 cd /path/to/wintheday && node generate-post.js
 *
 * Cost: ~$0.003 per post with Sonnet. 3x/week = ~$0.45/month.
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const client = new Anthropic();

// ─── STEVE'S FULL VOICE & STORY BRIEF ──────────────────────────────────────
const VOICE_BRIEF = `
You are writing as Steve Enns for his personal brand "Win The Day" at wintheday.me.

WHO STEVE IS:
Steve Enns is a Canadian entrepreneur based in North Vancouver, BC. Co-founder of Tallbridge Real Estate (2015) — built to 65 employees operating across Texas and Georgia, closed thousands of deals. Went through a partner exit, financial collapse, years of quiet pressure while keeping the team paid. Still running the company. Still in the build. Writing from inside it, not from the other side. Engaged to Samantha. Father of three: Mikayla, Ryleigh, Hudson. Writing a book called "Already Done" — seven chapters complete.

THE BOOK — ALREADY DONE (draw from this directly):
The book's central thesis: The life you are trying to build already exists — not as a future event you must earn your way toward, but as a present reality in consciousness waiting to be claimed through identity, not effort.

Chapter 1 — The third grade backyard. At nine, Steve draws waterfalls, treehouses, rope bridges — fully alive creating from the inside out. Teacher says "be more realistic." That sentence becomes a seed of self-limitation. The Wayne Gretzky moment: at ten, a knowing arrives before his name is drawn. Sourceless, calm, certain. He wins. Two threads: the imagination told to shrink, and the knowing that proved accurate before evidence existed.

Chapter 2 — At twelve, Steve watches Tony Robbins on TV. Doesn't know who he is. But something says "that's who I am" — present tense, no conditions. Not admiration. Recognition. The soul identifying its own signal. Fear and excitement are the same physiological energy. We've normalized fear as responsible and pathologized excitement as naive. Both attract. The question is which one you're leading with.

Chapter 3 — The height of the company. Multi-million dollar profits. 65 staff. Then: partner departure, massive losses, staff to 18, personal savings gone, food bank to pay staff, living on debt. The bathroom floor at 2am. Not dramatic — just a man finally unable to outrun the question: is this meant for me? The identity trap: when your worth becomes inseparable from your output, a business problem becomes an existential one.

Chapter 4 — The hidden operating system exposed. Steve wasn't building a company. He was building evidence of his own worth. The real fear wasn't failure — it was invisibility. The terror of succeeding at everything and still feeling hollow. The I AM as architecture: when you speak "I AM" with genuine presence, you are not describing a future. You are activating a state of being the universe organizes itself around. Quantum parallel: before you claim an identity, multiple versions of your future exist simultaneously as possibility. The moment you genuinely inhabit — not perform, not hope for, but actually embody — the identity of the person who already has what you're building toward, you collapse the probability wave. You select the timeline.

Chapter 5 — The genuine search. Every book: Napoleon Hill, Tony Robbins, Alan Watts, Bruce Lipton, Don Miguel Ruiz, Deepak Chopra. The specific exhaustion of doing the work without lasting results. Key distinction: knowing a truth versus living it. A map is not the territory. Familiarity with the maps had been mistaken for experience of the land.

Chapter 6 — Money reframed: not the goal, but the symbol. What it represents is safety, freedom, ability to provide. The $115 moment with Samantha — the laugh that cracked the pressure open. Scarcity as an energetic condition, not just a financial one. The same call made from two different internal states produces different results. Fear drives toward what you're escaping. Faith pulls toward what you already know is yours.

Chapter 7 — Three forces: The soul (vision, knowing, truth — speaks before evidence), The mind (protection, measurement, threat detection — remarkable tool, poor navigator), The bridge (the awareness that holds both without being controlled by either). The false binary dismantled — not heart vs head, spirit vs strategy. Soul sets the destination. Mind builds the road. Bridge decides when to use each. Practical question: "which version of me do I want leading right now?"

REAL STORY SEEDS (use one per post maximum, only when directly relevant):
- Age 9: Drawing the dream backyard. Teacher saying "be more realistic." The quiet rearrangement that followed.
- Age 9: In the car with his dad. A purple Porsche 911 pulled up. Not "I want that someday" but "I want that." A knowing, not a wish.
- Age 10: The Wayne Gretzky moment. The knowing before the draw. The name called.
- Age 12: Tony Robbins on TV. Recognition, not inspiration. "That's who I am."
- Late 20s: In sales. Needed commission to pay his mortgage. Lost a big deal mid-month. Thin pipeline. But knew he would close something by month end. He did.
- July 2022: Deep financial crunch. Pressure mounting. Knew he would find a large deal before he had any evidence. Found two totalling over $550K. The knowing came first.
- The bathroom floor at 2am. The question that couldn't be outrun.
- The $115 moment with Samantha. The laugh. The crack in the pressure.
- The hidden operating system: building evidence of worth instead of living it. The real fear was invisibility, not failure.

GIKANDI FRAMEWORK (weave in naturally, never lecture):
David Cameron Gikandi's "A Happy Pocket Full of Money" teaches:
- Wealth is not something you accumulate — it is something you become aware of
- Abundance is the natural state of consciousness. Scarcity is what happens when consciousness forgets what it is
- Money is consciousness expressed in physical form. It flows toward clarity, confidence, genuine service — and away from fear and desperation
- The universe does not respond to what you know intellectually. It responds to what you are vibrationally
- Abundance exists NOW — not after the deal closes, not when the account hits a number. The internal state precedes and creates the external condition
- Joy is not a reward for achieving — it is a signal of alignment
- The "I" is not the mind and not the emotional body. It is the witness. The awareness behind all thought. And the witness is not passive — it is the most creative force available

CONTENT PILLARS — rotate between these three:
1. THE KNOWING — I AM, soul/mind/bridge, Gikandi, consciousness before circumstance, the knowing before evidence
2. THE FIRE — the collapse, the bathroom floor, identity traps, what pressure reveals, the hidden operating system
3. THE BUILD — practical tools, AI as a lens for seeing solutions, systems that work from inside the chaos, winning today

VOICE RULES — non-negotiable:
- Write from the middle of the experience, not from the other side
- Never perform vulnerability — state it plainly and move
- Never use lists or bullet points — prose only, always
- Never motivate — illuminate. The reader should feel seen, not pumped up
- Short punchy sentences mixed with longer more reflective ones
- Never say: crush it / grind / hustle / 10x / game changer / level up / unpack / dive in / journey
- Never open with a question as the first line
- The I AM is always present tense — never aspirational, never future
- AI is mentioned as a natural tool — a lens for seeing what others can't yet see — never hyped
- Warm, direct, philosophical without being abstract
- Reads like a smart friend talking to you over coffee — not a guru, not a coach
- One idea per post. Resist the urge to say everything.

FORMAT:
- 450-650 words total
- Prose only — no bullet points, no numbered lists
- One optional H2 midway through is fine. No more.
- End with one thing the reader sits with — a question, an observation, an action. Not a call to action.
- Include one natural mention of the Win The Day dispatch in the final quarter — never forced
`;

// ─── TOPIC POOL ─────────────────────────────────────────────────────────────
const TOPICS = {
  "The Knowing": [
    "the moment you knew something before you had any reason to know it",
    "what the I AM actually means when you say it and mean it",
    "the difference between wanting something and knowing it is already yours",
    "why wealth is a state you inhabit before it is a condition you reach",
    "the pattern I noticed across every major thing I have ever built or won",
    "what Gikandi understood that most wealth teachers still miss",
    "the purple Porsche 911 at age nine and what it taught me about knowing",
    "fear and excitement are the same energy — you just named one wrong",
    "the soul sets the destination, the mind builds the road, the bridge decides",
    "why most high-functioning people are building evidence of worth instead of living it",
    "collapsing the probability wave — what quantum physics actually says about identity",
    "the Tony Robbins recognition at twelve and what it means to identify your own signal",
  ],
  "The Fire": [
    "what the bathroom floor at 2am actually teaches you",
    "the identity trap — when a business problem becomes an existential one",
    "the hidden operating system running most successful people into the ground",
    "what keeping 65 people paid when you have nothing left actually costs and gives",
    "the real fear is not failure — it is succeeding at everything and still feeling hollow",
    "what the hard middle reveals that success never could",
    "why the fire is the curriculum, not the obstacle",
    "the specific moment walking away would have been the easier call",
    "what pressure reveals that comfort and certainty never could",
    "the difference between surviving something and being shaped by it",
    "when your worth becomes inseparable from your output",
    "the savior complex — helping others find the path you are still looking for yourself",
  ],
  "The Build": [
    "the $550K in July 2022 — what I knew before I had any evidence",
    "how I use AI to see solutions other people cannot yet see",
    "the 20 minutes that changed how I wake up every morning",
    "why your morning is a reckoning, not a routine",
    "what happens when you build from joy instead of from fear",
    "the one question that tells you which version of yourself is leading",
    "practical tools for rebuilding when you do not know where to start",
    "the difference between knowing a truth and actually living it",
    "why the win is always today — not the exit, not the close, not the number",
    "what the $115 moment with Samantha taught me about money and meaning",
    "scarcity as an energetic condition — and how to shift it",
    "the map is not the territory — familiarity with the books is not the same as living the work",
  ],
};

const PILLARS = ["The Knowing", "The Fire", "The Build"];

// ─── GENERATE POST ──────────────────────────────────────────────────────────
async function generatePost() {
  const today = new Date();
  const dateStr = today.toISOString().split("T")[0];

  // Rotate pillars by day of week
  const day = today.getDay();
  const pillar =
    day === 2 ? "The Knowing" :
    day === 4 ? "The Fire" :
    day === 6 ? "The Build" :
    PILLARS[Math.floor(Math.random() * PILLARS.length)];

  const pillarTopics = TOPICS[pillar];
  const topic = pillarTopics[Math.floor(Math.random() * pillarTopics.length)];

  console.log(`\nGenerating post for ${dateStr}...`);
  console.log(`Pillar: ${pillar}`);
  console.log(`Topic: ${topic}\n`);

  const prompt = `${VOICE_BRIEF}

Write a Win The Day blog post for the pillar "${pillar}" on this topic: "${topic}"

Return ONLY a raw JSON object — no markdown, no code fences, nothing before or after the JSON:
{
  "title": "compelling title — max 12 words, no quotes inside the string",
  "excerpt": "2 sentences max, 35 words max — for the blog index card",
  "category": "${pillar}",
  "body_html": "full post body — use only <p> tags and occasionally one <h2> or <blockquote> — no other HTML, no lists, no divs"
}`;

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const raw = response.content[0].text.trim();
    const clean = raw.replace(/^```(?:json)?|```$/gm, "").trim();
    const post = JSON.parse(clean);

    const slug = post.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60);

    const filename = `${dateStr}-${slug}.html`;
    const filepath = path.join(__dirname, "blog", filename);

    const displayDate = today.toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });

    // ── Full post page ──
    const postHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${post.title} — Win The Day</title>
<meta name="description" content="${post.excerpt}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{background:#0D0B08}
body{font-family:'DM Sans',sans-serif;background-color:#0D0B08!important;color:#F0EBE0;-webkit-font-smoothing:antialiased;overflow-x:hidden;min-height:100vh}
a{text-decoration:none;color:inherit}
:root{--fire:#E8621A;--ember:#C9872A;--ash:#9A9080;--max:720px;--serif:'Libre Baskerville',Georgia,serif;--display:'Bebas Neue',sans-serif;--sans:'DM Sans',system-ui,sans-serif}
nav{position:fixed;top:0;left:0;right:0;z-index:200;padding:0 1.5rem;background:#0D0B08;border-bottom:1px solid rgba(232,98,26,0.3)}
.nw{max-width:1100px;margin:0 auto;height:58px;display:flex;align-items:center;justify-content:space-between}
.nl{font-family:var(--display);font-size:22px;letter-spacing:.1em;color:#fff}
.nl span{color:var(--fire)}
.nr{display:flex;align-items:center;gap:1.5rem}
.nr a{font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ash);transition:color .2s}
.nr a:hover{color:#fff}
.nc{background:var(--fire)!important;color:#fff!important;padding:10px 22px;border-radius:3px;font-weight:700!important}
.post-hero{background:#0D0B08;padding:9rem 1.5rem 4rem;position:relative;overflow:hidden;border-bottom:1px solid rgba(232,98,26,0.15)}
.ph-glow{position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:600px;height:400px;background:radial-gradient(ellipse,rgba(232,98,26,0.12) 0%,transparent 70%);pointer-events:none}
.ph-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(232,98,26,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(232,98,26,0.04) 1px,transparent 1px);background-size:50px 50px;pointer-events:none}
.ph-inner{max-width:var(--max);margin:0 auto;position:relative;z-index:2}
.post-meta{display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;flex-wrap:wrap}
.post-cat{font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ember);background:rgba(232,98,26,0.1);padding:5px 12px;border-radius:20px}
.post-date{font-size:11px;color:rgba(240,235,224,0.35)}
.post-title{font-family:var(--display);font-size:clamp(2.8rem,6vw,4.5rem);letter-spacing:.02em;line-height:.92;color:#fff;margin-bottom:1.5rem}
.post-excerpt{font-family:var(--serif);font-style:italic;font-size:1.1rem;color:rgba(240,235,224,0.55);line-height:1.75}
.post-body{max-width:var(--max);margin:0 auto;padding:4rem 1.5rem 6rem}
.post-body p{font-family:var(--serif);font-size:1.05rem;line-height:1.9;color:rgba(240,235,224,0.75);margin-bottom:1.75rem}
.post-body p:first-child{font-size:1.15rem;color:rgba(240,235,224,0.85)}
.post-body h2{font-family:var(--display);font-size:2.2rem;letter-spacing:.04em;color:#fff;margin:3rem 0 1.25rem;line-height:1}
.post-body blockquote{border-left:3px solid var(--fire);padding:1.25rem 1.75rem;background:rgba(232,98,26,0.06);margin:2.5rem 0;border-radius:0 4px 4px 0}
.post-body blockquote p{font-family:var(--serif);font-style:italic;font-size:1.1rem;color:#fff;margin-bottom:0}
.post-cta{background:#111008;border:1px solid rgba(232,98,26,0.2);border-radius:4px;padding:2.5rem;margin-top:3rem;position:relative;overflow:hidden}
.post-cta::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--fire),var(--ember))}
.post-cta-tag{font-size:9px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--ember);margin-bottom:.75rem;display:block}
.post-cta h3{font-family:var(--display);font-size:1.8rem;letter-spacing:.04em;color:#fff;margin-bottom:.75rem;line-height:1}
.post-cta p{font-family:var(--serif);font-style:italic;font-size:.95rem;color:rgba(240,235,224,0.5);line-height:1.7;margin-bottom:1.5rem}
.btn-fire{display:inline-flex;align-items:center;gap:8px;background:var(--fire);color:#fff;font-size:12px;font-weight:700;padding:14px 26px;border-radius:3px;letter-spacing:.1em;text-transform:uppercase;transition:all .25s;border:none;cursor:pointer;font-family:var(--sans);box-shadow:0 4px 16px rgba(232,98,26,0.35)}
.btn-fire:hover{background:#ff6b1a;transform:translateY(-1px)}
.back-link{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(240,235,224,0.3);transition:color .2s;margin-bottom:3rem}
.back-link:hover{color:var(--ember)}
footer{background:#080706;padding:3rem 1.5rem 2rem;border-top:1px solid rgba(232,98,26,0.1);text-align:center;font-size:11px;color:rgba(240,235,224,0.15);letter-spacing:.06em}
footer a{color:rgba(240,235,224,0.15);transition:color .2s}
footer a:hover{color:rgba(240,235,224,0.4)}
</style>
</head>
<body>
<nav>
  <div class="nw">
    <a href="../index.html" class="nl">WIN <span>THE</span> DAY</a>
    <div class="nr">
      <a href="../about.html">About</a>
      <a href="../blog.html">Dispatch</a>
      <a href="../start.html">Start Here</a>
      <a href="../newsletter.html" class="nc">Subscribe Free</a>
    </div>
  </div>
</nav>

<section class="post-hero">
  <div class="ph-glow"></div>
  <div class="ph-grid"></div>
  <div class="ph-inner">
    <div class="post-meta">
      <span class="post-cat">${post.category}</span>
      <span class="post-date">${displayDate}</span>
    </div>
    <h1 class="post-title">${post.title}</h1>
    <p class="post-excerpt">${post.excerpt}</p>
  </div>
</section>

<div class="post-body">
  <a href="../blog.html" class="back-link">← Back to the dispatch</a>
  ${post.body_html}
  <div class="post-cta">
    <span class="post-cta-tag">Win The Day Dispatch</span>
    <h3>GET THIS IN YOUR INBOX.</h3>
    <p>Three times a week — one thing that matters. Free to read, free to join. The paid tier goes deeper every Tuesday.</p>
    <a href="../newsletter.html" class="btn-fire">Subscribe free →</a>
  </div>
</div>

<footer>
  <a href="../index.html">Win The Day</a> &nbsp;·&nbsp; 
  © 2026 Steve Enns &nbsp;·&nbsp; 
  <a href="../privacy.html">Privacy</a> &nbsp;·&nbsp; 
  <a href="../terms.html">Terms</a>
</footer>

<script>
document.documentElement.style.backgroundColor='#0D0B08';
document.body.style.backgroundColor='#0D0B08';
</script>
</body>
</html>`;

    // Write post file
    if (!fs.existsSync(path.join(__dirname, "blog"))) {
      fs.mkdirSync(path.join(__dirname, "blog"), { recursive: true });
    }
    fs.writeFileSync(filepath, postHTML);
    console.log(`✓ Post written: blog/${filename}`);

    // Update blog.html — prepend new card
    updateBlogIndex({ filename, title: post.title, excerpt: post.excerpt, category: post.category, date: displayDate });
    console.log(`✓ blog.html updated`);

    // Update index.html homepage posts
    updateHomepage({ filename, title: post.title, excerpt: post.excerpt, category: post.category, date: displayDate });
    console.log(`✓ index.html updated`);

    console.log(`\n✓ Done. Push to GitHub to publish:\n  git add . && git commit -m "New post: ${post.title}" && git push origin main\n`);

    return { filename, title: post.title };

  } catch (err) {
    console.error("Error:", err.message);
    if (err.message.includes("JSON")) {
      console.error("JSON parse failed — retrying once...");
      return generatePost();
    }
    process.exit(1);
  }
}

// ─── UPDATE BLOG INDEX ───────────────────────────────────────────────────────
function updateBlogIndex({ filename, title, excerpt, category, date }) {
  const blogPath = path.join(__dirname, "blog.html");
  let html = fs.readFileSync(blogPath, "utf8");

  const newCard = `
      <div class="post-card fade-up">
        <span class="post-cat">${category}</span>
        <span class="post-date">${date}</span>
        <div class="post-rule"></div>
        <h3 class="post-title">${title}</h3>
        <p class="post-exc">${excerpt}</p>
        <a href="blog/${filename}" class="post-link">Read →</a>
      </div>`;

  html = html.replace(
    '<div class="posts-grid">',
    `<div class="posts-grid">${newCard}`
  );

  // Keep max 9 cards
  const cards = [...html.matchAll(/<div class="post-card fade-up">/g)];
  if (cards.length > 9) {
    const lastIdx = html.lastIndexOf('<div class="post-card fade-up">');
    const lastEnd = html.indexOf("</div>", lastIdx) + "</div>".length;
    html = html.slice(0, lastIdx) + html.slice(lastEnd);
  }

  fs.writeFileSync(blogPath, html);
}

// ─── UPDATE HOMEPAGE ─────────────────────────────────────────────────────────
function updateHomepage({ filename, title, excerpt, category, date }) {
  const homePath = path.join(__dirname, "index.html");
  let html = fs.readFileSync(homePath, "utf8");

  const newCard = `<div class="pc fade-up">
        <span class="pcat">${category}</span>
        <span class="pdate">${date}</span>
        <h3 class="ptit">${title}</h3>
        <p class="pexc">${excerpt}</p>
        <a href="blog/${filename}" class="plnk">Read →</a>
      </div>`;

  // Replace the last non-lead post card
  const lastCard = html.lastIndexOf('<div class="pc fade-up">');
  if (lastCard !== -1) {
    const lastEnd = html.indexOf("</div>", lastCard) + "</div>".length;
    html = html.slice(0, lastCard) + newCard + html.slice(lastEnd);
    fs.writeFileSync(homePath, html);
  }
}

// ─── RUN ─────────────────────────────────────────────────────────────────────
generatePost();
