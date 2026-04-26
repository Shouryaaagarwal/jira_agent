// // "use client";

// // import { useState } from "react";

// // export default function TicketForm() {
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [response, setResponse] = useState<any>(null);

// //   const handleSubmit = async () => {
// //     setLoading(true);

// //     try {
// //       const res = await fetch("/api/create-ticket", {
// //         method: "POST",
// //         body: JSON.stringify({ input }),
// //       });

// //       const data = await res.json();
// //       setResponse(data);
// //     } catch (err) {
// //       console.error(err);
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <div className="p-6 max-w-xl mx-auto">
// //       <h1 className="text-2xl font-bold mb-4">
// //         🤖 AI Jira Ticket Generator
// //       </h1>

// //       <textarea
// //         className="w-full border p-3 rounded mb-4"
// //         rows={5}
// //         placeholder="Describe your issue..."
// //         value={input}
// //         onChange={(e) => setInput(e.target.value)}
// //       />

// //       <button
// //         onClick={handleSubmit}
// //         className="bg-[#155da9] text-white px-4 py-2 rounded"
// //       >
// //         {loading ? "Creating..." : "Create Ticket"}
// //       </button>

// //       {response && (
// //         <pre className="mt-4 bg-gray-100 p-3 rounded text-sm">
// //           {JSON.stringify(response, null, 2)}
// //         </pre>
// //       )}
// //     </div>
// //   );
// // }   



// // "use client";

// // import { useState } from "react";

// // interface TicketResponse {
// //   [key: string]: unknown;
// // }

// // export default function TicketForm() {
// //   const [input, setInput] = useState<string>("");
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [response, setResponse] = useState<TicketResponse | null>(null);

// //   const handleSubmit = async (): Promise<void> => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch("/api/create-ticket", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ input }),
// //       });
// //       const data: TicketResponse = await res.json();
// //       setResponse(data);
// //     } catch (err) {
// //       console.error("Failed to create ticket:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4 py-12"
// //       style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

// //         @keyframes fadeUp {
// //           from { opacity: 0; transform: translateY(16px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes pulse-ring {
// //           0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); }
// //           50%       { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
// //         }
// //         @keyframes spin {
// //           to { transform: rotate(360deg); }
// //         }
// //         @keyframes slideDown {
// //           from { opacity: 0; transform: translateY(-8px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         .card { animation: fadeUp 0.5s ease both; }
// //         .response-block { animation: slideDown 0.4s ease both; }
// //         .textarea-glow:focus {
// //           outline: none;
// //           border-color: #6366f1;
// //           box-shadow: 0 0 0 3px rgba(99,102,241,0.15), inset 0 0 30px rgba(99,102,241,0.03);
// //         }
// //         .btn-active:not(:disabled):hover {
// //           background: #4f46e5;
// //           transform: translateY(-1px);
// //           box-shadow: 0 8px 24px rgba(99,102,241,0.35);
// //         }
// //         .btn-active:not(:disabled):active {
// //           transform: translateY(0);
// //         }
// //         .spinner {
// //           width: 14px; height: 14px;
// //           border: 2px solid rgba(255,255,255,0.2);
// //           border-top-color: #fff;
// //           border-radius: 50%;
// //           animation: spin 0.7s linear infinite;
// //           display: inline-block;
// //         }
// //       `}</style>

// //       <div className="card w-full max-w-2xl">

// //         {/* Header */}
// //         <div className="mb-8">
// //           <div className="flex items-center gap-3 mb-3">
// //             <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-base">
// //               🤖
// //             </div>
// //             <span className="text-indigo-400 text-xs tracking-[0.2em] uppercase font-medium"
// //               style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
// //               AI Ticket Generator
// //             </span>
// //           </div>
// //           <h1 className="text-3xl font-semibold text-white leading-tight"
// //             style={{ fontFamily: "'IBM Plex Sans', sans-serif", letterSpacing: "-0.02em" }}>
// //             Create a Jira ticket
// //             <br />
// //             <span className="text-zinc-500">from plain language.</span>
// //           </h1>
// //         </div>

// //         {/* Form card */}
// //         <div className="bg-[#111118] border border-white/[0.07] rounded-2xl p-6 mb-4">

