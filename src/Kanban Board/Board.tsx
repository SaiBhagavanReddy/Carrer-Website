import { DndContext , closestCorners} from "@dnd-kit/core";
import type { DragEndEvent  } from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import Column from "./Column";
import { initialColumns } from "./Data";
import type { ColumnType } from "./Types.ts";
import "./Style.css";

export default function Board_task() {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);

  const findColumn = (cardId: string) =>
    columns.find((c) => c.cards.some((card) => card.id === cardId));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const from = findColumn(active.id as string);
    const to = findColumn(over.id as string);

    if (!from || !to) return;

    if (from.id === to.id) {
      const colIndex = columns.findIndex((c) => c.id === from.id);
      const oldIndex = from.cards.findIndex((c) => c.id === active.id);
      const newIndex = to.cards.findIndex((c) => c.id === over.id);

      const newCols = [...columns];
      newCols[colIndex].cards = arrayMove(from.cards, oldIndex, newIndex);
      setColumns(newCols);
    } else {
      const card = from.cards.find((c) => c.id === active.id)!;

      setColumns((prev) =>
        prev.map((c) => {
          if (c.id === from.id)
            return { ...c, cards: c.cards.filter((x) => x.id !== card.id) };
          if (c.id === to.id) return { ...c, cards: [...c.cards, card] };
          return c;
        })
      );
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="board">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            onAdd={() =>
              setColumns((prev) =>
                prev.map((c) =>
                  c.id === col.id
                    ? {
                        ...c,
                        cards: [
                          ...c.cards,
                          { id: Date.now().toString(), title: "New Card" }
                        ]
                      }
                    : c
                )
              )
            }
            onDeleteCard={(cardId) =>
              setColumns((prev) =>
                prev.map((c) =>
                  c.id === col.id
                    ? { ...c, cards: c.cards.filter((x) => x.id !== cardId) }
                    : c
                )
              )
            }
            onUpdateCard={(cardId, title) =>
              setColumns((prev) =>
                prev.map((c) =>
                  c.id === col.id
                    ? {
                        ...c,
                        cards: c.cards.map((x) =>
                          x.id === cardId ? { ...x, title } : x
                        )
                      }
                    : c
                )
              )
            }
          />
        ))}
      </div>
    </DndContext>
  );
}
