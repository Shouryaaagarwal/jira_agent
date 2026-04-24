// import axios from "axios";

// // 🔍 Get accountId
// async function getAccountId(name: string) {
//   try {
//     const res = await axios.get(
//       `${process.env.JIRA_DOMAIN}/rest/api/3/user/search?query=${name}`,
//       {
//         auth: {
//           username: process.env.JIRA_EMAIL!,
//           password: process.env.JIRA_API_TOKEN!,
//         },
//       }
//     );

//     return res.data?.[0]?.accountId || null;
//   } catch {
//     return null;
//   }
// }

// // 🔍 Issue type resolver
// async function getValidIssueType(type: string) {
//   const allowed = ["Task", "Story", "Bug", "Epic"];
//   return allowed.includes(type) ? type : "Task";
// }

// // 📅 Normalize date
// function normalizeDate(input: string | null) {
//   if (!input) return null;

//   const today = new Date();
//   const lower = input.toLowerCase();

//   if (lower.includes("today")) return today.toISOString().split("T")[0];

//   if (lower.includes("tomorrow")) {
//     const d = new Date();
//     d.setDate(today.getDate() + 1);
//     return d.toISOString().split("T")[0];
//   }

//   if (lower.includes("next week")) {
//     const d = new Date();
//     d.setDate(today.getDate() + 7);
//     return d.toISOString().split("T")[0];
//   }

//   return input;
// }

// export async function createJiraTicket(data: any) {
//   const url = `${process.env.JIRA_DOMAIN}/rest/api/3/issue`;

//   const accountId = data.Assignee
//     ? await getAccountId(data.Assignee)
//     : null;

//   const issueType = await getValidIssueType(data.IssueType);

//   const payload: any = {
//     fields: {
//       project: { key: data.Project || "DEV" },

//       summary: data.Title,

//       description: {
//         type: "doc",
//         version: 1,
//         content: [
//           {
//             type: "paragraph",
//             content: [
//               {
//                 type: "text",
//                 text: data.Summary || data.Title,
//               },
//             ],
//           },
//         ],
//       },

//       issuetype: { name: issueType },

//       priority: { name: data.Priority || "Medium" },

//       duedate: normalizeDate(data.DueDate),

//       labels: data.Labels || [],
//     },
//   };

//   // 👤 assign
//   if (accountId) {
//     payload.fields.assignee = { accountId };
//   }

//   // 🔗 link to epic (ONLY if provided)
//   if (data.Epic) {
//     payload.fields.customfield_10014 = data.Epic; // may vary per Jira
//   }

//   console.log("📦 FINAL PAYLOAD:", JSON.stringify(payload, null, 2));

//   const res = await axios.post(url, payload, {
//     auth: {
//       username: process.env.JIRA_EMAIL!,
//       password: process.env.JIRA_API_TOKEN!,
//     },
//   });

//   console.log("JIRA RESPONSE:", res.data);

//   return res.data;
// }
 import axios from "axios";

// 🔍 Get accountId
async function getAccountId(name: string) {
  try {
    const res = await axios.get(
      `${process.env.JIRA_DOMAIN}/rest/api/3/user/search?query=${name}`,
      {
        auth: {
          username: process.env.JIRA_EMAIL!,
          password: process.env.JIRA_API_TOKEN!,
        },
      }
    );

    return res.data?.[0]?.accountId || null;
  } catch {
    return null;
  }
}

// 📅 Normalize date
function normalizeDate(input: string | null) {
  if (!input || input === "null") return null;

  const today = new Date();
  const lower = input.toLowerCase();

  if (lower.includes("today")) return today.toISOString().split("T")[0];

  if (lower.includes("tomorrow")) {
    const d = new Date();
    d.setDate(today.getDate() + 1);
    return d.toISOString().split("T")[0];
  }

  if (lower.includes("next week")) {
    const d = new Date();
    d.setDate(today.getDate() + 7);
    return d.toISOString().split("T")[0];
  }

  return input;
}

// 🔥 Normalize issue type
function normalizeIssueType(type: string) {
  if (!type) return "Task";

  const t = type.toLowerCase();

  if (t === "bug") return "Task";
  if (t === "story") return "Task";
  if (t === "sub-task") return "Subtask";

  return type;
}

export async function createJiraTicket(data: any) {
  const url = `${process.env.JIRA_DOMAIN}/rest/api/3/issue`;

  const accountId =
    data.Assignee && data.Assignee !== "null"
      ? await getAccountId(data.Assignee)
      : null;

  let issueType = normalizeIssueType(data.IssueType);

  const payload: any = {
    fields: {
      project: { key: data.Project || "DEV" },

      summary: data.Title,

      description: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: data.Summary || data.Title,
              },
            ],
          },
        ],
      },

      issuetype: {
        name: issueType,
      },

      priority: {
        name: data.Priority || "Medium",
      },

      duedate: normalizeDate(data.DueDate),

      labels: data.Labels || [],
    },
  };

  // 👤 assign
  if (accountId) {
    payload.fields.assignee = { accountId };
  }

  // 🔥 EPIC LINK FIX (TEAM MANAGED PROJECT)
  if (data.Epic && data.Epic !== "null") {
    payload.fields.parent = {
      key: data.Epic,
    };
    console.log("🔗 Linking to Epic via parent:", data.Epic);
  }

  console.log("📦 FINAL PAYLOAD:", JSON.stringify(payload, null, 2));

  try {
    const res = await axios.post(url, payload, {
      auth: {
        username: process.env.JIRA_EMAIL!,
        password: process.env.JIRA_API_TOKEN!,
      },
    });

    console.log("✅ JIRA RESPONSE:", res.data);
    return res.data;
  } catch (error: any) {
    console.error("❌ JIRA ERROR:", error.response?.data || error.message);

    throw new Error(
      JSON.stringify(error.response?.data || "Unknown Jira Error")
    );
  }
}  
