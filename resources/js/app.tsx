import "./bootstrap";
import "../css/app.css";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/lv";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

dayjs.extend(relativeTime);
dayjs.locale("lv");

const appName =
    (import.meta.env.VITE_APP_NAME as string | undefined) ?? "Laravel";

void createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: async (name) =>
        await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob(["./Pages/**/*.tsx", "../images/**"])
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});
