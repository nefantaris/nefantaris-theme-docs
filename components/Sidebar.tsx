import type { RouteSummary } from "nefantaris";
import { Link } from "wouter";
import classNames from "../classNames";
import { docsSections, type DocsSection } from "../docsRoutes";

type SidebarLinkProps = {
    route: RouteSummary;
    currentPath: string;
};

const SidebarLink = ({ route, currentPath }: SidebarLinkProps) => {
    const isCurrent = route.path === currentPath;

    return (
        <Link
            href={route.path}
            aria-current={isCurrent ? "page" : undefined}
            className={classNames(
                "block rounded-md px-2 py-1 transition-colors duration-100",
                isCurrent
                    ? "bg-page text-ink font-semibold"
                    : "text-muted hover:bg-page hover:text-ink"
            )}
        >
            {route.title}
        </Link>
    );
};

type SidebarSectionProps = {
    section: DocsSection;
    currentPath: string;
};

const SidebarSection = ({ section, currentPath }: SidebarSectionProps) => {
    const links = section.routes.map((route) => (
        <li key={route.path}>
            <SidebarLink route={route} currentPath={currentPath} />
        </li>
    ));

    return section.label === undefined ? (
        <>{links}</>
    ) : (
        <li>
            <h3 className="text-ink mt-3 px-2 py-1 text-sm font-semibold">
                {section.label}
            </h3>
            <ul className="border-line ml-3 flex flex-col gap-1 border-l pl-2">
                {links}
            </ul>
        </li>
    );
};

type SidebarProps = {
    routes: RouteSummary[];
    currentPath: string;
};

const Sidebar = ({ routes, currentPath }: SidebarProps) => {
    const sections = docsSections(routes);

    return (
        <nav
            aria-labelledby="docs-nav-heading"
            className="bg-surface border-line shrink-0 self-start rounded-md border p-4 md:w-64"
        >
            <h2
                id="docs-nav-heading"
                className="text-muted mb-3 text-sm font-semibold tracking-wide uppercase"
            >
                Documentation
            </h2>
            {sections.length === 0 ? (
                <p className="text-muted text-sm">
                    No documentation pages yet.
                </p>
            ) : (
                <ul className="flex flex-col gap-1 text-sm">
                    {sections.map((section) => (
                        <SidebarSection
                            key={section.key}
                            section={section}
                            currentPath={currentPath}
                        />
                    ))}
                </ul>
            )}
        </nav>
    );
};

export default Sidebar;
