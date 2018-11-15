import React from 'react'
import { YellowBox } from 'react-native'
import MoviesTabNavigator from './navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './store/configureStore'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'])

export default class App extends React.Component {
  render() {
    return (
        <Provider store={Store}>
            <MoviesTabNavigator />
        </Provider>
    )
  }
}
