import type { RouteSummary } from "nefantaris";
import { useState } from "react";
import { Link } from "wouter";
import classNames from "../classNames";
import {
    docsLocation,
    docsSections,
    isCurrentRoute,
    type DocsEntry,
    type DocsSection,
} from "../docsRoutes";
import Icon from "./Icon";

const numberClasses = "w-8 shrink-0 font-mono text-xs tabular-nums";

type SidebarLinkProps = {
    entry: DocsEntry;
    currentPath: string;
    isNumbered: boolean;
};

const SidebarLink = ({ entry, currentPath, isNumbered }: SidebarLinkProps) => {
    const isCurrent = isCurrentRoute(entry.route.path, currentPath);

    return (
        <Link
            href={entry.route.path}
            aria-current={isCurrent ? "page" : undefined}
            className={classNames(
                "flex items-baseline gap-2 rounded-md px-2 py-2.5 transition-colors duration-100 focus-visible:-outline-offset-2 lg:py-1.5",
                isCurrent
                    ? "bg-surface text-ink font-medium"
                    : "text-muted hover:bg-surface hover:text-ink"
            )}
        >
            {isNumbered && (
                <span
                    data-part="chapter-number"
                    className={classNames(
                        numberClasses,
                        isCurrent ? "text-accent" : "text-muted"
                    )}
                >
                    {entry.number}
                </span>
            )}
            <span className="min-w-0">{entry.route.title}</span>
        </Link>
    );
};

type SidebarSectionProps = {
    section: DocsSection;
    currentPath: string;
    isNumbered: boolean;
};

const SidebarSection = ({
    section,
    currentPath,
    isNumbered,
}: SidebarSectionProps) => {
    const labelId = `docs-section-${section.number}`;
    const links = section.entries.map((entry) => (
        <li key={entry.route.path}>
            <SidebarLink
                entry={entry}
                currentPath={currentPath}
                isNumbered={isNumbered}
            />
        </li>
    ));

    return section.label === undefined ? (
        <>{links}</>
    ) : (
        <li className="not-first:mt-6 [&+li]:mt-6">
            <p
                id={labelId}
                className="text-ink flex items-baseline gap-2 px-2 py-2.5 font-semibold lg:py-1.5"
            >
                {isNumbered && (
                    <span
                        data-part="chapter-number"
                        className={classNames(numberClasses, "text-muted")}
                    >
                        {section.number}
                    </span>
                )}
                {section.label}
            </p>
            <ol aria-labelledby={labelId} className="flex flex-col gap-0.5">
                {links}
            </ol>
        </li>
    );
};

type SidebarProps = {
    routes: RouteSummary[];
    currentPath: string;
    isNumbered: boolean;
    isOnRight: boolean;
};

const Sidebar = ({
    routes,
    currentPath,
    isNumbered,
    isOnRight,
}: SidebarProps) => {
    const [openedAt, setOpenedAt] = useState<string>();
    const sections = docsSections(routes);
    const { current } = docsLocation(routes, currentPath);
    const isOpen = openedAt === currentPath;

    return (
        <div
            data-part="sidebar"
            className={classNames(
                "lg:border-line pt-4 lg:w-(--width-sidebar) lg:shrink-0 lg:pt-0 print:hidden",
                isOnRight ? "lg:border-l" : "lg:border-r"
            )}
        >
            <div
                className={classNames(
                    "lg:sticky lg:top-0 lg:max-h-screen lg:overflow-y-auto lg:pt-10.5 lg:pb-12",
                    isOnRight ? "lg:pl-4" : "lg:pr-4"
                )}
            >
                <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls="docs-sidebar"
                    onClick={() =>
                        setOpenedAt(isOpen ? undefined : currentPath)
                    }
                    className="bg-surface text-ink flex h-11 w-full items-center gap-3 rounded-md px-4 text-left text-sm transition-colors duration-100 lg:hidden"
                >
                    <Icon name="contents" className="text-muted" />
                    <span className="font-medium">Contents</span>
                    {!!current && (
                        <span className="text-muted flex min-w-0 items-baseline gap-2">
                            {isNumbered && (
                                <span
                                    data-part="chapter-number"
                                    className="font-mono text-xs"
                                >
                                    {current.number}
                                </span>
                            )}
                            <span className="truncate">
                                {current.route.title}
                            </span>
                        </span>
                    )}
                    <Icon
                        name="chevronDown"
                        className={classNames(
                            "text-muted ml-auto transition-transform duration-100",
                            isOpen && "rotate-180"
                        )}
                    />
                </button>
                <nav
                    id="docs-sidebar"
                    aria-label="Documentation"
                    className={classNames(
                        isOpen ? "block" : "hidden",
                        "border-line mt-2 rounded-md border p-2 text-sm lg:mt-0 lg:block lg:border-0 lg:p-0"
                    )}
                >
                    {sections.length === 0 ? (
                        <p className="text-muted px-2 py-1.5">
                            No documentation pages yet
                        </p>
                    ) : (
                        <ol className="flex flex-col gap-0.5">
                            {sections.map((section) => (
                                <SidebarSection
                                    key={section.key}
                                    section={section}
                                    currentPath={currentPath}
                                    isNumbered={isNumbered}
                                />
                            ))}
                        </ol>
                    )}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
