import React from 'react'
import styles from './task.module.css'

const Task = ({data}) => {
  return (
    <div>
      <div>
        <h2>{data.title}</h2>
      </div>
      <div>
        {data?.subTask.map((subTask, index) => (
          <div>
            <input type='checkbox'/>
            <h3>{subTask.title}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Task