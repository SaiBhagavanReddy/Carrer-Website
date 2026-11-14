
import { useState } from "react";
import "../TodoListComponent/TodoList.css";

const TodoApp = () => {
  const [save, saveText] = useState("");
  const [display, setDisplay] = useState<string[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const AddToList = () => {
    const duplicate = display.includes(save);

    if (save.trim().length === 0) {
      alert("Please enter the details before adding the value");
      return;
    }

    if (duplicate) {
      alert("Already added");
      return;
    }

    setDisplay((prev) => [...prev, save]);
    saveText("");
  };

  const saveNewChanges = (index: number, newValue: string) => {
    setDisplay((prev) =>
      prev.map((item, ind) =>
        ind === index ? newValue : item
      )
    );
  };

  // Step 2: Delete a task
  const handleDelete = (index: number) => {
    setDisplay((prev) =>
      prev.filter((_, ind) => ind !== index)
    );

    // Exit edit mode if the edited task is deleted
    setEditIndex(null);
  };

  // Step 3: Enter edit mode
  const setEdit = (ind: number) => {
    setEditIndex(ind);
  };

  return (
    <div className="TodoMain">
      <div className="Content">
        <h2>
          ToDo List
          <p>To Save your data</p>
        </h2>

        <div className="userDetails">
          <input
            type="text"
            placeholder="Enter the task details"
            value={save}
            onChange={(e) => saveText(e.target.value)}
          />

          <button onClick={AddToList}>+</button>
        </div>

        {display.map((data, ind) => (
          <div key={ind} className="DisplayData">
            {editIndex === ind ? (
              <>
                <input
                  type="text"
                  value={data}
                  onChange={(e) =>
                    saveNewChanges(ind, e.target.value)
                  }
                />

                <button onClick={() => setEditIndex(null)}>
                  Save
                </button>
              </>
            ) : (
              <>
                <pre>{data}</pre>

                <button onClick={() => setEdit(ind)}>
                  Update
                </button>
              </>
            )}

            <button onClick={() => handleDelete(ind)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;