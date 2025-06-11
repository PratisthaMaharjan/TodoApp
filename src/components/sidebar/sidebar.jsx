import React, { useState, useEffect } from 'react'
import styles from './sidebar.module.css'

const formatDateForInput = (date) => {
  const pad = (n) => (n < 10 ? '0' + n : n)
  const yyyy = date.getFullYear()
  const mm = pad(date.getMonth() + 1)
  const dd = pad(date.getDate())
  const hh = pad(date.getHours())
  const min = pad(date.getMinutes())
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`
}

const Sidebar = ({ index, data, taskStructure, deleteCallback }) => {
  const [formState, setFormState] = useState({
    title: '',
    status: 'Pending',
    created: '',
    reminderTime: '',
    deadline: '',
    progressTime: '',
    finishedTime: ''
  })

  // Sync form state with data when it changes
  useEffect(() => {
    if (!data) return
    setFormState({
      title: data.title || '',
      status: data.status || 'Pending',
      created: data.created || '',
      reminderTime: data.reminderTime || '',
      deadline: data.deadline || '',
      progressTime: data.progressTime || '',
      finishedTime: data.finishedTime || ''
    })
  }, [data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const values = { ...formState }

    if (values.status === 'Pending') {
      values.progressTime = null
      values.finishedTime = null
    } else if (values.status === 'In progress') {
      if (data.status === 'Pending') {
        values.progressTime = formatDateForInput(new Date())
      }
      values.finishedTime = null
    } else {
      if (data.status === 'Pending') {
        values.progressTime = formatDateForInput(new Date())
        values.finishedTime = formatDateForInput(new Date())
      } else if (data.status === 'In progress') {
        values.finishedTime = formatDateForInput(new Date())
      }
    }

    taskStructure.updateTask(index, values)
  }

  if (index === -1 || !data) return <></>

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <select name="status" value={formState.status} onChange={handleChange}>
        <option value="Pending">Pending</option>
        <option value="In progress">In progress</option>
        <option value="Completed">Completed</option>
      </select>


      <input name="title" value={formState.title} onChange={handleChange} />

      <div>
        <label>
          Created At:
          <input
            name="created"
            type="datetime-local"
            value={formState.created}
            disabled
          />
        </label>
        <label>
          Reminder:
          <input
            name="reminderTime"
            type="datetime-local"
            value={formState.reminderTime}
            onChange={handleChange}
          />
        </label>
        <label>
          Deadline:
          <input
            name="deadline"
            type="datetime-local"
            value={formState.deadline}
            onChange={handleChange}
          />
        </label>
      </div>

      <div>
        <label>
          Started Time:
          <input
            name="progressTime"
            type="datetime-local"
            value={formState.progressTime || ''}
            disabled
          />
        </label>
        <label>
          Finished Time:
          <input
            name="finishedTime"
            type="datetime-local"
            value={formState.finishedTime || ''}
            disabled
          />
        </label>
      </div>

      <button type="submit">Submit</button>
      <button type="button" onClick={deleteCallback}>Delete</button>
    </form>
  )
}

export default Sidebar
