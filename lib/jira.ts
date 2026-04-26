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


//  import axios from "axios";

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


// function normalizeDate(input: string | null) {
//   if (!input || input === "null") return null;

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

// function normalizeIssueType(type: string) {
//   if (!type) return "Task";

//   const t = type.toLowerCase();

//   if (t === "bug") return "Task";
//   if (t === "story") return "Task";
//   if (t === "sub-task") return "Subtask";

//   return type;
// }

// export async function createJiraTicket(data: any) {
//   const url = `${process.env.JIRA_DOMAIN}/rest/api/3/issue`;

//   const accountId =
//     data.Assignee && data.Assignee !== "null"
//       ? await getAccountId(data.Assignee)
//       : null;

//   let issueType = normalizeIssueType(data.IssueType);

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

//       issuetype: {
//         name: issueType,
//       },

//       priority: {
//         name: data.Priority || "Medium",
//       },

//       duedate: normalizeDate(data.DueDate),

//       labels: data.Labels || [],
//     },
//   };

//   // 👤 assign
//   if (accountId) {
//     payload.fields.assignee = { accountId };
//   }

//   if (data.Epic && data.Epic !== "null") {
//     payload.fields.parent = {
//       key: data.Epic,
//     };
//     console.log("🔗 Linking to Epic via parent:", data.Epic);
//   }

//   console.log("📦 FINAL PAYLOAD:", JSON.stringify(payload, null, 2));

//   try {
//     const res = await axios.post(url, payload, {
//       auth: {
//         username: process.env.JIRA_EMAIL!,
//         password: process.env.JIRA_API_TOKEN!,
//       },
//     });

//     console.log("✅ JIRA RESPONSE:", res.data);
//     return res.data;
//   } catch (error: any) {
//     console.error("❌ JIRA ERROR:", error.response?.data || error.message);

//     throw new Error(
//       JSON.stringify(error.response?.data || "Unknown Jira Error")
//     );
//   }
// }  


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

// // 📅 Normalize date
// function normalizeDate(input: string | null) {
//   if (!input || input === "null") return null;

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

// // 🔥 Normalize issue type
// function normalizeIssueType(type: string) {
//   if (!type) return "Task";

//   const t = type.toLowerCase();

//   if (t === "bug") return "Task";
//   if (t === "story") return "Task";
//   if (t === "sub-task") return "Subtask";

//   return type;
// }

// export async function createJiraTicket(data: any) {
//   const url = `${process.env.JIRA_DOMAIN}/rest/api/3/issue`;

//   // ✅ FIX: normalize null values
//   const assigneeName =
//     data.Assignee && data.Assignee !== "null" ? data.Assignee : null;

//   const epicKey =
//     data.Epic && data.Epic !== "null" ? data.Epic : null;

//   const parentKey =
//     data.Parent && data.Parent !== "null" ? data.Parent : null;

//   const accountId = assigneeName
//     ? await getAccountId(assigneeName)
//     : null;

//   let issueType = normalizeIssueType(data.IssueType);

//   // 🚨 HIERARCHY FIXES

//   // ❌ Subtask must have parent
//   if (issueType === "Subtask" && !parentKey) {
//     throw new Error("Subtask requires a parent issue key");
//   }

//   // ❌ Subtask cannot have epic
//   if (issueType === "Subtask" && epicKey) {
//     console.log("⚠️ Removing epic from subtask");
//     data.Epic = null;
//   }

//   const payload: any = {
//     fields: {
//       project: { key: data.Project || "DEV" },

//       summary: data.Title || "Untitled Task",

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

//       issuetype: {
//         name: issueType,
//       },

//       priority: {
//         name: data.Priority || "Medium",
//       },

//       duedate: normalizeDate(data.DueDate),

//       labels: Array.isArray(data.Labels) ? data.Labels : [],
//     },
//   };

//   // 👤 Assign
//   if (accountId) {
//     payload.fields.assignee = { accountId };
//   }

//   // 🔗 EPIC LINK (Team-managed → parent)
//   if (epicKey && issueType !== "Subtask") {
//     payload.fields.parent = {
//       key: epicKey,
//     };
//     console.log("🔗 Linked to Epic:", epicKey);
//   }

//   // 🧩 SUBTASK LINK
//   if (issueType === "Subtask" && parentKey) {
//     payload.fields.parent = {
//       key: parentKey,
//     };
//     console.log("🧩 Subtask linked to:", parentKey);
//   }

//   console.log("📦 FINAL PAYLOAD:", JSON.stringify(payload, null, 2));

//   try {
//     const res = await axios.post(url, payload, {
//       auth: {
//         username: process.env.JIRA_EMAIL!,
//         password: process.env.JIRA_API_TOKEN!,
//       },
//     });

//     console.log("✅ JIRA RESPONSE:", res.data);
//     return res.data;
//   } catch (error: any) {
//     console.error("❌ JIRA ERROR:", error.response?.data || error.message);

//     throw new Error(
//       JSON.stringify(error.response?.data || "Unknown Jira Error")
//     );
//   }
// }  



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

