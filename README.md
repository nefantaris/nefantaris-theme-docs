# nefantaris-theme-docs

A documentation theme for Nefantaris.

This repo is a group of React components and a `theme.json`. There is no
`package.json`, no Vite config, no tsconfig, and no test suite —
[nefantaris-core](https://github.com/nefantaris/nefantaris-core) reads the
manifest, generates a React project around these files, and supplies the
tooling. See the theme contract that ships with core for the full spec.

## Status

A working stub, not a finished docs site. The manifest, the layout, and the
three templates render correctly against core's fixture corpus and pass
`nef theme check`. The sidebar, prev/next links, and the full GFM prose set are
in. Everything else in [BRIEF.md](./BRIEF.md) — per-page table of contents,
syntax highlighting, search — is Phase 3 work.

## Templates

| Name       | Selected by                      | Renders                          |
| ---------- | -------------------------------- | -------------------------------- |
| `page`     | default for every route          | a centred prose column           |
| `docsPage` | frontmatter `template: docsPage` | the same column plus the sidebar |
| `notFound` | the 404 route                    | a short recovery page            |

The theme declares no `post` and no `blogIndex`. A docs site does not need
them, and core only requires `page` and `notFound`; posts and the generated
blog index fall back to `page`.

## Navigation

The header and the sidebar are deliberately different views. The header renders
`nav` from `nefantaris.json` — site-owned, top-level, hand-written. The sidebar
renders `routes`, the generated route list every template and layout receives,
filtered to the ones that resolved to `docsPage`; a docs site never
hand-maintains a nav entry per page.

`Layout` shows the sidebar only when the resolved `template` is `docsPage`.
Sidebar order is the order core gives, which is by `path`. Routes are grouped by
their first path segment: `/guides` and `/guides/deployment` share a "Guides"
heading, while a single-segment route such as `/install` is a bare link.
`DocsPageTemplate` walks the same filtered list for its prev/next links, so the
two always agree.

## Commands

Run from a `nefantaris-core` checkout beside this one:

| Command                                    | Purpose                                    |
| ------------------------------------------ | ------------------------------------------ |
| `nef theme dev ../nefantaris-theme-docs`   | preview against core's fixture corpus      |
| `nef theme check ../nefantaris-theme-docs` | manifest, types, imports, lint, formatting |

Both commands write `.nefantaris/`, `tsconfig.json`, and a `node_modules`
symlink into this repo. All three are gitignored, and the editor gets contract
types once either has run.

## License

MIT — see [LICENSE](./LICENSE).
