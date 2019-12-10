import React from "react";

export default class Donate extends React.Component {
  render() {
    return (
      <React.Fragment>
        Search a fund for donating <br />
        <br />
        <input type="text" name="searchbar" placeholder="Search" />
      </React.Fragment>
    );
  }
}