// //           {/* Label row */}
// //           <div className="flex items-center justify-between mb-3">
// //             <label className="text-zinc-400 text-xs tracking-widest uppercase">
// //               Issue Description
// //             </label>
// //             <span className="text-zinc-600 text-xs tabular-nums">
// //               {input.length} chars
// //             </span>
// //           </div>

// //           {/* Textarea */}
// //           <textarea
// //             className="textarea-glow w-full bg-[#0d0d14] border border-white/[0.06] rounded-xl p-4 text-sm text-zinc-200 placeholder-zinc-600 resize-none transition-all duration-200"
// //             style={{ fontFamily: "'IBM Plex Mono', monospace", lineHeight: "1.7" }}
// //             rows={6}
// //             placeholder={"e.g. The login button is unresponsive on mobile\nwhen the keyboard is visible..."}
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //           />

// //           {/* Footer row */}
// //           <div className="flex items-center justify-between mt-4">
// //             <p className="text-zinc-600 text-xs">
// //               Be specific — the more context, the better the ticket.
// //             </p>

// //             <button
// //               onClick={handleSubmit}
// //               disabled={loading || !input.trim()}
// //               className="btn-active flex items-center gap-2 bg-indigo-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
// //               style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
// //             >
// //               {loading ? (
// //                 <>
// //                   <span className="spinner" />
// //                   Generating…
// //                 </>
// //               ) : (
// //                 <>
// //                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                     <path d="M12 5v14M5 12l7 7 7-7"/>
// //                   </svg>
// //                   Generate Ticket
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         </div>

// //         {/* Response block */}
// //         {response && (
// //           <div className="response-block bg-[#111118] border border-white/[0.07] rounded-2xl overflow-hidden">
// //             <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.05]">
// //               <div className="flex items-center gap-2">
// //                 <div className="w-2 h-2 rounded-full bg-emerald-400" />
// //                 <span className="text-zinc-400 text-xs tracking-widest uppercase">
// //                   Generated Ticket
// //                 </span>
// //               </div>
// //               <button
// //                 onClick={() => navigator.clipboard.writeText(JSON.stringify(response, null, 2))}
// //                 className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors duration-150 flex items-center gap-1.5"
// //                 style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
// //               >
// //                 <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                   <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
// //                 </svg>
// //                 Copy JSON
// //               </button>
// //             </div>
// //             <pre className="p-5 text-xs text-emerald-300/80 overflow-auto max-h-80 leading-relaxed"
// //               style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
// //               {JSON.stringify(response, null, 2)}
// //             </pre>
// //           </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // }    



// //  PREVIOUS CODE
// // "use client";

// // import { useState } from "react";

// // interface TicketResponse {
// //   [key: string]: unknown;
// // }

// // export default function TicketForm() {
// //   const [input, setInput] = useState<string>("");
// //   const [loading, setLoading] = useState<boolean>(false);
// //   const [response, setResponse] = useState<TicketResponse | null>(null);
// //   const [copied, setCopied] = useState(false);

// //   const handleSubmit = async (): Promise<void> => {
// //     setLoading(true);
// //     try {
// //       const res = await fetch("/api/create-ticket", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ input }),
// //       });
// //       const data: TicketResponse = await res.json();
// //       setResponse(data);
// //     } catch (err) {
// //       console.error("Failed to create ticket:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCopy = () => {
// //     navigator.clipboard.writeText(JSON.stringify(response, null, 2));
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 1800);
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-16 relative overflow-hidden">

// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@700;800&display=swap');

// //         .font-syne    { font-family: 'Syne', sans-serif; }
// //         .font-jbmono  { font-family: 'JetBrains Mono', monospace; }

// //         @keyframes fadeUp {
// //           from { opacity: 0; transform: translateY(20px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes slideIn {
// //           from { opacity: 0; transform: translateY(-10px); }
// //           to   { opacity: 1; transform: translateY(0); }
// //         }
// //         @keyframes spin    { to { transform: rotate(360deg); } }
// //         @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.25} }

// //         .anim-fadeup   { animation: fadeUp  0.5s cubic-bezier(0.16,1,0.3,1) both; }
// //         .anim-slidein  { animation: slideIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }

// //         .ticket-input:focus {
// //           outline: none;
// //           border-color: #f97316 !important;
// //           box-shadow: 0 0 0 1px #f97316;
// //           caret-color: #f97316;
// //         }

