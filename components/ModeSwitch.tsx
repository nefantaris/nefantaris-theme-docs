import type { Mode, ModeState } from "nefantaris";
import Icon from "./Icon";

const nextModeAfter = (modes: ModeState): Mode | undefined =>
    modes.available.find((mode) => mode !== modes.current);

type ModeSwitchProps = {
    modes: ModeState;
};

const ModeSwitch = ({ modes }: ModeSwitchProps) => {
    const next = nextModeAfter(modes);

    return (
        modes.available.length > 1 &&
        next !== undefined && (
            <button
                type="button"
                aria-label={`Switch to ${next} mode`}
                onClick={() => modes.set(next)}
                className="text-muted hover:bg-surface hover:text-ink inline-flex size-9 items-center justify-center rounded-md transition-colors duration-100"
            >
                <Icon name={next === "light" ? "sun" : "moon"} />
            </button>
        )
    );
};

export default ModeSwitch;
