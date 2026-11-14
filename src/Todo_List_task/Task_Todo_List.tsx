import { useState } from "react";
import "./Todo.css";

const TodoApp = () => {
  const [todoList, toStore] = useState("");
  const [search, toSearch] = useState("");
  const [displayData, toDisplay] = useState<
    {
      id: number;
      text: string;
      completed: boolean;
    }[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const [filter, setFilter] = useState("All");
  const AddToList = () => {
    if (todoList.trim() === "") {
      return;
    }
    if (displayData.some((item) => item.text === todoList)) {
      return;
    }

    toDisplay((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: todoList,
        completed: false,
      },
    ]);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = startIndex + itemsPerPage;

  const filteredData = displayData.filter((item) => {
    const matchesSearch = item.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "Active") {
      return matchesSearch && !item.completed;
    }

    if (filter === "Completed") {
      return matchesSearch && item.completed;
    }

    return matchesSearch;
  });
  const currentItems = filteredData.slice(startIndex, endIndex);

  const toFilter = (e): any => {
    toSearch(e.target.value);
  };

  const Delete = (id: number) => {
    toDisplay((prev) => prev.filter((item) => item.id !== id));
  };
  const toggleTodo = (id: number) => {
    toDisplay((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };
  const toClear = () => {
    toSearch("");
  };

  return (
    <>
      <div className="todo_list_main">
        <div className="todo-main">
          <div className="search">
            <div className="header">
              <h1>ToDo List</h1>
            </div>

            <div className="search-field">
              <input
                type="text"
                placeholder="Searct task....."
                value={search}
                onChange={(e) => toFilter(e)}
              />
              <button className="add-btn" onClick={() => toClear()}>
                x
              </button>
            </div>
          </div>
          <div className="btn-list-sort">
            <button onClick={() => setFilter("Active")}>Active</button>
            <button onClick={() => setFilter("Completed")}> Completed</button>
          </div>

          <div className="list_container">
            <input
              type="text"
              value={todoList}
              placeholder="Add new task"
              onChange={(e) => toStore(e.target.value)}
            />

            <button className="add-btn" onClick={AddToList}>
              +
            </button>
          </div>

          <div className="List_items">
            {currentItems.map((val) => (
              <div key={val.id} className="each-item">
                <div className="checkbox_with_value">
                  <input
                    type="checkbox"
                    checked={val.completed}
                    onChange={() => toggleTodo(val.id)}
                  />

                  <p className={val.completed ? "completed" : "notCompleted"}>
                    {val.text.length > 15
                      ? val.text.slice(0, 15) + "..."
                      : val.text}
                  </p>

                  <div className="btn-delete">
                    <button onClick={() => Delete(val.id)}>X</button>{" "}
                  </div>
                </div>
              </div>
            ))}
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {"<"}
              </button>

              <span>Page {currentPage}</span>

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(filteredData.length / itemsPerPage),
                    ),
                  )
                }
                disabled={
                  currentPage === Math.ceil(filteredData.length / itemsPerPage)
                }
              >
                {">"}
              </button>
            </div>
            <div>{filteredData.length == 0 && <>No Data Available</>}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoApp;
