import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  Platform,
} from 'react-native';

import Launch from './Main/Launch';
import Main from './Main/YLCMain';

const defaultRoute = {
  component: Main,
};

export default class NavIndex extends Component {
  _renderScene(route, navigator) {
    let Component = route.component;
    return (
      <Component {...route.params} navigator={navigator} />
    );
  }
  render() {
    return (
      <Navigator
        initialRoute={defaultRoute}
        renderScene={this._renderScene}
        
        />
    );
  }
}
