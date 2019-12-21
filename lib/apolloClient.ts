import fetch from 'node-fetch'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

//apollo link packages
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

//HELPERS
import AuthService from '~lib/authService'

//ENV VARIABLES
import { GRAPHQL_URL } from 'react-native-dotenv'
//
//
//
//
//

//handling apollo errors
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = AuthService.getToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  fetch: fetch,
  credentials: 'same-origin',
})

const cache = new InMemoryCache()

//merger all apollo links
const link = ApolloLink.from([errorLink, authLink, httpLink])

//main apollo client
const apollo = new ApolloClient({
  ssrMode: !process.browser,
  link,
  cache,
  resolvers: {
    //state resolvers
    Mutation: {
      saveLoggedUser: (_, { user }, { cache }) => {
        const data = {
          isUserAuth: true,
          loggedUser: {
            __typename: 'LoggedUser',
            ...user,
          },
        }
        console.log('state resolver')
        cache.writeData({ data })
        return null
      },
    },
  },
})

//default state
cache.writeData({
  data: {
    isUserAuth: false,
    loggedUser: {
      __typename: 'LoggedUser',
      name: null,
      email: null,
      avatarSrc: null,
      country: null,
    },
  },
})

export default apollo
