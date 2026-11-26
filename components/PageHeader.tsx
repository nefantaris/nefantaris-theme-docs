import type { ReactNode } from "react";

type PageHeaderProps = {
    title: string;
    description?: string;
    eyebrow?: ReactNode;
};

const PageHeader = ({ title, description, eyebrow }: PageHeaderProps) => (
    <header>
        {!!eyebrow && (
            <p className="text-muted mb-2 flex items-baseline gap-2 text-sm">
                {eyebrow}
            </p>
        )}
        <h1 className="text-ink text-2xl leading-8 font-semibold text-balance">
            {title}
        </h1>
        {!!description && (
            <p className="text-muted mt-3 text-lg leading-7 text-pretty">
                {description}
            </p>
        )}
    </header>
);

export default PageHeader;
