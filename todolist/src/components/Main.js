import "./Main.css";
import "./Form/Form";
import "./Tasks/Tasks";

import React, { Component } from "react";
import { FaPlus } from "react-icons/fa";
import { FaEdit, FaWindowClose } from "react-icons/fa";

export default class Main extends Component {
  state = {
    newTask: "",
    tasks: [],
    index: -1,
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { tasks, index } = this.state;
    let { newTask } = this.state;
    newTask = newTask.trim();

    if (newTask === "") return;
    if (tasks.indexOf(newTask) !== -1) return;

    if (index === -1) {
      this.setState({
        tasks: [...tasks, newTask],
        newTask: "",
      });

      return;
    }

    tasks[index] = newTask;
    this.setState({
      tasks,
      newTask: "",
      index: -1,
    });
  };

  handleEdit = (e, index) => {
    const { tasks } = this.state;

    this.setState({
      newTask: tasks[index],
      index,
    });
  };

  handleDelete = (e, index) => {
    const { tasks } = this.state;
    const newTasks = [...tasks];
    newTasks.splice(index, 1);

    this.setState({
      tasks: [...newTasks],
      index: -1,
    });
  };

  handleInputChange = (e) => {
    this.setState({
      newTask: e.target.value,
    });
  };

  render() {
    const { newTask, tasks } = this.state;

    return (
      <div className="main">
        <h1>Todo list</h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input
            onChange={this.handleInputChange}
            type="text"
            value={newTask}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tasks">
          {tasks.map((task, index) => (
            <li key={index}>
              {task}
              <span>
                <FaEdit
                  onClick={(e) => this.handleEdit(e, index)}
                  className="edit"
                />
                <FaWindowClose
                  onClick={(e) => this.handleDelete(e, index)}
                  className="delete"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
