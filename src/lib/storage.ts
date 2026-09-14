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

export interface BoardMeta {
    id: string;
    name: string;
}

const INDEX_KEY = "flowboard-boards-index";

export function loadBoardsIndex(): BoardMeta[] {
if (typeof window === "undefined") return [];
const raw = localStorage.getItem(INDEX_KEY);
if (!raw) return [];
try {
    return JSON.parse(raw) as BoardMeta[];
} catch {
    return [];
}
}

export function saveBoardsIndex(index: BoardMeta[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(INDEX_KEY, JSON.stringify(index));
}

export function loadBoardById(id: string): BoardData | null {
    if (typeof window === "undefined") return null;
    const raw = localStorage.getItem(`flowboard-data-${id}`);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as BoardData;
    } catch {
        return null;
    }
}

export function saveBoardById(board: BoardData) {
    if (typeof window === "undefined") return;
    localStorage.setItem(`flowboard-data-${board.id}`, JSON.stringify(board));
}

export function deleteBoardData(id: string) {
    if (typeof window === "undefined") return;
    localStorage.removeItem(`flowboard-data-${id}`);
}