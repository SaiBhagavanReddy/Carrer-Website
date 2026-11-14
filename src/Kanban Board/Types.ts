export type ColumnId = "todo" | "inprogress" | "done";

export interface CardType {
  id: string;
  title: string;
}

export interface ColumnType {
  id: ColumnId;
  title: string;
  cards: CardType[];
}
