"use client";

import { useBoard } from "@/context/board-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CardDialogProps {
    cardId: string;
    onClose: () => void;
}

export function CardDialog({ cardId, onClose }: CardDialogProps) {
    const { board, updateCard, deleteCard } = useBoard();
    const card = board.cards[cardId];

if (!card) return null;

return (
    <Dialog open onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{card.title}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-3">
                    <Label>Description</Label>
                    <Textarea value={card.description ?? ""} onChange={(e) => updateCard(cardId, { description: e.target.value })} />
                        <Label>Priority</Label>
                        <Select value={card.priority} onValueChange={(value) => updateCard(cardId, { priority: value as typeof card.priority })}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent><SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem></SelectContent>
                            </Select>
                            <Label>Due date</Label>
                            <Input type="date" value={card.dueDate ?? ""} onChange={(e) => updateCard(cardId, { dueDate: e.target.value })} />
                            <div className="flex justify-between pt-2">
                                <Button variant="destructive" onClick={() => { deleteCard(cardId); onClose(); }}>
                                    Delete
                                    </Button>
                                    <Button onClick={onClose}>
                                        Close
                                        </Button>
                                        </div>
                                        </div>
                                        </DialogContent>
                                        </Dialog>
                                        );
                                        }
