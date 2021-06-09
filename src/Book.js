import React, { Component } from "react";

class Book extends Component {
  state = {
    selectedOption: "none",
  };

  render() {
    const {
      id,
      backgroundImage,
      title,
      authors,
      handleChange,
      currentShelf,
    } = this.props;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${backgroundImage})`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={currentShelf || "none"}
                onChange={(e) => handleChange(e, id)}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">
            {authors && authors.length > 1 ? authors.join(", ") : authors}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
