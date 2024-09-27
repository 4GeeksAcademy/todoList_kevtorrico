import React, {useState} from 'react'
import Task from './Task';



const ToDoList = () => {

    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);



    return (
        <div className='container'>
            <input type = "text" value = {newTask} placeholder='What needs to be done?'
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
            <p>{taskList.length} items left</p>
        </div>
    )
}

export default ToDoList;