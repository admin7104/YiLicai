/**
 * Created by Administrator on 2017/3/29 0029.
 */
import React, {Component} from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import EditView from '../lib/EditView';
import LoginButton from '../lib/LoginButton';
import LoginSuccess from '../ui/LoginSuccess';
import RegPage from '../ui/RegPage';
import NetUitl from '../lib/NetUtil';
import Url from '../../../app.json';
import NavBar from '../../Common/NavBar';

export default class LoginActivity extends Component {
    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
    }

    saveData(key,value) {
        try {
            AsyncStorage.setItem(key, value,(error)=>{
                if(error) alert('存值失败');
                else alert('存值成功');
            });
        } catch (error) {
            alert('_save error: ', error.message);
        }
    }

    getValue() {
        try {// try catch 捕获异步执行的异常
            AsyncStorage.getItem('userId',(error,result)=>{
                if(error) alert('取值失败');
                else {
                    alert('取值userId'+result);
                }
            });
        } catch (error) {
            alert('_get() error: ',error.message);
        }
    }

    render() {
        return (

            <View style={LoginStyles.loginview}>
                <NavBar
                    leftUri="icon_back"
                    title="登录"
                    Backpop={()=>{this.returnHome()}}
                />
                <View style={{
                    paddingLeft:15,
                    paddingRight:15,
                    paddingTop:10}}>
                    <View style={{
                    flexDirection: 'row', height: 100, marginTop: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                        <Image source={require('../image/login.png')}/>
                    </View>
                    <View style={{marginTop: 80}}>
                        <EditView name='请输入账号' onChangeText={(text) => {
                        this.userName = text;
                    }}/>
                        <EditView name='请输入密码' onChangeText={(text) => {
                        this.password = text;
                    }}/>
                        <LoginButton name='登录' onPressCallback={this.onPressCallback}/>
                        <View
                            style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingTop:10}}>
                            <Text style={{color: "#4A90E2"}}>忘记密码？</Text>
                            <Text>还没有账号？<Text onPress={this.goToReg} style={{color: "#4A90E2"}}>点击注册</Text></Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    returnHome() {
        this.props.navigator.pop();
    }

    goToReg = ()=> {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'RegPage',
                component: RegPage,
            });
        }
    };
    onPressCallback = () => {
        this.userName = this.userName.replace(/^ +/, '');
        this.password = this.password.replace(/^ +/, '');

        let url = Url.localhost + "mobile/auth?username=" + this.userName + "&password=" + this.password;
        NetUitl.getJson(url, (responseText) => {//, formData
            if(responseText==null||responseText==''){
                alert("登录失败");
            }else {
                alert(responseText);
                this.saveData('userId',responseText);
                this.saveData('username',this.userName);
                this.getValue();
                this.returnHome();
            }
        })
    };
    //跳转到第二个页面去
    onLoginSuccess() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.push({
                name: 'LoginSuccess',
                component: LoginSuccess,
            });
        }
    }

}

const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});