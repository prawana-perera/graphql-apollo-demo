import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import lodash from 'lodash'

import PolicySummary from './PolicySummary'

class PolicySearchResults extends Component {

    state = { page: 1 }

    handleNext = () => {
        const nextPage = this.state.page + 1

        this.props
            .loadPage(nextPage)
            .then(() => {
                this.setState(({ page }) => ({ page: nextPage }))
            })
    }

    handlePrevious = () => {
        const prevPage = this.state.page - 1

        this.props
            .loadPage(prevPage)
            .then(() => {
                this.setState(({ page }) => ({ page: prevPage }))
            })
    }

    render() {

        const { loading, error, policies, meta } = this.props

        if(loading){
            return (<div>Loading...</div>)
        }

        if(error){
            return (<div>{`Errors: ${error}`}</div>)
        }

        return (
            <div>
                <h3 className="f3 lh-copy">Search Results</h3> 
                <blockquote>{`Page ${meta.page} of ${meta.totalPages}`} (Total results: {meta.totalRecords})</blockquote>
                <div>
                    {policies.map(policy => (
                        <PolicySummary key={policy.id} policy={policy} />
                    ))}
                </div>
                <div className="mt3">
                    {
                        meta.page > 1 
                            ? (<button className="f6 link dim br1 ba bw2 ph3 pv2 mb2 dib mid-gray" onClick={this.handlePrevious}>&lt;&lt;&lt; Previous</button>)
                            : (<span></span>)
                    }
                    {
                        meta.page < meta.totalPages
                            ? (<button className="f6 link dim br1 ba bw2 ph3 pv2 mb2 dib mid-gray" onClick={this.handleNext}>Next &gt;&gt;&gt;</button>)
                            : (<span></span>)
                    }
                </div>
            </div>
            
        )

    }
}

const POLICIES_QUERY = gql`
    query (
        $policyType: PolicyType!
        $whoIsCovered: CategoryOfCover!
        $stateOfResidence: AustralianStates!
        $page: Int!
        $maxMonthlyPremium: Float
        $hospitalInclusions: [HospitalInclusions]
        $extrasInclusions: [ExtrasInclusions]
    ) {
        search(
            policyType: $policyType
            categoryOfCover: $whoIsCovered
            state: $stateOfResidence
            maxMonthlyPremium: $maxMonthlyPremium
            hospitalInclusions: $hospitalInclusions
            extrasInclusions: $extrasInclusions
            page: $page
            pageSize: 3
        ) {
            policies {
                id
                fundName
                policyName
                monthlyPremium
            }
            meta {
                page
                pageSize
                totalPages
                totalRecords
            }
        }
    }
`

const mapPropsToOptions = ({ searchCriteria }) => {
    return {
        notifyOnNetworkStatusChange: true,
        variables: {
            policyType: searchCriteria.policyType,
            whoIsCovered: searchCriteria.whoIsCovered,
            stateOfResidence: searchCriteria.stateOfResidence,
            maxMonthlyPremium: searchCriteria.maxMonthlyPremium,
            hospitalInclusions: searchCriteria.hospitalInclusions ? searchCriteria.hospitalInclusions : [],
            extrasInclusions: searchCriteria.extrasInclusions ? searchCriteria.extrasInclusions : [],
            page: 1
        }
    }
}

const mapResultsToProps = ({ data }) => {
    console.dir(data)
    return {
        // https://github.com/apollographql/react-apollo/issues/1385
        loading: data.loading,
        error: data.error,
        policies: data.search ? data.search.policies : [],
        meta: data.search? data.search.meta : {},
        loadPage: (page) => data.fetchMore({
            variables: { page },
            updateQuery: (previousResult, { fetchMoreResult }) => lodash.merge({}, previousResult, fetchMoreResult)
        })   
    }
}

export default graphql(
    POLICIES_QUERY, {
        props: mapResultsToProps,
        options: mapPropsToOptions
    }
)(PolicySearchResults)