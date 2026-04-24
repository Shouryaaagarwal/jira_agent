import { detectIntent, parseSearchQuery, summarizeTickets } from "@/lib/langchain";
import { getTicketById, searchTickets } from "@/lib/jira-search";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    const parsed = await parseSearchQuery(input);
    console.log("🔎 Parsed search query:", parsed);

    let tickets: any[] = [];
    let specificTicket = null;

    if (parsed.type === "specific_ticket" && parsed.ticketId) {
      // Fetch a single ticket by ID
      specificTicket = await getTicketById(parsed.ticketId);
      tickets = [specificTicket.raw];
    } else {
      // Search with filters
      tickets = await searchTickets({
        assignee: parsed.assignee,
        status: parsed.status,
        priority: parsed.priority,
        issueType: parsed.issueType,
        keyword: parsed.keyword,
      });
    }

    const summary = await summarizeTickets(tickets, input);

    return Response.json({
      success: true,
      summary,
      count: tickets.length,
      specificTicket,
      tickets: tickets.map((t: any) => ({
        key: t.key,
        title: t.fields.summary,
        status: t.fields.status?.name,
        priority: t.fields.priority?.name,
        assignee: t.fields.assignee?.displayName ?? "Unassigned",
        issueType: t.fields.issuetype?.name,
        created: t.fields.created?.split("T")[0],
        labels: t.fields.labels ?? [],
      })),
    });
  } catch (error: any) {
    console.error("❌ Search error:", error.message);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}