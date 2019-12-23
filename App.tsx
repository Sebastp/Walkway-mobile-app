import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ApolloProvider } from '@apollo/react-hooks'

//HELPERS
// import apollo from '~lib/apolloClient'
import apollo from './lib/apolloClient'

export default function App() {
  return (
    <ApolloProvider client={apollo}>
      <View style={styles.container}>
        <Text style={styles.text}>To możesz</Text>
      </View>
    </ApolloProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
})
