import type { ReactNode } from "react";
import classNames from "../classNames";

export type IconName =
    | "arrowLeft"
    | "arrowRight"
    | "chevronDown"
    | "close"
    | "contents"
    | "danger"
    | "menu"
    | "moon"
    | "note"
    | "sun"
    | "tip"
    | "warning";

const iconPaths: Record<IconName, ReactNode> = {
    arrowLeft: <path d="m12 19-7-7 7-7M19 12H5" />,
    arrowRight: <path d="M5 12h14m-7-7 7 7-7 7" />,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    close: <path d="M18 6 6 18M6 6l12 12" />,
    contents: (
        <path d="M10 6h11M10 12h11M10 18h11M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    ),
    danger: (
        <>
            <path d="M8.4 3.2h7.2l5.2 5.2v7.2l-5.2 5.2H8.4l-5.2-5.2V8.4Z" />
            <path d="M12 8v4.5M12 16h.01" />
        </>
    ),
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    moon: <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
    note: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 16v-4.5M12 8h.01" />
        </>
    ),
    sun: (
        <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </>
    ),
    tip: (
        <path d="M9 18h6M10 21.5h4M15 14.5c.2-1.1.8-1.9 1.6-2.7A5.5 5.5 0 1 0 7.4 11.8c.8.8 1.4 1.6 1.6 2.7" />
    ),
    warning: (
        <path d="M10.3 3.9 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0ZM12 9.5v4M12 17h.01" />
    ),
};

type IconProps = {
    name: IconName;
    isSmall?: boolean;
    className?: string;
};

const Icon = ({ name, isSmall, className }: IconProps) => (
    <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={classNames(
            isSmall ? "size-4" : "size-4.5",
            "shrink-0",
            className
        )}
    >
        {iconPaths[name]}
    </svg>
);

export default Icon;
