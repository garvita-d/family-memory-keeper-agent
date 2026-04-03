import Groq from "groq-sdk";
import fs from "fs";
import readline from "readline";

const soul = fs.readFileSync("./SOUL.md", "utf-8");
const rules = fs.readFileSync("./RULES.md", "utf-8");
const systemPrompt = `${soul}\n\n${rules}

IMPORTANT MEMORY SAVING INSTRUCTIONS:
When a user shares a personal story or memory, after responding warmly, ALWAYS end your message with a line exactly like this (including the markers):
<<MEMORY_START>>
date: [today's date in YYYY-MM-DD format]
told-by: [name if they mentioned one, otherwise "Family Member"]
about: [one line summary of the story]

[Write the full story here in warm first-person narrative, 3-5 sentences, as if retelling it to a loved one. Use the details the user shared.]
<<MEMORY_END>>

Only include this block when the user has actually shared a real personal story or memory. Do not include it for greetings, questions, or general conversation.`;

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
const conversationHistory = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

function extractAndSaveMemory(text) {
  const start = text.indexOf("<<MEMORY_START>>");
  const end = text.indexOf("<<MEMORY_END>>");
  if (start === -1 || end === -1) return null;

  const memoryContent = text.slice(start + 16, end).trim();
  const cleanResponse = text.slice(0, start).trim();

  if (!fs.existsSync("./memories")) fs.mkdirSync("./memories");
  const date = new Date().toISOString().split("T")[0];
  const filename = `./memories/${date}-memory-${Date.now()}.md`;
  fs.writeFileSync(filename, memoryContent);

  return { filename, cleanResponse };
}

async function chat(userMessage) {
  conversationHistory.push({ role: "user", content: userMessage });

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
    ],
    max_tokens: 1024,
  });

  const fullReply = response.choices[0].message.content;

  // Try to auto-extract and save memory from response
  const extracted = extractAndSaveMemory(fullReply);

  if (extracted) {
    conversationHistory.push({
      role: "assistant",
      content: extracted.cleanResponse,
    });
    return { text: extracted.cleanResponse, savedTo: extracted.filename };
  }

  conversationHistory.push({ role: "assistant", content: fullReply });
  return { text: fullReply, savedTo: null };
}

async function generateBirthdayMessage(personName) {
  if (!fs.existsSync("./memories")) {
    return "No memories saved yet! Save some stories first, then I can write a truly personal birthday message.";
  }

  const files = fs.readdirSync("./memories");
  if (files.length === 0) {
    return "No memories found yet. Share some family stories first!";
  }

  const allMemories = files
    .map((f) => fs.readFileSync(`./memories/${f}`, "utf-8"))
    .join("\n\n---\n\n");

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Using these family memories:\n\n${allMemories}\n\nWrite a warm, personalised birthday message for ${personName}. Reference specific real memories. Make it feel like it was written by someone who truly knows and loves this person.`,
      },
    ],
    max_tokens: 1024,
  });

  return response.choices[0].message.content;
}

async function generateWeeklyDigest() {
  if (!fs.existsSync("./memories")) {
    return "No memories saved yet! Start by sharing some family stories.";
  }

  const files = fs.readdirSync("./memories");
  if (files.length === 0) {
    return "No memories found. Share some stories first!";
  }

  // Get memories from last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const recentMemories = files
    .filter((f) => {
      const fileStat = fs.statSync(`./memories/${f}`);
      return fileStat.mtime >= sevenDaysAgo;
    })
    .map((f) => fs.readFileSync(`./memories/${f}`, "utf-8"))
    .join("\n\n---\n\n");

  if (!recentMemories) {
    return "No memories from this week yet. Keep sharing stories!";
  }

  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Create a warm, newsletter-style weekly family digest from these memories:\n\n${recentMemories}\n\nFormat it as a beautiful family newsletter with a heading, warm retellings of each story, a 'moment to cherish' spotlight, and a loving closing line.`,
      },
    ],
    max_tokens: 1024,
  });

  const digest = response.choices[0].message.content;

  if (!fs.existsSync("./digests")) fs.mkdirSync("./digests");
  const date = new Date().toISOString().split("T")[0];
  const filename = `./digests/week-of-${date}.md`;
  fs.writeFileSync(filename, digest);

  return `${digest}\n\n✅ Digest saved to ${filename}`;
}

// Main
console.log("\n🌸 Family Memory Keeper is ready.\n");
console.log("Commands:");
console.log("  'birthday [name]' — generate a birthday message");
console.log("  'digest'          — generate this week's family digest");
console.log("  'memories'        — list all saved memories");
console.log("  'quit'            — exit\n");
console.log(
  "Just talk naturally to share a memory — it saves automatically!\n",
);

while (true) {
  const userInput = await ask("You: ");
  const lower = userInput.toLowerCase().trim();

  if (lower === "quit") {
    console.log("\nGoodbye! Your memories are safe. 💛\n");
    rl.close();
    break;
  }

  if (lower.startsWith("birthday ")) {
    const name = userInput.slice(9).trim();
    console.log(`\n✍️  Writing birthday message for ${name}...\n`);
    const message = await generateBirthdayMessage(name);
    console.log(`Agent: ${message}\n`);
    continue;
  }

  if (lower === "digest") {
    console.log("\n📖 Generating your weekly family digest...\n");
    const digest = await generateWeeklyDigest();
    console.log(`Agent: ${digest}\n`);
    continue;
  }

  if (lower === "memories") {
    if (
      !fs.existsSync("./memories") ||
      fs.readdirSync("./memories").length === 0
    ) {
      console.log("\nNo memories saved yet. Start sharing stories!\n");
    } else {
      const files = fs.readdirSync("./memories");
      console.log(`\n📚 ${files.length} memories saved:\n`);
      files.forEach((f) => console.log(`  • ${f}`));
      console.log("");
    }
    continue;
  }

  try {
    const response = await chat(userInput);
    console.log(`\nAgent: ${response.text}\n`);
    if (response.savedTo) {
      console.log(`💾 Memory automatically saved to ${response.savedTo}\n`);
    }
  } catch (err) {
    console.log(`\nError: ${err.message}\n`);
  }
}
