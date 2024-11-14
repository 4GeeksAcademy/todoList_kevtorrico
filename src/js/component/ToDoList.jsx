import React, {useState, useEffect} from 'react'
import Task from './Task';



const ToDoList = () => {

    const [newTask, setNewTask] = useState("");
    const [taskList, setTaskList] = useState([]);

    const loadTasks = async() => {
        const response = await fetch("https://playground.4geeks.com/todo/users/kevin")
        const data = await response.json();
        setTaskList(data.todos)
    };
    useEffect(()=>{
        loadTasks();
    },[])
    
    const createTasks = async()=> {
        const response = await fetch("https://playground.4geeks.com/todo/todos/kevin", {
            method: 'POST',
            body: JSON.stringify({
                label: newTask,
                "is_done": false
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok){
            loadTasks();
            setNewTask("");
        }
    }
    const deleteTask = async(taskId)=>{
        const response = await fetch(`https://playground.4geeks.com/todo/todos/${taskId}`, {
            method: 'DELETE'
        });
        if (response.ok){
            loadTasks();
        }
    }



    return (
        <div className='container border border-1 col-4 bg-light'>
            <span className='fs-1 text-secondary text-opacity-50 fw-light mb-1'>todos</span>
            <input 
                className='form-control form-control-lg fs-5 mb-3' 
                type = "text" 
                value = {newTask} 
                placeholder='What needs to be done?'
                onChange={(event) => setNewTask(event.target.value)}

                onKeyUp={(event) => {
                    if (event.key == "Enter"){
                        createTasks();
                    }
                }}
            />
            {(taskList.length == 0) && <div>No tasks, add a task </div> }
            {taskList.map( (tarea, indice) =>(
                <Task 
                task={tarea} 
                key={indice} 
                onRemove={() => deleteTask(tarea.id)}
                />
            ))}
            <p className='text-start text-secondary text-opacity-50 fw-light fs-6'>
                {taskList.length} items left
            </p>
        </div>
    )
}

export default ToDoList;