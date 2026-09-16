"use client";

import { useState } from "react";
import { useBoard } from "@/context/board-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddCardForm({ columnId }: { columnId: string }) {
    const { addCard } = useBoard();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");

    if (!isOpen) {
        return (
            <Button variant="ghost" onClick={() => setIsOpen(true)} className="w-full justify-start text-slate-400">
                + Add Card
            </Button>
        );
    }

    return (
        <div className="flex flex-col gap-2">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Card title" autoFocus />
            <div className="flex gap-2">
                <Button onClick={() => { if (title.trim()) { addCard(columnId, { title: title.trim(), description: "", priority: "medium", dueDate: null, labels: [] }); } setTitle(""); setIsOpen(false); }}>
                    Add
                </Button>
                <Button variant="ghost" onClick={() => { setTitle(""); setIsOpen(false); }}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}

