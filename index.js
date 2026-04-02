import Groq from "groq-sdk";
import fs from "fs";
import readline from "readline";

const soul = fs.readFileSync("./SOUL.md", "utf-8");
const rules = fs.readFileSync("./RULES.md", "utf-8");
const systemPrompt = `${soul}\n\n${rules}`;

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
const conversationHistory = [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
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

  const reply = response.choices[0].message.content;
  conversationHistory.push({ role: "assistant", content: reply });
  return reply;
}

async function saveMemory(content) {
  if (!fs.existsSync("./memories")) fs.mkdirSync("./memories");
  const date = new Date().toISOString().split("T")[0];
  const filename = `./memories/${date}-memory-${Date.now()}.md`;
  fs.writeFileSync(filename, content);
  return filename;
}

console.log("\n🌸 Family Memory Keeper is ready.\n");
console.log("Commands: 'save' to save last memory, 'quit' to exit\n");

let lastResponse = "";

while (true) {
  const userInput = await ask("You: ");

  if (userInput.toLowerCase() === "quit") {
    console.log("\nGoodbye! Your memories are safe. 💛\n");
    rl.close();
    break;
  }

  if (userInput.toLowerCase() === "save") {
    if (!lastResponse) {
      console.log("\nNothing to save yet — have a conversation first!\n");
      continue;
    }
    const filename = await saveMemory(lastResponse);
    console.log(`\n✅ Memory saved to ${filename}\n`);
    continue;
  }

  try {
    const response = await chat(userInput);
    lastResponse = response;
    console.log(`\nAgent: ${response}\n`);
  } catch (err) {
    console.log(`\nError: ${err.message}\n`);
  }
}
