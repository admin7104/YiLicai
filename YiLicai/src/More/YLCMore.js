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
    TouchableOpacity,
    Platform,
    ScrollView,
    AsyncStorage,
    InteractionManager
} from 'react-native';

import CommonCell from './YLCCommonCell';
import NavBar from '../Common/NavBar';
import login from '../app/ui/LoginPage';

let More = React.createClass({
    getInitialState(){
        return {
            currentId: ''
        }
    },
    getValue() {
        try {// try catch 捕获异步执行的异常
            AsyncStorage.getItem('userId', (error, result)=> {
                if (error) {
                    this.setState({
                        currentId: ''
                    })
                }
                else {
                    this.setState({
                        currentId: result
                    })
                }
            });
        } catch (error) {
            alert('_get() error: ', error.message);
        }
    },
    componentWillMount(){
        InteractionManager.runAfterInteractions(()=>{
            this.getValue();
        });
    },
    removeData(){
        try {
            AsyncStorage.setItem('userId', '',(error)=>{
                if(error) alert('退出失败');
                else{
                    AsyncStorage.setItem('username','',(error1)=>{
                        if (error1) alert("退出失败");
                        else
                            alert('退出成功');
                    });
                }
            });
        }catch (error){
            alert('失败'+error);
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                title="更多"
                />
                <ScrollView>
                    <View style={styles.contentC}>
                        <CommonCell
                            imgUri="icon_about"
                            title="关于我们"
                            MoreCellPress={()=>{alert("关于我们")}}
                        />
                        <CommonCell
                            imgUri="icon_guide"
                            title="新手指导"
                            MoreCellPress={()=>{alert("新手指导")}}
                        />
                        <CommonCell
                            imgUri="icon_msg"
                            title="系统消息"
                            MoreCellPress={()=>{alert("系统消息")}}
                        />
                        <CommonCell
                            imgUri="icon_problem"
                            title="常见问题"
                            MoreCellPress={()=>{alert("常见问题")}}
                        />
                        <CommonCell
                            imgUri="icon_tel"
                            title="客服电话"
                            rightTitle="4006-099-296"
                            MoreCellPress={()=>{alert("4006-099-296")}}
                        />
                        <CommonCell
                            imgUri="icon_tutu"
                            title="欢迎评分"
                            MoreCellPress={()=>{alert("评分")}}
                        />
                    </View>
                    <View style={styles.contentC}>
                        <CommonCell
                            imgUri="icon_version"
                            title="当前版本"
                            versionNum='v2.0.1'
                            MoreCellPress={()=>{alert("v2.0.1")}}
                        />
                    </View>
                    {this.renderLogout()}
                </ScrollView>
            </View>
        );
    },
    componentWillReceiveProps(){
        this.getValue();
    },
    shouldComponentUpdate(){
        return true;
    },
    componentDidUpdate(){
    },
    renderLogout(){
        if(this.state.currentId!=null){
            return (
                <View style={styles.contentC}>
                    <View style={styles.logout}>
                        <TouchableOpacity onPress={()=>{this.removeData()}}>
                            <Text style={{color:'#4f4f4f',fontSize:16}}>退出登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }else {
            return (
                null
            )
        }
    }
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4'
    },
    //内容部分
    contentC: {
        marginTop: 10,
        marginBottom:10
    },
    logout:{
        height: 44,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent:'center'
    }

});

module.exports = More;