// // 🔥 CREATE PROJECT
// async function createJiraProject(projectKey: string): Promise<string> {
//   // Fetch caller's accountId from Jira "myself" endpoint so leadAccountId is always correct
//   let leadAccountId = process.env.JIRA_ACCOUNT_ID || "";
//   if (!leadAccountId) {
//     try {
//       const me = await axios.get(`${process.env.JIRA_DOMAIN}/rest/api/3/myself`, {
//         auth: { username: process.env.JIRA_EMAIL!, password: process.env.JIRA_API_TOKEN! },
//       });
//       leadAccountId = me.data.accountId;
//     } catch {
//       // leave blank — Jira will use the authenticated user
//     }
//   }

//   console.log("🚀 Creating project:", projectKey);

//   const res = await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/project`,
//     {
//       key: projectKey,
//       name: `${projectKey} Project`,
//       projectTypeKey: "software",
//       // Valid template keys for Jira Cloud software projects:
//       projectTemplateKey: "com.pyxis.greenhopper.jira:gh-simplified-agility-scrum",
//       assigneeType: "PROJECT_LEAD",
//       leadAccountId,
//     },
//     {
//       auth: {
//         username: process.env.JIRA_EMAIL!,
//         password: process.env.JIRA_API_TOKEN!,
//       },
//     }
//   );

//   console.log("✅ Project Created:", res.data.key);
//   return res.data.key as string;
// }

// // 🔍 Ensure project exists — falls back to "DEV" if creation is not permitted
// async function ensureProject(projectKey: string): Promise<string> {
//   try {
//     await axios.get(
//       `${process.env.JIRA_DOMAIN}/rest/api/3/project/${projectKey}`,
//       {
//         auth: {
//           username: process.env.JIRA_EMAIL!,
//           password: process.env.JIRA_API_TOKEN!,
//         },
//       }
//     );
//     console.log("✅ Project exists:", projectKey);
//     return projectKey;
//   } catch {
//     // Project does not exist — try to create it
//     if (projectKey !== "DEV") {
//       console.log(`⚠️ Project "${projectKey}" not found → attempting to create...`);
//       try {
//         return await createJiraProject(projectKey);
//       } catch (createErr: any) {
//         console.warn(
//           `⚠️ Could not create project "${projectKey}" (${createErr.message}). Falling back to DEV.`
//         );
//         return "DEV";
//       }
//     }
//     // DEV itself doesn't exist — surface the error clearly
//     throw new Error(`Project "DEV" does not exist on your Jira instance.`);
//   }
// }

// // 📋 Get Board for Project
// export async function getBoardForProject(projectKey: string): Promise<number | null> {
//   try {
//     const res = await axios.get(
//       `${process.env.JIRA_DOMAIN}/rest/agile/1.0/board?projectKeyOrId=${projectKey}`,
//       {
//         auth: {
//           username: process.env.JIRA_EMAIL!,
//           password: process.env.JIRA_API_TOKEN!,
//         },
//       }
//     );
//     // Return the first board associated with the project
//     return res.data.values[0]?.id || null;
//   } catch (error) {
//     console.error(`⚠️ Could not fetch board for project ${projectKey}`);
//     return null;
//   }
// }

// // 🏃 Ensure Sprint Exists
// export async function ensureSprintExists(boardId: number, sprintName: string): Promise<number | null> {
//   try {
//     // 1. Check if sprint already exists (active or future)
//     const res = await axios.get(
//       `${process.env.JIRA_DOMAIN}/rest/agile/1.0/board/${boardId}/sprint?state=active,future`,
//       {
//         auth: {
//           username: process.env.JIRA_EMAIL!,
//           password: process.env.JIRA_API_TOKEN!,
//         },
//       }
//     );
    
//     // Exact or case-insensitive match
//     const existing = res.data.values.find((s: any) => s.name.toLowerCase() === sprintName.toLowerCase());
//     if (existing) {
//       console.log(`✅ Sprint found: ${sprintName} (ID: ${existing.id})`);
//       return existing.id;
//     }

//     // 2. Create sprint if it doesn't exist
//     console.log(`🚀 Creating Sprint: ${sprintName} on Board ${boardId}`);
//     const createRes = await axios.post(
//       `${process.env.JIRA_DOMAIN}/rest/agile/1.0/sprint`,
//       {
//         name: sprintName,
//         originBoardId: boardId,
//       },
//       {
//         auth: {
//           username: process.env.JIRA_EMAIL!,
//           password: process.env.JIRA_API_TOKEN!,
//         },
//       }
//     );

//     console.log(`✅ Sprint created: ${createRes.data.id}`);
//     return createRes.data.id;
//   } catch (error: any) {
//     console.error(`❌ Could not handle sprint "${sprintName}":`, error.response?.data || error.message);
//     return null;
//   }
// }

