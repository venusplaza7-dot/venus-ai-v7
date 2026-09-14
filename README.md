Venus OS — v7 (code) → v8 (live prod)
Hey — I'm Ron. This is the code behind my 8-agent engine.

v7 = this repo = the code you can read
v8 = live on Vercel = the product that sends 100 domains/day

Live prod: venus-ai-v8.vercel.app/[any-domain]?niche=auto
Example: venus-ai-v8.vercel.app/toyota-of-denver?niche=auto

BCC proof inbox (proves we sent): venusailux@gmail.com
Cron that runs it: /api/cron/blast

Why 19 versions?
V1-V6 kept double-sending at 1:01 and 1:30 AM. Same shop got 2 emails. Embarrassing.

V7 is here in GitHub. V8 fixed it with a KV lock BEFORE the send. Zero duplicates since. That's what runs in prod today.

Folder structure — what you're looking at:
venus-ai-v7 / app /
├── api/                 -> agent endpoints, blast logic, KV lock
├── app/admin/monitor    -> ops dashboard to watch sends fail/succeed
├── dashboard/           -> customer view (3 weeks ago)
├── live/[b]             -> live agent-generated pages (dynamic)
├── o/[id] / p/[id]      -> personalized luxury HTML that converts
├── make-live.js         -> script to push draft to live
├── layout.js / page.js  -> Next.js 14 App Router (migrated from page.tsx)
└── page.tsx             -> legacy, kept for reference
This is Next.js 14 App Router, not pages. Edge runtime.

The 3 hard things I solved
1. The 1:01 AM double-send bug
Upstash KV lock before SMTP. Before: 8% duplicates. After: 0%. Check api/ — lock key is domain:city:date.

2. The 2001-2020 filter
95% accuracy detecting old models without manual QA. No human in loop. Runs on 10k+ domains.

3. Defensible outbound
BCC inbox architecture. Every send is BCC'd to venusailux@gmail.com — auditable proof.

Stack
Frontend: Next.js 14, TypeScript, Tailwind, page.tsx / page.js
Backend: Node.js, Flask bits, Brevo API, Upstash KV (Redis)
Data: PostgreSQL, DynamoDB, GraphQL
Infra: Vercel Pro, Cron Jobs
AI: LLM prompting, tool-use, structured outputs

v7 -> v8 changelog
v7: open code, App Router, basic blast
v8: + KV distributed lock, + BCC-proof verification, + edge runtime page.js, + 100/day/city scaling
How to run locally
bash
npm install
npm run dev
# set env: UPSTASH_KV_*, BREVO_API_KEY
Then hit /api/cron/blast?city=denver&limit=5

For hiring managers
I'm looking for Full-Stack AI Agent roles (remote). This repo shows:

Autonomous agent dev (8 agents)
Full-stack integration (Next.js + API + DB)
Production reliability (distributed lock, guardrails, BCC proof)
Solo-built V1-V19, nights/weekends in Lahore.
Happy to walk through any file on a call.

— Ron | Ron@venus7.com | venus-ai-v8.vercel.app

