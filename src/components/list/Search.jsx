import React, { Component } from 'react'

export default class Search extends Component {
    render() {
        return (
            <div>
            Search a fund for donating <br />
            <br />
            <input type="text" name="searchbar" placeholder="Search" autoFocus={true} onChange={e=> this.props.search(e)} />
            </div>
        )
    }
}
