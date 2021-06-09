import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

import Book from "./Book";

class Search extends Component {
  state = {
    query: "",
    // results: [
    //   {
    //     imageLinks: { thumbnail: "" },
    //     title: "React",
    //     authors: "Me",
    //   },
    // ],
    results: [],
  };

  handleSearch = (e) => {
    // console.log(e.target.value);
    this.setState({ query: e.target.value });

    if (e.target.value !== "") {
      BooksAPI.search(e.target.value).then((res) => {
        console.log(res);
        if (res.length > 0) {
          this.setState(() => ({
            results: res,
          }));
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
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
              // Object.keys(this.props.books).map((shelf) => {
              //   this.props.books[shelf].filter((b) => {
              //     book.id === b.id;
              //   });
              // });

              var currentShelf;
              for (let i = 0; i < Object.keys(this.props.books).length; i++) {
                // CATEGORY: Object.keys(this.props.books)[i]
                // console.log(Object.keys(this.props.books)[i]);
                // console.log(this.props.books[Object.keys(this.props.books)[i]]);
                for (
                  let j = 0;
                  j < this.props.books[Object.keys(this.props.books)[i]].length;
                  j++
                ) {
                  // console.log(this.props.books[Object.keys(this.props.books)[i]][j].id);
                  if (
                    book.id ===
                    this.props.books[Object.keys(this.props.books)[i]][j].id
                  )
                    currentShelf = Object.keys(this.props.books)[i];
                  // console.log("Book id: ", book.id);
                  // console.log(
                  //   this.props.books[Object.keys(this.props.books)[i]].length
                  // );
                }
              }

              // console.log(shelf);

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
