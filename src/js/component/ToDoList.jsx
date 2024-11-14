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
    const clearAllTasks = async()=>{
        for (const task of taskList) {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                console.error('Error al eliminar la tarea:', task.id);
            }
        }
        setTaskList([]);
    };



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
            <div className='d-flex justify-content-between'>
                <p className='text-start text-secondary text-opacity-50 fw-light fs-6'>
                    {taskList.length} items left
                </p>
                <button 
                    className='btn btn-light text-secondary text-opacity-50 fw-light fs-6 p-0 border-0'
                    onClick={clearAllTasks}
                    style={{ cursor: 'pointer', height: '24px', padding: '0 10px' }}
                    >
                    Clear All Taks
                </button>
            </div>
        </div>
    )
}

export default ToDoList;