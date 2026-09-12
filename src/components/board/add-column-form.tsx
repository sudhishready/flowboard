"use client";

import { useState } from "react";
import { useBoard } from "@/context/board-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddColumnForm() {
    const { addColumn } = useBoard();
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");

    if (!isOpen) {
    return  (
        <Button variant="outline" onClick={() => setIsOpen(true)}>
        + Add Column
        </Button>
        );
        }
        return  (
            <div className="flex items-center gap-2">
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Column name" />
                <Button onClick={() => { if (title.trim()) { addColumn(title.trim()); } setTitle(""); setIsOpen(false); }}>
                    Add
                    </Button>
                    <Button variant="ghost" onClick={() => { setTitle(""); setIsOpen(false); }}>
                        Cancel
                        </Button>
                        </div>
                        );
                        }


    