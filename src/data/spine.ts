export type SpineStep = {
  index: string;
  name: string;
  path: string;
  what: string;
  note: string;
};

export const spineSteps: SpineStep[] = [
  {
    index: '01',
    name: 'Client',
    path: 'static/',
    what: 'No-build SPA',
    note: 'index.html + js/ modules. Talks HTTP and SSE to one origin.',
  },
  {
    index: '02',
    name: 'Gate',
    path: 'app.py',
    what: 'FastAPI entrypoint',
    note: 'CORS, gzip, timeout, auth, router wiring, lifespan.',
  },
  {
    index: '03',
    name: 'Routes',
    path: 'routes/',
    what: 'One module per area',
    note: 'Chat, memory, research, email, calendar, tasks, cookbook, MCP. Thin handlers.',
  },
  {
    index: '04',
    name: 'Logic',
    path: 'src/',
    what: 'The agent and its systems',
    note: 'Agent loop, chat, memory, RAG, research, scheduler, tools.',
  },
  {
    index: '05',
    name: 'State',
    path: 'data/ + services',
    what: 'Everything that persists',
    note: 'SQLite app.db, JSON, uploads, vectors. ChromaDB, SearXNG, providers.',
  },
];

export const supportingFolders = [
  { path: 'core/', note: 'auth · database · middleware' },
  { path: 'services/', note: 'docs · search · hwfit · shell · STT · TTS' },
  { path: 'integrations/', note: 'Codex · Claude bridges' },
  { path: 'mcp_servers/', note: 'built-in MCP servers' },
] as const;

export const requestTrace =
  'POST /api/chat → auth/middleware → chat routes → agent loop + memory + RAG → provider /v1/chat/completions → text/event-stream';

export const dataTree = [
  ['data/', '', 'root'],
  ['  app.db', 'sessions · messages · documents · tasks', ''],
  ['  auth.json', 'users · privileges', ''],
  ['  settings.json', 'app settings', ''],
  ['  memory.json', 'long-term memory', ''],
  ['  presets.json', 'model presets', ''],
  ['  uploads/', 'chat attachments', ''],
  ['  personal_docs/', 'RAG source documents', ''],
  ['  chroma/', 'local vector persistence', ''],
  ['  gallery/', 'images · uploads · generated', ''],
  ['  tts_cache/', 'speech cache', ''],
  ['  skills/', 'disk-backed skills', ''],
  ['  mail-attachments/', 'email files', ''],
] as const;

export const dataAnnotations = [
  'BACK UP: cp -r data/',
  'RELOCATE: ZEPHYRUS_DATA_DIR=/path',
  'ONE DIRECTORY, NO HOSTED ACCOUNT',
] as const;
