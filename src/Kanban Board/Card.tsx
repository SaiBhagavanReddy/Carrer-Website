import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type{ CardType } from "./Types";

interface Props {
  card: CardType;
  onDelete: () => void;
  onUpdate: (title: string) => void;
}

export default function Card({ card, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(card.title);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} className="card" {...attributes} {...listeners}>
      {editing ? (
        <input
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            onUpdate(value);
            setEditing(false);
          }}
        />
      ) : (
        <div onDoubleClick={() => setEditing(true)}>{card.title}</div>
      )}

      <button onClick={onDelete}>✕</button>
    </div>
  );
}
