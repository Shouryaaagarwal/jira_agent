// import { NextRequest, NextResponse } from "next/server";
// import { generateTicket } from "@/lib/langchain";
// import { createJiraTicket } from "@/lib/jira";

// export async function POST(req: NextRequest) {
//     try {
//         const { input } = await req.json();

//         if (!input) {
//             return NextResponse.json(
//                 { error: "Input is required" },
//                 { status: 400 }
//             );
//         }

//         // 🧠 Step 1: AI converts to structured JSON
//         const aiData = await generateTicket(input);

//         // 🎟️ Step 2: Create Jira ticket
//         const jiraResponse = await createJiraTicket(aiData);

//         return NextResponse.json({
//             success: true,
//             aiData,
//             jiraResponse,
//         });
//     } catch (error: any) {
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: error.message,
//             },
//             { status: 500 }
//         );
//     }
// }   


// import { NextRequest, NextResponse } from "next/server";
// import { generateTicket } from "@/lib/langchain";
// import { createJiraTicket } from "@/lib/jira";

// // ✅ Define type locally
// type TicketData = {
//   Title: string;
//   Summary: string;
// };

// // ✅ Optional runtime validation (recommended)
// function isValidTicket(data: any): data is TicketData {
//   return (
//     data &&
//     typeof data.Title === "string" &&
//     typeof data.Summary === "string"
//   );
// }

// export async function POST(req: NextRequest) {
//   try {
//     const { input } = await req.json();

//     if (!input) {
//       return NextResponse.json(
//         { error: "Input is required" },
//         { status: 400 }
//       );
//     }

//     // 🧠 Step 1: AI → structured JSON
//     const aiData = (await generateTicket(input)) as TicketData;

//     // ✅ Safety check (VERY important for AI output)
//     if (!isValidTicket(aiData)) {
//       throw new Error("Invalid AI response format");
//     }

//     // 🎟️ Step 2: Create Jira ticket
//     const jiraResponse = await createJiraTicket(aiData);

//     return NextResponse.json({
//       success: true,
//       aiData,
//       jiraResponse,
//     });
//   } catch (error: any) {
//     return NextResponse.json(
//       {
//         success: false,
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }  




// import { NextRequest, NextResponse } from "next/server";
// import { generateTicket } from "@/lib/langchain";
// import { createJiraTicket } from "@/lib/jira";

// export async function POST(req: NextRequest) {
//   try {
//     const { input } = await req.json();

//     console.log("🟡 USER INPUT:", input);

//     const aiData = await generateTicket(input);

//     console.log("🧠 AI DECISION:", aiData);

//     // ✅ Agent decision
//     if (aiData.action === "create") {
//       const jiraResponse = await createJiraTicket(aiData);

//       return NextResponse.json({
//         success: true,
//         type: "create",
//         aiData,
//         jiraResponse,
//       });
//     }

//     if (aiData.action === "assign") {
//       return NextResponse.json({
//         success: true,
//         message: "Assign flow coming next 🚀",
//         aiData,
//       });
//     }

//     if (aiData.action === "update") {
//       return NextResponse.json({
//         success: true,
//         message: "Update flow coming next 🚀",
//         aiData,
//       });
//     }

//     return NextResponse.json({
//       success: false,
//       message: "Unknown action",
//     });

//   } catch (error: any) {
//     console.error("❌ ERROR:", error);

//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }    


// import { NextRequest, NextResponse } from "next/server";
// import { generateTicket, parseSearchQuery } from "@/lib/langchain";
// import { createJiraTicket } from "@/lib/jira";

// export async function POST(req: NextRequest) {
//   try {
//     const { input } = await req.json();

//     console.log("🟡 USER INPUT:", input);

//     // 🧠 Step 1: AI decision
//     const aiData = await generateTicket(input);

//     console.log("🧠 AI DECISION:", aiData);

//     // 🚀 CREATE FLOW
//     if (aiData.action === "create") {
//       const jiraResponse = await createJiraTicket(aiData);

//       return NextResponse.json({
//         success: true,
//         type: "create",
//         aiData,
//         jiraResponse,
//       });
//     }

//     // 🔍 SEARCH FLOW (NEW)
//     if (aiData.action === "search") {
//       const searchQuery = await parseSearchQuery(input);

//       return NextResponse.json({
//         success: true,
//         type: "search",
//         query: searchQuery,
//         message: "Search flow ready (connect to Jira search next)",
//       });
//     }

//     // ✏️ UPDATE FLOW (placeholder)
//     if (aiData.action === "update") {
//       return NextResponse.json({
//         success: true,
//         type: "update",
//         message: "Update flow coming next",
//       });
//     }

