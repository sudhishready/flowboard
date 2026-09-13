"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
    const stored = localStorage.getItem("flowboard-theme");
    const dark = stored ? stored === "dark" : true;
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
    }, []);

    function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("flowboard-theme", next ? "dark" : "light");
}

return (
    <Button variant="outline" onClick={toggle} className="ml-2">{isDark ? "🕯️ candlelight" : "🌑 midnight"}</Button>
    );
    }