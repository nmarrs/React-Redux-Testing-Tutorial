import React from 'react'
import { shallow } from 'enzyme'

import TaskCard from '.././TaskCard'
import { testTask } from '../../testData'

describe('TaskCard', () => {
  let wrapper
  let toggleEditTaskModal = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<TaskCard
      task={testTask}
      toggleEditTaskModal={toggleEditTaskModal} />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('taskCard element handles click event as expected', () => {
    const taskCardElement = wrapper.find('a')

    taskCardElement.simulate('click')

    expect(toggleEditTaskModal).toHaveBeenCalled()
    expect(toggleEditTaskModal).toHaveBeenCalledWith(true, testTask)
  })
})
