import React, { useState } from 'react'
import styles from './task.module.css'

const Task = ({data}) => {

  const [addSubTaskState, setAddSubTaskState] = useState(false)
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("")

  return (
    <div>
      <div>
        <h2>{data.title}</h2>
      </div>
      <div className={styles.subTaskWrapper}>
        {data?.subTask.map((subTask, index) => (
          <div className={styles.subTask}>
            <input type='checkbox'/>
            <h3>{subTask.title}</h3>
            <button>Detele</button>
          </div>
        ))}
        <div>
          {addSubTaskState? <div>
            <input type='text'/>
            <button>Submit</button>
          </div> : <button onClick={() => setAddSubTaskState(true)}>Add subtask</button>}
        </div>
      </div>
    </div>
  )
}

export default Task