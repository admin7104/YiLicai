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
    TouchableOpacity
} from 'react-native';

import EditView from '../lib/EditView';
import LoginButton from '../lib/LoginButton';
import LoginSuccess from '../ui/LoginSuccess';
import NetUitl from '../lib/NetUtil';
import Url from '../../../app.json';
import NavBar from '../../Common/NavBar';

export default class RegActivity extends Component {
    constructor(props) {
        super(props);
        this.userName = "";
        this.password = "";
        this.repassword = "";
    }

    render() {
        return (
            <View style={LoginStyles.loginview}>
                <NavBar
                    leftUri="icon_back"
                    title="注册"
                    Backpop={()=>{this.returnLogin()}}
                />
                <View style={{
                    paddingLeft:15,
                    paddingRight:15,
                    paddingTop:10}}>
                    <View style={{flexDirection: 'row',height:100,marginTop:1,
        justifyContent: 'center',
        alignItems: 'flex-start',}}>
                        <Image source={require('../image/login.png')}/>
                    </View>
                    <View style={{marginTop:80}}>
                        <EditView name='用户名' onChangeText={(text) => {
            this.userName = text;
        }}/>
                        <EditView name='请输入登录密码' onChangeText={(text) => {
            this.password = text;
        }}/>
                        <EditView name='请确认登录密码' onChangeText={(text) => {
                        this.repassword = text;
                    }}/>
                        <LoginButton name='注册' onPressCallback={this.onPressCallback}/>
                        <Text onPress={()=>{this.returnLogin()}}
                              style={{color:"#4A90E2",textAlign:'center',marginTop:10}}>返回登录</Text>
                    </View>
                </View>
            </View>
        )
    }

    returnLogin() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    };

    onPressCallback = () => {
        this.userName = this.userName.replace(/^ +/, '');
        this.password = this.password.replace(/^ +/, '');
        if (this.userName == '' || this.password == '' || this.repassword == '') {
            alert("用户名或密码不能为空");
        } else if (this.password != this.repassword) {
            alert("两次密码不一致");
        } else {
            let url = Url.localhost + "mobile/add?username=" + this.userName + "&password=" + this.password;
            NetUitl.getJson(url, (responseText) => {//, formData
                alert(responseText);
            })
        }
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

class loginLineView extends Component {
    render() {
        return (
            <Text >
                没有帐号
            </Text>
        );
    }
}

const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});