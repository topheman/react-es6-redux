'use strict';

import React from 'react';
import UsersSimpleProfileList from './UsersSimpleProfileList.jsx';
import Spinner from '../common/Spinner.jsx';

import github from '../../services/github.js';

import localStorageWrapper from '../../services/localStorageWrapper.js';

export default class SearchUsersBox extends React.Component {
  constructor(props){
    super(props);
    //init state
    this.state = {
      userName : localStorageWrapper.get('github.search.userName'),
      results : localStorageWrapper.get('github.search.results') || null,
      fetching: false
    };
    //if results are cached in storage, recache for X mins
    localStorageWrapper.extend('github.search.userName');
    localStorageWrapper.extend('github.search.results');
    //init context bindings
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleFocus(e) {
    var target = e.target;
    //dirty but curiously in React this is a known bug and workaround ...
    setTimeout(function() {
      target.select();
    }, 0);
  }
  handleSubmit(e) {
    e.preventDefault();
    document.getElementById('user-name').blur();
    var currentUser = this.state.userName;
    //prevent submiting empty user
    if (currentUser !== "") {
      this.setState({fetching: true});
      github.searchUser(currentUser)
        .then(function(result){
          localStorageWrapper.set('github.search.results',result.data);
          localStorageWrapper.set('github.search.userName',currentUser);
          this.setState({
            results: result.data,
            fetching: false
          });
        }.bind(this))
        .catch(function(error){
          this.setState({
            results: {
              error: error.humanMessage
            },
            fetching: false
          });
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
    var fetching = this.state.fetching;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-horizontal" action=".">
          <div className="form-group">
            <label htmlFor="user-name" className="col-sm-2">Search for a Github User</label>
            <div className="col-sm-10">
              <input type="search" name="user-name" className="form-control" id="user-name" placeholder="Enter username" value={userName} onChange={this.handleChange} onFocus={this.handleFocus}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default pull-right">Search</button>
              <Spinner fetching={fetching} className="pull-left"/>
            </div>
          </div>
        </form>
        <UsersSimpleProfileList results={results}/>
      </div>
    )
  }
}