import React from 'react';

import Spinner from '../common/Spinner.js';

export default class ReposPaginator extends React.Component {

  static propTypes = {
    infos: React.PropTypes.object.isRequired,
    reposGotoPage: React.PropTypes.func.isRequired,
    fetching: React.PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.gotoPage = this.gotoPage.bind(this);
    this.gotoNextPage = this.gotoNextPage.bind(this);
    this.gotoPreviousPage = this.gotoPreviousPage.bind(this);
    this.gotoFirstPage = this.gotoFirstPage.bind(this);
    this.gotoLastPage = this.gotoLastPage.bind(this);
    this.getClickGotoPageHandler = this.getClickGotoPageHandler.bind(this);
  }

  getClickGotoPageHandler(methodName) {
    return function gotoPageHandler(e) {
      e.preventDefault();
      this[methodName]();
    }.bind(this);
  }

  gotoPage(pageNum) {
    this.props.reposGotoPage(pageNum);
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

  render() {
    const { infos, fetching } = this.props;
    if (infos.totalPages > 1) {
      let firstPage;
      let previousPage;
      let nextPage;
      let lastPage;
      if (infos.page > 1) {
        firstPage = (
          <li className="previous">
            <a href="#" title="First page" onClick={this.getClickGotoPageHandler('gotoFirstPage')}>
              <span aria-hidden="true">&larr;&larr;</span>
            </a>
          </li>
        );
      }
      if (infos.page > 2) {
        previousPage = (
          <li className="previous">
            <a href="#" title="Previous page" onClick={this.getClickGotoPageHandler('gotoPreviousPage')}>
              <span aria-hidden="true">&larr;</span>
            </a>
          </li>
        );
      }
      if (infos.page < (infos.totalPages - 1) ) {
        nextPage = (
          <li className="next">
            <a href="#" title="Next page" onClick={this.getClickGotoPageHandler('gotoNextPage')}>
              <span aria-hidden="true">&rarr;</span>
            </a>
          </li>
        );
      }
      if (infos.page <= (infos.totalPages - 1) ) {
        lastPage = (
          <li className="next">
            <a href="#" title="Last page" onClick={this.getClickGotoPageHandler('gotoLastPage')}>
              <span aria-hidden="true">&rarr;&rarr;</span>
            </a>
          </li>
        );
      }
      return (
        <div className="repos-paginator">
          <Spinner fetching={fetching}/>
          <nav>
            <ul className="pager">
              {firstPage}
              {previousPage}
              {lastPage}
              {nextPage}
            </ul>
          </nav>
        </div>
      );
    }
    return (
      <p></p>
    );
  }
}