// // ➕ Add Issue To Sprint
// export async function addIssueToSprint(sprintId: number, issueKey: string) {
//   try {
//     console.log(`📌 Adding Issue ${issueKey} to Sprint ${sprintId}`);
//     await axios.post(
//       `${process.env.JIRA_DOMAIN}/rest/agile/1.0/sprint/${sprintId}/issue`,
//       {
//         issues: [issueKey],
//       },
//       {
//         auth: {
//           username: process.env.JIRA_EMAIL!,
//           password: process.env.JIRA_API_TOKEN!,
//         },
//       }
//     );
//     console.log(`✅ Issue ${issueKey} added to Sprint ${sprintId}`);
//   } catch (error: any) {
//     console.error(`❌ Failed to add issue to sprint:`, error.response?.data || error.message);
//   }
// }

// // 🔄 Transition Issue Status (e.g. "To Do" → "In Progress" → "Done")
// // 🔄 Transition Issue Status (FIXED VERSION)
// export async function transitionIssue(
//   issueKey: string,
//   targetStatus: string
// ): Promise<{ success: boolean; message: string }> {
//   try {
//     // 1. Get available transitions
//     const transitionsRes = await axios.get(
//       `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/transitions`,
//       {
//         auth: {
//           username: process.env.JIRA_EMAIL!,
//           password: process.env.JIRA_API_TOKEN!,
//         },
//       }
//     );

//     const transitions = transitionsRes.data.transitions || [];

//     console.log(
//       `📋 Available transitions for ${issueKey}:`,
//       transitions.map((t: any) => t.name)
//     );

//     const target = targetStatus.toLowerCase().trim();

//     // 2. Smart matching
//     let match = transitions.find((t: any) => {
//       const name = t.name.toLowerCase();

//       // exact
//       if (name === target) return true;

//       // flexible matching
//       if (name.includes(target) || target.includes(name)) return true;

//       // keyword mapping
//       if (target === "done" && name.includes("done")) return true;
//       if (target === "in progress" && name.includes("progress")) return true;
//       if (target === "todo" && (name.includes("to do") || name.includes("todo")))
//         return true;

//       return false;
//     });

//     console.log("🎯 Requested:", targetStatus);
//     console.log("🎯 Matched:", match?.name);

//     // ❌ No match found
//     if (!match) {
//       return {
//         success: false,
//         message: `No valid transition found for "${targetStatus}". Available: ${transitions
//           .map((t: any) => t.name)
//           .join(", ")}`,
//       };
//     }

//     // 3. Perform transition
//     await axios.post(
//       `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/transitions`,
//       {
//         transition: {
//           id: match.id,
//         },
//       },
//       {
//         auth: {
//           username: process.env.JIRA_EMAIL!,
//           password: process.env.JIRA_API_TOKEN!,
//         },
//       }
//     );

//     console.log(`✅ ${issueKey} moved to ${match.name}`);

//     return {
//       success: true,
//       message: `${issueKey} moved to ${match.name}`,
//     };
//   } catch (error: any) {
//     console.error(
//       `❌ Transition failed for ${issueKey}:`,
//       error.response?.data || error.message
//     );

//     return {
//       success: false,
//       message:
//         error.response?.data?.errorMessages?.join(", ") ||
//         "Transition failed",
//     };
//   }
// }

// // 📅 Normalize date
// function normalizeDate(input: string | null) {
//   if (!input || input === "null") return null;

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

// // 🔥 Normalize issue type
// function normalizeIssueType(type: string) {
//   if (!type) return "Task";

//   const t = type.toLowerCase();

//   // Map to valid Jira standard issue types
//   if (t === "bug") return "Bug";
//   if (t === "story") return "Story";
//   if (t === "epic") return "Epic";
//   if (t === "sub-task" || t === "subtask") return "Subtask";

//   // Fallback for AI hallucinations (e.g., "Sprint", "Feature")
//   return "Task";
// }

// export async function createJiraTicket(data: any) {
//   const url = `${process.env.JIRA_DOMAIN}/rest/api/3/issue`;

//   const projectKey = await ensureProject(data.Project || "DEV");

//   const accountId =
//     data.Assignee && data.Assignee !== "null"
//       ? await getAccountId(data.Assignee)
//       : null;

//   const epicKey =
//     data.Epic && data.Epic !== "null" ? data.Epic : null;

//   const parentKey =
//     data.Parent && data.Parent !== "null" ? data.Parent : null;

//   let issueType = normalizeIssueType(data.IssueType);

//   const payload: any = {
//     fields: {
//       project: { key: projectKey },

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

//       issuetype: {
//         name: issueType,
//       },

//       priority: {
//         name: data.Priority || "Medium",
//       },

//       duedate: normalizeDate(data.DueDate),

//       labels: data.Labels || [],
//     },
//   };

//   // 👤 Assign
//   if (accountId) {
//     payload.fields.assignee = { accountId };
//   }

//   // 🔗 Epic linking
//   if (epicKey && issueType !== "Subtask") {
//     payload.fields.parent = { key: epicKey };
//   }

//   // 🧩 Subtask
//   if (issueType === "Subtask" && parentKey) {
//     payload.fields.parent = { key: parentKey };
//   }

//   console.log("📦 FINAL PAYLOAD:", JSON.stringify(payload, null, 2));

//   const res = await axios.post(url, payload, {
//     auth: {
//       username: process.env.JIRA_EMAIL!,
//       password: process.env.JIRA_API_TOKEN!,
//     },
//   });

