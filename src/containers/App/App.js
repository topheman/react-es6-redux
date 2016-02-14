import React from 'react';

import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';

const App = ({ children }) => {
  return (
    <div>
      <Header title="react-es6-redux"/>
      <div className="container">
        {children}
      </div>
      <Footer year={(new Date()).getFullYear()}/>
    </div>
  );
};

App.propTypes = {
  children: React.PropTypes.node.isRequired
};

export default App;
