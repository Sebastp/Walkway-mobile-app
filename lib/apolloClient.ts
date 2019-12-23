import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'

//apollo link packages
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'

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

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
  credentials: 'same-origin',
})

const cache = new InMemoryCache()

//merger all apollo links
const link = ApolloLink.from([errorLink, httpLink])

//main apollo client
const apollo = new ApolloClient({
  link,
  cache,
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
