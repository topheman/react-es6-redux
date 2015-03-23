import React from 'react'

export class Home extends React.Component {
  render() {
    return (
      <div>
        Hello {this.props.name}!
      </div>
    );
  }
};