//   const issueKey = res.data.key;
//   console.log("✅ JIRA RESPONSE:", res.data);

//   // 🏃 Handle Sprint Assignment if AI extracted a Sprint
//   if (data.Sprint && data.Sprint !== "null") {
//     const boardId = await getBoardForProject(projectKey);
//     if (boardId) {
//       const sprintId = await ensureSprintExists(boardId, data.Sprint);
//       if (sprintId) {
//         await addIssueToSprint(sprintId, issueKey);
//         res.data.sprintAssigned = data.Sprint;
//       }
//     } else {
//       console.log(`⚠️ Cannot assign sprint: no board found for project ${projectKey}`);
//     }
//   }

//   return res.data;
// }   

// // ✏️ Update Ticket (Status / future extensible)
// export async function updateJiraTicket(data: any) {
//   if (!data.IssueKey) {
//     throw new Error("IssueKey is required for update");
//   }

//   // 🔄 STATUS UPDATE
//   if (data.Status && data.Status !== "null") {
//     console.log(`🔄 Updating status for ${data.IssueKey} → ${data.Status}`);

//     const result = await transitionIssue(data.IssueKey, data.Status);

//     return {
//       type: "status_update",
//       issueKey: data.IssueKey,
//       ...result,
//     };
//   }

//   // 🧠 FUTURE: extend here
//   // if (data.Priority) → update priority
//   // if (data.Assignee) → update assignee

//   return {
//     success: false,
//     message: "No valid update field provided",
//   };
// }   



// import axios from "axios";

// const auth = {
//   username: process.env.JIRA_EMAIL!,
//   password: process.env.JIRA_API_TOKEN!,
// };

// // ==========================
// // 🔍 USER
// // ==========================
// async function getAccountId(name: string) {
//   try {
//     const res = await axios.get(
//       `${process.env.JIRA_DOMAIN}/rest/api/3/user/search?query=${name}`,
//       { auth }
//     );
//     return res.data?.[0]?.accountId || null;
//   } catch {
//     return null;
//   }
// }

// // ==========================
// // 🚀 PROJECT
// // ==========================
// async function createProject(projectKey: string) {
//   const me = await axios.get(`${process.env.JIRA_DOMAIN}/rest/api/3/myself`, { auth });

//   await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/project`,
//     {
//       key: projectKey,
//       name: `${projectKey} Project`,
//       projectTypeKey: "software",
//       projectTemplateKey: "com.pyxis.greenhopper.jira:gh-simplified-agility-scrum",
//       leadAccountId: me.data.accountId,
//     },
//     { auth }
//   );

//   return projectKey;
// }

// async function ensureProject(projectKey: string) {
//   try {
//     await axios.get(`${process.env.JIRA_DOMAIN}/rest/api/3/project/${projectKey}`, { auth });
//     return projectKey;
//   } catch {
//     return await createProject(projectKey);
//   }
// }

// // ==========================
// // 🏃 SPRINT
// // ==========================
// export async function getBoardForProject(projectKey: string) {
//   const res = await axios.get(
//     `${process.env.JIRA_DOMAIN}/rest/agile/1.0/board?projectKeyOrId=${projectKey}`,
//     { auth }
//   );
//   return res.data.values[0]?.id || null;
// }

// export async function ensureSprintExists(boardId: number, sprintName: string) {
//   const res = await axios.get(
//     `${process.env.JIRA_DOMAIN}/rest/agile/1.0/board/${boardId}/sprint`,
//     { auth }
//   );

//   const existing = res.data.values.find((s: any) =>
//     s.name.toLowerCase() === sprintName.toLowerCase()
//   );

//   if (existing) return existing.id;

//   const created = await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/agile/1.0/sprint`,
//     { name: sprintName, originBoardId: boardId },
//     { auth }
//   );

//   return created.data.id;
// }

// export async function addIssueToSprint(sprintId: number, issueKey: string) {
//   await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/agile/1.0/sprint/${sprintId}/issue`,
//     { issues: [issueKey] },
//     { auth }
//   );
// }

// // ==========================
// // 🔄 STATUS
// // ==========================
// export async function transitionIssue(issueKey: string, targetStatus: string) {
//   const res = await axios.get(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/transitions`,
//     { auth }
//   );

//   const transitions = res.data.transitions;

//   const match = transitions.find((t: any) => {
//     const name = t.name.toLowerCase();
//     const target = targetStatus.toLowerCase();

//     return (
//       name.includes(target) ||
//       (target === "done" && name.includes("done")) ||
//       (target === "progress" && name.includes("progress"))
//     );
//   });

//   if (!match) throw new Error("No valid transition");

//   await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/transitions`,
//     { transition: { id: match.id } },
//     { auth }
//   );

//   return { success: true, message: `${issueKey} moved to ${match.name}` };
// }

// // ==========================
// // ✏️ UPDATE FIELDS
// // ==========================
// export async function updateFields(issueKey: string, data: any) {
//   const fields: any = {};

//   if (data.Priority) fields.priority = { name: data.Priority };

