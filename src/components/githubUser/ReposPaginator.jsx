'use strict';

import React from 'react';

export default class ReposPaginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.gotoPage = this.gotoPage.bind(this);
    this.gotoNextPage = this.gotoNextPage.bind(this);
    this.gotoPreviousPage = this.gotoPreviousPage.bind(this);
    this.gotoFirstPage = this.gotoFirstPage.bind(this);
    this.gotoLastPage = this.gotoLastPage.bind(this);
    this.handleClickGotoPage = this.handleClickGotoPage.bind(this);
  }

  gotoPage(pageNum) {
    console.log('ReposPaginator.gotoPage', pageNum);
  }

  gotoNextPage() {
    this.gotoPage(this.props.infos.page + 1);
  }

  gotoPreviousPage() {
    this.gotoPage(this.props.infos.page - 1);
  }

  gotoFirstPage() {
    this.gotoPage(1);
  }

  gotoLastPage() {
    this.gotoPage(this.props.infos.totalPages);
  }

  handleClickGotoPage(e) {
    e.preventDefault();
    console.log(e.target.className);
    var accepted = ['gotoFirstPage',
      'gotoPreviousPage',
      'gotoNextPage',
      'gotoLastPage'];
    if (accepted.indexOf(e.target.className) > -1) {
      this[e.target.className]();
    }
  }

  render() {
    var infos = this.props.infos;
    console.log('infos', infos);
    if (infos.totalPages > 1) {
      var pages, currentPage;
      var firstPage,
        previousPage,
        nextPage,
        lastPage;
      if (infos.page < infos.totalPages) {
        nextPage = (
          <li className="next">
            <a href="#" title="first page" onClick={this.handleClickGotoPage} className="gotoNextPage">
              <span aria-hidden="true">&rarr;</span>
            </a>
          </li>
        );
      }
      return (
        <nav>
          <ul className="pager">
					  {nextPage}
          </ul>
        </nav>
      );
    }
    else {
      return (
        <p></p>
      );
    }
  }
}