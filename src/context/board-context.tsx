"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { nanoid } from "nanoid";
import type { BoardData, CardData } from "@/lib/types";
import { loadBoard, saveBoard, createDefaultBoard } from "@/lib/storage";
interface BoardContextValue {
    board: BoardData;
    addColumn: (title: string) => void;
    deleteColumn: (columnId: string) => void;
    addCard: (columnId: string, data: Omit<CardData, "id" | "createdAt">) => void;
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

    useEffect(() => {
        saveBoard(board);
    }, [board]);

    const addColumn = (title: string) => {
        setBoard((prev) => ({...prev, columns: [...prev.columns, { id: nanoid(), title, cardIds: [] }]}));
    };

    const deleteColumn = (columnId: string) => {
        setBoard((prev) => ({ ...prev, columns: prev.columns.filter((c) => c.id !== columnId)}));
    };

    const addCard = (columnId: string, data: Omit<CardData, "id" | "createdAt">) => {
        const id = nanoid();
        const newCard: CardData = { ...data, id, createdAt: Date.now() };
        setBoard((prev) => ({
            ...prev,
            columns: prev.columns.map((c) => (c.id === columnId ? { ...c, cardIds: [...c.cardIds, id] } : c)),
            cards: { ...prev.cards, [id]: newCard }
        }));
    };

    const updateCard = (cardId: string, data: Partial<CardData>) => 
    {
        setBoard((prev) => ({
            ...prev,
            cards: { ...prev.cards, [cardId]: { ...prev.cards[cardId], ...data}}
        }));
};

const deleteCard = (cardId: string) => {
    setBoard((prev) => {
        const cards = { ...prev.cards };
        delete cards[cardId];
        return {
            ...prev,
            columns: prev.columns.map((c) => ({ ...c, cardIds: c.cardIds.filter((id) => id !== cardId)})),
        cards
        }
    });
};

const moveCard = (cardId: string, fromColumnId: string, toColumnId: string, index: number) => {
    setBoard((prev) => {
        const columns = prev.columns.map((c) => {
            if (c.id === fromColumnId) return { ...c, cardIds: c.cardIds.filter((id) => id !== cardId) };
            return c;
        });
        const target = columns.find((c) => c.id === toColumnId);
        if (target) {
            const newCardIds = [...target.cardIds];
            newCardIds.splice(index, 0, cardId);
            target.cardIds = newCardIds;
        }
        return { ...prev, columns };
    })
};

const reorderColumn = (columnId: string, cardIds: string[]) => {
    setBoard((prev) => ({
        ...prev,
        columns: prev.columns.map((c) => (c.id === columnId ? { ...c, cardIds } : c))
    }));
};

return (
    <BoardContext.Provider value={{board, addColumn, deleteColumn, addCard, updateCard, deleteCard, moveCard, reorderColumn}}>
        {children}
    </BoardContext.Provider>
);
}

export function useBoard() {
    const context = useContext(BoardContext);
    if (!context) throw new Error("useBoard must be used within a BoardProvider");
    return context;
}