//   if (data.Summary) fields.summary = data.Summary;

//   if (data.Labels) fields.labels = data.Labels;

//   if (data.Assignee) {
//     const accountId = await getAccountId(data.Assignee);
//     if (accountId) fields.assignee = { accountId };
//   }

//   await axios.put(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}`,
//     { fields },
//     { auth }
//   );

//   return { success: true, message: `${issueKey} updated` };
// }

// // ==========================
// // 💬 COMMENT
// // ==========================
// export async function addComment(issueKey: string, comment: string) {
//   await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/comment`,
//     {
//       body: {
//         type: "doc",
//         version: 1,
//         content: [{ type: "paragraph", content: [{ type: "text", text: comment }] }],
//       },
//     },
//     { auth }
//   );

//   return { success: true, message: "Comment added" };
// }

// // ==========================
// // 🔗 LINK ISSUES
// // ==========================
// export async function linkIssues(
//   from: string,
//   to: string,
//   relation: string = "blocks"
// ) {
//   // 🔥 Normalize relation
//   const map: any = {
//     blocks: "Blocks",
//     block: "Blocks",
//     relates: "Relates",
//     relate: "Relates",
//     depends: "Depends",
//     dependency: "Depends",
//   };

//   const typeName = map[relation.toLowerCase()] || "Blocks";

//   console.log(`🔗 Linking ${from} → ${to} as ${typeName}`);

//   await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issueLink`,
//     {
//       type: { name: typeName },
//       inwardIssue: { key: from },
//       outwardIssue: { key: to },
//     },
//     {
//       auth: {
//         username: process.env.JIRA_EMAIL!,
//         password: process.env.JIRA_API_TOKEN!,
//       },
//     }
//   );

//   return {
//     success: true,
//     message: `${from} linked to ${to} as ${typeName}`,
//     type: "link",
//   };
// }

// // ==========================
// // 🔍 SEARCH
// // ==========================
// export async function searchJira(jql: string) {
//   const res = await axios.get(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/search?jql=${encodeURIComponent(jql)}`,
//     { auth }
//   );

//   return res.data.issues;
// }

// // ==========================
// // 🎟️ CREATE
// // ==========================
// export async function createJiraTicket(data: any) {
//   const projectKey = await ensureProject(data.Project || "DEV");

//   const payload: any = {
//     fields: {
//       project: { key: projectKey },
//       summary: data.Title,
//       description: {
//         type: "doc",
//         version: 1,
//         content: [
//           { type: "paragraph", content: [{ type: "text", text: data.Summary }] },
//         ],
//       },
//       issuetype: { name: data.IssueType || "Task" },
//       priority: { name: data.Priority || "Medium" },
//       labels: data.Labels || [],
//     },
//   };

//   const res = await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issue`,
//     payload,
//     { auth }
//   );

//   const issueKey = res.data.key;

//   // Sprint assign
//   if (data.Sprint) {
//     const board = await getBoardForProject(projectKey);
//     if (board) {
//       const sprintId = await ensureSprintExists(board, data.Sprint);
//       await addIssueToSprint(sprintId, issueKey);
//     }
//   }

//   return res.data;
// }

// // ==========================
// // 🧠 MASTER UPDATE ROUTER
// // ==========================
// export async function updateJiraTicket(data: any): Promise<{
//   success: boolean;
//   message: string;
//   type: string;
// }> {
//   if (!data.IssueKey) throw new Error("IssueKey required");

//   // 🔄 STATUS
//   if (data.Status) {
//     const res = await transitionIssue(data.IssueKey, data.Status);
//     return { ...res, type: "status" };
//   }

//   // ✏️ FIELD UPDATE
//   if (data.Priority || data.Assignee || data.Summary || data.Labels) {
//     const res = await updateFields(data.IssueKey, data);
//     return { ...res, type: "field_update" };
//   }

//   // 💬 COMMENT
//   if (data.Comment) {
//     const res = await addComment(data.IssueKey, data.Comment);
//     return { ...res, type: "comment" };
//   }

//   // 🔗 LINK
//   if (data.LinkIssue) {
//     const res = await linkIssues(data.IssueKey, data.LinkIssue);
//     return { ...res, type: "link" };
//   }

//   return {
//     success: false,
//     message: "No valid update action",
//     type: "none",
//   };
// }    



// import axios from "axios";

// const auth = {
//   username: process.env.JIRA_EMAIL!,
//   password: process.env.JIRA_API_TOKEN!,
// };

// // ==========================
// // 🔍 USER
// // ==========================
// async function getAccountId(name: string) {
//   try {
//     const res = await axios.get(
//       `${process.env.JIRA_DOMAIN}/rest/api/3/user/search?query=${name}`,
//       { auth }
//     );
//     return res.data?.[0]?.accountId || null;
//   } catch {
//     return null;
//   }
// }

// // ==========================
// // 🚀 PROJECT
// // ==========================
// async function createProject(projectKey: string) {
//   const me = await axios.get(`${process.env.JIRA_DOMAIN}/rest/api/3/myself`, { auth });