//     return NextResponse.json({
//       success: false,
//       message: "Unknown action",
//     });

//   } catch (error: any) {
//     console.error("❌ ERROR:", error);

//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }   


// import { NextRequest, NextResponse } from "next/server";
// import { generateTicket, parseSearchQuery } from "@/lib/langchain";
// import { createJiraTicket } from "@/lib/jira";

// export async function POST(req: NextRequest) {
//   try {
//     const { input } = await req.json();

//     console.log("🟡 USER INPUT:", input);

//     // 🧠 Step 1: AI decision
//     const aiData = await generateTicket(input);

//     console.log("🧠 AI DECISION:", aiData);

//     // 🚀 CREATE FLOW
//     if (aiData.action === "create") {
//       const jiraResponse = await createJiraTicket(aiData);

//       return NextResponse.json({
//         success: true,
//         type: "create",
//         aiData,
//         jiraResponse,
//       });
//     }

//     // 🔍 SEARCH FLOW (NEW)
//     if (aiData.action === "search") {
//       const searchQuery = await parseSearchQuery(input);

//       return NextResponse.json({
//         success: true,
//         type: "search",
//         query: searchQuery,
//         message: "Search flow ready (connect to Jira search next)",
//       });
//     }

//     // ✏️ UPDATE/LINK FLOW (e.g. "Assign dev-31 to Sprint 1")
//     if (aiData.action === "update") {
//       if (aiData.IssueKey && aiData.Sprint) {
//         // Extract project from IssueKey if not explicitly provided, e.g., "DEV-31" -> "DEV"
//         const projectKey = aiData.Project || aiData.IssueKey.split("-")[0];
        
//         let message = `Failed to process sprint assignment for ${aiData.IssueKey}`;
//         let success = false;

//         const boardId = await import("@/lib/jira").then((m) => m.getBoardForProject(projectKey));
//         if (boardId) {
//           const sprintId = await import("@/lib/jira").then((m) => m.ensureSprintExists(boardId, aiData.Sprint));
//           if (sprintId) {
//             await import("@/lib/jira").then((m) => m.addIssueToSprint(sprintId, aiData.IssueKey));
//             message = `Successfully linked ${aiData.IssueKey} to ${aiData.Sprint}`;
//             success = true;
//           } else {
//             message = `Could not create or find sprint ${aiData.Sprint}`;
//           }
//         } else {
//           message = `Could not find board for project ${projectKey}`;
//         }

//         return NextResponse.json({
//           success,
//           type: "update",
//           message,
//           aiData
//         });
//       }

//       return NextResponse.json({
//         success: true,
//         type: "update",
//         message: "Update flow (other attributes) coming next",
//         aiData
//       });
//     }

//     return NextResponse.json({
//       success: false,
//       message: "Unknown action",
//     });

//   } catch (error: any) {
//     console.error("❌ ERROR:", error);

//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }  


// import { NextRequest, NextResponse } from "next/server";
// import { generateTicket, parseSearchQuery } from "@/lib/langchain";
// import { 
//   createJiraTicket, 
//   updateJiraTicket, 
//   getBoardForProject, 
//   ensureSprintExists, 
//   addIssueToSprint 
// } from "@/lib/jira";

// export async function POST(req: NextRequest) {
//   try {
//     const { input } = await req.json();

//     console.log("🟡 USER INPUT:", input);

//     // 🧠 Step 1: AI decides action
//     const aiData = await generateTicket(input);

//     console.log("🧠 AI DECISION:", aiData);

//     // =========================================================
//     // 🚀 CREATE FLOW
//     // =========================================================
//     if (aiData.action === "create") {
//       const jiraResponse = await createJiraTicket(aiData);

//       return NextResponse.json({
//         success: true,
//         type: "create",
//         aiData,
//         jiraResponse,
//       });
//     }

//     // =========================================================
//     // 🔍 SEARCH FLOW (placeholder)
//     // =========================================================
//     if (aiData.action === "search") {
//       const searchQuery = await parseSearchQuery(input);

//       return NextResponse.json({
//         success: true,
//         type: "search",
//         query: searchQuery,
//         message: "Search flow ready (connect Jira JQL next)",
//       });
//     }

//     // =========================================================
//     // ✏️ UPDATE FLOW (Sprint + Status)
//     // =========================================================
//     if (aiData.action === "update") {

//       // -------------------------------
//       // 🏃 SPRINT ASSIGNMENT
//       // -------------------------------
//       if (aiData.IssueKey && aiData.Sprint) {
//         const projectKey =
//           aiData.Project || aiData.IssueKey.split("-")[0];

//         let message = `Failed to assign ${aiData.IssueKey} to sprint`;
//         let success = false;

