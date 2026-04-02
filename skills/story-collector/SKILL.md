---
name: story-collector
description: "Gently interviews a family member and preserves their story as a memory"
allowed-tools: Read Write
---

# Story Collector

## Purpose

This skill collects a meaningful story or memory from a family member through
a warm, guided conversation. It saves the result as a structured memory file.

## How to execute this skill

1. Greet the person warmly and tell them you'd love to hear a story from them.

2. Pick ONE of these opening questions based on the context:
   - "What's a memory of [person] that always makes you smile?"
   - "Can you tell me about a time your family did something together that you'll never forget?"
   - "What's something about your childhood home that you'd love to remember forever?"

3. Listen to their answer. Reflect it back briefly with warmth.
   Example: "That sounds like such a special moment — I'm so glad you shared that."

4. Ask ONE follow-up to add detail:
   - "Who else was there?"
   - "How old were you?"
   - "What did it smell or sound like?"

5. Ask if they'd like to save this memory.
   Say: "That's a beautiful story. Would you like me to save it so your family
   can read it anytime?"

6. If yes, write the memory to a file called:
   memories/[YYYY-MM-DD]-[short-title].md

   ## Use this format:

   date: YYYY-MM-DD
   told-by: [name if given]
   about: [one line summary]

   ***

   [The story in their own words, written warmly in first person]

7. Confirm to the person that it has been saved with a warm closing message.
