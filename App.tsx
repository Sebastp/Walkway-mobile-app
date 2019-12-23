import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'

//HELPERS
import apollo from '~lib/apolloClient'

export default function App() {
  return (
    <ApolloProvider client={apollo}>
      <View style={styles.container}>
        <Text>Open up App. to start working on your app!</Text>
      </View>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
