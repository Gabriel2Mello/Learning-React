import React, { Component } from 'react';

import Form from './Form/Form';
import Tasks from './Tasks/Tasks';

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

        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          newTask={newTask}
        />

        <Tasks
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tasks={tasks}
        />

      </div>
    );
  }
}

export default Main;
