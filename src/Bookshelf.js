import React, { Component } from "react";
import Book from "./Book";

class Bookshelf extends Component {
  handleChange = (e) => {
    console.log("Bookshelf hanlde, " + e.target);
  };

  render() {
    const { shelfTitle, currentShelf, books, handleChange } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books &&
              books.map((book) => {
                return (
                  <Book
                    key={book.id}
                    id={book.id}
                    currentShelf={currentShelf}
                    backgroundImage={book.imageLinks.thumbnail}
                    title={book.title}
                    authors={book.authors}
                    handleChange={handleChange}
                  />
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Bookshelf;
