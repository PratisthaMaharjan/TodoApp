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

  const handleSubTaskCheckboxChange = (subTaskIndex) => {
    taskStructure.updateSubTask(taskIndex, subTaskIndex, !data.subTask[subTaskIndex].completed)
  }

  const subTaskDeleteHandler = (subTaskIndex) => {
    taskStructure.deleteSubTask(taskIndex, subTaskIndex)
  }

  return (
    <div className={`${styles.container} ${hide ? styles.hide : ''} ${selected ? styles.selected : ''}`}>
      <div className={styles.titleContainer}>
        <h2>{data.title}</h2>
        <span className={ data.status === 'Pending' ? styles.pending : data.status === 'In progress' ? styles.inProgress : styles.completed }>{data.status}</span>
      </div>

      <div className={styles.subTaskWrapper}>
        {data?.subTask.map((subTask, index) => (
          <div className={styles.subTask} key={index}>
            <input
              type="checkbox"
              onChange={() => handleSubTaskCheckboxChange(index)}
              defaultChecked={subTask.completed}
            />
            <h3 className={subTask.completed ? styles.strikethrough : ''}>{subTask.title}</h3>
            <button onClick={(e) => {
              e.stopPropagation()
              subTaskDeleteHandler(index)
            }}>Delete</button>
          </div>
        ))}

        <div className={styles.addSubTaskContainer}>
          {addSubTaskState ? (
            <form onSubmit={submitSubTask} onClick={(e) => e.stopPropagation()} >
              <input
                type='text'
                value={newSubTaskTitle}
                onChange={(e) => setNewSubTaskTitle(e.target.value)}
                required
              />
              <button type='submit'>Submit</button>
            </form>
          ) : (
            <button className={styles.addSubTaskButton} onClick={(e) => {
              e.stopPropagation()
              setAddSubTaskState(true)
            }}>Add subtask</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Task