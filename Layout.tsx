import type { LayoutProps, NavItem } from "nefantaris";
import { useState } from "react";
import { Link } from "wouter";
import classNames from "./classNames";
import Icon from "./components/Icon";
import ModeSwitch from "./components/ModeSwitch";
import Sidebar from "./components/Sidebar";
import { docsTemplateName, isCurrentRoute } from "./docsRoutes";

const isWithinHref = (href: string, currentPath: string): boolean =>
    href === "/"
        ? currentPath === "/"
        : isCurrentRoute(href, currentPath) ||
          currentPath.startsWith(`${href}/`);

type HeaderLinkProps = {
    item: NavItem;
    currentPath: string;
};

const HeaderLink = ({ item, currentPath }: HeaderLinkProps) => {
    const isActive = isWithinHref(item.href, currentPath);

    return (
        <Link
            href={item.href}
            aria-current={
                isCurrentRoute(item.href, currentPath) ? "page" : undefined
            }
            className={classNames(
                "flex h-11 items-center rounded-md px-3 text-sm transition-colors duration-100 md:h-9",
                isActive
                    ? "bg-surface text-ink font-medium"
                    : "text-muted hover:bg-surface hover:text-ink"
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
    modes,
    settings,
    children,
}: LayoutProps) => {
    const [menuOpenedAt, setMenuOpenedAt] = useState<string>();
    const isDocsRoute = template === docsTemplateName;
    const isSidebarRight = settings.sidebarSide === "right";
    const isMenuOpen = menuOpenedAt === currentPath;

    return (
        <div className="bg-page text-ink flex min-h-screen flex-col font-sans antialiased">
            <a
                href="#main-content"
                className="bg-accent text-page sr-only z-50 rounded-md px-4 py-2 text-sm font-medium focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
            >
                Skip to main content
            </a>
            <header
                data-part="site-header"
                className="border-line border-b print:hidden"
            >
                <div className="mx-auto flex max-w-(--width-page) flex-wrap items-center gap-x-6 px-4 sm:px-6">
                    <Link
                        href="/"
                        data-part="site-name"
                        className="text-ink min-w-0 truncate py-4 text-base leading-6 font-semibold"
                    >
                        {site.name}
                    </Link>
                    {!!nav.length && (
                        <nav
                            id="site-menu"
                            data-part="nav"
                            aria-label="Main"
                            className={classNames(
                                isMenuOpen ? "block" : "hidden",
                                "border-line order-last w-full border-t py-2 md:order-none md:block md:w-auto md:border-0 md:py-0"
                            )}
                        >
                            <ul className="flex flex-col gap-0.5 md:flex-row md:flex-wrap md:items-center md:gap-1">
                                {nav.map((item) => (
                                    <li key={item.href}>
                                        <HeaderLink
                                            item={item}
                                            currentPath={currentPath}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                    <div className="ml-auto flex items-center gap-1">
                        <ModeSwitch modes={modes} />
                        {!!nav.length && (
                            <button
                                type="button"
                                aria-label="Menu"
                                aria-expanded={isMenuOpen}
                                aria-controls="site-menu"
                                onClick={() =>
                                    setMenuOpenedAt(
                                        isMenuOpen ? undefined : currentPath
                                    )
                                }
                                className="text-muted hover:bg-surface hover:text-ink inline-flex size-9 items-center justify-center rounded-md transition-colors duration-100 md:hidden"
                            >
                                <Icon name={isMenuOpen ? "close" : "menu"} />
                            </button>
                        )}
                    </div>
                </div>
            </header>
            <div
                className={classNames(
                    "mx-auto w-full max-w-(--width-page) grow px-4 sm:px-6",
                    isDocsRoute && "lg:flex lg:gap-12",
                    isDocsRoute && isSidebarRight && "lg:flex-row-reverse"
                )}
            >
                {isDocsRoute && (
                    <Sidebar
                        routes={routes}
                        currentPath={currentPath}
                        isNumbered={settings.chapterNumbers}
                        isOnRight={isSidebarRight}
                    />
                )}
                <main
                    id="main-content"
                    data-part="main"
                    className="min-w-0 grow py-8 lg:py-12 print:py-0"
                >
                    {children}
                </main>
            </div>
            <footer
                data-part="site-footer"
                className="border-line border-t print:hidden"
            >
                <p className="text-muted mx-auto max-w-(--width-page) px-4 py-6 text-sm sm:px-6">
                    {site.name} — built with Nefantaris
                </p>
            </footer>
        </div>
    );
};

export default Layout;
