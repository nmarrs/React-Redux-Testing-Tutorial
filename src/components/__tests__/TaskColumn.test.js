import React from 'react'
import { shallow } from 'enzyme'

import TaskColumn from '.././TaskColumn'
import { testTask, testTask1, testTask2 } from '../../testData'

describe('TaskColumn', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<TaskColumn
      title={'Test'}
      toggleEditTaskModal={jest.fn()}
      tasks={[]} />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  describe('renders correctly', () => {
    it('no tasks provided', () => {
      expect(wrapper).toMatchSnapshot()
    })

    it('tasks provided', () => {
      wrapper.setProps({tasks: [testTask, testTask1, testTask2]})
      expect(wrapper).toMatchSnapshot()
    })
  })
})
