'use strict';

import React from 'react';
import UsersSimpleProfileList from './UsersSimpleProfileList.jsx';

import github from '../../services/github.js';

export default class SearchUsersBox extends React.Component {
  constructor(props){
    super(props);
    //init state
    this.state = {
      userName : "",
      results : null,
      fetching: false
    };
    //init context bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.setState({fetching: true});
    var currentUser = this.state.userName;
    //prevent submiting empty user
    if (currentUser !== "") {
      github.searchUser(currentUser)
        .end(function (err, res) {
          if (err) {
            this.setState({
              results: {
                error: "An error occured, please try again."
              }
            });
            this.setState({fetching: false});
            return;
          }
          this.setState({results: res.body});
          this.setState({fetching: false});
        }.bind(this));
    }
  }
  handleChange(e){
    //not sure it's the best way because it will trigger a render on something handled by the browser
    //but have to keep track of this value anyway ...
    this.setState({userName:e.target.value});
  }
  render() {
    var userName = this.state.userName;
    var results = this.state.results;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-horizontal">
          <div className="form-group">
            <label htmlFor="user-name" className="col-sm-2">Search for a Github User</label>
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
        <UsersSimpleProfileList results={results}/>
      </div>
    )
  }
}