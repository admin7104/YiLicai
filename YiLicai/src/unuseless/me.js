import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MyInfo from './revisemyinfo';

export default class Me extends Component {
  _onPage(){
    this.props.navigator.push({
      component: MyInfo,
    })
  }
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.textStyle} onPress={this._onPage.bind(this)}>
            这是TabbarItem的页面,{'\n'}可以当成个人信息页面来使用！{'\n'}点击文字跳转到下一个页面!
          </Text>
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
  textStyle: {
    color: 'red',
    backgroundColor: 'yellow',
  }
  
});
