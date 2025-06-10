import React, { useState } from 'react'
import styles from './taskList.module.css'
import Task from './task'

const formatDateForInput = (date) => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
};
  

const AddTask = ({ taskStructure }) =>{

    const [addTaskState, setAddTaskState] = useState(false)

    const addTaskHandler = (e) => {
        e.preventDefault()
        // console.dir(e.target)
        taskStructure.addTask({
            title: e.target.title.value,
            created: formatDateForInput(new Date()),
            status: 'Pending',
            deadline: e.target.deadline.value,
            progressTime: null,
            finishedTime: null,
            reminderTime: e.target.reminder.value,
            subTask:[]
        })
        e.target.title.value = ''
        e.target.deadline.value = null
        e.target.reminder.value = null
        
        setAddTaskState(false)
    }

    return(
        <div>
            {addTaskState? <form onSubmit={addTaskHandler}>
                <label>Title:<input type='text' name='title' required/></label>
                <label>Deadline:<input type='datetime-local' name='deadline'/></label>
                <label>Reminder:<input type='datetime-local' name='reminder'/></label>
                <input type='submit'/>
            </form> : <button onClick={() => setAddTaskState(true)}>Add Task</button>}
        </div>
    )
}

const TaskList = ({data, taskStructure, onSelect, selectedIndex }) => {
    const [filter, setFilter] = useState('All')
    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <h1>Todo</h1>
                <select onInput={(e) => setFilter(e.target.value)}>
                    <option value='All' selected>All</option>
                    <option value='Pending'>Pending</option>
                    <option value='In progress'>In progress</option>
                    <option value='Completed'>Completed</option>
                </select>
                <button>Toggle</button>
            </nav>

            <main className={styles.main}>
                {data.map((task, index) => (
                    <div onClick={() => onSelect(index)}>
                        <Task 
                            selected={index===selectedIndex}
                            data={task} 
                            key={Math.random()}
                            taskIndex={index}
                            taskStructure={taskStructure}
                            hide={filter === 'All'? false : filter !== task.status}
                        />
                    </div>
                ))}
                <AddTask taskStructure={taskStructure}/>
            </main>
        </div>
    )
}

export default TaskList
