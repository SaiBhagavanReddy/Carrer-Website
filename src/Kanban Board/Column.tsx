import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Card from "./Card";
import type{ ColumnType } from "./Types.ts";

interface Props {
  column: ColumnType;
  onAdd: () => void;
  onDeleteCard: (cardId: string) => void;
  onUpdateCard: (cardId: string, title: string) => void;
}

export default function Column({
  column,
  onAdd,
  onDeleteCard,
  onUpdateCard
}: Props) {
  return (
    <div className="column">
      <h3>{column.title}</h3>

      <SortableContext
        items={column.cards.map((c) => c.id)}
        strategy={verticalListSortingStrategy}
      >
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={() => onDeleteCard(card.id)}
            onUpdate={(t) => onUpdateCard(card.id, t)}
          />
        ))}
      </SortableContext>

      <button className="add-btn" onClick={onAdd}>
        + Add Card
      </button>
    </div>
  );
}
