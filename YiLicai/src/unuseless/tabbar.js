import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import MeView from './me';


export default class TabMain extends Component{
  constructor(props) {  
    super(props);  
    this.state = {selectedTab: '通知'}  
}  
  
  render() {
    return (
    <View style={styles.container}>
        <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
          <TabNavigator.Item  
            selected={this.state.selectedTab === '通知'}  
            title='通知'
            renderIcon={() => <Image style={styles.tabIcon} />}  
            renderSelectedIcon={() => <Image style={styles.tabIcon} />}  
            onPress={() => this.setState({ selectedTab: '通知' })}>  
            <MeView navigator={this.props.navigator}/>
          </TabNavigator.Item>
        
        </TabNavigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  tabIcon: {  
    width: 20,  
    height: 20,  
    resizeMode: 'stretch',  
    marginTop: 10,
    backgroundColor:'red',  
}  
});