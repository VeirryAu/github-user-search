import React from 'react'
import {
  StatusBar,
  View,
  StyleSheet,
  Platform
} from 'react-native'
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation'
import color from 'theme/color'
import Home from 'screens/Home'

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const AppNavigator = createSwitchNavigator(
  {
    Home
  },
  {
    initialRouteName: 'Home'
  }
)

const AppContainer = createAppContainer(AppNavigator)

class Routes extends React.Component {
  render () {
    return (
      <View
        style={styles.container}
      >
        <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'} backgroundColor={color.primaryColor} />
        <AppContainer
          ref={(nav) => {
            this.navigator = nav
          }}
        />
      </View>
    )
  }
}

export default Routes
