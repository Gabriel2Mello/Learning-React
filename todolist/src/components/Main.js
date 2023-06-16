import React, { Component } from 'react';

// Form
import { FaPlus, FaEdit, FaWindowClose } from 'react-icons/fa';

// Tasks
// import { FaEdit, FaWindowClose } from 'react-icons/fa';

import './Main.css';

const Actions = {
  Add: -1,
};

class Main extends Component {
  state = {
    newTask: '',
    tasks: [],
    index: Actions.Add,
  };

  taskExists = (task) => {
    const { tasks } = this.state;
    return (tasks.indexOf(task) !== -1);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { tasks, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (!newTask) return;
    if (this.taskExists(newTask)) return;

    const newTasks = [...tasks];

    if (index === Actions.Add) {
      this.setState({
        tasks: [...newTasks, newTask],
        newTask: '',
      });
      return;
    }

    newTasks[index] = newTask;

    this.setState({
      tasks: [...newTasks],
      index: Actions.Add,
    });
  };

  handleChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  handleEdit = (e, index) => {
    const { tasks } = this.state;

    this.setState({
      index,
      newTask: tasks[index],
    });
  };

  handleDelete = (e, index) => {
    const { tasks } = this.state;
    const newTasks = [...tasks];
    newTasks.splice(index, 1);

    this.setState({
      tasks: [...newTasks],
    });
  };

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="main">
        <h1>Todo List</h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input
            onChange={this.handleChange}
            type="text"
            value={newTask}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tasks">
          {tasks.map((task, index) => (
            <li key={task}>
              {task}
              <span>
                <FaEdit
                  className="edit"
                  onClick={(e) => this.handleEdit(e, index)}
                />
                <FaWindowClose
                  className="delete"
                  onClick={(e) => this.handleDelete(e, index)}
                />
              </span>
            </li>
          ))}
        </ul>

      </div>
    );
  }
}

export default Main;
