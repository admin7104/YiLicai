/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TabbarView from './tabbar';


export default class LogInView extends Component {
  _onPage(){
    this.props.navigator.push({
      component:TabbarView,
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._onPage.bind(this)} style={styles.textStyle}>登录</Text> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

