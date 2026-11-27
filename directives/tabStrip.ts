import type { DirectiveAttributes } from "nefantaris";

export const tabStripClasses =
    "border-line mt-0 flex flex-wrap gap-x-1 border-b text-sm leading-6";

export const tabClasses =
    "-mb-px rounded-t-md border-b-2 px-3 py-2 transition-colors duration-100";

export const selectedTabClasses = "border-accent text-ink font-medium";

export const tabPanelClasses = "pt-4 [&>:first-child]:mt-0";

export const tabLabel = (
    attributes: DirectiveAttributes,
    fallback: string
): string => attributes.label?.trim() || fallback;
