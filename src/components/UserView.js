import React from 'react'
import PropTypes from 'prop-types'

import TaskColumn from './TaskColumn'

const UserView = (props) => {
  const {
    toDoTasks,
    inProgressTasks,
    finishedTasks,
    toggleEditTaskModal,
    editTaskModalOpen,
    isAdminView,
    editTask,
    currentTask
  } = props

  return (
    <div>
      <h3 className='mt-3'><i className="fas fa-tasks"></i> Current User Tasks</h3>
      <div className='container'>
        <div className='row'>
          <TaskColumn
            title={'To Do'}
            tasks={toDoTasks}
            toggleEditTaskModal={toggleEditTaskModal}
            editTaskModalOpen={editTaskModalOpen}
            isAdminView={isAdminView}
            editTask={editTask}
            currentTask={currentTask} />
          <TaskColumn
            title={'In Progress'}
            tasks={inProgressTasks}
            toggleEditTaskModal={toggleEditTaskModal}
            editTaskModalOpen={editTaskModalOpen}
            isAdminView={isAdminView}
            editTask={editTask}
            currentTask={currentTask} />
          <TaskColumn
            title={'Finished'}
            tasks={finishedTasks}
            toggleEditTaskModal={toggleEditTaskModal}
            editTaskModalOpen={editTaskModalOpen}
            isAdminView={isAdminView}
            editTask={editTask}
            currentTask={currentTask} />
        </div>
      </div>
    </div>
  )
}

UserView.propTypes = {
  toDoTasks: PropTypes.array.isRequired,
  inProgressTasks: PropTypes.array.isRequired,
  finishedTasks: PropTypes.array.isRequired,
  isAdminView: PropTypes.bool.isRequired,
  editTaskModalOpen: PropTypes.bool.isRequired,
  toggleEditTaskModal: PropTypes.func.isRequired,
  currentTask: PropTypes.object
}

export default UserView
