import React, {useState} from 'react'

const Task = (props) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="d-flex justify-content-between border p" 
            onMouseEnter={()=>{setIsHovered(true);}}
            onMouseLeave={()=>{setIsHovered(false);}}>
            
            <p>{props.task}</p>
            {(isHovered) && <span onClick={()=>{
                props.onRemove()
            }}>X</span>}
            
        </div>
    )
}


export default Task;