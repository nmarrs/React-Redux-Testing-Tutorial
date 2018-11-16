import React from 'react'
import { shallow } from 'enzyme'

import EditTaskForm from '.././EditTaskForm'
import { testTask } from '../../testData'

describe('EditTaskForm', () => {
  let wrapper
  let editTask = jest.fn()
  let toggleEditTaskModal = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<EditTaskForm
      task={testTask}
      editTask={editTask}
      toggleEditTaskModal={toggleEditTaskModal}
      isAdminView={true} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('initially should have expected state', () => {
    expect(wrapper.state()).toMatchSnapshot()
  })

  describe('handlers', () => {
    it('handleTitleInputChange', () => {
      let testEvent = {
        target: {
          value: 'New Title'
        }
      }

      wrapper.instance().handleTitleInputChange(testEvent)

      expect(wrapper.state().title).toEqual('New Title')
    })

    it('handleStatusSelectChange', () => {
      let testEvent = {
        target: {
          value: 'In Progress'
        }
      }

      wrapper.instance().handleStatusSelectChange(testEvent)

      expect(wrapper.state().currentStatus).toEqual('In Progress')
    })

    it('handleTimeEstimateInputChange', () => {
      let testEvent = {
        target: {
          value: '6'
        }
      }

      wrapper.instance().handleTimeEstimateInputChange(testEvent)

      expect(wrapper.state().timeEstimate).toEqual('6')
    })

    it('handlePrioritySelectChange', () => {
      let testEvent = {
        target: {
          value: '3'
        }
      }

      wrapper.instance().handlePrioritySelectChange(testEvent)

      expect(wrapper.state().priority).toEqual('3')
    })

    it('handleFeedbackInputChange', () => {
      let testEvent = {
        target: {
          value: 'Test Notes'
        }
      }

      wrapper.instance().handleNotesInputChange(testEvent)

      expect(wrapper.state().notes).toEqual('Test Notes')
    })

    it('handleFeedbackInputChange', () => {
      let testEvent = {
        target: {
          value: 'Test Feedback'
        }
      }

      wrapper.instance().handleFeedbackInputChange(testEvent)

      expect(wrapper.state().feedback).toEqual('Test Feedback')
    })

    describe('handleSubmit', () => {
      it('invalid data', () => {
        global.window.alert = jest.fn()
        let testEvent = {
          preventDefault: jest.fn()
        }
        wrapper.instance().setState({title: '', priority: '-', timeEstimate: '0'})

        wrapper.instance().handleSubmit(testEvent)

        expect(global.window.alert).toHaveBeenCalled()
        expect(global.window.alert).toHaveBeenCalledWith('Error, task must have a valid title, time estimate, and priority level.')
      })

      it('valid data', () => {
        let testEvent = {
          preventDefault: jest.fn()
        }

        wrapper.instance().handleSubmit(testEvent)

        expect(editTask).toHaveBeenCalled()
        expect(toggleEditTaskModal).toHaveBeenCalled()
        expect(toggleEditTaskModal).toHaveBeenCalledWith(false)
      })
    })
  })
})
