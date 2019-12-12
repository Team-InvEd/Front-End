import React from "react";
import axios from "axios";

export default class Donate extends React.Component {
  componentDidMount = async () => {
    try {
      const theMessage = await axios.get("http://localhost:5000/donate");
      console.log(theMessage);
    } catch (err) {
      console.log(err);
    }
  };
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
