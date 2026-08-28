import type { LayoutProps, NavItem } from "nefantaris";
import { Link } from "wouter";
import classNames from "./classNames";
import Sidebar from "./components/Sidebar";
import { docsTemplateName } from "./docsRoutes";

type HeaderLinkProps = {
    item: NavItem;
    currentPath: string;
};

const HeaderLink = ({ item, currentPath }: HeaderLinkProps) => {
    const isCurrent = item.href === currentPath;

    return (
        <Link
            href={item.href}
            aria-current={isCurrent ? "page" : undefined}
            className={classNames(
                "rounded-md px-2 py-1 transition-colors duration-100",
                isCurrent
                    ? "text-ink font-semibold"
                    : "text-muted hover:text-ink"
            )}
        >
            {item.label}
        </Link>
    );
};

const Layout = ({
    site,
    nav,
    routes,
    currentPath,
    template,
    children,
}: LayoutProps) => {
    const isDocsRoute = template === docsTemplateName;

    return (
        <div className="bg-page text-ink flex min-h-screen flex-col font-sans">
            <a
                href="#main-content"
                className="bg-page text-ink sr-only rounded-md focus:not-sr-only focus:absolute focus:m-2 focus:p-2"
            >
                Skip to main content
            </a>
            <header className="border-line bg-surface border-b">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
                    <Link href="/" className="text-ink text-lg font-semibold">
                        {site.name}
                    </Link>
                    <nav
                        aria-label="Main"
                        className="flex flex-wrap items-center gap-1 text-sm"
                    >
                        {nav.map((item) => (
                            <HeaderLink
                                key={item.href}
                                item={item}
                                currentPath={currentPath}
                            />
                        ))}
                    </nav>
                </div>
            </header>
            <div className="mx-auto flex w-full max-w-7xl grow flex-col gap-6 px-4 py-8 md:flex-row">
                {isDocsRoute && (
                    <Sidebar routes={routes} currentPath={currentPath} />
                )}
                <main id="main-content" className="min-w-0 grow">
                    {children}
                </main>
            </div>
            <footer className="border-line text-muted border-t">
                <div className="mx-auto max-w-7xl px-4 py-6 text-sm">
                    {site.name} — built with Nefantaris
                </div>
            </footer>
        </div>
    );
};

export default Layout;
