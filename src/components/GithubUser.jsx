'use strict';

import React from 'react/addons';

import github from '../services/github.js';
import Spinner from './common/Spinner.jsx';
import Profile from './githubUser/Profile.jsx';
import Repos from './githubUser/Repos.jsx';

const ORIGINAL_REPOS_PER_PAGE = 15;

export default class GithubUser extends React.Component {
  constructor(props){

    super(props);

    //init context bindings - due to diff between React.createClass and ES6 class
    this._getInitialState = this._getInitialState.bind(this);
    this.reposGotoPage = this.reposGotoPage.bind(this);
    this.init = this.init.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);

    //init state
    this.state = this._getInitialState();

    //server-side rendering based on passing data retrieved previously from the server
    if(props.data){
      this.state.profile = props.data.profile;
      this.state.profile.pristineLogin = props.username;
      this.state.repositories = props.data.repositories;
      this.state.repositories.pristineLogin = props.username;
    }

  }
  componentWillMount(){
    //only launch xhr if there isn't any data in state (could have been server-side pre-loaded)
    if(!this.state.profile.data) {
      this.init(this.state.profile.pristineLogin);
    }
  }
  _getInitialState(){
    return{
      profile: {
        pristineLogin: this.props.params.username
      },
      repositories: {
        pristineLogin: this.props.params.username
      }
    };
  }
  init(userName){
    //init the state as fetching
    var newState = React.addons.update(this.state,{
      profile:{
        fetching: {$set: true}
      },
      repositories:{
        fetching: {$set: true}
      }
    });
    this.setState(newState);
    //client-side fetching of the profile via xhr based on username
    github.getUser(userName)
      .then((result) => {
        this.setState({
          profile: {
            data: result.data,
            fetching: false
          }
        });
      })
      .catch((error) => {
        this.setState({
          profile: {
            error : error.humanMessage,
            fetching: false
          }
        });
      });
    //client-side fetching of the repositories via xhr based on the username
    github.getUserRepos(userName,{
      page: 1,
      sort: "updated",
      per_page: ORIGINAL_REPOS_PER_PAGE
    })
      .then((result) => {
        this.setState({
          repositories: {
            pristineLogin: userName,//pass again (since it was erased)
            data: result.data,
            infos: result.infos,
            fetching: false
          }
        });
      })
      .catch((error) => {
        this.setState({
          repositories: {
            error : error.humanMessage,
            fetching: false
          }
        });
      });
  }
  reposGotoPage(pageNum){
    //client-side fetching of the repositories via xhr based on the username
    var newState = React.addons.update(this.state,{
      repositories:{
        fetching: {$set: true}
      }
    });
    this.setState(newState);
    github.getUserRepos(this.state.repositories.pristineLogin,{
      page: pageNum,
      sort: "updated",
      per_page: this.state.repositories.infos.per_page
    })
      .then((result) => {
        this.setState({
          repositories: {
            pristineLogin: this.state.repositories.pristineLogin,//pass again (since it was erased)
            data: result.data,
            infos: result.infos,
            fetching: false
          }
        });
      })
      .catch((error) => {
        this.setState({
          repositories: {
            error : error.humanMessage,
            fetching: false
          }
        });
      });
  }
  reposChangePerPage(perPage){

  }
  render(){
    var profile = this.state.profile;
    var repositories = this.state.repositories;
    return (
      <div>
        <Profile profile={profile}/>
        <Repos repositories={repositories} reposGotoPage={this.reposGotoPage}/>
      </div>
    );
  }
}