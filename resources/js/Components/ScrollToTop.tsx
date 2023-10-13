import { useEffect, useState } from "react";
import { IconButton } from "./IconButton";

const VISIBILITY_START_POS = 300;
const HIDE_POS = 150;

function toTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

export function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const updateVisibility = () => {
            const pos = window.scrollY;
            if (visible === false && pos > VISIBILITY_START_POS) {
                setVisible(true);
            } else if (visible === true && pos < HIDE_POS) {
                setVisible(false);
            }
        };
        document.addEventListener("scroll", updateVisibility);
        return () => document.removeEventListener("scroll", updateVisibility);
    }, [visible]);

    return (
        <div
            className={"fixed bottom-6 end-6 transition duration-300 visible"}
            style={{
                visibility: visible ? "visible" : "hidden",
                opacity: +visible * 1,
            }}
        >
            <IconButton onClick={toTop}>arrow_upward</IconButton>
        </div>
    );
}
