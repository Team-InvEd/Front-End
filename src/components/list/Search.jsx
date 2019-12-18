import React, { Component } from "react";
import { AiOutlineSearch } from "react-icons/ai";
export default class Search extends Component {
  render() {
    return (
      <div>
        <br />
        <AiOutlineSearch />{" "}
        <input
          type="text"
          name="searchbar"
          placeholder="Search funds..."
          autoFocus={true}
          onChange={e => this.props.search(e)}
          className="searchFunds"
        />
      </div>
    );
  }
}
