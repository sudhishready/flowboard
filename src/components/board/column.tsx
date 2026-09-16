"use client";

import { useState } from "react";
import { ColumnData } from "@/lib/types";
import { useBoard } from "@/context/board-context";
import { TaskCard } from "./task-card";
import { AddCardForm } from "./add-card-form";
import { X } from "lucide-react";

interface ColumnProps {
    column: ColumnData;
    onCardClick: (cardId: string) => void;
    search: string;
}

export function Column({ column, onCardClick, search }: ColumnProps) {
    const { board, deleteColumn, moveCard } = useBoard();
    const [isOver, setIsOver] = useState(false);

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsOver(false);
        const cardId = e.dataTransfer.getData("cardId");
        const fromColumnId = e.dataTransfer.getData("fromColumnId");
        if (cardId && fromColumnId) {
            moveCard(cardId, fromColumnId, column.id, column.cardIds.length);
        }
    };
    return (
        <div
            onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
            onDragLeave={() => setIsOver(false)}
            onDrop={handleDrop}
            className={isOver ? "w-64 shrink-0 rounded-lg border p-2 bg-accent" : "w-64 shrink-0 rounded-lg border p-2 bg-card"}
        >
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold">{column.title}</h3>
                <button onClick={() => deleteColumn(column.id)} className="text-slate-400">
                    <X size={14} />
                </button>
            </div>
            <div className="flex flex-col gap-2">
                {column.cardIds.filter((cardId) => board.cards[cardId].title.toLowerCase().includes(search.toLowerCase())).map((cardId) => (
                    <div
                        key={cardId}
                        draggable
                        onDragStart={(e) => {
                            e.dataTransfer.setData("cardId", cardId);
                            e.dataTransfer.setData("fromColumnId", column.id);
                        }}>
                        <TaskCard card={board.cards[cardId]} onClick={() => onCardClick(cardId)} />
                    </div>
                ))}
            </div>
            <AddCardForm columnId={column.id} />
        </div>
    );

}