import React, { Component } from 'react';
import axios from "axios"




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
                Create Component
            </div>
        )
    }
}
