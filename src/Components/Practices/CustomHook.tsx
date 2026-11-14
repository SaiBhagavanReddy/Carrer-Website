import useTimer from "./CustomTimerhook"
const CustomHook =()=>{
  const [start, stop, time, started] = useTimer();
    return(
        <>
                <center>
                <h1>
                    Timer with Custom Hook
                </h1>
                <p>{started?time:"Shall we Start"}</p>

                <button onClick={start}
                                disabled={started}>
                START
                </button>
                <button
                disabled={!started}
                onClick={stop}>
                    STOP
                </button>
                </center>
        </>
    )
}
export default CustomHook;
