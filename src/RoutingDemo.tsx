import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { LyricsFinder } from './LyricsFind.tsx';
import {Home} from './Home.tsx';
import {AXIOSGetDemo} from './AxiosDemoGet.tsx';
import {AxiosDemoPost} from './AxiosDemoPut.tsx';
import {AxiosDemoDelete} from './AxiosDemoDelete.tsx'
import {AxiosDemoPatch} from './AxiosPatchDemo.tsx';
import "./Form.css";
import {FormValidation} from './FormValidation.tsx'
import {Todo} from './Todo_List.tsx';
import Theme from './Theme.tsx'

export class RoutingDemo extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <nav className="NavLinks">
            <Link to="/Home">Home</Link><br/>
            <Link to="/lyrics">Lyrics</Link><br/>
            <Link to="/AXIOSGetDemo">AxiosGetDemo</Link><br/>
            <Link to="/AxiosDemoPost">AxiosDemoPost</Link><br/>
            <Link to="/AxiosDemoDelete">AxiosDemoDelete</Link>
            <Link to="/AxiosDemoPatch">AxiosDemoUpdate</Link>
            <Link to="/FormValidation">Login-Form</Link>
            <Link to="/Todo_List">ToDoList</Link>
          </nav>  

          <Routes>
            <Route path="Lyrics" element={<LyricsFinder />} />
            <Route path="Home" element={<Home/>}/>
            <Route path="AXIOSGetDemo" element={<AXIOSGetDemo/>}/>
            <Route path="AxiosDemoPost" element={<AxiosDemoPost/>}/>
            <Route path="AxiosDemoDelete" element={<AxiosDemoDelete/>}></Route>            
            <Route path="AxiosDemoPatch" element={<AxiosDemoPatch/>}/>
            <Route path="FormValidation" element={<FormValidation/>}/>
            <Route path="Todo_List" element={<Todo/>} />
          </Routes>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default RoutingDemo; 