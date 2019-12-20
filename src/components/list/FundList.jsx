import React from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { AiOutlineSafety } from "react-icons/ai";
import Logo2 from "../../graphics/leaf1.png";

export default class FundList extends React.Component {
  goToDonate = id => {
    if (this.props.user) {
      this.props.history.push(`/donate/${id}`);
    } else {
      this.props.history.push("/log-in");
      this.props.locate("/donate");
    }
  };

  componentDidMount = () => {};
  showFunds = () => {
    console.log(this.props.filtered)
    if (this.props.filtered.length) {
      return this.props.filtered.map((res, i) => (
        <div
          className="card bg-light mb-3 wrapFund"
          style={{ margin: "20px", width: "400px" }}
          key={i}
        >
          <div className="card-header">
            <Link style={{color: "black", fontWeight: "bold"}} to={"/fund/" + res._id}>{res.title}</Link>
          </div>
          <div className="card-body">
            <h5 className="card-title">
              {res.userId.name}{" "}
              <span className="cash">${Math.formatNum(res.amount)}</span>
            </h5>
            <span className="card-text">{res.description}</span> <br />
            <br />
            <button className="create" onClick={() => this.goToDonate(res._id)}>
              <AiOutlineSafety /> Donate
            </button>
          </div>
        </div>
      ));
    }
  };
  goToForm = () => {
    if (this.props.user) {
      this.props.history.push("/calculate");
    } else {
      this.props.history.push("/log-in");
      this.props.locate("/calculate");
    }
  };
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            align: "0 auto",
            marginTop: "70px"
          }}
        >
          <div
            style={{
              marginBottom: "25px"
            }}
          >
            <Search search={this.props.updateSearch} />
          </div>
          <div>
            <button onClick={this.goToForm} style={{marginRight: "30px", marginTop: "20px"}}className="btn create">
              <img src={Logo2} className="logo2" />
              Create a new Fund
            </button>
          </div>
        </div>
        <div className="fundBox">
          {/* <div
            style={{
              display: "flex",
              flexDirection: "row",
              align: "0 auto",
              height: "30%"
            }}
          >
            <div
              style={{
                marginBottom: "25px",
                height: "30%"
              }}
            >
              <Search search={this.props.updateSearch} />
            </div>
            <div
              style={{
                height: "30%"
              }}
            >
              <button onClick={this.goToForm} className="btn create">
                <img src={Logo2} className="logo2" />
                Create a new Fund
              </button>
            </div>
          </div> */}
          <div className="fundListBox">{this.showFunds()}</div>
        </div>
      </React.Fragment>
    );
  }
}

/*


<div style={{ display: "flex", justifyContent: "center" }}>
          <div></div>
          <div
            style={{ align: "0 auto", display: "flex", flexDirection: "row" }}
          >
            {" "}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              align: "0 auto !important"
            }}
          >
            
          </div>
        </div>
      </React.Fragment>


*/
