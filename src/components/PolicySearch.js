import React, { Component } from 'react'

import PolicySearchForm from './PolicySearchForm'
import PolicySearchResults from './PolicySearchResults'

class PolicySearch extends Component {

    state = {
        searchCriteria: null
    }

    render() {

        const { searchCriteria } = this.state

        return (
            <div className="pa4 black-80">
                <PolicySearchForm onSubmit={this._executeSearch} />

                {
                    searchCriteria 
                        ? <PolicySearchResults searchCriteria={searchCriteria} /> 
                        : <span/>
                }
                
            </div>
        )
    }

    _executeSearch = (values) => {
        console.log(values)
        this.setState({ searchCriteria: { ...values } })
    }
}

export default PolicySearch