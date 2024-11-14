import React, {useState} from 'react'

const Task = (props) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="d-flex justify-content-between border-bottom border-light-subtle" 
            onMouseEnter={()=>{setIsHovered(true);}}
            onMouseLeave={()=>{setIsHovered(false);}}>
            
            <p className='mt-2 mx-2'>{props.task.label}</p>
            {(isHovered) && <span className='text-danger fs-5' onClick={()=>{
                props.onRemove()
            }}>x</span>}
            
        </div>
    )
}


export default Task;