import React from 'react'
import { Header } from 'native-base'
import {
  StyleSheet,
  View
} from 'react-native'
import color from 'theme/color'
import Search from './Search'
import ListContent from './ListContent'

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingTop: 10,
    backgroundColor: color.primaryColor
  }
})

const Container = () => {
  return (
    <View style={styles.container}>
      <Header
        androidStatusBarColor={color.darkPrimaryColor}
        style={styles.header}
      >
        <Search />
      </Header>
      <ListContent />
    </View>
  )
}

export default Container
