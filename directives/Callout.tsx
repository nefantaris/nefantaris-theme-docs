import type { DirectiveProps } from "nefantaris";
import Icon from "../components/Icon";

type Tone = "note" | "tip" | "warning" | "danger";

const toneLabels: Record<Tone, string> = {
    note: "Note",
    tip: "Tip",
    warning: "Warning",
    danger: "Danger",
};

const isTone = (value: string | undefined): value is Tone =>
    value !== undefined && Object.hasOwn(toneLabels, value);

const Callout = ({ attributes, children }: DirectiveProps) => {
    const tone = isTone(attributes.tone) ? attributes.tone : "note";
    const toneLabel = toneLabels[tone];
    const title = attributes.title?.trim();

    return (
        <div
            role="note"
            data-part="callout"
            data-tone={tone}
            className="border-tone/25 bg-tone/6 mt-6 break-inside-avoid rounded-md border px-4 py-3"
        >
            <p className="text-tone mt-0 flex items-center gap-2 text-sm leading-6 font-semibold">
                <Icon name={tone} isSmall />
                {title ? (
                    <span>
                        <span className="sr-only">{toneLabel}: </span>
                        {title}
                    </span>
                ) : (
                    toneLabel
                )}
            </p>
            <div className="[&_:not(pre)>code]:bg-page mt-1 [&>:first-child]:mt-0">
                {children}
            </div>
        </div>
    );
};

export default Callout;
