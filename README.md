# 🌸 Family Memory Keeper

> _Because distance should never mean forgetting._

---

## The story behind this

My family is scattered. We don't live in the same city, sometimes not even the
same country. Life gets busy, calls get shorter, and slowly — without anyone
meaning to — the stories start to fade.

The memory of how grandma used to hum while cooking. The trip we took together
that everyone remembers differently. The small, ordinary moments that only feel
small until they're gone.

I built this agent so that never happens to my family.

**Family Memory Keeper** is an AI agent that lives in a git repo. It listens to
your family's stories, preserves them with warmth, crafts personalised birthday
messages from real memories, and compiles weekly digests that feel like a letter
from someone who loves you — no matter how far apart you are.

---

## What it does

### 🗣️ Story Collector

Gently interviews a family member with one thoughtful question at a time.
Saves their story as a beautifully formatted memory file your whole family
can read anytime.

### 🎂 Birthday Greeter

Generates personalised birthday messages rooted in real, stored memories —
not generic wishes, but something that shows you truly know the person.

### 📖 Weekly Digest

Every week, compiles all saved memories into a warm newsletter-style digest.
Like a letter from home, for everyone who isn't home right now.

---

## Built with the gitagent standard

This agent follows the [gitagent](https://github.com/open-gitagent) format —
a git-native way to define, run, and share AI agents.

```
family-memory-keeper/
├── agent.yaml          # Agent manifest
├── SOUL.md             # Personality and values
├── RULES.md            # Hard constraints
├── memories/           # Saved family stories (auto-created)
├── digests/            # Weekly digests (auto-created)
└── skills/
    ├── story-collector/
    │   └── SKILL.md
    ├── birthday-greeter/
    │   └── SKILL.md
    └── weekly-digest/
        └── SKILL.md
```

---

## How to run it

**1. Clone the repo**

```bash
git clone https://github.com/garvita-d/family-memory-keeper-agent.git
cd family-memory-keeper-agent
```

**2. Install dependencies**

```bash
npm install
```

**3. Set your Groq API key** (free at groq.com)

```bash
export GROQ_API_KEY="your-key-here"
# On Windows:
$env:GROQ_API_KEY="your-key-here"
```

**4. Start the agent**

```bash
npm start
```

**5. Talk to it**

```
🌸 Family Memory Keeper is ready.

You: I want to share a memory about my grandmother
Agent: I'd love to hear it. What's a memory of her that always makes you smile?
```

Type `save` at any time to save the last memory to the `memories/` folder.
Type `quit` to exit.

---

## The soul of this agent

This agent doesn't just store data — it listens. It asks one question at a
time. It celebrates every memory, no matter how small. It speaks warmly to
grandparents and children alike.

Because the best technology doesn't feel like technology. It feels like care.

---

## Built for the gitagent Hackathon

**Theme:** Open Innovation
**Stack:** gitagent standard · Groq (llama-3.3-70b) · Node.js
**Built by:** Garvita Dalmia

---

_Every story your family shares is a gift. This agent makes sure it's never lost._
