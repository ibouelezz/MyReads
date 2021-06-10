import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

import Home from "./Home";
import Search from "./Search";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = JSON.parse(window.localStorage.getItem("state")) || {
      currentlyReading: [],
      wantToRead: [],
      read: [],
    };
  }

  componentDidUpdate() {
    window.localStorage.setItem("state", JSON.stringify(this.state));
  }

  componentDidMount() {
    if (localStorage.getItem("state") !== null) return;
    BooksAPI.getAll().then((res) => {
      console.log(res);

      res.map((book) => {
        var item = {
          id: book.id,
          imageLinks: { thumbnail: book.imageLinks.thumbnail },
          title: book.title,
          authors: book.authors,
          shelf: book.shelf,
        };
        var joined = this.state[book.shelf].concat(item);

        return this.setState({ [book.shelf]: joined });
      });
    });
    // window.localStorage.setItem("state", JSON.stringify(this.state));
  }

  handleChange = (e, id) => {
    e.persist();
    const optionSelected = e.target.value;

    if (optionSelected === "none") {
      var filtered = Object.keys(this.state).map((shelf) => {
        return this.state[shelf].filter((book) => {
          return book.id !== id;
        });
      });

      console.log(filtered);
      this.setState({ currentlyReading: filtered[0] });
      this.setState({ wantToRead: filtered[1] });
      this.setState({ read: filtered[2] });

      return;
    }

    BooksAPI.get(id).then((res) => {
      console.log(res);

      const new_item = {
        id: res.id,
        imageLinks: { thumbnail: res.imageLinks.thumbnail },
        title: res.title,
        authors: res.authors,
      };

      // filter the list
      var filtered = Object.keys(this.state).map((shelf) => {
        return this.state[shelf].filter((book) => {
          return book.id !== id;
        });
      });

      console.log(filtered);
      this.setState({ currentlyReading: filtered[0] });
      this.setState({ wantToRead: filtered[1] });
      this.setState({ read: filtered[2] });

      var joined = this.state[optionSelected].concat(new_item);
      console.log("state before", this.state);
      this.setState({ [optionSelected]: joined });
      console.log("state after", this.state);

      // window.localStorage.setItem("state", JSON.stringify(this.state));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Home books={this.state} handleChange={this.handleChange} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search books={this.state} handleChange={this.handleChange} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
