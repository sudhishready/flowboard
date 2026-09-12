import { BoardData } from "./types";

const STORAGE_KEY = "flowboard-data-v1";

export function loadBoard(): BoardData | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as BoardData;
    } catch {
        return null;
    }
}

export function saveBoard(board: BoardData) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
}

export function createDefaultBoard(): BoardData {
    return {
        id: "default",
        name: "My Board",
        columns: [
            { id: "col-1", title: "To Do", cardIds: [] },
            { id: "col-2", title: "In Progress", cardIds: [] },
            { id: "col-3", title: "Done", cardIds: [] }
        ],
        cards: {}
    }
}