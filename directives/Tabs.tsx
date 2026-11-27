import type { DirectiveProps } from "nefantaris";
import {
    Children,
    Fragment,
    isValidElement,
    useId,
    useRef,
    useState,
    type KeyboardEvent,
    type ReactElement,
    type ReactNode,
} from "react";
import classNames from "../classNames";
import {
    selectedTabClasses,
    tabClasses,
    tabLabel,
    tabPanelClasses,
    tabStripClasses,
} from "./tabStrip";

type TabElement = ReactElement<DirectiveProps>;

const isTabElement = (block: ReactNode): block is TabElement =>
    isValidElement<DirectiveProps>(block) && block.props.directive === "tab";

const Tabs = ({ children }: DirectiveProps) => {
    const baseId = useId();
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const blocks = Children.toArray(children);
    const otherBlocks = blocks.filter((block) => !isTabElement(block));
    const tabs = blocks.filter(isTabElement).map((element, index) => ({
        content: element.props.children,
        label: tabLabel(element.props.attributes, `Tab ${index + 1}`),
        tabId: `${baseId}-tab-${index}`,
        panelId: `${baseId}-panel-${index}`,
    }));
    const lastIndex = tabs.length - 1;

    const selectAndFocus = (index: number) => {
        setSelectedIndex(index);
        tabRefs.current.at(index)?.focus();
    };

    const onTabKeyDown = (
        event: KeyboardEvent<HTMLButtonElement>,
        index: number
    ) => {
        const targets: Partial<Record<string, number>> = {
            ArrowRight: index === lastIndex ? 0 : index + 1,
            ArrowLeft: index === 0 ? lastIndex : index - 1,
            Home: 0,
            End: lastIndex,
        };
        const target = targets[event.key];
        if (target === undefined) {
            return;
        }
        event.preventDefault();
        selectAndFocus(target);
    };

    return (
        <div data-part="tabs" className="mt-6">
            {otherBlocks}
            {!!tabs.length && (
                <>
                    <div
                        role="tablist"
                        className={classNames(tabStripClasses, "print:hidden")}
                    >
                        {tabs.map((tab, index) => {
                            const isSelected = index === selectedIndex;
                            return (
                                <button
                                    key={tab.tabId}
                                    ref={(element) => {
                                        tabRefs.current[index] = element;
                                    }}
                                    type="button"
                                    role="tab"
                                    id={tab.tabId}
                                    aria-selected={isSelected}
                                    aria-controls={tab.panelId}
                                    tabIndex={isSelected ? 0 : -1}
                                    onClick={() => setSelectedIndex(index)}
                                    onKeyDown={(event) =>
                                        onTabKeyDown(event, index)
                                    }
                                    className={classNames(
                                        tabClasses,
                                        "focus-visible:-outline-offset-2",
                                        isSelected
                                            ? selectedTabClasses
                                            : "text-muted hover:text-ink border-transparent"
                                    )}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                    {tabs.map((tab, index) => (
                        <Fragment key={tab.panelId}>
                            <p
                                className={classNames(
                                    "hidden font-semibold print:block",
                                    index === 0 ? "mt-0" : "mt-6"
                                )}
                            >
                                {tab.label}
                            </p>
                            <div
                                id={tab.panelId}
                                role="tabpanel"
                                aria-labelledby={tab.tabId}
                                className={classNames(
                                    tabPanelClasses,
                                    "print:pt-2",
                                    index === selectedIndex
                                        ? "block"
                                        : "hidden print:block"
                                )}
                            >
                                {tab.content}
                            </div>
                        </Fragment>
                    ))}
                </>
            )}
        </div>
    );
};

export default Tabs;
