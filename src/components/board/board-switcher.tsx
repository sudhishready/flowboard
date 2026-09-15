"use client";

import { useState } from "react";
import { useBoard } from "@/context/board-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BoardSwitcher() {
    const { boards, currentBoardId, switchBoard, createBoard, deleteBoard, renameBoard } = useBoard();
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState("");
    const currentBoard = boards.find((b) => b.id === currentBoardId);

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
            {!isRenaming && (
                <Button variant="ghost" onClick={() => { setRenameValue(currentBoard?.name ?? ""); setIsRenaming(true); }}>
                    Rename
                </Button>
            )}
            {isRenaming && (
                <div className="flex items-center gap-2">
                    <Input value={renameValue} onChange={(e) => setRenameValue(e.target.value)} placeholder="Board name" />
                    <Button onClick={() => { if (renameValue.trim()) { renameBoard(currentBoardId, renameValue.trim()); } setIsRenaming(false); }}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={() => setIsRenaming(false)}>
                        Cancel
                    </Button>
                </div>
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