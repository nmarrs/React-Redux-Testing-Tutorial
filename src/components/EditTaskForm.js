import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles/EditTaskForm.css'

class EditTaskForm extends Component {
  static propTypes = {
    task: PropTypes.object,
    editTask: PropTypes.func.isRequired,
    toggleEditTaskModal: PropTypes.func.isRequired,
    isAdminView: PropTypes.bool.isRequired
  }

  state = {
    title: this.props.task.title,
    currentStatus: this.props.task.currentStatus,
    timeEstimate: this.props.task.timeEstimate,
    priority: this.props.task.priority,
    notes: this.props.task.notes,
    feedback: this.props.task.feedback
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
      timeEstimate,
      priority
    } = this.state

    const {
      task,
      isAdminView,
      editTask,
      toggleEditTaskModal
    } = this.props

    if (title === '' || timeEstimate === '0' || priority === '-') {
      window.alert('Error, task must have a valid title, time estimate, and priority level.')
      return
    }

    let editedTask = {
      ...task,
      ...this.state
    }

    editTask(editedTask, isAdminView)
    toggleEditTaskModal(false)
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

    const {
      task
    } = this.props

    return (
      <div className='EditTaskForm-modal'>
        <h4 className='m-3'><i className="fas fa-info-circle"></i> Task Details</h4>
        <form>
          <div className='form-group'>
            <label htmlFor='taskTitle'><i className="fas fa-tag"></i> Title</label>
            <input className='form-control' id='taskTitleInput' defaultValue={task && task.title ? task.title : title} onChange={this.handleTitleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor='taskStatus'><i className="fas fa-bolt"></i> Status</label>
            <select className="form-control" id="taskStatusSelect" defaultValue={task && task.currentStatus ? task.currentStatus : currentStatus} onChange={this.handleStatusSelectChange}>
              <option>To Do</option>
              <option>In Progress</option>
              <option>Finished</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor='taskPriority'><i className="fas fa-exclamation"></i> Priority Level (1-5)</label>
            <select className="form-control" id="taskPrioritySelect" defaultValue={task && task.priority ? task.priority : priority} onChange={this.handlePrioritySelectChange} disabled>
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
            <input type='number' min='0' className='form-control' id='taskEstimateInput' defaultValue={task && task.timeEstimate ? task.timeEstimate : timeEstimate} onChange={this.handleTimeEstimateInputChange} disabled />
          </div>
          <div className='form-group'>
            <label htmlFor='taskNotes'><i className="far fa-sticky-note"></i> Notes</label>
            <textarea className='form-control EditTaskForm-textarea' id='taskNotesTextArea' defaultValue={task && task.notes ? task.notes : notes} onChange={this.handleNotesInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='taskFeedback'><i className="far fa-comments"></i> Feedback</label>
            <textarea className='form-control EditTaskForm-textarea' id='taskFeedbackTextArea' defaultValue={task && task.feedback ? task.feedback : feedback} onChange={this.handleFeedbackInputChange} />
          </div>
          <button type='submit' className='btn btn-primary' onClick={this.handleSubmit}><i className="fas fa-check"></i> Submit</button>
        </form>
      </div>
    )
  }
}

export default EditTaskForm
