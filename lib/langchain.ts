// import Groq from "groq-sdk";

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY!,
// });

// export async function generateTicket(instruction: string) {
//   const completion = await groq.chat.completions.create({
//     model: "llama-3.1-8b-instant",
//     messages: [
//       {
//         role: "system",
//         content: `
// You are a Jira AI assistant.

// Return ONLY valid JSON:

// {
//   "action": "create",
//   "Title": "short title max 6 words",
//   "Summary": "2-3 sentence clear explanation",
//   "Priority": "High | Medium | Low",
//   "IssueType": "Task | Story | Bug | Epic",
//   "Assignee": "name or null",
//   "Project": "project key if mentioned else DEV",
//   "Epic": "Epic key like DEV-1 if mentioned else null",
//   "DueDate": "YYYY-MM-DD or null",
//   "StartDate": "YYYY-MM-DD or null",
//   "Labels": ["label1", "label2"] or []
// }

// Rules:
// - If user says "create epic" → IssueType = Epic
// - If user says "under epic DEV-1" → Epic = DEV-1
// - Detect bug if error/fail/not working
// - Extract assignee name
// - Extract project key
// - Extract labels
// - Extract dates (today, tomorrow, next week)
// - Assume current year
// - NEVER return anything outside JSON
// `,
//       },
//       { role: "user", content: instruction },
//     ],
//     temperature: 0.1,
//   });

//   const text = completion.choices[0].message.content || "";
//   console.log("🧠 GROQ RAW:", text);

//   const cleaned = text.replace(/```json|```/g, "").trim();

//   let parsed;
//   try {
//     parsed = JSON.parse(cleaned);
//   } catch {
//     throw new Error("AI returned invalid JSON");
//   }

//   // safety defaults
//   parsed.DueDate = parsed.DueDate || null;
//   parsed.StartDate = parsed.StartDate || null;
//   parsed.Labels = parsed.Labels || [];
//   parsed.Epic = parsed.Epic || null;

//   console.log("✅ AI OUTPUT:", parsed);

//   return parsed;
// } 



import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function generateTicket(instruction: string) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `
You are a Jira AI assistant.

Return ONLY valid JSON:

{
  "action": "create",
  "Title": "short professional title (max 6 words)",
  "Summary": "professional rewritten description (NOT copy of input)",
  "Priority": "High | Medium | Low",
  "IssueType": "Task | Story | Bug | Epic | Sub-task",
  "Assignee": "name or null",
  "Project": "project key if mentioned else DEV",
  "Epic": "Epic key like DEV-1 if mentioned else null",
  "Parent": "Parent issue key for subtask like DEV-1 else null",
  "DueDate": "YYYY-MM-DD or null",
  "StartDate": "YYYY-MM-DD or null",
  "Labels": ["label1", "label2"] or []
}

Rules:
- NEVER copy input into Title
- ALWAYS rewrite Summary professionally
- If "subtask" or "sub task" → IssueType = Sub-task
- If "under epic DEV-1" → Epic = DEV-1
- If "under DEV-1" → Parent = DEV-1
- Detect Bug if error/fail/not working
- Extract labels like api, backend, ui
- Extract assignee
- Extract project
- Extract dates
- NEVER return anything outside JSON
`,
      },
      { role: "user", content: instruction },
    ],
    temperature: 0.2,
  });

  const text = completion.choices[0].message.content || "";
  console.log("🧠 GROQ RAW:", text);

  const cleaned = text.replace(/```json|```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    throw new Error("AI returned invalid JSON");
  }

  // safety defaults
  parsed.DueDate = parsed.DueDate || null;
  parsed.StartDate = parsed.StartDate || null;
  parsed.Labels = parsed.Labels || [];
  parsed.Epic = parsed.Epic || null;
  parsed.Parent = parsed.Parent || null;

  console.log("✅ AI OUTPUT:", parsed);

  return parsed;
}

// ---------------------------------------------------------------------------
// Search / query helpers
// ---------------------------------------------------------------------------

export interface ParsedSearchQuery {
  type: "specific_ticket" | "filter_search";
  ticketId?: string;
  assignee?: string;
  status?: string;
  priority?: string;
  issueType?: string;
  keyword?: string;
}

/**
 * Uses the LLM to parse a natural-language Jira query into structured filters.
 */
export async function parseSearchQuery(input: string): Promise<ParsedSearchQuery> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are a Jira query parser. Given a user's natural-language question about Jira tickets, return ONLY valid JSON with this shape:

{
  "type": "specific_ticket" | "filter_search",
  "ticketId": "DEV-123 or null",
  "assignee": "person name or null",
  "status": "To Do | In Progress | Done | null",
  "priority": "High | Medium | Low | null",
  "issueType": "Task | Story | Bug | Epic | Sub-task | null",
  "keyword": "keyword phrase or null"
}

Rules:
- If the user mentions a specific ticket ID (e.g. DEV-42, ABC-7) → type = "specific_ticket" and set ticketId
- Otherwise → type = "filter_search" and populate whichever filters apply
- NEVER return anything outside JSON`,
      },
      { role: "user", content: input },
    ],
    temperature: 0.1,
  });

  const text = completion.choices[0].message.content || "";
  const cleaned = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(cleaned) as ParsedSearchQuery;
  } catch {
    // Fallback: treat the whole input as a keyword search
    return { type: "filter_search", keyword: input };
  }
}

/**
 * Thin wrapper kept for API compatibility — delegates to parseSearchQuery.
 */
export async function detectIntent(input: string): Promise<ParsedSearchQuery> {
  return parseSearchQuery(input);
}

/**
 * Uses the LLM to produce a concise plain-English summary of a list of Jira tickets
 * in the context of the user's original question.
 */
export async function summarizeTickets(tickets: any[], userQuery: string): Promise<string> {
  if (!tickets || tickets.length === 0) {
    return "No tickets were found matching your query.";
  }

  // Build a compact representation of each ticket for the prompt
  const ticketList = tickets
    .map((t: any) => {
      const f = t.fields || {};
      return `- ${t.key}: "${f.summary}" | Status: ${f.status?.name ?? "?"} | Priority: ${f.priority?.name ?? "?"} | Assignee: ${f.assignee?.displayName ?? "Unassigned"}`;
    })
    .join("\n");

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are a helpful Jira assistant. Summarize the following tickets in 2-4 clear sentences that directly answer the user's question. Be concise and professional.`,
      },
      {
        role: "user",
        content: `User question: "${userQuery}"\n\nTickets:\n${ticketList}`,
      },
    ],
    temperature: 0.3,
  });

  return completion.choices[0].message.content?.trim() ?? "Unable to generate summary.";
}