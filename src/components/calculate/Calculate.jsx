import React, { Component } from "react";
import axios from "axios"
// import states from "./states.json";
// import outstates from "./out-states.json";
import Graph from "./Graph.jsx";

// import { Link } from "react-router-dom";




export default class Calculate extends Component {
  state = {
    avgPrivPrice: 35676,
    interestRate: 0.05,
    currentAge: 0,
    collegeAdmittanceAge: 0,
    yearsTillCollege: 0,
    inStatePrice: 10920,
    outStatePrice: 25550,
    theInStates: null,
    theOutStates: null,
    futureInStateCost: 0,
    futureOutStateCost: 0,
    futurePrivCost: 0,
    showResults: false
  };

  componentWillMount = async () => {
    // this.findCosts()
    // this.futureCost()
    try {
    const InStatesData = await axios.get('http://localhost:5000/api/states')
    this.setState({
      theInStates: InStatesData.data
    })
    } catch (err) {
      console.log(err)
    }

    try{
    const outStatesData = await axios.get('http://localhost:5000/api/out-states')
    this.setState({
      theOutStates: outStatesData.data
    })
    } catch (err) {
      console.log(err)
    }
  }
  
  // findCosts = () => {
  //     let data = [];

  //     for (let i=0; i < 100; i++) {
  //         axios.get(`https://api.data.gov/ed/collegescorecard/v1/schools.json?page=${i}&school.state=FL&school.ownership=1&fields=latest.cost.tuition.in_state&api_key=VfotcpsOXcxUXKKatu87vem6Ra86e6urKCZJulIf`)
  //         .then(res=>{
  //             res.data.results.map(x => {
  //                 data.push(x)

  //             })
  //         });
  //     }
  //     console.log(data)
  // }

  updateCurrentAge = e => {
    this.setState(
      {
        currentAge: Number(e.target.value)
      },
      () => {
        this.updateYearsTillCollege();
      }
    );
  };

  updateCollegeAdmittanceAge = e => {
    this.setState(
      {
        collegeAdmittanceAge: Number(e.target.value)
      },
      () => {
        this.updateYearsTillCollege();
      }
    );
  };

  updateYearsTillCollege = () => {
    this.setState({
      yearsTillCollege: this.state.collegeAdmittanceAge - this.state.currentAge
    });
  };

  updateTheState = e => {
    let inStates = { ...this.state.theInStates };
    let outStates = { ...this.state.theOutStates };
    let value = e.target.value;
    // console.log(value)
    for (let state in inStates && outStates) {
      if (state === value) {
        this.setState({
          inStatePrice: inStates[state],
          outStatePrice: outStates[state]
        });
      }
    }
  };

  futureCost = e => {
    e.preventDefault();
    if (!this.state.showResults)
      this.setState({ showResults: !this.state.showResults });
    if (this.state.yearsTillCollege) {
      let inCost =
        4 *
        (this.state.inStatePrice *
          (1 + this.state.interestRate) ** this.state.yearsTillCollege);
      let outCost =
        4 *
        (this.state.outStatePrice *
          (1 + this.state.interestRate) ** this.state.yearsTillCollege);
      let privCost =
        4 *
        (this.state.avgPrivPrice *
          (1 + this.state.interestRate) ** this.state.yearsTillCollege);
      return this.setState({
        futureInStateCost: Number(inCost.toFixed(0)),
        futurePrivCost: Number(privCost.toFixed(0)),
        futureOutStateCost: Number(outCost.toFixed(0))
      });
    } else {
      let inCost = 4 * this.state.inStatePrice;
      let outCost = 4 * this.state.outStatePrice;
      let privCost = 4 * this.state.avgPrivPrice;
      return this.setState({
        futureInStateCost: Number(inCost.toFixed(0)),
        futurePrivCost: Number(privCost.toFixed(0)),
        futureOutStateCost: Number(outCost.toFixed(0))
      });
    }
  };
  goToForm = () => {
    if (this.props.user) {
      this.props.history.push("/form");
    } else {
      this.props.history.push("/log-in");
      this.props.locate("/form");
    }
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <form onSubmit={this.futureCost}>
          {/* Who are you raising money for?{" "}
          <select>
            <option>Yourself</option>
            <option>Your Child</option>
            <option>Someone Else</option>
          </select> */}
          {/* <br />
          <label>Recipient Name: </label>
          <input type="text" placeholder="Name" /> <br /> */}
          Future Cost of Secondary Education
          <br />
          <br />
          <label>Current Age: </label>
          <input
            type="number"
            placeholder="1"
            onChange={this.updateCurrentAge}
          />
          <br />
          <br />
          <label>Admittance Age: </label>
          <input
            type="number"
            placeholder="18"
            onChange={this.updateCollegeAdmittanceAge}
          />
          <br />
          <br />
          <label>Admittance State: </label>
          <select onChange={this.updateTheState}>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
            <option value="AR">AR</option>
            <option value="AZ">AZ</option>
            <option value="CA">CA</option>
            <option value="CO">CO</option>
            <option value="CT">CT</option>
            <option value="DC">DC</option>
            <option value="DE">DE</option>
            <option value="FL">FL</option>
            <option value="GA">GA</option>
            <option value="HI">HI</option>
            <option value="IA">IA</option>
            <option value="ID">ID</option>
            <option value="IL">IL</option>
            <option value="IN">IN</option>
            <option value="KS">KS</option>
            <option value="KY">KY</option>
            <option value="LA">LA</option>
            <option value="MA">MA</option>
            <option value="MD">MD</option>
            <option value="ME">ME</option>
            <option value="MI">MI</option>
            <option value="MN">MN</option>
            <option value="MO">MO</option>
            <option value="MS">MS</option>
            <option value="MT">MT</option>
            <option value="NC">NC</option>
            <option value="NE">NE</option>
            <option value="NH">NH</option>
            <option value="NJ">NJ</option>
            <option value="NM">NM</option>
            <option value="NV">NV</option>
            <option value="NY">NY</option>
            <option value="ND">ND</option>
            <option value="OH">OH</option>
            <option value="OK">OK</option>
            <option value="OR">OR</option>
            <option value="PA">PA</option>
            <option value="RI">RI</option>
            <option value="SC">SC</option>
            <option value="SD">SD</option>
            <option value="TN">TN</option>
            <option value="TX">TX</option>
            <option value="UT">UT</option>
            <option value="VT">VT</option>
            <option value="VA">VA</option>
            <option value="WA">WA</option>
            <option value="WI">WI</option>
            <option value="WV">WV</option>
            <option value="WY">WY</option>
          </select>{" "}
          <br />
          <button>Calculate</button>
        </form>
        {this.state.showResults ? (
          <div>
            Future In State College Cost: {this.state.futureInStateCost} <br />
            Future Out of State College Cost: {
              this.state.futureOutStateCost
            }{" "}
            <br />
            Future Private College Cost: {this.state.futurePrivCost} <br />{" "}
            <br />
            <Graph data={this.state}/>
            <button onClick={this.goToForm}>Start your InvEd Fund</button>
          </div>
        ) : null}
      </div>
    );
  }
}
