"use client";

import { useState } from "react";
import { useBoard } from "@/context/board-context";
import { Column } from "./column";
import { AddColumnForm } from "./add-column-form";
import { CardDialog } from "./card-dialog";

export function Board() {
const { board } = useBoard();
const [activeCardId, setActiveCardId] = useState<string | null>(null);

return (
<div className="flex gap-4 overflow-x-auto p-6">
    {board.columns.map((column) => (
    <Column key={column.id} column={column} onCardClick={setActiveCardId} />
    ))}
    <AddColumnForm />
    {activeCardId && (
    <CardDialog cardId={activeCardId} onClose={() => setActiveCardId(null)} />
    )}
</div>
);
}
