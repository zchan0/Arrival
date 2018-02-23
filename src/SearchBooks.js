import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from 'element-react';
import 'element-theme-default';

import BookShelf from './BookShelf';
import * as BooksAPI from './BooksAPI';

class SearchBooks extends Component {
  state = {
    results: [],
    onLoading: false
  }

  onChangeQuery = (e) => {
    const query = e.target.value;

    // query is empty, reset
    if (!query.length) {
      this.setState({
        results: [],
        onLoading: false
      });
      return;
    }

    this.setState({ onLoading: true });

    BooksAPI.search(query).then(results => {
      this.setState({ onLoading: false });
      if (!results.error) {
        this.setState({ results });
      }
    });
  }

  render() {
    const { onChangeShelf } = this.props;
    const { results, onLoading } = this.state;

    return (
      <div>
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" name="query" onChange={this.onChangeQuery} placeholder="Search by title or author"></input>
          </div>
        </div>

        {onLoading && (
          <div className="search-books-results"><Loading /></div>
        )}

        {!onLoading && results.length && (
          <div className="search-books-results">
            <BookShelf shelfName={'Results'} books={results} onChangeShelf={onChangeShelf} />
          </div>
        )}
      </div>
    )
  }
}

export default SearchBooks
