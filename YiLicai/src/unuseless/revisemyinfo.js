import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class ChangeMyInfo extends Component {
  _onBack(){
    this.props.navigator.pop()
  }
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._onBack.bind(this)}>修改个人信息,到这里已经没有Tabbar了，点击返回</Text>
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
  },
  
});
