'use strict';

import React from 'react';

export default class SearchUsersBox extends React.Component {
  constructor(props){
    super(props);
    //init state
    this.state = {
      userName : ""
    };
    //init context bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    console.log(this.state.userName);
  }
  handleChange(e){
    //not sure it's the best way because it will trigger a render on something handled by the browser
    //but have to keep track of this value anyway ...
    this.setState({userName:e.target.value});
  }
  render() {
    var userName = this.state.userName;
    return (
      <form onSubmit={this.handleSubmit} className="form-horizontal">
        <div className="form-group">
          <label htmlFor="user-name" className="col-sm-2">Github username</label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id="user-name" placeholder="Enter username" onChange={this.handleChange}/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default pull-right">Search</button>
          </div>
        </div>
      </form>
    )
  }
}