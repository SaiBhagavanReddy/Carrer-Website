import { useState } from "react";
import "../WorkTracker/WorkTracker.css";

const WorkTracker = () => {
  interface UserDetails {
    Subject: string;
    TaskTitle: string;
    date: string;
    priority: string;
    notes: string;
    status: string;
  }

  // Store all tasks
  const [tasks, setTasks] = useState<UserDetails[]>([]);

  // Store which task is currently being edited
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Form data
  const [userDetails, setuserDetails] = useState<UserDetails>({
    Subject: "",
    TaskTitle: "",
    date: "",
    priority: "",
    notes: "",
    status: "Pending",
  });

  // -----------------------------
  // Status Counts
  // -----------------------------

  const pendingCount = tasks.filter((task) => task.status === "Pending").length;

  const inProgressCount = tasks.filter(
    (task) => task.status === "In-Progress",
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const today = new Date().toISOString().split("T")[0];

  const overdueCount = tasks.filter(
    (task) => task.date < today && task.status !== "Completed",
  ).length;

  // -----------------------------
  // Add / Update Task
  // -----------------------------

  const AddTask = () => {
    // Validation
    if (
      userDetails.Subject === "" ||
      userDetails.TaskTitle === "" ||
      userDetails.date === "" ||
      userDetails.priority === ""
    ) {
      alert("Please enter all required details");
      return;
    }

    // -----------------------------
    // UPDATE EXISTING TASK
    // -----------------------------

    if (editingIndex !== null) {
      setTasks((prev) =>
        prev.map((task, index) =>
          index === editingIndex ? userDetails : task,
        ),
      );

      // Exit edit mode
      setEditingIndex(null);
    }

    // -----------------------------
    // ADD NEW TASK
    // -----------------------------
    else {
      setTasks((prev) => [...prev, userDetails]);
    }

    // Reset form
    // setuserDetails({
    //   Subject: "",
    //   TaskTitle: "",
    //   date: "",
    //   priority: "",
    //   notes: "",
    //   status: "Pending",
    // });
  };

  // -----------------------------
  // Edit Task
  // -----------------------------

  const EditCurrentData = (index: number) => {
    // Get selected task
    const selectedTask = tasks[index];

    // Load selected task into form
    setuserDetails(selectedTask);

    // Store index of selected task
    setEditingIndex(index);
  };

  // -----------------------------
  // Delete Task
  // -----------------------------

  const DeleteTask = (index: number) => {
    setTasks((prev) => prev.filter((_, ind) => ind !== index));

    // If the deleted task is currently being edited
    if (editingIndex === index) {
      setEditingIndex(null);

      setuserDetails({
        Subject: "",
        TaskTitle: "",
        date: "",
        priority: "",
        notes: "",
        status: "Pending",
      });
    }
  };

  // -----------------------------
  // Update Status
  // -----------------------------

  const UpdateStatus = (index: number, newStatus: string) => {
    setTasks((prev) =>
      prev.map((task, ind) =>
        ind === index
          ? {
              ...task,
              status: newStatus,
            }
          : task,
      ),
    );
  };

  // -----------------------------
  // Reset Form
  // -----------------------------

  const CancelEdit = () => {
    setEditingIndex(null);

    setuserDetails({
      Subject: "",
      TaskTitle: "",
      date: "",
      priority: "",
      notes: "",
      status: "Pending",
    });
  };
  const ExportData = () => {
    const JsonData = JSON.stringify(tasks);
    const blobData = new Blob([JsonData], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blobData);
    const link = document.createElement("a");

    link.href = url;
    link.download = "users.json";
    link.click();
  };

  return (
    <>
      <div className="TrackerMain">
        {/* =====================================
            HEADER
        ====================================== */}

        <div className="Header">
          <h2>Student Work Tracker</h2>

          <p>Organize and track your academic tasks efficiently</p>
        </div>

        {/* =====================================
            STATUS TRACKER
        ====================================== */}

        <div className="StatusTracker">
          <div className="statuscolumn">
            <p>Total - {tasks.length}</p>
          </div>

          <div className="statuscolumn">
            <p>Pending - {pendingCount}</p>
          </div>

          <div className="statuscolumn">
            <p>Overdue - {overdueCount}</p>
          </div>

          <div className="statuscolumn">
            <p>In-Progress - {inProgressCount}</p>
          </div>

          <div className="statuscolumn">
            <p>Completed - {completedCount}</p>
          </div>
        </div>

        {/* =====================================
            ADD / EDIT TASK
        ====================================== */}

        <div className="UserData">
          <div className="DetailsHeader">
            <h2>{editingIndex !== null ? "Edit Task" : "Add Task"}</h2>
          </div>

          <div className="EnteringDetails">
            {/* =================================
                ROW 1
            ================================== */}

            <div className="Row1">
              {/* Subject */}

              <label className="TrackerLabel">
                Subject
                <input
                  type="text"
                  value={userDetails.Subject}
                  onChange={(e) =>
                    setuserDetails({
                      ...userDetails,
                      Subject: e.target.value,
                    })
                  }
                />
              </label>

              {/* Task Title */}

              <label className="TrackerLabel">
                Task Title
                <input
                  type="text"
                  value={userDetails.TaskTitle}
                  onChange={(e) =>
                    setuserDetails({
                      ...userDetails,
                      TaskTitle: e.target.value,
                    })
                  }
                />
              </label>
            </div>

            {/* =================================
                ROW 2
            ================================== */}

            <div className="Row2">
              {/* Due Date */}

              <label className="TrackerLabel">
                Due Date
                <input
                  type="date"
                  value={userDetails.date}
                  onChange={(e) =>
                    setuserDetails({
                      ...userDetails,
                      date: e.target.value,
                    })
                  }
                />
              </label>

              {/* Priority */}

              <label className="TrackerLabel">
                Priority
                <select
                  value={userDetails.priority}
                  onChange={(e) =>
                    setuserDetails({
                      ...userDetails,
                      priority: e.target.value,
                    })
                  }
                >
                  <option value="">Select the Priority</option>

                  <option value="High">High</option>

                  <option value="Medium">Medium</option>

                  <option value="Low">Low</option>
                </select>
              </label>
            </div>

            {/* =================================
                NOTES
            ================================== */}

            <label className="TrackerLabel">
              Notes (optional)
              <textarea
                value={userDetails.notes}
                onChange={(e) =>
                  setuserDetails({
                    ...userDetails,
                    notes: e.target.value,
                  })
                }
              />
            </label>

            {/* =================================
                BUTTONS
            ================================== */}

            <div className="add-btn">
              <button onClick={AddTask}>
                {editingIndex !== null ? "Update Task" : "Add Task"}
              </button>

              {/* Show Cancel only while editing */}

              {editingIndex !== null && (
                <button type="button" onClick={CancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =====================================
            TASK LIST
        ====================================== */}

        <div>
          {tasks.length > 0 ? (
            <div className="ForHavingDetails">
              {tasks.map((data, ind) => (
                <div className="Content-inside" key={ind}>
                  {/* =================================
                      TITLE + PRIORITY
                  ================================== */}

                  <div className="TitleWithPriority">
                    <h2>{data.TaskTitle}</h2>

                    <p>{data.priority}</p>
                  </div>

                  {/* =================================
                      SUBJECT + DATE
                  ================================== */}

                  <div className="Subject-with-date">
                    <p>{data.Subject}</p>

                    <pre>Due Date: {data.date}</pre>
                  </div>

                  {/* =================================
                      NOTES
                  ================================== */}

                  {data.notes && (
                    <div className="TaskNotes">
                      <p>Notes: {data.notes}</p>
                    </div>
                  )}

                  {/* =================================
                      STATUS + ACTIONS
                  ================================== */}

                  <div className="action-btn">
                    {/* Status */}

                    <select
                      value={data.status}
                      onChange={(e) => UpdateStatus(ind, e.target.value)}
                    >
                      <option value="Pending">Pending</option>

                      <option value="In-Progress">In-Progress</option>

                      <option value="Completed">Completed</option>
                    </select>

                    {/* Edit + Delete */}

                    <div className="btn-del-edit">
                      <button onClick={() => EditCurrentData(ind)}>Edit</button>
                      <button onClick={() => DeleteTask(ind)}>Delete</button>
                      <button onClick={() => ExportData(ind)}>Export</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="ForEmptyTask">
              <p>No tasks yet. Add your first task above!</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WorkTracker;
