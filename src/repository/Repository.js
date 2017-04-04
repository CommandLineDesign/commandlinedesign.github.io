import React from 'react';

import { Button, Collapse, Well } from 'react-bootstrap';
import Time from 'react-time-format';

export default class Repositories extends React.Component {

  constructor(){
    super();
    this.state = {};
  }


  render() {

    let data = this.props.data;

    if (data.error){
      return (
         <div className="notfound"></div>
      )
    } else {

      let publicRepos = this.props.data.publicRepos;
      let sortByWatchers = function(a, b){
        return a['watchers']>b['watchers']
      }

      publicRepos.sort(sortByWatchers);

      return (
        <section>
          <h3>Public Repositories</h3>
          <ul>
            {publicRepos.map( (repo) => <Repository data={repo} />)}
          </ul>
        </section>
      )
    }
  }
}

class Repository extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let repo = this.props.data;
    return (
    <li key={repo.id}>
      <Button onClick={ ()=> this.setState({ open: !this.state.open })}>{repo.full_name}</Button>
      <Collapse in={this.state.open}>
        <span id={repo.id + '-details'} className='collapse'>
          <Well>
            <ul>
              <li>{repo.url}</li>
              <li>Watchers: {repo.watchers_count}</li>
              <li>Created: <Time value={repo.created_at} format="YYYY/MM/DD" /></li>
              <li>last push: <Time value={repo.pushed_at} format="YYYY/MM/DD" /></li>
              <li>Language: {repo.language}</li>
              <li>size: {repo.size}</li>
              <li>Description: {repo.description}</li>
            </ul>
            </Well>
        </span>
      </Collapse>
    </li>
    )
  }
}
