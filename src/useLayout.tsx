import React, { Component, useLayoutEffect, useRef, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

import './Form.css'
function UseLayoutDemo()
{
    const [num,setNum]=useState("");

    const ref= useRef(null);
    useLayoutEffect(()=>{
         {
            ref.current?.classList.add("move")
            
        }
        },[num])
            return<>
            <div className='Main'>
            <h1>This is useLayout demo</h1>
            <input type="number"   onChange={(e)=>setNum(e.target.value)} value={num}/>
            </div> 
            <div className='pop-up' ref={ref}>
                <CloseIcon style={{"color":"black"}} onClick={()=>{close()}}></CloseIcon>
                <h1 className="title">This is pop-up developed using useLayout </h1>
                <pre>React is a js library which allows us develop SSR</pre>
            </div>

    </>
    function close()
    {
  
          
        ref.current?.classList.add("closed");
}
}
export  default UseLayoutDemo;