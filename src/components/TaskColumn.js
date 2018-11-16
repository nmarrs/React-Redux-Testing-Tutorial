import React from 'react'
import PropTypes from 'prop-types'

import './styles/TaskColumn.css'
import TaskCard from './TaskCard'

const TaskColumn = (props) => {
  const {
    title,
    toggleEditTaskModal,
    tasks
  } = props

  return (
    <div className="card shadow font-title mt-3 mb-5 TaskColumn-card mx-auto">
      <div className='card-title mt-3'>
        <h3>{title} - {tasks ? tasks.length : 0}</h3>
      </div>
      <div className='card-body'>
        {
          tasks && tasks.length > 0
          ? Object.entries(tasks).map(([key, task]) => (
            <div key={key}>
                <TaskCard
                  task={task}
                  toggleEditTaskModal={toggleEditTaskModal} />
            </div>
          ))
          : <div>No tasks</div>
        }
      </div>
    </div>
  )
}

TaskColumn.propTypes = {
  title: PropTypes.string.isRequired,
  toggleEditTaskModal: PropTypes.func.isRequired,
  tasks: PropTypes.array
}

export default TaskColumn
