import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Event_Handler = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [event, setEvent] = useState("");
  const [displayEvent, setDisplayEvent] = useState<
    {
      date: Date;
      title: string;
    }[]
  >([]);
  const handleDetails = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
    alert(selectedDate.toString());
  };
  const handlerEvent = (e) => {
    setEvent(e.target.value);
  };
  const AddEvent = () => {
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    if (!event.trim()) {
      alert("Please enter an event");
      return;
    }

    setDisplayEvent([
      ...displayEvent,
      {
        date: selectedDate,
        title: event,
      },
    ]);

    setEvent("");
  };
 const update = async (index: number) => {
  const { value, isConfirmed } = await Swal.fire({
    title: "Update Event",
    input: "text",
    showCancelButton: true,
  });

  if (!isConfirmed || !value) return;

  setDisplayEvent((prev) =>
    prev.map((item, i) =>
      i === index
        ? { ...item, title: value }
        : item
    )
  );
};
const deleteEvent = (index: number) => {
  setDisplayEvent(displayEvent.filter((_, i) => i !== index));
};
  return (
    <>
    <div className="Main">
      <Calendar value={selectedDate} onChange={handleDetails} />
      <div>
        <h1>Create Event</h1>
        <pre>
          selected Date{selectedDate?.getDate()}-{selectedDate?.getDay()}-
          {selectedDate?.getFullYear()}
        </pre>
        <input type="text" value={event} onChange={(e) => handlerEvent(e)} />
        <button onClick={AddEvent}>Add Event</button>
        <pre>
          {displayEvent.map((m, index) => (
            <>
              <div key={index}>
                <h1>Event Created List</h1>
              </div>
              <div >
                <div>
                  <div><pre>{m.date.toDateString()}</pre>
                        <div>
                            <button onClick={()=>update(index)}>
                                Update
                            </button>
                            <button onClick={()=>deleteEvent(index)}>
                                Delete
                            </button>
                        </div>
                  </div>
                  {m.title.toString()}
                </div>
              </div>
            </>
          ))}
        </pre>
      </div>
      </div>
    </>
  );
};
export default Event_Handler;
