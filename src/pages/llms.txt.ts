import type { APIRoute } from 'astro';
import { links, site } from '@/data/site';

export const prerender = true;

export const GET: APIRoute = () => {
  const base = site.url.replace(/\/$/, '');
  const body = `# Zephyrus

> Zephyrus is a self-hosted AI harness for OpenAI-compatible models. One FastAPI server, one
> data directory, every model provider you already run. Agent loops, persistent memory, RAG,
> MCP bridges, and local serving. AGPL-3.0.

- Canonical: ${base}
- Source: ${site.repo}
- Version: ${site.version}
- License: ${site.license}
- Install: ${base}/#rite
- Architecture: ${base}/#spine
- Data guarantees: ${base}/#hoard
- Providers: ${base}/#kin

## Pages

- [Home](${base}/): The pitch, the anatomy, the install.
- [Colophon](${base}/colophon): Type, stack, image credits, accessibility, and license.

## Primary sources

- [README](${links.readme})
- [Setup](${links.setup})
- [Threat model](${links.threatModel})
- [Security policy](${links.security})
- [License](${links.license})

## Notes

- No cookies, no analytics, no third-party requests at launch.
- The site is static; the product is self-hosted.
- Provider names are trademarks of their owners. Zephyrus is not affiliated with them.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
