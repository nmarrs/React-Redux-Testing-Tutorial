import React from 'react'
import PropTypes from 'prop-types'

import TaskColumn from './TaskColumn'

const AdminView = (props) => {
  const {
    templateTasks,
    toggleEditTaskModal,
    editTaskModalOpen,
    isAdminView,
    editTask,
    currentTask
  } = props

  return (
    <div>
      <h3 className='mt-3'><i className="fas fa-tasks"></i> Template Tasks</h3>
      <TaskColumn
        title={'Tasks'}
        tasks={templateTasks}
        toggleEditTaskModal={toggleEditTaskModal}
        editTaskModalOpen={editTaskModalOpen}
        isAdminView={isAdminView}
        editTask={editTask}
        currentTask={currentTask} />
    </div>
  )
}

AdminView.propTypes = {
  templateTasks: PropTypes.array.isRequired,
  isAdminView: PropTypes.bool.isRequired,
  editTaskModalOpen: PropTypes.bool.isRequired,
  toggleEditTaskModal: PropTypes.func.isRequired,
  currentTask: PropTypes.object
}

export default AdminView
