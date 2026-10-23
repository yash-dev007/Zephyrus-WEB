export const site = {
  name: 'Zephyrus',
  legalName: 'Zephyrus',
  title: 'Zephyrus — Local-first AI harness',
  description:
    'Self-hosted AI harness: agent loops, memory, RAG, MCP bridges and local model serving in one FastAPI server. Docker install, AGPL-3.0.',
  shortDescription:
    'A self-hosted AI harness for OpenAI-compatible models. Agent loops, memory, RAG, MCP bridges and local serving behind one FastAPI server.',
  version: '1.0.1',
  edition: '2026',
  license: 'AGPL-3.0',
  port: 7000,
  repo: 'https://github.com/yash-dev007/Zephyrus',
  // TODO(launch): replace with the confirmed production domain.
  url: import.meta.env.PUBLIC_SITE_URL ?? 'https://zephyrus.example',
  og: {
    title: 'Your models. Your machine. Your hoard.',
    description:
      'Zephyrus is a local-first AI harness. One FastAPI server, one data directory, every provider you already run.',
  },
} as const;

const repo = site.repo;
const blob = `${repo}/blob/master`;

export const links = {
  github: repo,
  features: `${blob}/README.md#features`,
  readme: `${blob}/README.md`,
  setup: `${blob}/docs/setup.md`,
  setupConfig: `${blob}/docs/setup.md#configuration`,
  backup: `${blob}/docs/backup-restore.md`,
  security: `${blob}/SECURITY.md`,
  threatModel: `${blob}/THREAT_MODEL.md`,
  contributing: `${blob}/CONTRIBUTING.md`,
  branchModel: `${blob}/CONTRIBUTING.md#branch-model`,
  roadmap: `${blob}/ROADMAP.md`,
  license: `${blob}/LICENSE`,
  releases: `${repo}/releases`,
  issues: `${repo}/issues`,
  stars: `${repo}/stargazers`,
  repoMap: `${blob}/README.md#repo-map`,
  dataLayout: `${blob}/README.md#data-layout`,
} as const;

export const nav = [
  { label: 'Anatomy', href: '/#anatomy', id: 'anatomy' },
  { label: 'Architecture', href: '/#spine', id: 'spine' },
  { label: 'Local-first', href: '/#hoard', id: 'hoard' },
  { label: 'Providers', href: '/#kin', id: 'kin' },
  { label: 'Install', href: '/#rite', id: 'rite' },
] as const;
