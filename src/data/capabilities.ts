export type Capability = {
  group: string;
  groupName: string;
  index: string;
  name: string;
  spec: string;
  detail: string;
};

export const capabilityGroups = [
  { roman: 'I', name: 'Reason' },
  { roman: 'II', name: 'Remember' },
  { roman: 'III', name: 'Operate' },
  { roman: 'IV', name: 'Make' },
] as const;

export const capabilities: Capability[] = [
  {
    group: 'I',
    groupName: 'Reason',
    index: '01',
    name: 'Agent loop',
    spec: 'Streaming chat · tool calls · background bash',
    detail:
      'Plans, calls tools, observes results, and streams over SSE. Admin-gated tools stay gated even when the model asks for them.',
  },
  {
    group: 'I',
    groupName: 'Reason',
    index: '02',
    name: 'Deep research',
    spec: 'Multi-step web research · visual reports',
    detail:
      'Plans sub-questions, searches, reads, and assembles a report on your own SearXNG instance. The search path stays inside your network.',
  },
  {
    group: 'I',
    groupName: 'Reason',
    index: '03',
    name: 'Model compare',
    spec: 'Same prompt, two models, side by side',
    detail:
      'A/B a local model against a hosted one without leaving the console. Responses are rendered together for a direct read.',
  },
  {
    group: 'II',
    groupName: 'Remember',
    index: '04',
    name: 'Memory',
    spec: 'Long-term memory.json · vector recall',
    detail:
      'Facts persist across sessions in memory.json; semantic recall uses your local vector store. Nothing is sent to a memory service.',
  },
  {
    group: 'II',
    groupName: 'Remember',
    index: '05',
    name: 'RAG',
    spec: 'Point at directories · ChromaDB + FastEmbed',
    detail:
      'Documents stay local. Embeddings use your endpoint when available and fall back to FastEmbed ONNX when one is not configured.',
  },
  {
    group: 'II',
    groupName: 'Remember',
    index: '06',
    name: 'Web search',
    spec: 'Self-hosted SearXNG · no search API key',
    detail:
      'Results come from your SearXNG instance. DuckDuckGo is optional. There is no metered search account in the request path.',
  },
  {
    group: 'III',
    groupName: 'Operate',
    index: '07',
    name: 'Email',
    spec: 'Multi-account IMAP/SMTP · threads · pollers',
    detail:
      'Read, compose, and poll mailboxes from the console. Outlook limits and provider caveats are documented in the repo.',
  },
  {
    group: 'III',
    groupName: 'Operate',
    index: '08',
    name: 'Calendar + contacts',
    spec: 'CalDAV/CardDAV · .ics import/export',
    detail:
      'Sync calendars and contacts, and keep the store in your own data directory. Import and export .ics files without a hosted calendar account.',
  },
  {
    group: 'III',
    groupName: 'Operate',
    index: '09',
    name: 'Tasks + notes',
    spec: 'Scheduler · event bus · Keep-style notes',
    detail:
      'Schedule work, react to events, and keep notes next to the rest of your data. Background jobs report back into the same workspace.',
  },
  {
    group: 'IV',
    groupName: 'Make',
    index: '10',
    name: 'Documents',
    spec: 'Artifact editor · Office/PDF extraction',
    detail:
      'Edit artifacts in the canvas, extract text from Office and PDF files, and keep the outputs under data/. No document leaves the box.',
  },
  {
    group: 'IV',
    groupName: 'Make',
    index: '11',
    name: 'Media + voice',
    spec: 'Gallery · generation · TTS/STT',
    detail:
      'Local faster-whisper STT, TTS, an image library, and transforms. Models run on your hardware or your own endpoints.',
  },
  {
    group: 'IV',
    groupName: 'Make',
    index: '12',
    name: 'MCP + bridges',
    spec: 'MCP manager · Codex/Claude bridges · API tokens',
    detail:
      'Connect MCP servers, bridge external agents, and issue scoped API tokens. The MCP manager is part of the same admin surface.',
  },
];