// //         .spinner {
// //           width: 13px; height: 13px;
// //           border: 1.5px solid rgba(0,0,0,0.2);
// //           border-top-color: #000;
// //           border-radius: 50%;
// //           animation: spin 0.65s linear infinite;
// //           display: inline-block;
// //           flex-shrink: 0;
// //         }
// //         .live-dot { animation: blink 1.8s ease-in-out infinite; }

// //         .grid-bg {
// //           position: absolute; inset: 0;
// //           background-image:
// //             linear-gradient(rgba(249,115,22,0.04) 1px, transparent 1px),
// //             linear-gradient(90deg, rgba(249,115,22,0.04) 1px, transparent 1px);
// //           background-size: 48px 48px;
// //           pointer-events: none;
// //         }
// //         .corner-glow {
// //           position: absolute; top: -120px; left: -120px;
// //           width: 420px; height: 420px;
// //           background: radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 68%);
// //           pointer-events: none;
// //         }
// //       `}</style>

// //       {/* BG effects */}
// //       <div className="grid-bg" />
// //       <div className="corner-glow" />

// //       {/* Content */}
// //       <div className="anim-fadeup relative z-10 w-full max-w-2xl font-jbmono">

// //         {/* ── Badge ── */}
// //         <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded px-3 py-1.5 mb-7">
// //           <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
// //             <rect width="10" height="10" rx="2" fill="#f97316"/>
// //             <path d="M3 5h4M5 3v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
// //           </svg>
// //           <span className="font-jbmono text-[11px] tracking-[0.16em] uppercase text-orange-400 font-medium">
// //             Jira Ticket Generator
// //           </span>
// //         </div>

// //         {/* ── Heading ── */}
// //         <h1 className="font-syne text-[clamp(30px,5vw,46px)] font-extrabold leading-[1.1] tracking-tight text-white mb-1">
// //           Describe the issue.
// //         </h1>
// //         <h1 className="font-syne text-[clamp(30px,5vw,46px)] font-extrabold leading-[1.1] tracking-tight text-orange-400 mb-9">
// //           We'll write the ticket.
// //         </h1>

// //         {/* ── Form card ── */}
// //         <div className="relative bg-[#0f0f0f] border border-white/[0.07] rounded-xl p-7 mb-4 overflow-hidden">

// //           {/* Orange top stripe */}
// //           <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

// //           {/* Label row */}
// //           <div className="flex items-center justify-between mb-3">
// //             <label className="font-jbmono text-[11px] tracking-[0.18em] uppercase text-neutral-600 font-medium">
// //               Issue Description
// //             </label>
// //             <span className={`font-jbmono text-[11px] tabular-nums transition-colors duration-200 ${
// //               input.length > 0 ? "text-orange-500" : "text-neutral-800"
// //             }`}>
// //               {input.length} chars
// //             </span>
// //           </div>

// //           {/* Textarea */}
// //           <textarea
// //             className="ticket-input font-jbmono w-full bg-[#0d0d0d] border border-white/[0.06] rounded-lg p-4 text-[13px] leading-7 text-neutral-200 placeholder-neutral-700 resize-none transition-colors duration-200"
// //             rows={6}
// //             placeholder={"e.g. The login button is unresponsive on mobile\nwhen the keyboard is visible..."}
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //           />

// //           {/* Footer row */}
// //           <div className="flex items-center justify-between gap-4 mt-5">
// //             <p className="text-[12px] text-neutral-700 leading-relaxed">
// //               More context → better ticket quality.
// //             </p>

// //             <button
// //               onClick={handleSubmit}
// //               disabled={loading || !input.trim()}
// //               className="
// //                 font-syne flex items-center gap-2
// //                 bg-orange-500 hover:bg-orange-600
// //                 active:scale-[0.98]
// //                 text-black text-[13px] font-bold tracking-wide
// //                 px-5 py-2.5 rounded-md
// //                 transition-all duration-150
// //                 hover:shadow-[0_6px_20px_rgba(249,115,22,0.38)]
// //                 disabled:opacity-30 disabled:cursor-not-allowed
// //                 whitespace-nowrap flex-shrink-0
// //               "
// //             >
// //               {loading ? (
// //                 <>
// //                   <span className="spinner" />
// //                   Generating…
// //                 </>
// //               ) : (
// //                 <>
// //                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                     <polyline points="13 17 18 12 13 7"/>
// //                     <polyline points="6 17 11 12 6 7"/>
// //                   </svg>
// //                   Generate Ticket
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         </div>

