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
    ScrollView,
    TouchableOpacity,
    Image,
    AsyncStorage,
    InteractionManager
} from 'react-native';

import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');

import CountCommonCell1 from './CountCommonCell1';
import CountCommonCell2 from './CountCommonCell2';
import ReCharge from '../app/ui/ReCharge';
import Withdrawals from '../app/ui/Withdrawals';
import MyTouziList from '../app/ui/MyTouziList';

import Url from '../../app.json';
import login from '../app/ui/LoginPage';

let Count = React.createClass({

    getInitialState(){
        return {
            currentId: '',
            currentUser: '',
            userInfo: '',
            allInfo: '',
            zhye: 0
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
                    if (result == null) {
                        this.setState({
                            currentId: '未登录',
                            currentUser: '未登录'
                        })
                    } else {
                        let url = Url.localhost + "mobile/gitUserAccountInfo?userID=" + result;
                        this.fetchData(url);
                        AsyncStorage.getItem('username', (error1, result1)=> {
                            this.setState({
                                currentUser: result1,
                                zhye: this.state.userInfo.zhye
                            })
                        });
                        this.setState({
                            currentId: result,
                        })
                    }
                }
            });
        } catch (error) {
            alert('_get() error: ', error.message);
        }
    },
    fetchData(url){
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                // alert(responseData.userInfo.zhye);
                this.setState({
                    userInfo: responseData.userInfo,
                    allInfo: responseData
                });
            })
            .done();
    },
    componentDidMount(){
        this.getValue();
    },
    render() {
        return (
            <ScrollView
                showsVerticalScrollIndicator
                style={{flex: 1, backgroundColor: 'white'}}
            >
                <View style={styles.container}>
                    <Image source={{uri: 'bgcount'}} style={styles.count_header}>
                        <Text style={styles.myCount}>我的账户</Text>
                        <Image source={{uri: 'countimg'}} style={styles.avator}/>
                        <Text style={{color: '#333', fontSize: 12, marginTop: 5}}>{this.state.currentUser}</Text>
                    </Image>
                </View>
                <View style={styles.intro}>

                    <TouchableOpacity onPress={()=> {
                        alert('点击了1')
                    }}>
                        <CountCommonCell1
                            money="7.08"
                            title="昨日收益"/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> {
                        alert('点击了2')
                    }}>
                        <CountCommonCell1
                            money="4,850.00"
                            title="累计收益"/>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=> {
                        alert('点击了3')
                    }}>
                        <CountCommonCell1
                            money={this.state.zhye}
                            title="可用余额"/>
                    </TouchableOpacity>
                </View>
                <View style={styles.intro}>
                    <TouchableOpacity onPress={()=> {
                        alert('点击了1')
                    }}>
                        <CountCommonCell1
                            money="11,207.33"
                            title="总资产"/>
                    </TouchableOpacity>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={()=>{this.tixianClick(this.state.currentId)}}>
                            {this.renderButton('#ed5564', 'white', '提现')}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>{this.chongzhiClick(this.state.currentId)}}>
                            {this.renderButton('white', '#ed5564', '充值')}
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.CountOther}>
                    <CountCommonCell2
                        imgUri="lcb"
                        title="充值、提现记录"
                        clickCountThreeContent={()=>{this.clickCountThreeContent("充值、提现记录")}}
                    />
                    <CountCommonCell2
                        imgUri="wdxx"
                        title="我的信息"
                        clickCountThreeContent={()=>{this.clickCountThreeContent("我的信息")}}
                    />
                    {/*<TouchableOpacity*/}
                        {/*onPress={()=>{this.myTouziList(this.state.allInfo.mobileOrderList,this.state.allInfo.yesterdayOrderList)}}>*/}
                        <CountCommonCell2
                            imgUri="wdtz"
                            title="我的投资"
                            clickCountThreeContent={()=>{this.clickCountThreeContent("我的投资")}}
                        />
                    {/*</TouchableOpacity>*/}
                    <CountCommonCell2
                        imgUri="jyjl"
                        title="交易记录"/>
                </View>
            </ScrollView>
        );
    },
    clickCountThreeContent(text){
        if(this.state.currentUser=="未登录"){
            this.props.navigator.push({
                component:login
            })
        }else {
            if(text=="充值、提现记录"){
                alert("czjl");
            }else if(text=="我的信息"){
                alert('wdxx');
            }else if(text=="我的投资"){
                this.myTouziList(this.state.allInfo.mobileOrderList,this.state.allInfo.yesterdayOrderList);
            }
        }
    },
    componentWillReceiveProps(){
        this.getValue();
    },
    shouldComponentUpdate(){
        return true;
    },
    componentDidUpdate(){
    },
    tixianClick(id){
        this.props.navigator.push({
            component: Withdrawals,
            params: {
                userId: id
            }
        })
    },
    chongzhiClick(id){
        this.props.navigator.push({
            component: ReCharge,
            params: {
                userId: id
            }
        })
    },
    myTouziList(todayList, yesterdayList){
        this.props.navigator.push({
            component: MyTouziList,
            params: {
                tList: todayList,
                yList: yesterdayList
            }
        })
    },
    renderButton(color, bgColor, title){
        return (
            <Text
                style={[{
                        color: color,
                        backgroundColor: bgColor,
                        borderColor: color,
                        borderWidth: 1
                    }, styles.button]}>{title}</Text>
        )
    }
});
const styles = StyleSheet.create({
    container: {
        height: height * 0.25,
        backgroundColor: 'white',
    },
    count_header: {
        height: height * (0.2 * 2 / 3),
        width: width,
        alignItems: 'center',
    },
    avator: {
        width: 80,
        height: 80,
        marginTop: 10,
        borderRadius: 60
    },
    myCount: {
        color: '#fff',
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold'
    },
    intro: {
        height: height * 0.09,
        flexDirection: 'row',
        borderTopWidth: 2,
        borderTopColor: '#efeff4'
    },
    buttons: {
        flexDirection: 'row',
        height: height * 0.09,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        paddingRight: 10
    },
    button: {
        width: 60,
        textAlign: 'center',
        marginRight: 10,
        fontSize: 14,
        borderRadius: 3,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
    },
    CountOther: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderTopWidth: 2,
        borderTopColor: '#efeff4',
        flexWrap: 'wrap',
    }

});

module.exports = Count;