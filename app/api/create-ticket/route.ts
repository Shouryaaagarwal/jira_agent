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




import { NextRequest, NextResponse } from "next/server";
import { generateTicket } from "@/lib/langchain";
import { createJiraTicket } from "@/lib/jira";

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    console.log("🟡 USER INPUT:", input);

    const aiData = await generateTicket(input);

    console.log("🧠 AI DECISION:", aiData);

    // ✅ Agent decision
    if (aiData.action === "create") {
      const jiraResponse = await createJiraTicket(aiData);

      return NextResponse.json({
        success: true,
        type: "create",
        aiData,
        jiraResponse,
      });
    }

    if (aiData.action === "assign") {
      return NextResponse.json({
        success: true,
        message: "Assign flow coming next 🚀",
        aiData,
      });
    }

    if (aiData.action === "update") {
      return NextResponse.json({
        success: true,
        message: "Update flow coming next 🚀",
        aiData,
      });
    }

    return NextResponse.json({
      success: false,
      message: "Unknown action",
    });

  } catch (error: any) {
    console.error("❌ ERROR:", error);

    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}