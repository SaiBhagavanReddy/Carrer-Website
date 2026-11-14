import { useRef, useState } from "react";
import "./FileUploadAndDragDrop.css"
import CloseIcon from '@mui/icons-material/Close';
const FileUploadAndDragDrop = ()=>{
    const [fileStorage,setfileStorage] = useState(null);
    const [isDragging,setisDragging] = useState(false);
    
const fileHandle = useRef<HTMLInputElement>(null);
    const handleOver = (e)=>{
        e.preventDefault();
        setisDragging(true);

    }
    const uploadHandler= (e:any)=>
    {
      const select =   e.target.files[0]
        if(select)
        {
            setfileStorage(select);
           }
    }
    const handleDrag = (e:any)=>{e.preventDefault();
        const fileData = e.dataTransfer.files[0];
        setfileStorage(fileData);
    }       
    return(<>
            <div className="FileUploadMain">
                <div className="FileUploadBlock">
                    <div className="UploadHeader">
                <h2>File Upload</h2>
                    </div>
                    <input type="file"  style={{display:"none"}} ref={fileHandle} onChange={(e)=>uploadHandler(e)}/>
                    <div className="dragAndDrop" onClick={()=>fileHandle.current?.click()} onDragOver={handleOver} onDragLeave={()=>setisDragging(false)} onDrop={handleDrag}>
                        <p>Drag or Drop</p>
                        <span>Or</span>
                        <p>File Upload</p>
                    </div>
                {fileStorage&& 
                <div className="Uploaded-file-details">
                        <p>
                            {fileStorage.name}
                        </p>
                        <div className="btn-to-remove">
                            <button onClick={()=>setfileStorage(null)}><CloseIcon/></button>                
                        </div>
                </div>}


                
                </div>
            </div>
    </>)
}
export default FileUploadAndDragDrop;