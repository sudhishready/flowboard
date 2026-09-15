"use client";

import { useState } from "react";
import { useBoard } from "@/context/board-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BoardSwitcher() {
    const { boards, currentBoardId, switchBoard, createBoard, deleteBoard } = useBoard();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");

    return (
        <div className="flex items-center gap-2">
            <select value={currentBoardId} onChange={(e) => switchBoard(e.target.value)}>
                {boards.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
            {boards.length > 1 && (
                <Button variant="ghost" onClick={() => deleteBoard(currentBoardId)}>
                    Delete
                </Button>
            )}
            {!isOpen && (
                <Button variant="outline" onClick={() => setIsOpen(true)}>
                    + New Board
                </Button>
            )}
            {isOpen && (
                <div className="flex items-center gap-2">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Board name" />
                    <Button onClick={() => { if (name.trim()) { createBoard(name.trim()); setName(""); setIsOpen(false); } }}>
                        Create
                    </Button>
                    <Button variant="ghost" onClick={() => { setName(""); setIsOpen(false); }}>
                        Cancel
                    </Button>
                </div>
            )}
            </div>
    )
}