// //         {/* ── Tip pills ── */}
// //         <div className="flex flex-wrap gap-2 mb-5">
// //           {["Include steps to reproduce", "Mention affected platform", "Note severity"].map((tip) => (
// //             <span
// //               key={tip}
// //               className="font-jbmono text-[11px] text-neutral-700 bg-[#111] border border-white/[0.05] rounded px-2.5 py-1 tracking-wide"
// //             >
// //               {tip}
// //             </span>
// //           ))}
// //         </div>

// //         {/* ── Response block ── */}
// //         {response && (
// //           <div className="anim-slidein relative bg-[#0f0f0f] border border-white/[0.07] rounded-xl overflow-hidden">

// //             {/* Green top stripe */}
// //             <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-green-500 via-green-400 to-transparent" />

// //             {/* Header */}
// //             <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.05]">
// //               <div className="flex items-center gap-2.5">
// //                 <div className="live-dot w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
// //                 <span className="font-jbmono text-[11px] tracking-[0.15em] uppercase text-neutral-600 font-medium">
// //                   Generated Ticket
// //                 </span>
// //               </div>

// //               <button
// //                 onClick={handleCopy}
// //                 className={`
// //                   font-jbmono flex items-center gap-1.5 text-[11px] px-2 py-1 rounded
// //                   transition-all duration-150
// //                   ${copied
// //                     ? "text-green-400 bg-green-500/10"
// //                     : "text-neutral-600 hover:text-orange-400 hover:bg-orange-500/10"
// //                   }
// //                 `}
// //               >
// //                 {copied ? (
// //                   <>
// //                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
// //                       <polyline points="20 6 9 17 4 12"/>
// //                     </svg>
// //                     Copied
// //                   </>
// //                 ) : (
// //                   <>
// //                     <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
// //                       <rect x="9" y="9" width="13" height="13" rx="2"/>
// //                       <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
// //                     </svg>
// //                     Copy JSON
// //                   </>
// //                 )}
// //               </button>
// //             </div>

// //             {/* JSON pre */}
// //             <pre className="font-jbmono p-5 m-0 text-[12px] text-orange-400/70 bg-[#0a0a0a] leading-7 overflow-auto max-h-80 rounded-b-xl">
// //               {JSON.stringify(response, null, 2)}
// //             </pre>
// //           </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // }  


// "use client";

// import { useState } from "react";

// interface TicketResponse {
//   [key: string]: unknown;
// }

// interface SearchedTicket {
//   key: string;
//   title: string;
//   status: string;
//   priority: string;
//   assignee: string;
//   issueType: string;
//   created: string;
//   labels: string[];
// }

// interface SearchResponse {
//   success: boolean;
//   summary: string;
//   count: number;
//   tickets: SearchedTicket[];
// }

// const priorityColor: Record<string, string> = {
//   High:    "text-red-400 bg-red-500/10 border-red-500/20",
//   Medium:  "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
//   Low:     "text-green-400 bg-green-500/10 border-green-500/20",
// };

// const statusColor: Record<string, string> = {
//   "To Do":       "text-neutral-400 bg-neutral-500/10 border-neutral-500/20",
//   "In Progress": "text-blue-400 bg-blue-500/10 border-blue-500/20",
//   "Done":        "text-green-400 bg-green-500/10 border-green-500/20",
//   "Blocked":     "text-red-400 bg-red-500/10 border-red-500/20",
// };

// export default function TicketForm() {
//   // ── Create state ──
//   const [input, setInput] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [response, setResponse] = useState<TicketResponse | null>(null);
//   const [copied, setCopied] = useState(false);

//   // ── Search state ──
//   const [searchInput, setSearchInput] = useState<string>("");
//   const [searchLoading, setSearchLoading] = useState<boolean>(false);
//   const [searchResult, setSearchResult] = useState<SearchResponse | null>(null);

//   // ── Handlers ──
//   const handleSubmit = async (): Promise<void> => {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/create-ticket", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ input }),
//       });
//       const data: TicketResponse = await res.json();
//       setResponse(data);
//     } catch (err) {
//       console.error("Failed to create ticket:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async (): Promise<void> => {
//     setSearchLoading(true);
//     setSearchResult(null);
//     try {
//       const res = await fetch("/api/search-tickets", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ input: searchInput }),
//       });
//       const data: SearchResponse = await res.json();
//       setSearchResult(data);
//     } catch (err) {
//       console.error("Search failed:", err);
//     } finally {
//       setSearchLoading(false);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(JSON.stringify(response, null, 2));
//     setCopied(true);
//     setTimeout(() => setCopied(false), 1800);
//   };