//         const boardId = await getBoardForProject(projectKey);

//         if (boardId) {
//           const sprintId = await ensureSprintExists(
//             boardId,
//             aiData.Sprint
//           );

//           if (sprintId) {
//             await addIssueToSprint(sprintId, aiData.IssueKey);

//             message = `✅ ${aiData.IssueKey} added to ${aiData.Sprint}`;
//             success = true;
//           } else {
//             message = `❌ Could not create/find sprint ${aiData.Sprint}`;
//           }
//         } else {
//           message = `❌ No board found for project ${projectKey}`;
//         }

//         return NextResponse.json({
//           success,
//           type: "update",
//           message,
//           aiData,
//         });
//       }

//       // -------------------------------
//       // 🔄 STATUS UPDATE
//       // -------------------------------
//       if (aiData.IssueKey && aiData.Status) {
//         const result = await updateJiraTicket(aiData);

//         return NextResponse.json({
//           success: result.success,
//           type: "update",
//           message: result.message,
//           aiData,
//         });
//       }

//       // -------------------------------
//       // ❌ FALLBACK
//       // -------------------------------
//       return NextResponse.json({
//         success: false,
//         type: "update",
//         message: "No valid update operation detected",
//         aiData,
//       });
//     }

//     // =========================================================
//     // ❌ UNKNOWN ACTION
//     // =========================================================
//     return NextResponse.json({
//       success: false,
//       message: "Unknown action",
//       aiData,
//     });

//   } catch (error: any) {
//     console.error("❌ ERROR:", error);

//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }   



import { NextRequest, NextResponse } from "next/server";
import { generateTicket } from "@/lib/langchain";
import {
  createJiraTicket,
  updateJiraTicket,
  searchJira,
  getBoardForProject,
  ensureSprintExists,
  addIssueToSprint,
} from "@/lib/jira";

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    console.log("🟡 USER INPUT:", input);

    // 🧠 Step 1: AI decision
    const aiData = await generateTicket(input);

    console.log("🧠 AI DECISION:", aiData);

    // =========================================================
    // 🚀 CREATE FLOW
    // =========================================================
    if (aiData.action === "create") {
      const jiraResponse = await createJiraTicket(aiData);

      return NextResponse.json({
        success: true,
        type: "create",
        aiData,
        jiraResponse,
      });
    }

    // =========================================================
    // 🔍 SEARCH FLOW (REAL JIRA SEARCH)
    // =========================================================
    if (aiData.action === "search") {
      if (!aiData.jql) {
        return NextResponse.json({
          success: false,
          message: "JQL query missing",
        });
      }

      const results = await searchJira(aiData.jql);

      return NextResponse.json({
        success: true,
        type: "search",
        count: results.length,
        results,
      });
    }

    // =========================================================
    // ✏️ UPDATE FLOW (ALL TYPES)
    // =========================================================
    if (aiData.action === "update") {

      // -------------------------------
      // 🏃 SPRINT ASSIGNMENT
      // -------------------------------
      if (aiData.IssueKey && aiData.Sprint) {
        const projectKey =
          aiData.Project || aiData.IssueKey.split("-")[0];

        let message = `Failed to assign ${aiData.IssueKey} to sprint`;
        let success = false;

        const boardId = await getBoardForProject(projectKey);

        if (boardId) {
          const sprintId = await ensureSprintExists(
            boardId,
            aiData.Sprint
          );

          if (sprintId) {
            await addIssueToSprint(sprintId, aiData.IssueKey);

            message = `✅ ${aiData.IssueKey} added to ${aiData.Sprint}`;
            success = true;
          } else {
            message = `❌ Could not create/find sprint ${aiData.Sprint}`;
          }
        } else {
          message = `❌ No board found for project ${projectKey}`;
        }

        return NextResponse.json({
          success,
          type: "update",
          operation: "sprint",
          message,
          aiData,
        });
      }

      // -------------------------------
      // 🔄 ALL OTHER UPDATES (STATUS + FIELDS + COMMENT + LINK)
      // -------------------------------
      if (aiData.IssueKey) {
        const result = await updateJiraTicket(aiData);

        return NextResponse.json({
          success: result.success,
          type: "update",
          operation: result.type || "general",
          message: result.message,
          aiData,
        });
      }

      // -------------------------------
      // ❌ FALLBACK
      // -------------------------------
      return NextResponse.json({
        success: false,
        type: "update",
        message: "No valid update operation detected",
        aiData,
      });
    }

    // =========================================================
    // ❌ UNKNOWN ACTION
    // =========================================================
    return NextResponse.json({
      success: false,
      message: "Unknown action",
      aiData,
    });

  } catch (error: any) {
    console.error("❌ ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}