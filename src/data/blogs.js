export const blogs = [
  // ── AI & Intelligent Systems ──────────────────────────────────
  {
    id: 'what-is-rag',
    category: 'AI & Intelligent Systems',
    title: 'What is RAG and Why It Makes AI Actually Useful',
    excerpt: 'Large language models are impressive  but they only know what they were trained on. RAG fixes that by giving AI access to your own data in real time.',
    readTime: '4 min read',
    content: `Most people think AI is magic. You ask a question, it answers. But there's a real problem hiding underneath  AI models only know what they learned during training. Ask them about something recent, something private, or something specific to your business, and they'll either make something up or admit they don't know.

That's where RAG comes in.

**What does RAG stand for?**

RAG stands for Retrieval-Augmented Generation. It's a technique that connects an AI model to an external knowledge source  like your documents, database, or website  so it can look up real information before answering.

Think of it like this: instead of asking someone to answer from memory, you hand them a reference book first, then ask your question.

**How does it work?**

The process has three steps:

1. **Store your knowledge**  Your documents, FAQs, or data are broken into small chunks and stored in a vector database (a special kind of database that understands meaning, not just keywords).

2. **Search by meaning**  When a user asks a question, the system searches the database for the most relevant chunks. It finds content that matches the intent, not just exact words.

3. **Generate an answer**  The matched content is handed to the AI as context, and the AI writes a clear, accurate answer based on it.

**Why does this matter?**

Without RAG, AI gives generic answers. With RAG, AI gives answers grounded in your actual data  your policies, your products, your history.

It also reduces hallucination  the problem where AI confidently makes things up. When you give it real sources, it has less reason to invent.

**Where is it used?**

RAG powers customer support bots, internal knowledge assistants, legal research tools, and more. Any situation where you need AI to be accurate about specific information is a good candidate.

It's one of the most practical AI techniques available today, and it's only getting better.`,
  },
  {
    id: 'ai-guardrails',
    category: 'AI & Intelligent Systems',
    title: 'How I Built an AI Assistant That Only Answers What It Should',
    excerpt: 'Getting AI to talk is easy. Getting it to stay on topic, stay accurate, and not embarrass you in production  that takes real work.',
    readTime: '5 min read',
    content: `When I built an AI assistant for a public-facing platform, the first version worked great in testing. It answered questions clearly, sounded smart, and impressed everyone in the demo.

Then we put it in front of real users.

Within hours it was going off-script  answering unrelated questions, making up details, and occasionally giving confident but completely wrong answers. We had to fix it fast.

Here's what I learned about building AI that behaves reliably.

**Problem 1: The AI answers everything**

By default, language models want to be helpful. Ask them anything and they'll try to answer  even if the question is outside their job.

The fix is a strong system prompt. This is the hidden instruction you give the AI before any conversation starts. I wrote ours like a job description: "You are an assistant for X platform. Only answer questions about Y. If asked anything else, politely say you can only help with Y."

A well-written system prompt is the single most effective guardrail you can add.

**Problem 2: The AI makes things up**

Language models predict what sounds right, not what is right. If they don't know something, they'll sometimes invent a plausible-sounding answer.

The solution is to combine the system prompt with RAG  give the AI real information to work from, and instruct it to only answer based on that information. If the answer isn't in the provided context, it should say so.

**Problem 3: Users try to break it**

Some users will test your assistant on purpose. They'll ask it to ignore its instructions, pretend to be something else, or reveal its system prompt.

Defensive prompting helps here. You can instruct the model to ignore attempts to override its instructions and to stay in role no matter what.

**Problem 4: Responses are too long or too short**

AI has no natural sense of how much to say. Without guidance it might write three paragraphs when one sentence would do.

Set explicit length guidelines in your prompt: "Keep answers under four sentences unless the user asks for more detail."

**The honest truth**

There is no perfect solution. AI will occasionally surprise you. The goal is not perfection  it's raising the floor so the bad outputs are rare and minor, not frequent and damaging.

Test with real users, log failures, and keep iterating. That's the only way to ship an AI assistant you can actually stand behind.`,
  },
  {
    id: 'vector-search',
    category: 'AI & Intelligent Systems',
    title: 'Vector Search Explained Like You\'re New to This',
    excerpt: 'Normal search finds exact words. Vector search finds meaning. Here\'s why that difference matters more than you think.',
    readTime: '4 min read',
    content: `Imagine you search for "how to fix a leaking pipe." A traditional search engine looks for documents containing those exact words. If a document says "repairing a burst water line," it might get missed  even though it's exactly what you need.

Vector search solves this. It understands meaning, not just words.

**What is a vector?**

In this context, a vector is a list of numbers that represents the meaning of a piece of text. Every sentence, paragraph, or document gets converted into one of these number lists.

The clever part: texts with similar meaning get similar numbers. "Fix a leaking pipe" and "repair a burst water line" end up very close together in this numerical space. A traditional keyword search misses the connection. Vector search finds it.

**How are vectors created?**

This is done by an embedding model  a type of AI that converts text into vectors. You feed it text, it gives you numbers. The model has been trained to make similar meanings produce similar vectors.

**How does search work?**

When a user searches for something, their query is converted into a vector. The system then finds the stored vectors closest to it  and those are the most relevant results.

This is called similarity search or nearest neighbor search. Distance in the vector space equals distance in meaning.

**Why does this matter for AI?**

Vector search is the backbone of RAG pipelines. When a user asks an AI assistant a question, the system uses vector search to pull the most relevant pieces of your knowledge base. Then the AI uses that information to write its answer.

Without good vector search, the AI gets irrelevant context and gives poor answers. With good vector search, the AI gets exactly what it needs.

**Where is vector search used?**

- AI assistants and chatbots
- Semantic document search
- Recommendation systems ("you might also like")
- Duplicate detection
- Code search tools

It's one of those technologies that's been around for years but is suddenly everywhere because of the AI boom. Understanding it puts you ahead of most people in the room.`,
  },

  {
    id: 'responsible-ai',
    category: 'AI & Intelligent Systems',
    title: 'Responsible Use of AI  What It Means and Why It Matters',
    excerpt: 'AI is powerful, fast, and easy to deploy. That\'s exactly why using it responsibly is not optional  it\'s the difference between a tool that helps and one that harms.',
    readTime: '5 min read',
    content: `AI is no longer experimental. It's in hiring tools, medical devices, loan approvals, customer service, and legal systems. And because it's so capable and so easy to deploy, it's being used in places where the consequences of getting it wrong are serious.

Responsible use of AI isn't a bureaucratic checkbox. It's a practical discipline that separates systems people can trust from systems that quietly cause harm.

**What does responsible AI actually mean?**

It means being intentional about how AI is built, deployed, and maintained  not just whether it works, but whether it works fairly, transparently, and safely for everyone it affects.

There are five areas that matter most.

**1. Accuracy and honesty**

AI systems should not misrepresent what they are or what they know. A chatbot that presents itself as a human, an AI that makes up facts to fill gaps, a system that overstates its confidence  these erode trust and can cause real harm.

Build AI that knows its limits. If it doesn't know something, it should say so. If it's uncertain, it should communicate that uncertainty rather than projecting false confidence.

**2. Fairness and bias**

AI learns from data, and data reflects the world as it is  including its biases. A hiring tool trained on historical decisions can learn to discriminate against groups that were historically excluded. A loan model trained on biased approval data will replicate those patterns at scale.

Responsible AI requires actively testing for bias, not assuming it isn't there. Who does the system perform worse for? Who is being systematically disadvantaged? These questions need answers before deployment, not after someone notices a pattern.

**3. Privacy**

AI often requires large amounts of data to function well. That data is frequently personal. Responsible use means collecting only what's needed, storing it securely, being transparent about how it's used, and giving people meaningful control over their information.

The worst AI privacy failures aren't dramatic breaches  they're quiet accumulations of data people didn't know was being collected, used for purposes they didn't agree to.

**4. Human oversight**

Some decisions should not be fully automated. A system that denies someone health coverage, flags someone as a fraud risk, or removes someone's content should have a meaningful human review process, especially when the stakes are high and the affected person has no other recourse.

AI can assist and accelerate human judgment. In high-stakes situations, it should rarely replace it entirely.

**5. Transparency**

People affected by AI decisions deserve to know that AI was involved and how it worked. Not full technical documentation  but enough to understand why a decision was made and how to challenge it if it's wrong.

Black-box decisions are a trust problem even when the outcomes are correct.

**What this looks like in practice**

Responsible AI is not about slowing things down. It's about building systems that last  that don't have to be pulled after a public failure, that don't generate lawsuits, that don't lose users because of something that could have been caught early.

The teams that get this right treat these questions the same way they treat security  not as optional extras but as part of what it means to build well.`,
  },
  {
    id: 'ai-agents',
    category: 'AI & Intelligent Systems',
    title: 'Why and When AI Agents? A Practical Guide',
    excerpt: 'AI agents are everywhere in the conversation right now. But what are they actually, when do they make sense, and when are they overkill?',
    readTime: '5 min read',
    content: `Everyone is talking about AI agents. If you follow the technology space, it can feel like agents are the answer to every problem. In practice, they're a specific tool with a specific sweet spot  and knowing when to use them versus when not to is what separates good engineering from hype-driven decisions.

**What is an AI agent?**

A regular AI interaction is simple: you give it a prompt, it gives you a response. That's it. One round trip.

An AI agent is different. It can take actions, use tools, check its own output, and run multiple steps to complete a task  often without a human directing each step.

Think of the difference like this: asking an AI to summarize a document is a single interaction. Asking an AI to research a topic, find relevant sources, draft a report, check it for accuracy, and email it to you  that's an agent. It's doing a sequence of things, making decisions along the way, and using external tools to get there.

**Why are agents useful?**

Three things make agents genuinely valuable.

First, multi-step tasks. Some problems can't be solved in one shot. They require planning, intermediate steps, and course correction along the way. Agents can handle this where a single prompt cannot.

Second, tool use. Agents can call APIs, search the web, query databases, write and run code, fill out forms, and interact with external systems. This extends what AI can do far beyond generating text.

Third, autonomy at scale. For repetitive, complex workflows that would take a human hours  processing hundreds of documents, monitoring systems and responding to events, coordinating across multiple data sources  agents can operate continuously without fatigue.

**When do agents make sense?**

Use an agent when all three of these are true:

- The task has multiple steps that depend on each other
- The task requires interacting with external systems or data
- The cost of the agent making a mistake is acceptable and recoverable

Data research and synthesis, document processing pipelines, automated monitoring and alerting, customer support workflows with backend system access  these are natural fits.

**When agents are overkill**

Not everything needs an agent. If your task is a single, well-defined question with a clear answer, a regular AI call is faster, cheaper, and easier to debug.

Agents add complexity. They can fail in unexpected ways, loop, or make sequences of small mistakes that compound. Every step where the agent makes a decision is a step where it can go wrong. More steps mean more failure points.

If you can solve the problem with a simple prompt or a script, do that first.

**The most important question to ask**

Before building an agent, ask: what happens when it goes wrong?

If the answer is "not much  a human can review and fix it," agents are a reasonable choice. If the answer is "it sends emails to clients, modifies production data, or makes irreversible decisions," you need very strong guardrails, human checkpoints, and a clear plan for recovery.

Agents are genuinely powerful. The teams using them well are the ones who treat them as tools with trade-offs, not magic that replaces careful thinking.`,
  },

  // ── Full Stack / Cloud ────────────────────────────────────────
  {
    id: 'project-structure',
    category: 'Full Stack / Cloud',
    title: 'How I Structure a Full Stack Project Before Writing a Single Line of Code',
    excerpt: 'The decisions you make before writing code determine how painful the project gets at month three. Here\'s my process.',
    readTime: '5 min read',
    content: `Most developers start a new project the same way  open a terminal, run a scaffolding command, and start coding. I used to do the same thing. Then I spent three months untangling a codebase that made perfect sense on day one and became unworkable by week six.

Now I spend time upfront on structure. Here's what that looks like.

**Step 1: Define the boundaries first**

Before writing anything, I identify the main domains of the application. A domain is a distinct area of responsibility  users, billing, notifications, reports. Each domain should be able to change without breaking the others.

This isn't about folders yet. It's about thinking through what the system actually does and where the natural lines are.

**Step 2: Decide what's frontend and what's backend**

This sounds obvious but it's frequently muddled. I write out which data lives on the server, which logic runs on the client, and where the API boundary sits. Any time you push business logic into the frontend to save time, you create a security risk and a maintenance problem.

**Step 3: Design the API contract**

I sketch the main API endpoints before building either side. What does the frontend need? What does the backend expose? Getting rough agreement on this early means both sides can be built in parallel without constant surprises.

**Step 4: Plan the database schema**

I draw a basic entity relationship diagram  even if it's just boxes on paper. The schema is the hardest thing to change later. Spending an hour thinking it through properly saves days of migrations.

**Step 5: Set up the project skeleton**

Now I actually create folders and files. I set up the environment, linting, formatting, and the CI pipeline before writing any feature code. This feels slow but it pays back immediately  you never have the "I'll clean this up later" conversation because the guardrails are already in place.

**Step 6: Write one vertical slice end to end**

Before building out all the features, I pick one small piece and build it completely  database to API to UI. This validates that all the layers actually work together, and surfaces integration problems early when they're cheap to fix.

The goal isn't a perfect plan. It's enough structure that the project doesn't collapse under its own weight later.`,
  },
  {
    id: 'serverless',
    category: 'Full Stack / Cloud',
    title: 'Serverless Functions  When to Use Them and When Not To',
    excerpt: 'Serverless sounds like the answer to everything. It\'s not. Here\'s an honest look at where it shines and where it will let you down.',
    readTime: '4 min read',
    content: `When serverless came along, it was presented as a revolution. No servers to manage, automatic scaling, pay only for what you use. For a lot of use cases, that's true. But I've also seen teams reach for serverless in situations where it made things significantly worse.

Here's my honest take after using it extensively in production.

**Where serverless is genuinely great**

Event-driven tasks are the sweet spot. If something happens  a file is uploaded, a form is submitted, a webhook fires  and you need to do some processing as a result, a serverless function is often the cleanest solution. You write the function, deploy it, and forget about infrastructure.

APIs with unpredictable traffic also benefit. If your traffic spikes ten times on certain days and is quiet the rest of the time, you don't want to pay for a server sized to handle the peak when it's sitting idle most of the time. Serverless scales to zero and back up automatically.

Small, focused operations  sending an email, resizing an image, calling a third-party API  are natural fits. The function does one thing and exits.

**Where serverless causes problems**

Cold starts are the most common complaint. When a serverless function hasn't been called recently, it takes a moment to start up. For most tasks this is fine. For latency-sensitive applications where every millisecond matters, it's a problem.

Long-running processes don't fit the model. Serverless functions have time limits  typically between a few seconds and fifteen minutes depending on the platform. If you're processing large files, running complex reports, or doing anything that takes a while, you need a different approach.

Stateful operations are awkward. Functions are stateless by design  they don't remember anything between calls. If your logic requires maintaining state, you end up doing gymnastics with external storage that adds complexity and cost.

Local development is harder. Running serverless functions locally in a way that accurately mirrors production is more complicated than running a regular server.

**The honest answer**

Use serverless for the things it's naturally good at. Use a traditional server for everything else. The biggest mistake I see is treating serverless as a default rather than a tool with a specific purpose.`,
  },
  {
    id: 'cicd',
    category: 'Full Stack / Cloud',
    title: 'What Is CI/CD and Why Every Developer Should Care',
    excerpt: 'If you\'ve ever broken production on a Friday afternoon, CI/CD is the process that makes that happen less often  and less catastrophically.',
    readTime: '4 min read',
    content: `There's a moment every developer knows. You've finished a feature, tested it locally, pushed your code, deployed it manually, and then  something is broken in production that was definitely fine on your machine.

CI/CD exists because this scenario plays out thousands of times a day across the industry, and there's a better way.

**What does CI/CD stand for?**

CI stands for Continuous Integration. CD stands for Continuous Delivery (or Continuous Deployment, depending on how far you take it).

Together they describe a process where code changes are automatically tested, validated, and delivered to production  rather than relying on manual steps that are easy to skip or get wrong.

**What is Continuous Integration?**

When you push code, CI automatically runs your tests. Every time. Without you having to remember.

This means problems are caught immediately when code is written  not three weeks later when someone notices something is broken in production and nobody remembers what changed.

CI also merges code frequently, which prevents the painful situation where two developers have been working on separate features for two weeks and now have to untangle a massive conflict.

**What is Continuous Delivery?**

CD takes the validated code and automatically prepares it for release. With full Continuous Deployment, it goes all the way to production automatically after passing tests.

This sounds scary but it's actually safer than manual deployments. Manual processes are inconsistent  people skip steps when they're in a hurry, do things slightly differently each time, and make mistakes. Automated pipelines do the same thing every single time.

**What does a basic pipeline look like?**

1. Developer pushes code
2. Tests run automatically
3. Code is built and packaged
4. It's deployed to a staging environment
5. After review or further automated checks, it goes to production

**Why should you care?**

CI/CD is one of those practices that feels like overhead until you're on a team without it. Then it becomes obvious how much time and stress the automation was absorbing.

Faster releases, fewer manual errors, and earlier bug detection  that's what CI/CD actually delivers. It's not glamorous, but it's one of the highest-impact investments a development team can make.`,
  },

  // ── Career & Leadership ───────────────────────────────────────
  {
    id: 'developer-to-lead',
    category: 'Career & Leadership',
    title: 'From Developer to Tech Lead  What Actually Changes',
    excerpt: 'The promotion sounds great. Then you realize your job is now completely different and nobody gave you a manual.',
    readTime: '5 min read',
    content: `When I moved into a tech lead role, I expected to keep doing what I was good at  writing code  but with a fancier title. I was wrong about almost everything that matters.

Here's what actually changes, and what I wish someone had told me earlier.

**Your output is no longer code**

This is the hardest shift. As a developer, your value is measured in what you build. As a tech lead, your value is measured in what your team builds. The code you personally write becomes less important than the code your team writes well.

This doesn't mean you stop coding. It means you stop optimizing for your own output and start optimizing for the team's output. Sometimes the highest-impact thing you can do is answer someone's question for fifteen minutes instead of writing a feature yourself.

**Decisions get harder**

When you're a developer, most decisions have a right answer that you can reason your way to. Framework A is better than framework B for these reasons. This approach has fewer trade-offs than that one.

As a tech lead, you make decisions under uncertainty with incomplete information and real consequences. You have to balance technical correctness with deadlines, team skills, business priorities, and things you don't fully control. And you have to make calls anyway, without the luxury of waiting for certainty.

**Communication becomes your core skill**

You spend more time talking than coding. Translating technical constraints into business language. Translating business requirements into technical direction. Facilitating disagreements between engineers. Giving feedback that's honest but doesn't damage the relationship.

None of this is taught in any computer science curriculum. Most of it you learn by getting it wrong.

**You are accountable for things you didn't build**

When something breaks in production, the question isn't just "who wrote this?" It's "where was the review process? Where was the testing? Who approved this going out?" As the lead, those questions point at you even when someone else wrote the code.

This is uncomfortable at first. Eventually you realize it's what makes the role meaningful  you're responsible for the whole system, not just your piece of it.

**The rewarding part**

Watching someone on your team figure out something hard. Seeing a junior developer ship their first feature confidently. Making a technical call that turns out to be the right one and saves the team three weeks of pain.

The impact is different  less direct, more multiplied. That takes some getting used to, but it's genuinely satisfying in a way that individual contribution eventually stops being.`,
  },
  {
    id: 'code-reviews',
    category: 'Career & Leadership',
    title: 'How I Approach Code Reviews Without Being That Person',
    excerpt: 'Code reviews are one of the most valuable things a team can do. They\'re also one of the easiest ways to damage trust and slow everyone down if done badly.',
    readTime: '4 min read',
    content: `Every developer has experienced a bad code review. Dozens of comments, most of them nitpicks. A tone that feels like an attack. No clear sense of what actually matters versus what's just personal preference. You fix everything, resubmit, and get another round of comments on the things you just changed.

It's demoralizing. And it doesn't actually make the code better.

Here's how I try to do it differently.

**Separate must-fix from nice-to-have**

Not all feedback is equal. A security vulnerability must be fixed. A naming preference is optional. When every comment looks the same, the author doesn't know what to prioritize and often feels overwhelmed.

I label my feedback explicitly. "This needs to change before merging" is different from "I'd consider this but it's up to you" which is different from "just thinking out loud here."

**Ask questions more than you make statements**

"Why did you choose this approach over X?" is a very different comment from "this should be X instead." The question shows curiosity and leaves room for the author to explain their reasoning  which is sometimes better than yours.

When you ask instead of declare, you also avoid looking foolish when you've missed context that makes the current approach perfectly sensible.

**Acknowledge what's good**

Most code reviews are entirely critical. The author spent hours on this work and the only feedback they get is a list of problems. Take thirty seconds to mention what you genuinely liked or learned. It changes the tone of the whole review.

**Be specific**

"This function is too long" is much less useful than "this function is doing three different things  I'd consider splitting the validation logic into its own function." Specific feedback gives the author something actionable. Vague feedback just creates anxiety.

**Review the right things**

Logic errors, security issues, performance problems, missing edge cases  these matter. Tabs vs spaces, the exact wording of a variable name, whether there should be a blank line before the return statement  these usually don't, and spending review time on them signals that you've lost perspective on what's important.

The goal of a code review is not to prove you're smart or to get the code to look exactly how you would have written it. The goal is to ship better software. Keep that as the anchor and most of the bad habits take care of themselves.`,
  },
];

export const blogCategories = ['All', 'AI & Intelligent Systems', 'Full Stack / Cloud', 'Career & Leadership'];