//   return (
//     <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-16 relative overflow-hidden">

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Syne:wght@700;800&display=swap');

//         .font-syne   { font-family: 'Syne', sans-serif; }
//         .font-jbmono { font-family: 'JetBrains Mono', monospace; }

//         @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes spin    { to{transform:rotate(360deg)} }
//         @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.25} }

//         .anim-fadeup  { animation: fadeUp  0.5s cubic-bezier(0.16,1,0.3,1) both; }
//         .anim-slidein { animation: slideIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }

//         .ticket-input:focus, .search-input:focus {
//           outline: none;
//           border-color: #f97316 !important;
//           box-shadow: 0 0 0 1px #f97316;
//           caret-color: #f97316;
//         }
//         .search-input:focus { border-color: #6366f1 !important; box-shadow: 0 0 0 1px #6366f1; caret-color: #6366f1; }

//         .spinner {
//           width:13px;height:13px;
//           border:1.5px solid rgba(0,0,0,0.2);
//           border-top-color:#000;
//           border-radius:50%;
//           animation:spin 0.65s linear infinite;
//           display:inline-block;flex-shrink:0;
//         }
//         .spinner-white {
//           width:13px;height:13px;
//           border:1.5px solid rgba(255,255,255,0.15);
//           border-top-color:#fff;
//           border-radius:50%;
//           animation:spin 0.65s linear infinite;
//           display:inline-block;flex-shrink:0;
//         }
//         .live-dot { animation: blink 1.8s ease-in-out infinite; }

//         .grid-bg {
//           position:absolute;inset:0;
//           background-image:
//             linear-gradient(rgba(249,115,22,0.04) 1px,transparent 1px),
//             linear-gradient(90deg,rgba(249,115,22,0.04) 1px,transparent 1px);
//           background-size:48px 48px;pointer-events:none;
//         }
//         .corner-glow {
//           position:absolute;top:-120px;left:-120px;
//           width:420px;height:420px;
//           background:radial-gradient(circle,rgba(249,115,22,0.07) 0%,transparent 68%);
//           pointer-events:none;
//         }
//         .divider {
//           display:flex;align-items:center;gap:12px;margin:40px 0;
//         }
//         .divider-line { flex:1;height:1px;background:rgba(255,255,255,0.05); }
//       `}</style>

//       <div className="grid-bg" />
//       <div className="corner-glow" />

//       <div className="anim-fadeup relative z-10 w-full max-w-2xl font-jbmono">

//         {/* ── Badge ── */}
//         <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded px-3 py-1.5 mb-7">
//           <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
//             <rect width="10" height="10" rx="2" fill="#f97316"/>
//             <path d="M3 5h4M5 3v4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
//           </svg>
//           <span className="font-jbmono text-[11px] tracking-[0.16em] uppercase text-orange-400 font-medium">
//             Jira AI Agent
//           </span>
//         </div>

//         {/* ── Heading ── */}
//         <h1 className="font-syne text-[clamp(30px,5vw,46px)] font-extrabold leading-[1.1] tracking-tight text-white mb-1">
//           Describe the issue.
//         </h1>
//         <h1 className="font-syne text-[clamp(30px,5vw,46px)] font-extrabold leading-[1.1] tracking-tight text-orange-400 mb-9">
//           We'll write the ticket.
//         </h1>

//         {/* ════════════════════════════════════════
//             CREATE TICKET SECTION
//         ════════════════════════════════════════ */}
//         <div className="relative bg-[#0f0f0f] border border-white/[0.07] rounded-xl p-7 mb-4 overflow-hidden">
//           <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

//           <div className="flex items-center justify-between mb-3">
//             <label className="font-jbmono text-[11px] tracking-[0.18em] uppercase text-neutral-600 font-medium">
//               Issue Description
//             </label>
//             <span className={`font-jbmono text-[11px] tabular-nums transition-colors duration-200 ${input.length > 0 ? "text-orange-500" : "text-neutral-800"}`}>
//               {input.length} chars
//             </span>
//           </div>

