import React from 'react'
import { shallow } from 'enzyme'

import UserView from '.././UserView'
import { testTask, testTask1, testTask2 } from '../../testData'

describe('UserView', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<UserView
      toDoTasks={[ testTask ]}
      inProgressTasks={[ testTask1 ]}
      finishedTasks={[ testTask2 ]}
      isAdminView={true}
      editTaskModalOpen={false}
      toggleEditTaskModal={jest.fn()} />)
  })

  it('should exist', () => {
    expect(wrapper).toBeDefined()
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
