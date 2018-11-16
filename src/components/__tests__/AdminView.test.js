import React from 'react'
import { shallow } from 'enzyme'

import AdminView from '.././AdminView'
import { testTask, testTask1 } from '../../testData'

describe('AdminView', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<AdminView
      templateTasks={[ testTask, testTask1 ]}
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