//           <textarea
//             className="ticket-input font-jbmono w-full bg-[#0d0d0d] border border-white/[0.06] rounded-lg p-4 text-[13px] leading-7 text-neutral-200 placeholder-neutral-700 resize-none transition-colors duration-200"
//             rows={6}
//             placeholder={"e.g. The login button is unresponsive on mobile\nwhen the keyboard is visible..."}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />

//           <div className="flex items-center justify-between gap-4 mt-5">
//             <p className="text-[12px] text-neutral-700 leading-relaxed">
//               More context → better ticket quality.
//             </p>
//             <button
//               onClick={handleSubmit}
//               disabled={loading || !input.trim()}
//               className="font-syne flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-black text-[13px] font-bold tracking-wide px-5 py-2.5 rounded-md transition-all duration-150 hover:shadow-[0_6px_20px_rgba(249,115,22,0.38)] disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0"
//             >
//               {loading ? (
//                 <><span className="spinner" />Generating…</>
//               ) : (
//                 <>
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                     <polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/>
//                   </svg>
//                   Generate Ticket
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Tip pills */}
//         <div className="flex flex-wrap gap-2 mb-2">
//           {["Include steps to reproduce", "Mention affected platform", "Note severity"].map((tip) => (
//             <span key={tip} className="font-jbmono text-[11px] text-neutral-700 bg-[#111] border border-white/[0.05] rounded px-2.5 py-1 tracking-wide">
//               {tip}
//             </span>
//           ))}
//         </div>

//         {/* Create response */}
//         {response && (
//           <div className="anim-slidein relative bg-[#0f0f0f] border border-white/[0.07] rounded-xl overflow-hidden mt-4">
//             <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-green-500 via-green-400 to-transparent" />
//             <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.05]">
//               <div className="flex items-center gap-2.5">
//                 <div className="live-dot w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
//                 <span className="font-jbmono text-[11px] tracking-[0.15em] uppercase text-neutral-600 font-medium">
//                   Generated Ticket
//                 </span>
//               </div>
//               <button
//                 onClick={handleCopy}
//                 className={`font-jbmono flex items-center gap-1.5 text-[11px] px-2 py-1 rounded transition-all duration-150 ${copied ? "text-green-400 bg-green-500/10" : "text-neutral-600 hover:text-orange-400 hover:bg-orange-500/10"}`}
//               >
//                 {copied ? (
//                   <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>Copied</>
//                 ) : (
//                   <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy JSON</>
//                 )}
//               </button>
//             </div>
//             <pre className="font-jbmono p-5 m-0 text-[12px] text-orange-400/70 bg-[#0a0a0a] leading-7 overflow-auto max-h-80 rounded-b-xl">
//               {JSON.stringify(response, null, 2)}
//             </pre>
//           </div>
//         )}

//         {/* ── Divider ── */}
//         <div className="divider">
//           <div className="divider-line" />
//           <span className="font-jbmono text-[11px] tracking-[0.2em] uppercase text-neutral-700">or search</span>
//           <div className="divider-line" />
//         </div>

//         {/* ════════════════════════════════════════
//             SEARCH / READ SECTION
//         ════════════════════════════════════════ */}
//         <div className="relative bg-[#0f0f0f] border border-white/[0.07] rounded-xl p-7 overflow-hidden">
//           <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 via-indigo-400 to-transparent" />

//           {/* Section header */}
//           <div className="flex items-center gap-2 mb-5">
//             <div className="w-7 h-7 rounded bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center flex-shrink-0">
//               <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
//               </svg>
//             </div>
//             <div>
//               <p className="font-jbmono text-[11px] tracking-[0.18em] uppercase text-indigo-400 font-medium">Search Tickets</p>
//               <p className="font-jbmono text-[11px] text-neutral-700 mt-0.5">Ask in plain English</p>
//             </div>
//           </div>

//           {/* Example queries */}
//           <div className="flex flex-wrap gap-2 mb-4">
//             {[
//               "show me all open bugs",
//               "tickets assigned to Rahul",
//               "what's the status of DEV-42",
//               "high priority tasks",
//             ].map((ex) => (
//               <button
//                 key={ex}
//                 onClick={() => setSearchInput(ex)}
//                 className="font-jbmono text-[11px] text-indigo-400/60 bg-indigo-500/5 border border-indigo-500/15 hover:border-indigo-500/40 hover:text-indigo-400 rounded px-2.5 py-1 tracking-wide transition-all duration-150"
//               >
//                 {ex}
//               </button>
//             ))}
//           </div>

