// LabelWithRequired.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './LabelWithRequired.css'; // Import CSS file for styling

const LabelWithRequired = ({ htmlFor, children, isRequired }) => {
  return (
    <label htmlFor={htmlFor} className="form-label">
      {children} {isRequired && <span className="required-star">*</span>}
    </label>
  );
};

LabelWithRequired.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isRequired: PropTypes.bool
};

// LabelWithRequired.defaultProps = {
//   isRequired: false
// };

export default LabelWithRequired;
