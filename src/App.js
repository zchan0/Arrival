import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Message } from 'element-react';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends Component {
  state = {
    books: []
  }

  changeShelf = (bookId, shelf) => {
    let oldShelf;
    let books = this.state.books.map(book => {
      if (book.id === bookId) {
        oldShelf = book.shelf;
        book.shelf = shelf;
      }
      return book;
    });

    // for better user experience, update UI first, and then call API
    this.setState({ books });
    BooksAPI.update(bookId, shelf).then(() => {
      Message.success('Updated success');
    })
    .catch(e => {
      Message.error('Failed to update');
      console.log('error: failed to update due to ' + e);

      books = books.map(book => {
        if (book.id === bookId) book.shelf = oldShelf;
        return book;
      });
      this.setState({ books });
    });
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks allBooks={this.state.books} onChangeShelf={this.changeShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default BooksApp
