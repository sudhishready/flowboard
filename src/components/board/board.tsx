"use client";

import { useState } from "react";
import { useBoard } from "@/context/board-context";
import { Column } from "./column";
import { AddColumnForm } from "./add-column-form";
import { CardDialog } from "./card-dialog";
import { Input } from "@/components/ui/input";

export function Board() {
const { board } = useBoard();
const [activeCardId, setActiveCardId] = useState<string | null>(null);
const [search, setSearch] = useState("");
return (
<div className="p-6">
    <h1 className="font-heading text-5xl text-primary mb-6">flowboard</h1>
    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search the crypt..." className="mb-4 w-64" />
    <div className="flex gap-4 overflow-x-auto">
    {board.columns.map((column) => (
    <Column key={column.id} column={column} onCardClick={setActiveCardId} search={search} />
    ))}
    <AddColumnForm />
    </div>
    {activeCardId && (
    <CardDialog cardId={activeCardId} onClose={() => setActiveCardId(null)} />
    )}
</div>
);
}
