import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuidv1 from 'uuid/v1'

import './styles/CreateTaskForm.css'
import { calculateTaskRankWeight } from '../actions'

class CreateTaskForm extends Component {
  static propTypes = {
    createTask: PropTypes.func,
    toggleCreateTaskModal: PropTypes.func.isRequired,
    isAdminView: PropTypes.bool.isRequired
  }

  state = {
    title: '',
    currentStatus: 'To Do',
    timeEstimate: '0',
    priority: '-',
    notes: '',
    feedback: ''
  }

  handleTitleInputChange = (event) => {
    this.setState({title: event.target.value})
  }

  handleStatusSelectChange = (event) => {
    this.setState({currentStatus: event.target.value})
  }

  handleTimeEstimateInputChange = (event) => {
    this.setState({timeEstimate: event.target.value})
  }

  handlePrioritySelectChange = (event) => {
    this.setState({priority: event.target.value})
  }

  handleNotesInputChange = (event) => {
    this.setState({notes: event.target.value})
  }

  handleFeedbackInputChange = (event) => {
    this.setState({feedback: event.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const {
      title,
      currentStatus,
      timeEstimate,
      priority,
      notes,
      feedback
    } = this.state

    const {
      isAdminView,
      createTask,
      toggleCreateTaskModal
    } = this.props

    if (title === '' || timeEstimate === '0' || priority === '-') {
      window.alert('Error, task must have a valid title, time estimate, and priority level.')
      return
    }

    let newTask = {
      id: uuidv1(),
      title: title,
      priority: priority,
      timeEstimate: timeEstimate,
      notes: notes,
      feedback: feedback,
      startTime: '',
      endTime: '',
      completionTime: '',
      currentStatus: currentStatus,
      rankWeight: calculateTaskRankWeight(priority, timeEstimate)
    }

    createTask(newTask, isAdminView)
    toggleCreateTaskModal(false)
  }

  render() {
    const {
      title,
      currentStatus,
      timeEstimate,
      priority,
      notes,
      feedback
    } = this.state

    return (
      <div className='CreateTaskForm-modal'>
        <h4 className='m-3'><i className="far fa-plus-square"></i> Create New Task</h4>
        <form>
          <div className='form-group'>
            <label htmlFor='taskTitle'><i className="fas fa-tag"></i> Title</label>
            <input className='form-control' id='taskTitleInput' defaultValue={title} onChange={this.handleTitleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor='taskStatus'><i className="fas fa-bolt"></i> Status</label>
            <select className="form-control" id="taskStatusSelect" defaultValue={currentStatus} onChange={this.handleStatusSelectChange} disabled>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Finished</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor='taskPriority'><i className="fas fa-exclamation"></i> Priority Level (1-5)</label>
            <select className="form-control" id="taskPrioritySelect" defaultValue={priority} onChange={this.handlePrioritySelectChange}>
              <option>-</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div>
          <div className='form-group'>
            <label htmlFor='taskEstimate'><i className="far fa-clock"></i> Estimate (hours)</label>
            <input type='number' min='0' className='form-control' id='taskEstimateInput' defaultValue={timeEstimate} onChange={this.handleTimeEstimateInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='taskNotes'><i className="far fa-sticky-note"></i> Notes</label>
            <textarea className='form-control CreateTaskForm-textarea' id='taskNotesTextArea' defaultValue={notes} onChange={this.handleNotesInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='taskFeedback'><i className="far fa-comments"></i> Feedback</label>
            <textarea className='form-control CreateTaskForm-textarea' id='taskFeedbackTextArea' defaultValue={feedback} onChange={this.handleFeedbackInputChange} />
          </div>
          <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}><i className="fas fa-check"></i> Submit</button>
        </form>
      </div>
    )
  }
}

export default CreateTaskForm
