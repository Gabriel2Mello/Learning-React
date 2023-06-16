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

  componentDidMount() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));

    if (!tasks) return;

    this.setState({
      tasks,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tasks } = this.state;

    if (tasks === prevState.tasks) return;

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { tasks, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (!newTask) return;
    if (this.taskExists(newTask)) return;

    const oldTasks = [...tasks];

    if (index === Actions.Add) {
      this.addTask(oldTasks, newTask);

      e.target.firstChild.focus();
      return;
    }

    this.editTask(index, oldTasks, newTask);
    e.target.firstChild.focus();
  };

  addTask = (oldTasks, newTask) => {
    this.setState({
      tasks: [...oldTasks, newTask],
      newTask: '',
    });
  };

  editTask = (index, oldTasks, newTask) => {
    const newTasks = [...oldTasks];
    newTasks[index] = newTask;

    this.setState({
      newTask: '',
      tasks: [...newTasks],
      index: Actions.Add,
    });
  };

  taskExists = (task) => {
    const { tasks } = this.state;
    return (tasks.indexOf(task) !== -1);
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
            className="newTask"
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
