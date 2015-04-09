'use strict';

import React from 'react';

import github from '../services/github.js';
import Spinner from './common/Spinner.jsx';
import Profile from './githubUser/Profile.jsx';
import Repos from './githubUser/Repos.jsx';

const ORIGINAL_REPOS_PER_PAGE = 15;

export default class GithubUser extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      profile: {
        pristineLogin: props.params.username
      },
      repositories: {
        pristineLogin: props.params.username
      }
    };
    //server-side rendering based on passing data retrieved previously from the server
    if(props.params.data){
      this.state.profile = props.data.profile;
      this.state.repositories = props.data.repositories;
    }
    //client-side fetching via xhr
    else if(props.params.username){
      //client-side fetching of the profile via xhr based on username
      this.state.profile.fetching = true;
      github.getUser(props.params.username)
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
      this.state.repositories.fetching = true;
      github.getUserRepos(props.params.username,{
        page: 1,
        sort: "updated",
        per_page: ORIGINAL_REPOS_PER_PAGE
      })
        .then((result) => {
          this.setState({
            repositories: {
              pristineLogin: props.params.username,//pass again (since it was erased)
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
  }
  reposGotoPage(pageNum){
    //client-side fetching of the repositories via xhr based on the username
    this.state.repositories.fetching = true;
    github.getUserRepos(props.params.username,{
      page: pageNum,
      sort: "updated",
      per_page: this.state.repositories.infos.per_page
    })
      .then((result) => {
        this.setState({
          repositories: {
            pristineLogin: props.params.username,//pass again (since it was erased)
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
    console.log(repositories);
    return (
      <div>
        <Profile profile={profile}/>
        <Repos repositories={repositories}/>
      </div>
    );
  }
}