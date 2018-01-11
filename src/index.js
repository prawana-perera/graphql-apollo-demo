import React from 'react'
import ReactDOM from 'react-dom'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import './styles/index.css'
import reducer from './reducers'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'

const API_ENDPOINT = process.env.API_ENDPOINT || 'http://localhost:4000/graphql'
const httpLink = new HttpLink({
    uri: API_ENDPOINT
})

const client = new ApolloClient({
    link: httpLink, 
    cache: new InMemoryCache()
})

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

ReactDOM.render(
    <ApolloProvider store={store} client={client}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ApolloProvider>, document.getElementById('root'))

registerServiceWorker()