//   await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/project`,
//     {
//       key: projectKey,
//       name: `${projectKey} Project`,
//       projectTypeKey: "software",
//       projectTemplateKey: "com.pyxis.greenhopper.jira:gh-simplified-agility-scrum",
//       leadAccountId: me.data.accountId,
//     },
//     { auth }
//   );

//   return projectKey;
// }

// async function ensureProject(projectKey: string) {
//   try {
//     await axios.get(`${process.env.JIRA_DOMAIN}/rest/api/3/project/${projectKey}`, { auth });
//     return projectKey;
//   } catch {
//     return await createProject(projectKey);
//   }
// }

// // ==========================
// // 🏃 SPRINT
// // ==========================
// export async function getBoardForProject(projectKey: string) {
//   const res = await axios.get(
//     `${process.env.JIRA_DOMAIN}/rest/agile/1.0/board?projectKeyOrId=${projectKey}`,
//     { auth }
//   );
//   return res.data.values[0]?.id || null;
// }

// export async function ensureSprintExists(boardId: number, sprintName: string) {
//   const res = await axios.get(
//     `${process.env.JIRA_DOMAIN}/rest/agile/1.0/board/${boardId}/sprint`,
//     { auth }
//   );

//   const existing = res.data.values.find((s: any) =>
//     s.name.toLowerCase() === sprintName.toLowerCase()
//   );

//   if (existing) return existing.id;

//   const created = await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/agile/1.0/sprint`,
//     { name: sprintName, originBoardId: boardId },
//     { auth }
//   );

//   return created.data.id;
// }

// export async function addIssueToSprint(sprintId: number, issueKey: string) {
//   await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/agile/1.0/sprint/${sprintId}/issue`,
//     { issues: [issueKey] },
//     { auth }
//   );
// }

// // ==========================
// // 🔄 STATUS (FIXED)
// // ==========================
// export async function transitionIssue(issueKey: string, targetStatus: string) {
//   const res = await axios.get(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/transitions`,
//     { auth }
//   );

//   const transitions = res.data.transitions;

//   console.log("📋 Available transitions:", transitions.map((t: any) => t.name));

//   const target = targetStatus.toLowerCase();

//   const match = transitions.find((t: any) => {
//     const name = t.name.toLowerCase();

//     return (
//       name.includes(target) ||
//       (target === "done" && name.includes("done")) ||
//       (target === "in progress" && name.includes("progress")) ||
//       (target === "todo" && name.includes("to do"))
//     );
//   });

//   console.log("🎯 Requested:", targetStatus);
//   console.log("🎯 Matched:", match?.name);

//   if (!match) {
//     throw new Error("No valid transition found");
//   }

//   await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/transitions`,
//     { transition: { id: match.id } },
//     { auth }
//   );

//   return { success: true, message: `${issueKey} moved to ${match.name}` };
// }

// // ==========================
// // ✏️ UPDATE FIELDS
// // ==========================
// // export async function updateFields(issueKey: string, data: any) {
// //   const fields: any = {};

// //   if (data.Priority) fields.priority = { name: data.Priority };
// //   if (data.Summary) fields.summary = data.Summary;
// //   if (data.Labels) fields.labels = data.Labels;

// //   if (data.Assignee) {
// //     const accountId = await getAccountId(data.Assignee);
// //     if (accountId) fields.assignee = { accountId };
// //   }

// //   await axios.put(
// //     `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}`,
// //     { fields },
// //     { auth }
// //   );

// //   return { success: true, message: `${issueKey} updated` };
// // }  

// export async function updateFields(issueKey: string, data: any) {
//   const fields: any = {};

//   if (data.Priority) fields.priority = { name: data.Priority };
//   if (data.Summary) fields.summary = data.Summary;
//   if (data.Labels) fields.labels = data.Labels;

//   if (data.Assignee) {
//     const accountId = await getAccountId(data.Assignee);
//     if (accountId) fields.assignee = { accountId };
//   }

//   // ✅ NEW: Parent support (ADDED)
//   if (data.Parent) {
//     fields.parent = { key: data.Parent };
//     console.log(`🔗 Setting parent of ${issueKey} → ${data.Parent}`);
//   }

//   await axios.put(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}`,
//     { fields },
//     { auth }
//   );

//   return { success: true, message: `${issueKey} updated` };
// }

// // ==========================
// // 💬 COMMENT
// // ==========================
// export async function addComment(issueKey: string, comment: string) {
//   await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/comment`,
//     {
//       body: {
//         type: "doc",
//         version: 1,
//         content: [
//           {
//             type: "paragraph",
//             content: [{ type: "text", text: comment }],
//           },
//         ],
//       },
//     },
//     { auth }
//   );

//   return { success: true, message: "Comment added" };
// }

// // ==========================
// // 🔗 LINK ISSUES (FIXED)
// // ==========================
// export async function linkIssues(
//   from: string,
//   to: string,
//   relation: string = "blocks"
// ) {
//   const map: any = {
//     blocks: "Blocks",
//     block: "Blocks",
//     relates: "Relates",
//     relate: "Relates",
//     depends: "Depends",
//     dependency: "Depends",
//   };

