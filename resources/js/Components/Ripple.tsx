import { useLayoutEffect, useMemo, useRef, useState } from "react";
import "../../css/ripple.css";

export type RippleHandle = (event?: RippleEvent) => void;

export interface RippleEvent {
    clientX?: number;
    clientY?: number;
}

export interface RippleStyle {
    width: string;
    height: string;
    left: string;
    top: string;
}

function calculateRipplePosition(
    container: DOMRect,
    rippleEvent: RippleEvent
): RippleStyle {
    const diameter = Math.max(container.width, container.height);
    const radius = diameter / 2;
    const clientX = rippleEvent.clientX ?? container.x + container.width / 2;
    const clientY = rippleEvent.clientY ?? container.y + container.height / 2;
    return {
        width: `${diameter}px`,
        height: `${diameter}px`,
        left: `${clientX - (container.x + radius)}px`,
        top: `${clientY - (container.y + radius)}px`,
    };
}

export function useRipple(
    containerRef: HTMLDivElement | null
): [RippleStyle[], RippleHandle] {
    const [rippleEvents, setRippleEvents] = useState<RippleEvent[]>([]);

    useLayoutEffect(() => {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;
        if (rippleEvents.length > 0) {
            timeoutId = setTimeout(() => {
                setRippleEvents([]);
                clearTimeout(timeoutId);
            }, 300 * 5);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [rippleEvents]);

    const addRipple: (event?: RippleEvent) => void = (event) => {
        setRippleEvents([...rippleEvents, event ?? {}]);
    };

    const rippleArray = useMemo<RippleStyle[]>(() => {
        if (containerRef !== null) {
            const element = containerRef.getBoundingClientRect();
            return rippleEvents.map((ripple) =>
                calculateRipplePosition(element, ripple)
            );
        } else {
            return [];
        }
    }, [containerRef, rippleEvents]);

    return [rippleArray, addRipple];
}

export function Ripple() {
    const containerRef = useRef<HTMLDivElement>(null);

    const [rippleArray, addRipple] = useRipple(containerRef.current);

    return (
        <div
            className="ripple-container"
            ref={containerRef}
            onClick={addRipple}
        >
            {rippleArray.map((ripple, idx) => (
                <span key={idx} style={ripple}></span>
            ))}
        </div>
    );
}
