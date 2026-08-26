# nefantaris-theme-docs

## Mission

A documentation-site theme, and the proof that the theme contract generalizes: a docs-shaped content repo should get a docs site by changing one line of config.

## v1 scope

- Sidebar navigation derived from the content folder hierarchy
- Per-page table of contents
- Code blocks with syntax highlighting and a copy button
- Search across the site (static index — no server)
- Prev/next page navigation
- Built as a child or sibling of nefantaris-theme-base where sharing makes sense

## Non-goals (v1)

- Versioned docs (stretch: version switcher)
- API reference generation from source code

## Open questions

- Static search approach (Pagefind-style prebuilt index vs rolling our own)
- Whether docs ordering/hierarchy comes purely from folders or from frontmatter weights

## References

Match the feel of these, closely:

- https://doc.rust-lang.org/stable/std/index.html
- https://laravel.com/framework/docs