//   const typeName = map[relation.toLowerCase()] || "Blocks";

//   console.log(`🔗 Linking ${from} → ${to} as ${typeName}`);

//   await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issueLink`,
//     {
//       type: { name: typeName },
//       inwardIssue: { key: from },
//       outwardIssue: { key: to },
//     },
//     { auth }
//   );

//   return {
//     success: true,
//     message: `${from} linked to ${to} as ${typeName}`,
//   };
// }

// // ==========================
// // 🔍 SEARCH
// // ==========================
// export async function searchJira(jql: string) {
//   const res = await axios.get(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/search?jql=${encodeURIComponent(jql)}`,
//     { auth }
//   );

//   return res.data.issues;
// }

// // ==========================
// // 🎟️ CREATE
// // ==========================
// export async function createJiraTicket(data: any) {
//   const projectKey = await ensureProject(data.Project || "DEV");

//   const payload: any = {
//     fields: {
//       project: { key: projectKey },
//       summary: data.Title,
//       description: {
//         type: "doc",
//         version: 1,
//         content: [
//           { type: "paragraph", content: [{ type: "text", text: data.Summary }] },
//         ],
//       },
//       issuetype: { name: data.IssueType || "Task" },
//       priority: { name: data.Priority || "Medium" },
//       labels: data.Labels || [],
//     },
//   };

//   const res = await axios.post(
//     `${process.env.JIRA_DOMAIN}/rest/api/3/issue`,
//     payload,
//     { auth }
//   );

//   const issueKey = res.data.key;

//   if (data.Sprint) {
//     const board = await getBoardForProject(projectKey);
//     if (board) {
//       const sprintId = await ensureSprintExists(board, data.Sprint);
//       await addIssueToSprint(sprintId, issueKey);
//     }
//   }

//   return res.data;
// }

// // ==========================
// // 🧠 MASTER UPDATE ROUTER (FIXED)
// // ==========================
// export async function updateJiraTicket(data: any): Promise<{
//   success: boolean;
//   message: string;
//   type: string;
// }> {
//   if (!data.IssueKey) throw new Error("IssueKey required");

//   if (data.Status) {
//     const res = await transitionIssue(data.IssueKey, data.Status);
//     return { ...res, type: "status" };
//   }

//   if (data.Priority || data.Assignee || data.Summary || data.Labels) {
//     const res = await updateFields(data.IssueKey, data);
//     return { ...res, type: "field_update" };
//   }

//   if (data.Comment) {
//     const res = await addComment(data.IssueKey, data.Comment);
//     return { ...res, type: "comment" };
//   }

//   if (data.LinkIssue) {
//     const res = await linkIssues(
//       data.IssueKey,
//       data.LinkIssue,
//       data.Relation || "blocks"
//     );
//     return { ...res, type: "link" };
//   }

//   return {
//     success: false,
//     message: "No valid update action",
//     type: "none",
//   };
// }   



import axios from "axios";

const auth = {
  username: process.env.JIRA_EMAIL!,
  password: process.env.JIRA_API_TOKEN!,
};

// ==========================
// 🔍 USER
// ==========================
async function getAccountId(name: string) {
  try {
    const res = await axios.get(
      `${process.env.JIRA_DOMAIN}/rest/api/3/user/search?query=${name}`,
      { auth }
    );
    return res.data?.[0]?.accountId || null;
  } catch {
    return null;
  }
}

// ==========================
// 🚀 PROJECT
// ==========================
async function createProject(projectKey: string) {
  const me = await axios.get(
    `${process.env.JIRA_DOMAIN}/rest/api/3/myself`,
    { auth }
  );

  await axios.post(
    `${process.env.JIRA_DOMAIN}/rest/api/3/project`,
    {
      key: projectKey,
      name: `${projectKey} Project`,
      projectTypeKey: "software",
      projectTemplateKey:
        "com.pyxis.greenhopper.jira:gh-simplified-agility-scrum",
      leadAccountId: me.data.accountId,
    },
    { auth }
  );

  return projectKey;
}

async function ensureProject(projectKey: string) {
  try {
    await axios.get(
      `${process.env.JIRA_DOMAIN}/rest/api/3/project/${projectKey}`,
      { auth }
    );
    return projectKey;
  } catch {
    return await createProject(projectKey);
  }
}

// ==========================
// 🏃 SPRINT
// ==========================
export async function getBoardForProject(projectKey: string) {
  const res = await axios.get(
    `${process.env.JIRA_DOMAIN}/rest/agile/1.0/board?projectKeyOrId=${projectKey}`,
    { auth }
  );
  return res.data.values[0]?.id || null;
}

export async function ensureSprintExists(
  boardId: number,
  sprintName: string
) {
  const res = await axios.get(
    `${process.env.JIRA_DOMAIN}/rest/agile/1.0/board/${boardId}/sprint`,
    { auth }
  );

  const existing = res.data.values.find((s: any) =>
    s.name.toLowerCase() === sprintName.toLowerCase()
  );

  if (existing) return existing.id;

  const created = await axios.post(
    `${process.env.JIRA_DOMAIN}/rest/agile/1.0/sprint`,
    { name: sprintName, originBoardId: boardId },
    { auth }
  );

  return created.data.id;
}

