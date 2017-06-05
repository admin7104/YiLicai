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

export default class ReChargeActivity extends Component {
    constructor(props) {
        super(props);
        this.money = "";
        this.state={
            userId: "",
        }
    }

    componentDidMount() {
        this.setState({
            userId: this.props.userId,
        })
    }

    render() {
        return (
            <View style={LoginStyles.loginview}>
                <NavBar
                    leftUri="icon_back"
                    title="充值"
                    Backpop={()=>{this.returnCount()}}
                />
                <View style={{
                    paddingLeft:15,
                    paddingRight:15,
                    paddingTop:10}}>
                    <View >
                        <Text>请选择支付平台：</Text>
                        <View style={{flexDirection:'row'}}>
                            <Image style={{width:80,height:40}} source={{uri:'icon_back'}}/>
                            <Text>银联支付限额说明</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Image style={{width:80,height:40}} source={{uri:'icon_back'}}/>
                            <Text>银联支付限额说明</Text>
                        </View>
                        <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'center'}}>
                            <Text style={{color:'#000'}}>充值金额：</Text>
                            <TextInput
                                placeholder='请输入充值金额'
                                onChangeText={(text) => {this.money = text;}}
                                underlineColorAndroid='transparent'
                                style={{flex:1}}
                            />
                        </View>
                        <Text style={{color:'#888'}}>可用余额：2300元</Text>
                        <LoginButton name='充值' onPressCallback={this.onPressCallback}/>
                    </View>
                </View>
            </View>
        )
    }

    returnCount() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    };

    onPressCallback = () => {
        // let formData = new FormData();
        // formData.append("loginName", this.userName);
        // formData.append("password", this.password);
        this.money = this.money.replace(/^ +/, '');
        if (this.money == '') {
            alert("请输入充值金额");
        } else {
            // alert(this.state.userId);
            // alert(this.money);
            let url = Url.localhost + "mobile/userRecharge?userID="+this.state.userId+"&numStr="+this.money;
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