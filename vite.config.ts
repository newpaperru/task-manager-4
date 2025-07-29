import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            "@components": path.resolve(__dirname, "./client/src/components"),
            "@pages": path.resolve(__dirname, "./client/src/pages"),
            "@css": path.resolve(__dirname, "./client/src/css"),
            "@fonts": path.resolve(__dirname, "./client/src/fonts"),
            "@assets": path.resolve(__dirname, "./client/src/assets"),
            "@LoginForm": path.resolve(__dirname, "./client/src/components/LoginForm"),
            "@api": path.resolve(__dirname, "./client/src/api"),
            "@widgets": path.resolve(__dirname, "./client/src/components/widgets"),
        },
    },
});