export async function addIssueToSprint(
  sprintId: number,
  issueKey: string
) {
  await axios.post(
    `${process.env.JIRA_DOMAIN}/rest/agile/1.0/sprint/${sprintId}/issue`,
    { issues: [issueKey] },
    { auth }
  );
}

// ==========================
// 🔄 STATUS
// ==========================
export async function transitionIssue(
  issueKey: string,
  targetStatus: string
) {
  const res = await axios.get(
    `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/transitions`,
    { auth }
  );

  const transitions = res.data.transitions;

  const target = targetStatus.toLowerCase();

  const match = transitions.find((t: any) => {
    const name = t.name.toLowerCase();

    return (
      name.includes(target) ||
      (target === "done" && name.includes("done")) ||
      (target === "in progress" && name.includes("progress")) ||
      (target === "todo" && name.includes("to do"))
    );
  });

  if (!match) throw new Error("No valid transition found");

  await axios.post(
    `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/transitions`,
    { transition: { id: match.id } },
    { auth }
  );

  return { success: true, message: `${issueKey} moved to ${match.name}` };
}

// ==========================
// ✏️ UPDATE FIELDS (NO PARENT)
// ==========================
export async function updateFields(issueKey: string, data: any) {
  const fields: any = {};

  if (data.Priority) fields.priority = { name: data.Priority };
  if (data.Summary) fields.summary = data.Summary;
  if (data.Labels) fields.labels = data.Labels;

  if (data.Assignee) {
    const accountId = await getAccountId(data.Assignee);
    if (accountId) fields.assignee = { accountId };
  }

  await axios.put(
    `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}`,
    { fields },
    { auth }
  );

  return { success: true, message: `${issueKey} updated` };
}

// ==========================
// 💬 COMMENT
// ==========================
export async function addComment(issueKey: string, comment: string) {
  await axios.post(
    `${process.env.JIRA_DOMAIN}/rest/api/3/issue/${issueKey}/comment`,
    {
      body: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: comment }],
          },
        ],
      },
    },
    { auth }
  );

  return { success: true, message: "Comment added" };
}

// ==========================
// 🔗 LINK ISSUES (MAIN RELATION)
// ==========================
export async function linkIssues(
  from: string,
  to: string,
  relation: string = "blocks"
) {
  const map: any = {
    blocks: "Blocks",
    block: "Blocks",
    relates: "Relates",
    relate: "Relates",
    depends: "Depends",
    dependency: "Depends",
  };

  const typeName = map[relation.toLowerCase()] || "Blocks";

  await axios.post(
    `${process.env.JIRA_DOMAIN}/rest/api/3/issueLink`,
    {
      type: { name: typeName },
      inwardIssue: { key: from },
      outwardIssue: { key: to },
    },
    { auth }
  );

  return {
    success: true,
    message: `${from} linked to ${to} as ${typeName}`,
  };
}

// ==========================
// 🔍 SEARCH
// ==========================
export async function searchJira(jql: string) {
  const res = await axios.get(
    `${process.env.JIRA_DOMAIN}/rest/api/3/search?jql=${encodeURIComponent(
      jql
    )}`,
    { auth }
  );

  return res.data.issues;
}

// ==========================
// 🎟️ CREATE
// ==========================
export async function createJiraTicket(data: any) {
  const projectKey = await ensureProject(data.Project || "DEV");

  const payload: any = {
    fields: {
      project: { key: projectKey },
      summary: data.Title,
      description: {
        type: "doc",
        version: 1,
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: data.Summary }],
          },
        ],
      },
      issuetype: { name: data.IssueType || "Task" },
      priority: { name: data.Priority || "Medium" },
      labels: data.Labels || [],
    },
  };

  const res = await axios.post(
    `${process.env.JIRA_DOMAIN}/rest/api/3/issue`,
    payload,
    { auth }
  );

  return res.data;
}

// ==========================
// 🧠 UPDATE ROUTER (LINK ONLY)
// ==========================
export async function updateJiraTicket(data: any): Promise<{
  success: boolean;
  message: string;
  type: string;
}> {
  if (!data.IssueKey) throw new Error("IssueKey required");

  if (data.Status) {
    const res = await transitionIssue(data.IssueKey, data.Status);
    return { ...res, type: "status" };
  }

  if (data.Priority || data.Assignee || data.Summary || data.Labels) {
    const res = await updateFields(data.IssueKey, data);
    return { ...res, type: "field_update" };
  }

  if (data.Comment) {
    const res = await addComment(data.IssueKey, data.Comment);
    return { ...res, type: "comment" };
  }

  // 🔥 ONLY LINKING (NO PARENT)
  if (data.LinkIssue || data.Parent) {
    const res = await linkIssues(
      data.IssueKey,
      data.LinkIssue || data.Parent,
      data.Relation || "blocks"
    );
    return { ...res, type: "link" };
  }

  return {
    success: false,
    message: "No valid update action",
    type: "none",
  };
}