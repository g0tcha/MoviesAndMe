import React from 'react'
import SearchStackNavigator from './navigation/Navigation'
import { Provider } from 'react-redux'
import Store from './store/configureStore'

export default class App extends React.Component {
  render() {
    return (
        <Provider store={Store}>
            <SearchStackNavigator />
        </Provider>
    )
  }
}
