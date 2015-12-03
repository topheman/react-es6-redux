import React from 'react';

const Spinner = ({fetching}) => {
  if (fetching === true) {
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );
  }
  return (
    <div className="spinner"></div>
  );
};

Spinner.propTypes = {
  fetching: React.PropTypes.bool
};

export default Spinner;
