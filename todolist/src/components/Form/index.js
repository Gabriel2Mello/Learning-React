import React from "react";
import PropTypes from "prop-types";
import { FaPlus } from "react-icons/fa";

import "./Form.css";

export default function Form({ handleSubmit, handleInputChange, newTask }) {
  return (
    <form onSubmit={handleSubmit} action="#" className="form">
      <input onChange={handleInputChange} type="text" value={newTask} />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired,
};

// How to define default props for PropTypes non required
// Form.defaultProps = {
//   newTask: "Default Value"
// }
