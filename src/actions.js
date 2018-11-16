import { templateTasksRef } from './config/firebase';

/**
  Action function that fetches data from firebase database
*/
export const fetchData = () => async dispatch => {
  templateTasksRef.on('value', snapshot => {
    dispatch({
      type: 'FETCH_TEMPLATE_TASKS',
      payload: snapshot.val()
    })
  })
}

/**
  Action function that adds new template task to firebase database
*/
export const addTemplateTask = (newTemplateTask) => async dispatch => {
  templateTasksRef.push().set(newTemplateTask)
}

/**
  Action function that edits template task in firebase database
*/
export const editTemplateTask = (templateTask, templateTaskId) => async dispatch => {
  templateTasksRef.child(templateTaskId).update(templateTask)
}

/**
  Action function that opens / closes the create task modal
*/
export const toggleCreateTaskModal = (showCreateTaskModal) => {
  return {
    type: 'TOGGLE_CREATE_TASK_MODAL',
    payload: showCreateTaskModal
  }
}

/**
  Action function that opens / closes the edit task modal
*/
export const toggleEditTaskModal = (showEditTaskModal, task) => {
  return {
    type: 'TOGGLE_EDIT_TASK_MODAL',
    payload: showEditTaskModal,
    task: task
  }
}

/**
  Action function that toggles the admin / user view
*/
export const toggleIsAdminView = () => {
  return {
    type: 'TOGGLE_IS_ADMIN_VIEW'
  }
}

/**
  Action function that assigns the current template tasks to the user
*/
export const assignTasksToUser = (templateTasks) => {
  window.alert('Tasks have been assigned to user!')
  return {
    type: 'ASSIGN_TASKS_TO_USER',
    payload: templateTasks
  }
}

/**
  Action function that creates a new task (template or regular)
*/
export const createTask = (task, isAdminView) => {
  if (isAdminView) {
    return {
      type: 'CREATE_TEMPLATE_TASK',
      payload: task
    }
  } else {
    return {
      type: 'CREATE_TASK',
      payload: task
    }
  }
}

/**
  Action function that edits a task (template or regular)
*/
export const editTask = (task, isAdminView) => {
  if (isAdminView) {
    return {
      type: 'EDIT_TEMPLATE_TASK',
      payload: task
    }
  } else {
    return {
      type: 'EDIT_TASK',
      payload: task
    }
  }
}

/**
  Action function that sorts application task by rank weight

  Tasks are sorted to list the most prioritized and shortest tasks first and the
  least prioritized and longest tasks last.
*/
export const sortTasksByRank = (templateTasks, userTasks) => {
  let sortedTemplateTasks = templateTasks.sort((a, b) => {
    return parseInt(b.rankWeight - a.rankWeight)
  })
  let sortedUserTasks = userTasks.sort((a, b) => {
    return parseInt(b.rankWeight - a.rankWeight)
  })

  return {
    type: 'SORT_TASKS_BY_RANK',
    sortedTemplateTasks: sortedTemplateTasks,
    sortedUserTasks: sortedUserTasks
  }
}

/**
  Helper function that caculates weight of task for ranking purposes

  Tasks are sorted to list the most prioritized and shortest tasks first and the
  least prioritized and longest tasks last.
*/
export const calculateTaskRankWeight = (priority, timeEstimate) => {
  return parseInt((priority * 100) / timeEstimate)
}