//           {/* Search input row */}
//           <div className="flex gap-3">
//             <input
//               type="text"
//               className="search-input font-jbmono flex-1 bg-[#0d0d0d] border border-white/[0.06] rounded-lg px-4 py-2.5 text-[13px] text-neutral-200 placeholder-neutral-700 transition-colors duration-200"
//               placeholder='e.g. "show me all open bugs assigned to Rahul"'
//               value={searchInput}
//               onChange={(e) => setSearchInput(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && !searchLoading && searchInput.trim() && handleSearch()}
//             />
//             <button
//               onClick={handleSearch}
//               disabled={searchLoading || !searchInput.trim()}
//               className="font-syne flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white text-[13px] font-bold tracking-wide px-5 py-2.5 rounded-lg transition-all duration-150 hover:shadow-[0_6px_20px_rgba(99,102,241,0.35)] disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap flex-shrink-0"
//             >
//               {searchLoading ? (
//                 <><span className="spinner-white" />Searching…</>
//               ) : (
//                 <>
//                   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                     <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
//                   </svg>
//                   Search
//                 </>
//               )}
//             </button>
//           </div>
//         </div>

//         {/* ── Search Results ── */}
//         {searchResult && (
//           <div className="anim-slidein mt-4 relative bg-[#0f0f0f] border border-white/[0.07] rounded-xl overflow-hidden">
//             <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-500 via-indigo-400 to-transparent" />

//             {/* Result header */}
//             <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.05]">
//               <div className="flex items-center gap-2.5">
//                 <div className="live-dot w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
//                 <span className="font-jbmono text-[11px] tracking-[0.15em] uppercase text-neutral-600 font-medium">
//                   {searchResult.count} ticket{searchResult.count !== 1 ? "s" : ""} found
//                 </span>
//               </div>
//             </div>

//             {/* AI summary */}
//             <div className="px-5 py-4 border-b border-white/[0.05] bg-indigo-500/[0.03]">
//               <p className="font-jbmono text-[12px] text-indigo-300/80 leading-6">
//                 💬 {searchResult.summary}
//               </p>
//             </div>

//             {/* Ticket list */}
//             {searchResult.tickets.length > 0 ? (
//               <div className="divide-y divide-white/[0.04]">
//                 {searchResult.tickets.map((ticket) => (
//                   <div key={ticket.key} className="px-5 py-4 hover:bg-white/[0.02] transition-colors duration-150">
//                     <div className="flex items-start justify-between gap-3 mb-2">
//                       <div className="flex items-center gap-2 flex-shrink-0">
//                         <span className="font-jbmono text-[11px] text-indigo-400 font-semibold">{ticket.key}</span>
//                         <span className="font-jbmono text-[10px] text-neutral-700 bg-neutral-800 border border-white/[0.05] rounded px-1.5 py-0.5">
//                           {ticket.issueType}
//                         </span>
//                       </div>
//                       <div className="flex items-center gap-1.5 flex-shrink-0">
//                         <span className={`font-jbmono text-[10px] border rounded px-1.5 py-0.5 ${priorityColor[ticket.priority] ?? "text-neutral-500 bg-neutral-800 border-neutral-700"}`}>
//                           {ticket.priority}
//                         </span>
//                         <span className={`font-jbmono text-[10px] border rounded px-1.5 py-0.5 ${statusColor[ticket.status] ?? "text-neutral-500 bg-neutral-800 border-neutral-700"}`}>
//                           {ticket.status}
//                         </span>
//                       </div>
//                     </div>

//                     <p className="font-jbmono text-[12px] text-neutral-300 leading-5 mb-2">{ticket.title}</p>

//                     <div className="flex items-center gap-3">
//                       <span className="font-jbmono text-[11px] text-neutral-700 flex items-center gap-1">
//                         <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
//                         </svg>
//                         {ticket.assignee}
//                       </span>
//                       <span className="font-jbmono text-[11px] text-neutral-700 flex items-center gap-1">
//                         <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                           <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
//                         </svg>
//                         {ticket.created}
//                       </span>
//                       {ticket.labels.map((l) => (
//                         <span key={l} className="font-jbmono text-[10px] text-orange-500/60 bg-orange-500/5 border border-orange-500/15 rounded px-1.5 py-0.5">
//                           {l}
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="px-5 py-8 text-center">
//                 <p className="font-jbmono text-[12px] text-neutral-700">No tickets found matching your query.</p>
//               </div>
//             )}
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }   


