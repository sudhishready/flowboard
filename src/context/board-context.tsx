"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { nanoid } from "nanoid";
import type { BoardData, CardData } from "@/lib/types";
import { loadBoard, saveBoard, createDefaultBoard, loadBoardsIndex, loadBoardById, saveBoardById, saveBoardsIndex, deleteBoardData } from "@/lib/storage";
import type { BoardMeta} from "@/lib/storage";
interface BoardContextValue {
    board: BoardData;
    boards: BoardMeta[];
    currentBoardId: string;
    switchBoard: (id: string) => void;
    createBoard: (name: string) => void;
    renameBoard: (id: string, name: string) => void;
    deleteBoard: (id: string) => void;
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
    const [boards, setBoards] = useState<BoardMeta[]>(() => []);
    const [currentBoardId, setCurrentBoardId] = useState<string>(() => "default");
    useEffect(() => {
        let index = loadBoardsIndex();
        if (index.length === 0) {
            const legacy = loadBoard();
            const initial = legacy || createDefaultBoard();
            index = [{ id: initial.id, name: initial.name }];
            saveBoardsIndex(index);
            saveBoardById(initial);
        }
        setBoards(index);
        const firstId = index[0].id;
        setCurrentBoardId(firstId);
        const data = loadBoardById(firstId) || createDefaultBoard();
        setBoard(data);
    }, []);

    useEffect(() => {
        saveBoardById(board);
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

const switchBoard = (id: string) => {
    const data = loadBoardById(id);
    if (data) {
        setCurrentBoardId(id);
        setBoard(data);
    }
};

const createBoard = (name: string) => {
    const newBoard = { ...createDefaultBoard(), id: nanoid(), name };
    const updated = [...boards, { id: newBoard.id, name: newBoard.name }];
    setBoards(updated);
    saveBoardsIndex(updated);
    saveBoardById(newBoard);
    setCurrentBoardId(newBoard.id);
    setBoard(newBoard);
};

const deleteBoard = (id: string) => {
    const updated = boards.filter((b) => b.id !== id);
    setBoards(updated);
    saveBoardsIndex(updated);
    deleteBoardData(id);
    if (id === currentBoardId && updated.length > 0) {
        switchBoard(updated[0].id);
    }
};




const renameBoard = (id: string, name: string) => {
    const updated = boards.map((b) => (b.id === id ? { ...b, name } : b));
    setBoards(updated);
    saveBoardsIndex(updated);
    if (id === currentBoardId) {
        const updatedBoard = { ...board, name };
        setBoard(updatedBoard);
        saveBoardById(updatedBoard);
    }
}

return (
    <BoardContext.Provider value={{board, addColumn, deleteColumn, addCard, updateCard, deleteCard, moveCard, reorderColumn, boards, currentBoardId, switchBoard, createBoard, deleteBoard, renameBoard}}>
        {children}
    </BoardContext.Provider>
);
}

export function useBoard() {
    const context = useContext(BoardContext);
    if (!context) throw new Error("useBoard must be used within a BoardProvider");
    return context;
}