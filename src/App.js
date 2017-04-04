import React, { Component } from 'react';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';


import logo from './logo.svg';
import './App.css';

import User from './user/User.js';
import SearchUsers from './search/Search.js';
import Repositories from './repository/Repository.js';

import { Navbar, Button, FormGroup, FormControl } from 'react-bootstrap';

const EndPoint = 'https://api.github.com/';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: 'commandlinedesign',
      location:'',
      avatar:'',
      name:'',
      repos:'',
      followers: '',
      following:'',
      homeUrl:'',
      error:'',
      publicRepos: []
    }
  }
  getUser(username) {
    let url = EndPoint + 'users/' + username;
    fetch(url)
      .then((res) => res.json() )
      .then((data) => {
        this.setState({
          username: data.login,
          location: data.location,
          avatar: data.avatar_url,
          name: data.name,
          repos: data.public_repos,
          followers: data.followers,
          following: data.following,
          homeUrl: data.html_url,
          error: data.message
        })
        this.getRepositories(this.state.username)
      })
      .catch((error) => console.log(error) )
  }

  getRepositories(username) {
    let url = EndPoint + 'users/' + username + '/repos';
    fetch(url)
      .then((response) => response.json() )
      .then((data) => {
        this.setState({
          publicRepos: data
        })
      })
      .catch((error) => console.log(error) )
  }

  componentDidMount() {
    this.getUser(this.state.username);
    this.getRepositories(this.state.username)
  }
  render() {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">GitHub</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <SearchUsers getUser={this.getUser.bind(this)}/>
              </FormGroup>
              {' '}
              <Button type="submit" onClick={this.getUser.bind(this)}>Submit</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
        <div className="body-container">
          <div className="col-xs-12 col-sm-6 text-right affix">
            <User data={this.state} />
          </div>
          <div className="hidden-xs col-sm-6"></div>
          <div className="col-xs-12 col-sm-6">
            <Repositories data={this.state}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;