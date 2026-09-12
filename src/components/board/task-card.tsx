"use client";

import { CardData } from "@/lib/types";
import { useBoard } from "@/context/board-context";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

const priorityLabel: Record<string, string> = {
low: "Low",
medium: "Medium",
high: "High",
};

interface TaskCardProps {
    card: CardData;
    onClick: () => void;
}

export function TaskCard({ card, onClick }: TaskCardProps) {
    const { deleteCard } = useBoard();
    return (
        <div onClick={onClick} className="rounded-md border bg-white p-3 cursor-pointer"
>
    <div className="flex items-start justify-between gap-2"
>
    <p className="text-sm font-medium">{card.title}</p>
    <button onClick={(e) => {
        e.stopPropagation();
        deleteCard(card.id);
    }}
    className="text-slate-400">
        <X size={14} />
        </button>
        </div>
        {card.description && (
<p className="mt-1 text-xs text-slate-500"
>{card.description}</p>
)}
<div className="mt-2 flex flex-wrap gap-1">
    <Badge variant="outline"
>
    {priorityLabel[card.priority]}</Badge>
        {card.dueDate && <span className="text-xs text-slate-400">{card.dueDate}</span>}
        {card.labels.map((label => (<Badge key={label} variant="secondary">{label}</Badge>)))}
        </div>
        </div>
        );
        }