import React from 'react';

export default class SearchUsers extends React.Component {
  render() {
    return (
      <div className="">
         <form onSubmit={this.submitForm.bind(this)}>
           <label><input type="search" ref="searchTerm" placeholder="Search by Username"/></label>
         </form>
      </div>
    )
  }

  submitForm(e) {
   e.preventDefault();
    let searchTerm = this.refs.searchTerm.value;
    this.props.getUser(searchTerm);
    this.refs.searchTerm.value = '';
  }
}