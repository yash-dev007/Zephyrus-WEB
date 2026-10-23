export type InstallMethod = {
  id: string;
  label: string;
  panelLabel: string;
  commands: string[];
  comment?: string;
  note?: string;
  caveat?: string;
};

const clone = ['git clone https://github.com/yash-dev007/Zephyrus.git', 'cd Zephyrus'];

export const installMethods: InstallMethod[] = [
  {
    id: 'docker',
    label: 'Docker',
    panelLabel: 'Recommended / docker compose',
    commands: [...clone, 'cp .env.example .env', 'docker compose up -d --build'],
    comment: 'open http://localhost:7000',
    note: 'The compose stack builds on first run, then starts the API on :7000.',
  },
  {
    id: 'native',
    label: 'Linux / macOS',
    panelLabel: 'Native / Python 3.11+',
    commands: [
      ...clone,
      'python3 -m venv venv',
      'source venv/bin/activate',
      'pip install -r requirements.txt',
      'python setup.py',
      'python -m uvicorn app:app --host 127.0.0.1 --port 7000',
    ],
    comment: 'open http://127.0.0.1:7000',
    caveat: 'On macOS, ./start-macos.sh serves on 7860 because AirPlay often holds 7000.',
  },
  {
    id: 'windows',
    label: 'Windows',
    panelLabel: 'Native / PowerShell',
    commands: [...clone, 'powershell -ExecutionPolicy Bypass -File .\\launch-windows.ps1'],
    comment: 'open http://localhost:7000',
    caveat:
      'Local GPU serving wants Linux or WSL2. From Windows, point Zephyrus at Ollama on http://localhost:11434/v1.',
  },
];

export const verification = {
  title: 'Verify the stack',
  commands: [
    'docker compose ps',
    "docker compose logs zephyrus | grep -E 'ChromaDB|MemoryVectorStore|DEGRADED'",
  ],
  note: 'Expect Up (healthy) from the first command. The log check reports the vector store and any degraded service without stopping the server.',
};

export const firstBoot =
  'First boot creates admin (or $ZEPHYRUS_ADMIN_USER) and prints a temporary password to stdout / docker compose logs zephyrus. Change it in Settings.';

export const installFacts = [
  'Docker image',
  'or Python 3.11+',
  'AGPL-3.0',
  'No hosted account',
] as const;
