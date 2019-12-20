import React, { Component } from "react";
// import { IoMdArrowRoundForward } from "react-icons/fa";
import { AiOutlineSafety } from "react-icons/ai";
import {
  FacebookShareButton,
  FacebookIcon,
  FacebookShareCount,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from 'react-share';

export default class Fund extends Component {
  state = {
    theID: this.props.match.params.id,
    theCounter: 0
  };

  goToForm = id => {
    if (this.props.user) {
      this.props.history.push(`/donate/${id}`);
    } else {
      this.props.history.push("/log-in");
      this.props.locate(`/donate/${id}`);
    }
  };

  showDonations = () => {
    let theTransactions = this.props.transactions.filter(
      eachT => eachT.fundId === this.props.match.params.id
    );

    console.log(this.props.transactions);
    // let theUsers = this.props.users.find(
    //   eachU => eachU._id === theTransactions.userId
    // )

    // console.log(theUsers)
    

    return theTransactions.map((res, i) => (
      <div key={i}>
        <span className="cash">${res.amount} </span> from {res.userId.name}
        <br />
        {res.comment}
        <hr />
      </div>
    ))
  };

  showTotal = ()=> {
    let theTransactions = this.props.transactions.filter(
      eachT => eachT.fundId === this.props.match.params.id
    );

    let counter = 0;

    theTransactions.map((res, i) => (
     counter+=res.amount
    ))

    return counter
  }

  render() {
    let theFund = this.props.theFunds.find(
      theFund => theFund._id === this.state.theID
    );

    if (theFund) {
      return (
        <div className="fund-page">
        <div className="fundRight">
        <h2 style={{fontWeight: "bold"}}>{theFund.title}</h2> <br />
        <img
            src={theFund.imageUrl}
            alt=""
            className="fundImg"
          /><br />
          {theFund.description} 
        </div>
        <div className="fundLeft">
          {/* <h5>Goal Amount</h5><br /> */}
          <span classname="cash">${this.showTotal()} raised for </span><span className="cash2"> ${Math.formatNum(theFund.amount)} Goal</span> <br />
          
          <button className="create" onClick={() => this.goToForm(this.state.theID)}>
            <AiOutlineSafety  /> Donate
          </button> <br/><br/>
          <div className="social-icons">
          <FacebookShareButton  style={{display: "flex", justifyContent: "center", width:"50px"}} url={`/fund/${this.state.theID}`}><FacebookIcon size={50}/></FacebookShareButton>
          <LinkedinShareButton style={{display: "flex", justifyContent: "center", width:"50px"}} url={`/fund/${this.state.theID}`}><LinkedinIcon size={50}/></LinkedinShareButton>
          <TwitterShareButton style={{display: "flex", justifyContent: "center", width:"50px"}} url={`/fund/${this.state.theID}`}><TwitterIcon size={50}/></TwitterShareButton>
          <EmailShareButton style={{display: "flex", justifyContent: "center", width:"50px"}} url={`/fund/${this.state.theID}`}><EmailIcon size={50}/></EmailShareButton>
          </div>
          <br />

          Donations: {this.showDonations()}
          </div>
        </div>
      );
    } else {
      return <div>No data.</div>;
    }
  }
}
