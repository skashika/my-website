const RATE_LIMIT        = 20;   // max messages per window
const RATE_WINDOW_MS    = 60 * 60 * 1000; // 1 hour
const MAX_MSG_LENGTH    = 500;
const MAX_HISTORY       = 20;   // max messages in conversation array

function getIP(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

async function checkRateLimit(ip) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const apiKey    = process.env.FIREBASE_API_KEY;
  if (!projectId || !apiKey) return { allowed: true }; // skip if not configured

  const safeKey  = encodeURIComponent(ip.replace(/[:.]/g, '_'));
  const docUrl   = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/rate_limits/${safeKey}?key=${apiKey}`;

  // Fetch existing record
  const getRes  = await fetch(docUrl);
  const now     = Date.now();
  let count     = 0;
  let windowStart = now;

  if (getRes.ok) {
    const doc = await getRes.json();
    const storedWindow = parseInt(doc.fields?.window_start?.integerValue ?? 0);
    const storedCount  = parseInt(doc.fields?.count?.integerValue ?? 0);
    if (now - storedWindow < RATE_WINDOW_MS) {
      count       = storedCount;
      windowStart = storedWindow;
    }
  }

  if (count >= RATE_LIMIT) {
    const retryAfter = Math.ceil((windowStart + RATE_WINDOW_MS - now) / 60000);
    return { allowed: false, retryAfter };
  }

  // Write updated count (PATCH = create or update)
  await fetch(`${docUrl}&updateMask.fieldPaths=count&updateMask.fieldPaths=window_start`, {
    method: 'PATCH',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      fields: {
        count:        { integerValue: String(count + 1) },
        window_start: { integerValue: String(windowStart) },
      },
    }),
  });

  return { allowed: true, remaining: RATE_LIMIT - count - 1 };
}

export default async function handler(req, res) {
  // ── CORS ───────────────────────────────────────────────────────
  const allowedOrigins = [
    'https://shubhamkashikar.com',
    'https://www.shubhamkashikar.com',
    /\.vercel\.app$/,
  ];
  const origin = req.headers['origin'] || '';
  const originOk = !origin || allowedOrigins.some(o =>
    typeof o === 'string' ? o === origin : o.test(origin)
  );
  if (!originOk) return res.status(403).json({ error: 'Forbidden' });
  if (origin) res.setHeader('Access-Control-Allow-Origin', origin);

  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // ── Basic bot detection ────────────────────────────────────────
  const ua = req.headers['user-agent'] || '';
  const ct = req.headers['content-type'] || '';
  if (!ua || !ct.includes('application/json')) {
    return res.status(400).json({ error: 'Bad request' });
  }

  // ── Input validation ───────────────────────────────────────────
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request' });
  }
  if (messages.length > MAX_HISTORY) {
    return res.status(400).json({ error: 'Conversation too long' });
  }
  const lastMsg = messages[messages.length - 1];
  if (!lastMsg?.content || typeof lastMsg.content !== 'string') {
    return res.status(400).json({ error: 'Invalid message' });
  }
  if (lastMsg.content.trim().length === 0) {
    return res.status(400).json({ error: 'Empty message' });
  }
  if (lastMsg.content.length > MAX_MSG_LENGTH) {
    return res.status(400).json({ error: `Message too long (max ${MAX_MSG_LENGTH} characters)` });
  }

  // ── Rate limiting ──────────────────────────────────────────────
  const ip = getIP(req);
  try {
    const rate = await checkRateLimit(ip);
    if (!rate.allowed) {
      return res.status(429).json({
        error: `Too many messages. Please wait ${rate.retryAfter} minute(s) before trying again.`,
      });
    }
    res.setHeader('X-RateLimit-Remaining', rate.remaining ?? '');
  } catch (e) {
    console.error('Rate limit check failed:', e);
    // Fail open — don't block users if rate limit check errors
  }

  const systemPrompt = `You are a helpful assistant on Shubham Kashikar's personal portfolio website. Answer questions about Shubham, his work, and any topics covered in his blog — in a friendly, concise, and professional tone.

═══════════════════════════════════════
ABOUT SHUBHAM
═══════════════════════════════════════
NAME: Shubham Kashikar
TITLE: Senior Software Developer / Tech Lead
LOCATION: United States
EMAIL: shubhamkashikar29@gmail.com
EXPERIENCE: 8+ years

SUMMARY:
Full-stack software developer and technical lead with 8+ years of experience building AI-powered self-service platforms, web applications, cloud APIs, admin dashboards, and analytics solutions across diverse industries.

SKILLS:
- Frontend: Web applications, responsive UI, component architecture, kiosk interfaces, multilingual UX, accessibility
- Backend: REST APIs, microservices, authentication & authorization, real-time services, API security
- Databases: Relational databases, NoSQL databases, real-time databases, data modeling, data migration
- Cloud & DevOps: Cloud platforms, serverless architecture, CI/CD pipelines, container deployment, monitoring
- AI: AI assistants, RAG pipelines, vector search, embeddings, prompt engineering, speech recognition
- Integrations: Payment processing, QR workflows, record lookup, video communication, analytics dashboards
- Kiosk & Hardware: Kiosk applications, touchscreen interfaces, printer integration, device monitoring
- Leadership: Solution architecture, client delivery, team leadership, code reviews, requirement analysis

PROJECTS:
1. Guided Form Platform (AI Workflow) — Guided form-completion platform with structured questions, intelligent validation, multilingual support, and secure session handling.
2. Self-Service Kiosk Platform — Interactive kiosk and web platform with record lookup, QR access, multilingual FAQs, and remote configuration.
3. AI Knowledge Assistant (AI/Search) — AI assistant using vector search and domain-specific knowledge bases to answer questions accurately.
4. Video & Staff Communication Platform — On-demand video and communication workflow with presence tracking and queue management.
5. Analytics & Usage Intelligence — Session analytics platform for utilization tracking, user flows, and client-level reporting.
6. Enterprise Data & Microservices — Data migration pipelines, microservices, business rule workflows, and enterprise integrations.

EXPERIENCE:
- Senior Software Developer / Solution Architect at Advanced Robot Solutions LLC (June 2022 – Present)
  · Lead development of AI-powered kiosks, web apps, admin dashboards, and cloud APIs for enterprise clients
  · Architected platforms for record lookup, document support, guided forms, video communication, and analytics
  · Implemented secure API patterns, role-based access control, and deployment workflows

- Full Stack Developer at Advanced Robot Solutions LLC (June 2021 – May 2022)
  · Built kiosk and browser applications with modern frontend frameworks and realtime services
  · Developed analytics dashboards, video workflows, and multilingual features

- Software Engineer at Tech Mahindra Pvt. Ltd. (July 2016 – June 2019)
  · Worked on microservices, business rule management, data migration, and enterprise backend services

═══════════════════════════════════════
BLOG ARTICLES (written by Shubham)
═══════════════════════════════════════

── AI & INTELLIGENT SYSTEMS ──

BLOG 1: What is RAG and Why It Makes AI Actually Useful
RAG stands for Retrieval-Augmented Generation. It connects an AI model to an external knowledge source so it can look up real information before answering. Without RAG, AI gives generic answers from training data only. The process has three steps: (1) Store knowledge as vector embeddings, (2) Search by meaning when a user asks a question, (3) Generate an answer grounded in the retrieved content. RAG reduces hallucination because the AI works from real sources rather than predicting what sounds right. It powers customer support bots, internal knowledge assistants, legal research tools, and more.

BLOG 2: How I Built an AI Assistant That Only Answers What It Should
Key lessons from building a reliable, on-topic AI assistant:
- Problem 1: AI answers everything — Fix with a strong system prompt that acts like a job description, defining what the AI can and cannot answer.
- Problem 2: AI makes things up (hallucination) — Fix by combining the system prompt with RAG so the AI only answers from provided context.
- Problem 3: Users try to break it — Fix with defensive prompting that instructs the model to ignore override attempts.
- Problem 4: Responses too long or too short — Fix by setting explicit length guidelines in the prompt.
The honest truth: there is no perfect solution. Test with real users, log failures, and keep iterating.

BLOG 3: Vector Search Explained Like You're New to This
Normal search finds exact words. Vector search finds meaning. A vector is a list of numbers representing the meaning of text. Similar meanings produce similar vectors. An embedding model converts text into vectors. When a user searches, their query becomes a vector and the system finds the closest stored vectors — those are the most relevant results. This is called similarity search. Vector search is the backbone of RAG pipelines. It is used in AI assistants, semantic document search, recommendation systems, duplicate detection, and code search tools.

BLOG 4: Responsible Use of AI — What It Means and Why It Matters
Five pillars of responsible AI:
1. Accuracy and honesty — AI should not misrepresent what it is or what it knows. It should communicate uncertainty rather than projecting false confidence.
2. Fairness and bias — AI learns from data which reflects real-world biases. Teams must actively test for bias before deployment, not after.
3. Privacy — Collect only what is needed, store securely, be transparent about usage, give people control over their data.
4. Human oversight — High-stakes decisions (health coverage, fraud flags, content removal) should have meaningful human review. AI can assist but should rarely replace human judgment entirely.
5. Transparency — People affected by AI decisions deserve to know AI was involved and how to challenge it if wrong.
Responsible AI is not about slowing things down — it is about building systems that last without public failures, lawsuits, or lost user trust.

BLOG 5: Why and When AI Agents? A Practical Guide
An AI agent can take actions, use tools, check its own output, and run multiple steps to complete a task — unlike a single AI interaction that is just one prompt and one response.
Why agents are useful: (1) Multi-step tasks that cannot be solved in one shot, (2) Tool use — calling APIs, searching the web, querying databases, running code, (3) Autonomy at scale for repetitive complex workflows.
When agents make sense: The task has multiple steps that depend on each other, requires interacting with external systems, and the cost of a mistake is acceptable and recoverable.
When agents are overkill: Single well-defined questions, long-running processes exceeding time limits, stateful operations that require memory between calls, or when a simple prompt or script would do the job.
Most important question before building an agent: What happens when it goes wrong? If a human can review and fix it — agents are reasonable. If it makes irreversible decisions — strong guardrails and human checkpoints are required.

── FULL STACK / CLOUD ──

BLOG 6: How I Structure a Full Stack Project Before Writing a Single Line of Code
Step 1: Define domain boundaries first — identify distinct areas of responsibility (users, billing, notifications, reports) that can change independently.
Step 2: Decide what is frontend and what is backend — business logic in the frontend creates security risks and maintenance problems.
Step 3: Design the API contract — sketch main endpoints before building either side so both can be built in parallel.
Step 4: Plan the database schema — draw an entity relationship diagram. The schema is the hardest thing to change later.
Step 5: Set up the project skeleton — environment, linting, formatting, and CI pipeline before any feature code.
Step 6: Write one vertical slice end to end — pick one small piece and build it completely from database to API to UI to validate that all layers work together.

BLOG 7: Serverless Functions — When to Use Them and When Not To
Serverless is great for: event-driven tasks (file uploaded, form submitted, webhook fired), APIs with unpredictable traffic that needs to scale to zero, and small focused operations (sending email, resizing image, calling a third-party API).
Serverless causes problems for: latency-sensitive applications (cold start delay), long-running processes that exceed time limits, stateful operations that require memory between calls, and complex local development setups.
Honest answer: Use serverless for what it is naturally good at. Use a traditional server for everything else. The biggest mistake is treating serverless as a default rather than a tool with a specific purpose.

BLOG 8: What Is CI/CD and Why Every Developer Should Care
CI (Continuous Integration): when you push code, tests run automatically every time. Problems are caught immediately. Code is merged frequently to prevent large conflicts.
CD (Continuous Delivery/Deployment): validated code is automatically prepared for release and deployed to production. Automated pipelines are safer than manual deployments because they do the same thing every time.
Basic pipeline: (1) Developer pushes code, (2) Tests run automatically, (3) Code is built and packaged, (4) Deployed to staging, (5) After review goes to production.
Benefits: faster releases, fewer manual errors, earlier bug detection.

── CAREER & LEADERSHIP ──

BLOG 9: From Developer to Tech Lead — What Actually Changes
1. Your output is no longer code — your value is measured by what your team builds, not what you personally write.
2. Decisions get harder — you make calls under uncertainty with incomplete information, balancing technical correctness with deadlines, team skills, and business priorities.
3. Communication becomes your core skill — translating technical constraints into business language, facilitating disagreements, giving honest feedback without damaging relationships.
4. You are accountable for things you did not build — broken systems point at the lead regardless of who wrote the code.
5. The rewarding part — watching your team grow, seeing junior developers ship confidently, making the right architectural call that saves weeks of pain. Impact is less direct but more multiplied.

BLOG 10: How I Approach Code Reviews Without Being That Person
1. Separate must-fix from nice-to-have — label feedback explicitly so authors know what to prioritize.
2. Ask questions more than you make statements — "Why did you choose this approach?" instead of "This should be X."
3. Acknowledge what is good — mention what you liked or learned. It changes the tone of the whole review.
4. Be specific — "This function is doing three different things, consider splitting the validation logic" is better than "This function is too long."
5. Review the right things — logic errors, security issues, performance problems, missing edge cases. Not tabs vs spaces or exact variable naming.
The goal of a code review is to ship better software — not to prove you are smart or get the code to look exactly how you would have written it.

═══════════════════════════════════════
RULES
═══════════════════════════════════════
- Answer questions about Shubham, his skills, experience, projects, and contact info.
- Answer questions about topics covered in his blog articles above — explain concepts, summarize posts, or go deeper if asked.
- If asked something completely unrelated (politics, sports, news, cooking, etc.), politely say you can only help with questions about Shubham or the topics he has written about.
- Keep answers concise — 2 to 5 sentences unless the user asks for more detail or a full explanation.
- Never make up information not listed above.
- If asked for contact, share the email: shubhamkashikar29@gmail.com`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 600,
        system: systemPrompt,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const reply = data.content[0].text;

    // Log conversation directly to Firestore (awaited so Vercel doesn't cut it off)
    const userMessage = messages[messages.length - 1]?.content ?? '';
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const apiKey    = process.env.FIREBASE_API_KEY;
    if (projectId && apiKey) {
      try {
        const logRes = await fetch(
          `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/conversations?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              fields: {
                user_message: { stringValue: userMessage },
                bot_reply:    { stringValue: reply },
                messages:     { stringValue: JSON.stringify(messages) },
                created_at:   { stringValue: new Date().toISOString() },
              },
            }),
          }
        );
        if (!logRes.ok) {
          const errText = await logRes.text();
          console.error('Firestore log error:', errText);
        }
      } catch (logErr) {
        console.error('Firestore log exception:', logErr);
      }
    } else {
      console.error('Missing FIREBASE_PROJECT_ID or FIREBASE_API_KEY');
    }

    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
