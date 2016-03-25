import React from 'react';

import Profile from '../../components/Profile/Profile.js';
import Repos from '../../components/Repos/Repos.js';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getRepositories, getProfile, initUsername } from '../../redux/modules/singleUser.js';// import action creators

class GithubUser extends React.Component {

  static propTypes = {
    params: React.PropTypes.object.isRequired,
    singleUser: React.PropTypes.object.isRequired,
    initUsername: React.PropTypes.func.isRequired,
    getProfile: React.PropTypes.func.isRequired,
    getRepositories: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    // init context bindings - due to diff between React.createClass and ES6 class
    this.reposGotoPage = this.reposGotoPage.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }
  componentWillMount() {
    this.props.initUsername(this.props.params.username);
    this.props.getProfile(this.props.params.username);
    this.props.getRepositories(this.props.params.username);
  }
  reposGotoPage(pageNum) {
    this.props.getRepositories(this.props.params.username, {
      page: pageNum
    });
  }
  render() {
    const { profile, repositories } = this.props.singleUser;
    return (
      <div>
        <Profile profile={profile}/>
        <Repos repositories={repositories} reposGotoPage={this.reposGotoPage}/>
      </div>
    );
  }
}

export default connect(
  (state) => ({ singleUser: state.singleUser }),
  (dispatch) => bindActionCreators({ getRepositories, getProfile, initUsername }, dispatch)
)(GithubUser);
