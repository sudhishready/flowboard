"use client";

import { useEffect, useRef, useState } from "react";

export function HauntedAmbience() {
    const [playing, setPlaying] = useState(false);
    const ctxRef = useRef<AudioContext | null>(null);
    const oscsRef = useRef<OscillatorNode[]>([]);
    const [scare, setScare] = useState(false);

    useEffect(() => {
        return () => {
            ctxRef.current?.close();
        };
    }, []);

    useEffect(() => {
        if (!playing) return;
        let timeoutId: number;
        const scareNow = () => {
            setScare(true);
            const ctx = ctxRef.current;
            if (ctx) {
                const osc = ctx.createOscillator();
                const g = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.value = 180;
                g.gain.value = 0.2;
                osc.connect(g);
                g.connect(ctx.destination);
                osc.start();
                osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);
                g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                osc.stop(ctx.currentTime + 0.4);
            }
            window.setTimeout(() => setScare(false), 350);
        };
        const schedule = () => {
            const delay = 12000 + Math.random() * 6000;
            timeoutId = window.setTimeout(() => {
                scareNow();
                schedule();
            }, delay);
        };
        schedule();
        return () => clearTimeout(timeoutId);
    }, [playing]);

    const toggle = () => {
        if (playing) {
            ctxRef.current?.close();
            ctxRef.current = null;
            setPlaying(false);
            return;
        }

        const ctx = new AudioContext();
        const gain = ctx.createGain();
        gain.gain.value = 0.05;
        gain.connect(ctx.destination);

        [55, 58].forEach((freq) => {
            const osc = ctx.createOscillator();
            osc.type = "sine";
            osc.frequency.value = freq;
            osc.connect(gain);
            osc.start();
            oscsRef.current.push(osc);
        });
        ctxRef.current = ctx;
        setPlaying(true);
    };


    return (
        <>
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(120,0,0,0.35),_transparent_60%),radial-gradient(ellipse_at_bottom,_rgba(80,0,0,0.4),_transparent_60%)]" />
                <svg className="absolute right-0 top-0 h-72 w-28 opacity-70" viewBox="0 0 100 300" fill="none">
                    <path d="M50 0 C40 40 60 60 50 100 C42 130 58 150 48 190 C40 220 55 240 45 280 L100 300 L100 0 Z" fill="#3b0000" />
                    <path d="M65 10 C60 40 75 60 68 95 C63 120 78 145 70 180" stroke="#7a0000" strokeWidth="4" strokeLinecap="round" />
                </svg>
            </div>
            {scare && (
                <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/85">
                    <span className="text-9xl">
                        💀
                    </span>
                </div>
            )}
            <button onClick={toggle} className="fixed bottom-4 right-4 z-10 rounded-full border border-red-900 bg-black/60 px-3 py-2 text-xs text-red-400">
                {playing ? "silence the crypt" : "wake the dead"}</button></>);
}
