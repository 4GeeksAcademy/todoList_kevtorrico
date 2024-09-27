import React, {useState} from 'react'
import Task from './Task';



const ToDoList = () => {

    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);



    return (
        <div className='container border border-1 col-4 bg-light'>
            <span className='fs-1 text-secondary text-opacity-50 fw-light mb-1'>todos</span>
            <input className='form-control form-control-lg fs-5 mb-3' type = "text" value = {newTask} placeholder='What needs to be done?'
                onChange={(event) => setNewTask(event.target.value)}

                onKeyUp={(event) => {
                    if (event.key == "Enter"){
                        setTaskList([newTask, ...taskList])
                        setNewTask("");
                    }
                }}
            />
            {(taskList.length == 0) && <div>No tasks, add a task </div> }
            {taskList.map( (tarea, indice) => <Task task={tarea} key={indice} onRemove={()=>{
                setTaskList(taskList.filter((_tarea, indiceBorrado)=> indice!= indiceBorrado))
            }}/>)}
            <p className='text-start text-secondary text-opacity-50 fw-light fs-6'>{taskList.length} items left</p>
        </div>
    )
}

export default ToDoList;