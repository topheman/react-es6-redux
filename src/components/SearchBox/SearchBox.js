import React from 'react';
import ProfileList from './../ProfileList/ProfileList.js';
import Spinner from '../common/Spinner.js';

/**
 * This component doesn't have state nor it has to know about connect or redux.
 * Everything it needs is passed down via props (and lets it update the state of its parent)
 */

class SearchBox extends React.Component {

  static propTypes = {
    changeUsername: React.PropTypes.func.isRequired,
    findUsers: React.PropTypes.func.isRequired,
    username: React.PropTypes.string.isRequired,
    fetching: React.PropTypes.bool.isRequired,
    results: React.PropTypes.object
  }

  constructor(props) {

    super(props);

    // init context bindings - due to diff between React.createClass and ES6 class
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
  handleFocus(e) {
    const target = e.target;
    // dirty but curiously in React this is a known bug and workaround ...
    setTimeout(() => {
      target.select();
    }, 0);
  }
  handleSubmit(e) {
    e.preventDefault();
    document.getElementById('user-name').blur();
    const currentUser = this.props.username;
    // prevent submiting empty user
    if (currentUser !== '') {
      this.props.findUsers(currentUser);
    }
  }
  handleChange() {
    const node = this.refs.input;
    const username = node.value.trim();
    this.props.changeUsername(username);
  }
  render() {
    const { username, results, fetching } = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="form-horizontal" action=".">
          <div className="form-group">
            <label htmlFor="user-name" className="col-sm-2">Search for a Github User</label>
            <div className="col-sm-10">
              <input ref="input" type="search" name="user-name" className="form-control" id="user-name" placeholder="Enter username" value={username} onChange={this.handleChange} onFocus={this.handleFocus}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-default pull-right">Search</button>
              <Spinner fetching={fetching} className="pull-left"/>
            </div>
          </div>
        </form>
        <ProfileList results={results}/>
      </div>
    );
  }
}

export default SearchBox;
