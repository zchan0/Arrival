import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Loading } from 'element-react';
import BookShelf from './BookShelf';
import 'element-theme-default';

class ListBooks extends Component {
  render() {
    const {allBooks, onChangeShelf} = this.props;

    if (!allBooks.length)
      return (<Loading fullscreen={true} />);

    const currentlyReading = allBooks.filter( book => book.shelf === 'currentlyReading' );
    const wantToRead = allBooks.filter( book => book.shelf === 'wantToRead' );
    const read = allBooks.filter( book => book.shelf === 'read' );

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf shelfName={'Currently Reading'} books={currentlyReading} onChangeShelf={onChangeShelf} />
          <BookShelf shelfName={'Wants to Read'} books={wantToRead} onChangeShelf={onChangeShelf} />
          <BookShelf shelfName={'Read'} books={read} onChangeShelf={onChangeShelf} />
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
