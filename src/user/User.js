import React from 'react';

export default class User extends React.Component {
  render() {
    let data = this.props.data;

    if (data.error){
      return (
         <div className="notfound">
            <h2>Not Found</h2>
            <p>User not found, please modify your search term or try again later.</p>
         </div>
      );
    }else{
      return (
        <section>
          <div>
            <h1>{data.username}</h1>
            <h3>{data.location || 'Parts Unknown'}</h3>
            <a href={data.homeUrl} target="_blank" title={data.name || data.username}><img src={data.avatar} /></a>
            <h2><a href={data.homeUrl} target="_blank">{data.name}</a></h2>
          </div>
          <div>
            <ul>
              <li><a href={`${data.homeUrl}?tab=repositories`}><i>{data.repos}</i> <span>Public Repositories</span></a></li>
              <li><a href={`${data.homeUrl}/followers`}><span>Followed by </span> <i>{data.followers}</i> Users</a></li>
              <li><a href={`${data.homeUrl}/following`}><span>Following</span> <i>{data.following}</i> Users </a></li>
            </ul>
          </div>
        </section>
      );
    }
  }
}