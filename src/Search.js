import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

import Book from "./Book";

class Search extends Component {
  state = {
    query: "",
    results: [],
  };

  handleSearch = (e) => {
    this.setState({ query: e.target.value });

    if (e.target.value !== "") {
      BooksAPI.search(e.target.value).then((res) => {
        console.log(res);
        if (res.length > 0) {
          this.setState(() => ({
            results: res,
          }));
        } else {
          this.setState({ results: [] });
        }
      });
    } else {
      this.setState({ results: [] });
    }
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.query}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book) => {
              var currentShelf;
              for (let i = 0; i < Object.keys(this.props.books).length; i++) {
                // CATEGORY: Object.keys(this.props.books)[i]
                // console.log(Object.keys(this.props.books)[i]);
                for (
                  let j = 0;
                  j < this.props.books[Object.keys(this.props.books)[i]].length;
                  j++
                ) {
                  if (
                    book.id ===
                    this.props.books[Object.keys(this.props.books)[i]][j].id
                  )
                    currentShelf = Object.keys(this.props.books)[i];
                }
              }

              return (
                <Book
                  key={book.id}
                  id={book.id}
                  backgroundImage={book.imageLinks.thumbnail}
                  title={book.title}
                  authors={book.authors}
                  handleChange={this.props.handleChange}
                  currentShelf={currentShelf}
                />
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
