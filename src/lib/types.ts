export type Priority = "low" | "medium" | "high";

export interface CardData {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    dueDate: string | null;
    labels: string[];
    createdAt: number;
}

export interface ColumnData {
    id: string;
    title: string;
    cardIds: string[];
}

export interface BoardData {
    id: string;
    name: string;
    columns: ColumnData[];
    cards: Record<string, CardData>;
}