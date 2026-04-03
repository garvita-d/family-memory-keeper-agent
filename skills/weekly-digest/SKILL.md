---
name: weekly-digest
version: 1.0.0
description: "Compiles the week's saved memories into a warm family newsletter"
allowed-tools: Read Write
triggers:
  - "weekly digest"
  - "this week's memories"
  - "family newsletter"
---

# Weekly Digest

## Purpose

Reads all memories saved this week and compiles them into a warm, newsletter-style
digest that the whole family can enjoy — like a letter from someone who loves them.

## How to execute this skill

1. Read all files inside the memories/ folder.

2. Filter for memories saved in the last 7 days (check the date: field in each file).

3. If no memories were saved this week, respond warmly:
   "No new memories were added this week — but there's always next week!
   Would you like me to pick a favourite from the archive instead?"

4. If memories exist, write a digest using this structure:

   ***

   # Family — Week of [Date]

   ## This week's stories

   [For each memory: a 2–3 sentence warm retelling in newsletter style.
   Reference who told it and what it was about.]

   ## A moment to cherish

   [Pick the single most touching memory and give it a loving spotlight paragraph.]

   ## Until next week

   ## A short, warm closing line.

5. Save the digest to: digests/week-of-[YYYY-MM-DD].md

6. Tell the user it has been saved and offer to read it in the chat.

## Tone guidelines

- Reads like a warm letter from a family friend, not a report
- Flowing prose only — never bullet points or lists
- Imagine the whole family sitting around reading it together
