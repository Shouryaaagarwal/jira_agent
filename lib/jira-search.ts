import axios from "axios";

const auth = {
  username: process.env.JIRA_EMAIL!,
  password: process.env.JIRA_API_TOKEN!,
};
const headers = { Accept: "application/json" };
const BASE = process.env.JIRA_DOMAIN!;

// ─── Get a specific ticket by ID ──────────────────────────────────────────────
export async function getTicketById(ticketId: string) {
  const res = await axios.get(
    `${BASE}/rest/api/3/issue/${ticketId}`,
    { auth, headers }
  );

  const f = res.data.fields;
  return {
    key: res.data.key,
    title: f.summary,
    status: f.status?.name,
    priority: f.priority?.name,
    assignee: f.assignee?.displayName ?? "Unassigned",
    issueType: f.issuetype?.name,
    created: f.created?.split("T")[0],
    updated: f.updated?.split("T")[0],
    description: f.description?.content?.[0]?.content?.[0]?.text ?? "No description",
    labels: f.labels ?? [],
    raw: res.data,
  };
}

// ─── Search tickets with filters ──────────────────────────────────────────────
export async function searchTickets(filters: {
  assignee?: string | null;
  status?: string | null;
  priority?: string | null;
  issueType?: string | null;
  keyword?: string | null;
}) {
  const jqlParts: string[] = [`project = DEV`];

  if (filters.assignee) {
    jqlParts.push(`assignee = "${filters.assignee}"`);
  }
  if (filters.status) {
    const statusMap: Record<string, string> = {
      "To Do": "To Do",
      "In Progress": "In Progress",
      "Done": "Done",
    };
    const mapped = statusMap[filters.status] ?? filters.status;
    jqlParts.push(`status = "${mapped}"`);
  }
  if (filters.priority) {
    jqlParts.push(`priority = "${filters.priority}"`);
  }
  if (filters.issueType) {
    jqlParts.push(`issuetype = "${filters.issueType}"`);
  }
  if (filters.keyword) {
    jqlParts.push(`text ~ "${filters.keyword}"`);
  }

  const jql = jqlParts.join(" AND ") + " ORDER BY created DESC";
  console.log("🔍 JQL:", jql);

  const res = await axios.get(`${BASE}/rest/api/3/search`, {
    params: { jql, maxResults: 10, fields: "summary,status,priority,assignee,issuetype,created,labels" },
    auth,
    headers,
  });

  return res.data.issues ?? [];
}

// ─── Get all open tickets ─────────────────────────────────────────────────────
export async function getOpenTickets() {
  return searchTickets({ status: "To Do" });
}