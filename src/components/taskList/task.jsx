import React, { useState } from 'react'
import styles from './task.module.css'

const Task = ({ data, taskIndex, taskStructure, hide, selected }) => {
  const [addSubTaskState, setAddSubTaskState] = useState(false)
  const [newSubTaskTitle, setNewSubTaskTitle] = useState("")


  const submitSubTask = (e) => {
    e.preventDefault()
    // You can add logic here to actually add the subtask to the structure
    setNewSubTaskTitle("") // optional reset
    setAddSubTaskState(false) // optional close form
    taskStructure.addSubTask(taskIndex, newSubTaskTitle)
  }

  const handleSubTaskCheckboxChange = (subTaskIndex, e) => {
    taskStructure.updateSubTask(taskIndex, subTaskIndex, e.target.checked)
  }

  const subTaskDeleteHandler = (subTaskIndex) => {
    taskStructure.deleteSubTask(taskIndex, subTaskIndex)
  }

  return (
    <div className={`${hide ? styles.hide : ''} ${selected ? styles.selected : ''}`}>
      <div>
        <h2>{data.title}</h2>
        <span>{data.status}</span>
      </div>

      <div className={styles.subTaskWrapper}>
        {data?.subTask.map((subTask, index) => (
          <div className={styles.subTask} key={index}>
            <input
              type="checkbox"
              onChange={(e) => handleSubTaskCheckboxChange(index, e)}
              defaultChecked={subTask.checked}
            />
            <h3>{subTask.title}</h3>
            <button onClick={() => subTaskDeleteHandler(index)}>Delete</button>
          </div>
        ))}

        <div>
          {addSubTaskState ? (
            <form onSubmit={submitSubTask}>
              <input
                type='text'
                value={newSubTaskTitle}
                onChange={(e) => setNewSubTaskTitle(e.target.value)}
                required
              />
              <button type='submit'>Submit</button>
            </form>
          ) : (
            <button onClick={() => setAddSubTaskState(true)}>Add subtask</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Task