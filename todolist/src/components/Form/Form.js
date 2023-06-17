import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';

import './Form.css';

function Form({ handleSubmit, handleChange, newTask }) {
  return (
    <form onSubmit={handleSubmit} action="#" className="form">
      <input
        className="newTask"
        onChange={handleChange}
        type="text"
        value={newTask}
      />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}

// Form.defaultProps = {
//   newTask: '',
// };

Form.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  newTask: PropTypes.string.isRequired,
};

export default Form;