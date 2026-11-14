import React from "react";

const ChildComponent  = React.memo(({val}:any)=>{
    console.log("Childeren");
    return(<>
                    <h2>    
                        This is child component
                    </h2>
                    <span>
                        {val}
                    </span>
    </>)
})
export default ChildComponent;