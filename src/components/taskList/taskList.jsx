import React, { useState } from 'react'
import styles from './taskList.module.css'
import Task from './task'

const AddTask = ({addCallback}) =>{

    const [addTaskState, setAddTaskState] = useState(false)

    const addTaskHandler = (e) => {
        e.preventDefault()
        // console.dir(e.target)
        addCallback({
            title: e.target.title.value,
            created: null,
            status: 'todo',
            deadline: e.target.deadline.value,
            progressTime: null,
            finishedTime: null,
            reminderTime: e.target.reminder.value,
            subTask:[]
        })
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

const TaskList = ({data, addTask}) => {

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <h1>Todo</h1>
                <select>
                    <option selected>All</option>
                    <option>Pending</option>
                    <option>In progress</option>
                    <option>Completed</option>
                </select>
                <button>Toggle</button>
            </nav>

            <main className={styles.main}>
                {data.map((task, index) => (
                    <Task data={task} key={index}/>
                ))}
                <AddTask addCallback={addTask}/>
            </main>
        </div>
    )
}

export default TaskList