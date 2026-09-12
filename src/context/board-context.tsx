"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import type { BoardData, CardData } from "@/lib/types";
import { loadBoard, saveBoard, createDefaultBoard } from "@/lib/storage";
interface BoardContextValue {
    board: BoardData;
    addColumn: (title: string) => void;
    deleteColumn: (columnId: string) => void;
    addCard: (columnId: string, data: Omit<CardData, "id" | "createdAt")> => void;
    updateCard: (cardId: string, data: Partial<CardData>) => void;
    deleteCard: (cardId: string) => void;
    moveCard: (cardId: string, fromColumnId: string, toColumnId: string, index: number) => void;
    reorderColumn: (columnId: string, cardIds: string[]) => void;

}

const BoardContext = createContext<BoardContextValue | null>(null);

export function BoardProvider({ children }: { children: ReactNode }) {
    const [board, setBoard] = useState<BoardData>(() => createDefaultBoard());

    useEffect(() => {
        const stored = loadBoard();
        if (stored) {
            setBoard(stored);
        }
    }, []);
}