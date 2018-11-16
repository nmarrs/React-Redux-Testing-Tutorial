import React from 'react'
import { shallow, mount } from 'enzyme'

import { App } from '.././App'
import { testTask, testTask1, testTask2 } from '../../testData'

describe('App', () => {
  let wrapper
  let toggleCreateTaskModal = jest.fn()
  let sortTasksByRank = jest.fn()
  let assignTasksToUser = jest.fn()
  let toggleIsAdminView = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<App
      templateTasks={[ testTask, testTask1 ]}
      user={{tasks: []}}
      isAdminView={true}
      createTaskModalOpen={false}
      editTaskModalOpen={false}
      toggleCreateTaskModal={toggleCreateTaskModal}
      toggleEditTaskModal={jest.fn()}
      toggleIsAdminView={toggleIsAdminView}
      sortTasksByRank={sortTasksByRank}
      assignTasksToUser={assignTasksToUser}
      createTask={jest.fn()}
      editTask={jest.fn()} />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  describe('renders correctly', () => {
    it('is admin view', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('not admin view', () => {
      wrapper.setProps({isAdminView: false})
      expect(wrapper).toMatchSnapshot()
    })

    it('not admin view, sorts tasks correctly', () => {
      let newUser = {
        tasks: [
          { ...testTask },
          { ...testTask1, currentStatus: 'In Progress'},
          { ...testTask2, currentStatus: 'Finished'}
        ]
      }
      wrapper.setProps({isAdminView: false, user: newUser})
      expect(wrapper).toMatchSnapshot()
    })
  })

  it('should call sortTasksByRank on mount', () => {
    wrapper = mount(<App
      templateTasks={[ testTask, testTask1 ]}
      user={{tasks: []}}
      isAdminView={true}
      createTaskModalOpen={false}
      editTaskModalOpen={false}
      toggleCreateTaskModal={toggleCreateTaskModal}
      toggleEditTaskModal={jest.fn()}
      sortTasksByRank={sortTasksByRank}
      assignTasksToUser={assignTasksToUser}
      createTask={jest.fn()}
      editTask={jest.fn()} />)

    expect(sortTasksByRank).toHaveBeenCalled()
    expect(sortTasksByRank).toHaveBeenCalledWith(wrapper.instance().props.templateTasks, wrapper.instance().props.user.tasks)
  })

  describe('actions', () => {
    it('createTaskButton works as expected', () => {
      const createTaskButton = wrapper.find('#createTaskButton')

      createTaskButton.simulate('click')

      expect(toggleCreateTaskModal).toHaveBeenCalled()
      expect(toggleCreateTaskModal).toHaveBeenCalledWith(true)
    })

    it('assignTasksToUserButton works as expected', () => {
      const assignTasksToUserButton = wrapper.find('#assignTasksToUserButton')

      assignTasksToUserButton.simulate('click')

      expect(assignTasksToUser).toHaveBeenCalled()
      expect(assignTasksToUser).toHaveBeenCalledWith(wrapper.instance().props.templateTasks)
    })

    it('toggleIsAdminViewButton works as expected', () => {
      const toggleIsAdminViewButton = wrapper.find('#toggleIsAdminViewButton')

      toggleIsAdminViewButton.simulate('click')

      expect(toggleIsAdminView).toHaveBeenCalled()
    })
  })
})
