import React from 'react'
import styles from './taskList.module.css'
import Task from './task'

const TaskList = () => {
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
            <Task data={{
                title: 'task1',
                created: null,
                status: 'todo',
                deadline: null,
                progressTime: null,
                finishedTime: null,
                reminderTime: null,
                subTask:[
                    {
                        title: 'sub task1',
                        completed: false
                    }
                ]
            }}/>
        </main>
    </div>
  )
}

export default TaskList