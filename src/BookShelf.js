import React, { Component } from 'react'

class BookShelf extends Component {
  render() {
    const {shelfName, books, onChangeShelf} = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => {
              return (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                      <div className="book-shelf-changer">
                        <select value={book.shelf || 'none'} onChange={(e) => { onChangeShelf(book, e.target.value); }}>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    {book.title && (
                      <div className="book-title">{book.title + (book.subtitle ? `: ${book.subtitle}` : '')}</div>
                    )}
                    {book.authors && (
                      <div className="book-authors">{book.authors.toString()}</div>
                    )}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
