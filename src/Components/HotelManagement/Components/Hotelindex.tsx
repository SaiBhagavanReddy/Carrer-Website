import { lazy } from "react";
import { BrowserRouter,Routes ,Route} from "react-router-dom";
const Home = lazy(()=>import("./Home.tsx"))
const Hotelindex = ()=>{
    return(<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>} />

            </Routes>
        </BrowserRouter>
    </>)
}
export default Hotelindex;