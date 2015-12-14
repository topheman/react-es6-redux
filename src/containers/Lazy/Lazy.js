import React from 'react';

const Lazy = ({ children }) => {
  return (
    <div>
      <h2>
        This part is lazy-loaded
      </h2>
      <div>
        {children}
      </div>
    </div>
  );
};

Lazy.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default Lazy;
