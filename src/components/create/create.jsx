import React, { Component } from 'react';
// import axios from "axios"




export default class create extends Component {
    
    state = {
        avgPubCost: 100,
        interestRate: .05,
        yearsTillCollege: 5
    }
    
    componentDidMount() {
        // this.findCosts()
        this.futureCost()
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
    

    futureCost = () => {
        let cost = this.state.avgPubCost*(1+this.state.interestRate)**this.state.yearsTillCollege
        console.log(cost)
    }
        
    render() {
    return (
      <div>
        <form>
          Who are you raising money for?{" "}
          <select>
            <option>Dropdown </option>
          </select>
          <br />
          <input type="text" placeholder="Name" /> <br />
          <br />
          <input type="number" placeholder="Current Age" />
          <br />
          <br />
          <input type="number" placeholder="College Admittance Age" />
          <br />
          <br />
          <select>
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
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
