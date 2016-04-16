import React from 'react';

const DisplayStars = ({number}) => {
  if (number > 0) {
    return (
      <span>
        {number} <span className="glyphicon glyphicon-star"></span>
      </span>
    );
  }
  return null;
};

DisplayStars.propTypes = {
  number: React.PropTypes.number
};

export default DisplayStars;
