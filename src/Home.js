import React, { Component } from "react";
import { Link } from "react-router-dom";

import Bookshelf from "./Bookshelf";

class Home extends Component {
  render() {
    const { books, handleChange } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              key="currentlyReading"
              shelfTitle="Currently Reading"
              books={books.currentlyReading}
              handleChange={handleChange}
            />
            <Bookshelf
              key="wantToRead"
              shelfTitle="Want to Read"
              books={books.wantToRead}
              handleChange={handleChange}
            />
            <Bookshelf
              key="read"
              shelfTitle="Read"
              books={books.read}
              handleChange={handleChange}
            />
          </div>
        </div>
        <Link className="open-search" to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    );
  }
}

export default Home;
