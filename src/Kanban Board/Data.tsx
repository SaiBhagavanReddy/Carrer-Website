import type{ ColumnType } from "./Types";

export const initialColumns: ColumnType[] = [
  {
    id: "todo",
    title: "Todo",
    cards: [{ id: "1", title: "Setup project" }]
  },
  {
    id: "inprogress",
    title: "In Progress",
    cards: [{ id: "2", title: "Build Kanban UI" }]
  },
  {
    id: "done",
    title: "Done",
    cards: [{ id: "3", title: "Install dependencies" }]
  }
];
