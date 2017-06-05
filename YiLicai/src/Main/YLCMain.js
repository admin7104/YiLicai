/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    Navigator
} from 'react-native';

//引入外部组件类-----------------------
import TabNavigator from 'react-native-tab-navigator';

import Home from '../Home/YLCHome';
import Project from '../Project/YLCProject';
import Count from '../Count/YLCCount';
import More from '../More/YLCMore';
import AddMoneyManage from '../Count/AddMoneyManage';

let Main = React.createClass({
    //初始化函数（变量可以改变，充当一个状态机的角色 刷新界面）
    getInitialState(){
        return {
            selectedTab: 'home'//默认是第一个
        }
    },
    render() {
        return (
            <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>
                <TabNavigator.Item
                    selectedTitleStyle={styles.selectedTitleStyle}
                    selected={this.state.selectedTab === 'home'}
                    title='首页'
                    renderIcon={() => <Image source={{uri: 'icon_tabbar_homepage'}} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_homepage_selected'}}
                                                     style={styles.iconStyle}/>}
                    onPress={() => this.setState({selectedTab: 'home'})}>
                    <Home navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selectedTitleStyle={styles.selectedTitleStyle}
                    selected={this.state.selectedTab === 'project'}
                    title='项目'
                    renderIcon={() => <Image source={{uri: 'icon_tabbar_project'}} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_project_selected'}}
                                                     style={styles.iconStyle}/>}
                    onPress={() => this.setState({selectedTab: 'project'})}>
                    <Project navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selectedTitleStyle={styles.selectedTitleStyle}
                    selected={this.state.selectedTab === 'AddMoneyManage'}
                    title='添加投资'
                    renderIcon={() => <Image source={{uri: 'icon_tabbar_add'}} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_add_selected'}}
                                                     style={styles.iconStyle}/>}
                    onPress={() => this.setState({selectedTab: 'AddMoneyManage'})}>
                    <AddMoneyManage navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selectedTitleStyle={styles.selectedTitleStyle}
                    selected={this.state.selectedTab === 'count'}
                    title='账户'
                    renderIcon={() => <Image source={{uri: 'icon_tabbar_count'}} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_count_selected'}}
                                                     style={styles.iconStyle}/>}
                    onPress={() => this.setState({selectedTab: 'count'})}>
                    <Count navigator={this.props.navigator}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selectedTitleStyle={styles.selectedTitleStyle}
                    selected={this.state.selectedTab === 'more'}
                    title='更多'
                    renderIcon={() => <Image source={{uri: 'icon_tabbar_more'}} style={styles.iconStyle}/>}
                    renderSelectedIcon={() => <Image source={{uri: 'icon_tabbar_more_selected'}}
                                                     style={styles.iconStyle}/>}
                    onPress={() => this.setState({selectedTab: 'more'})}>
                    <More navigator={this.props.navigator}/>
                </TabNavigator.Item>
                {/*首页*/}
                {/*{this.renderTabBarItem("首页", 'icon_tabbar_homepage', 'icon_tabbar_homepage_selected', 'home', '首页', Home)}*/}
                {/*项目*/}
                {/*{this.renderTabBarItem("项目", 'icon_tabbar_project', 'icon_tabbar_project_selected', 'project', "项目", Project)}*/}
                {/*账户*/}
                {/*{this.renderTabBarItem("账户", 'icon_tabbar_count', 'icon_tabbar_count_selected', 'count', '账户', Count)}*/}
                {/*更多*/}
                {/*{this.renderTabBarItem("更多", 'icon_tabbar_more', 'icon_tabbar_more_selected', 'more', '更多', More)}*/}
            </TabNavigator>
        );
    },
//    每一个tabBarItem
    renderTabBarItem(title, iconName, selectedIconName, selectedTab, componentName, component){
        {/*()=><Text style={{fontWeight:'bold'}}>{title}</Text>*/
        }
        return (
            <TabNavigator.Item

                title={title}
                renderIcon={()=> <Image source={{uri: iconName}} style={styles.iconStyle}/>}  //图标
                renderSelectedIcon={()=><Image source={{uri: selectedIconName}}
                                               style={styles.iconStyle}/>} //选中的图标
                onPress={()=> {
                    this.setState({selectedTab: selectedTab})
                }}
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={styles.selectedTitleStyle}
            >
                <Navigator
                    initialRoute={{name: componentName, component: component}}
                    confifureScene={()=> {
                        return Navigator.SceneConfigs.PushFromRight;
                    }}
                    renderScene={(route, navigator)=> {
                        let Component = route.component;
                        return <Component {...route.passProps} navigator={navigator}/>
                    }}
                />
            </TabNavigator.Item>
        )
    }
});
const styles = StyleSheet.create({
    iconStyle: {
        width: Platform.OS ? 30 : 25,
        height: Platform.OS ? 30 : 25
    },
    selectedTitleStyle: {
        color: '#ff6269',
        fontWeight: 'bold'
    }
});

module.exports = Main;