"use client";

import { useState } from "react";

interface TicketResponse {
  [key: string]: unknown;
}

export default function TicketForm() {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<TicketResponse | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data: TicketResponse = await res.json();
      setResponse(data);
    } catch (err) {
      console.error("Failed to create ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 py-16 relative overflow-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .font-syne   { font-family: 'Syne', sans-serif; }
        .font-jbmono { font-family: 'JetBrains Mono', monospace; }

        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from{opacity:0;transform:translateY(-10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin    { to{transform:rotate(360deg)} }
        @keyframes blink   { 0%,100%{opacity:1} 50%{opacity:0.25} }

        .anim-fadeup  { animation: fadeUp  0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .anim-slidein { animation: slideIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }

        .ticket-input:focus {
          outline: none;
          border-color: #f97316 !important;
          box-shadow: 0 0 0 1px #f97316;
          caret-color: #f97316;
        }

        .spinner {
          width:13px;height:13px;
          border:1.5px solid rgba(0,0,0,0.2);
          border-top-color:#000;
          border-radius:50%;
          animation:spin 0.65s linear infinite;
          display:inline-block;
        }

        .live-dot { animation: blink 1.8s ease-in-out infinite; }

        .grid-bg {
          position:absolute;inset:0;
          background-image:
            linear-gradient(rgba(249,115,22,0.04) 1px,transparent 1px),
            linear-gradient(90deg,rgba(249,115,22,0.04) 1px,transparent 1px);
          background-size:48px 48px;
        }

        .corner-glow {
          position:absolute;top:-120px;left:-120px;
          width:420px;height:420px;
          background:radial-gradient(circle,rgba(249,115,22,0.07) 0%,transparent 68%);
        }
      `}</style>

      <div className="grid-bg" />
      <div className="corner-glow" />

      <div className="anim-fadeup relative z-10 w-full max-w-2xl font-jbmono">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded px-3 py-1.5 mb-7">
          <span className="font-jbmono text-[11px] tracking-[0.16em] uppercase text-orange-400 font-medium">
            JiraOps AI Assistant
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-syne text-[clamp(32px,5vw,48px)] font-extrabold text-white mb-1">
          Automate Jira.
        </h1>
        <h1 className="font-syne text-[clamp(32px,5vw,48px)] font-extrabold text-orange-400 mb-9">
          Using natural language.
        </h1>

        {/* Form */}
        <div className="relative bg-[#0f0f0f] border border-white/[0.07] rounded-xl p-7 mb-4 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

          <div className="flex items-center justify-between mb-3">
            <label className="font-jbmono text-[11px] uppercase text-neutral-600">
              Issue Description
            </label>
            <span className={`text-[11px] ${input.length ? "text-orange-500" : "text-neutral-800"}`}>
              {input.length} chars
            </span>
          </div>

          <textarea
            className="ticket-input w-full bg-[#0d0d0d] border border-white/[0.06] rounded-lg p-4 text-[13px] text-neutral-200 resize-none"
            rows={6}
            placeholder="Describe your task, bug, or automation..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex justify-between mt-5">
            <p className="text-[12px] text-neutral-700">
              More context → better automation.
            </p>

            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim()}
              className="font-syne flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-black text-[13px] font-bold px-5 py-2.5 rounded-md transition-all disabled:opacity-30"
            >
              {loading ? (
                <><span className="spinner" />Processing…</>
              ) : (
                "Run Automation"
              )}
            </button>
          </div>
        </div>

        {/* Response */}
        {response && (
          <div className="anim-slidein bg-[#0f0f0f] border border-white/[0.07] rounded-xl overflow-hidden">
            <div className="flex justify-between px-5 py-3 border-b border-white/[0.05]">
              <span className="text-neutral-500 text-xs uppercase">
                Execution Result
              </span>

              <button
                onClick={handleCopy}
                className="text-xs text-neutral-400 hover:text-orange-400"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>

            <pre className="p-5 text-[12px] text-orange-400/70 bg-[#0a0a0a] overflow-auto max-h-80">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}