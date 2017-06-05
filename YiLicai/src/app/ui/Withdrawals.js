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

import LoginButton from '../lib/LoginButton';
import LoginSuccess from '../ui/LoginSuccess';
import NetUitl from '../lib/NetUtil';
import Url from '../../../app.json';
import NavBar from '../../Common/NavBar';
import CommonCell from '../../More/YLCCommonCell';

export default class WithdrawalsActivity extends Component {
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
                    title="提现"
                    Backpop={()=>{this.returnCount()}}
                />
                <View style={{marginTop:10}}>
                    <CommonCell
                        imgUri="icon_about"
                        title="中国建设银行"
                        content="621**********************"
                    />
                </View>
                <View style={{
                    paddingLeft:15,
                    paddingRight:15,
                    paddingTop:10}}>
                    <View >
                        <Text style={{color:'#888'}}>可用余额：2300元</Text>
                        <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'center'}}>
                            <Text style={{color:'#000'}}>提现金额：</Text>
                            <TextInput
                                placeholder='最多提现2300元'
                                onChangeText={(text) => {this.money = text;}}
                                underlineColorAndroid='transparent'
                                style={{flex:1}}
                            />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{color:'#888'}}>提现费用：3元</Text>
                            <Text style={{color:'#888'}}>实际到账：2227元</Text>
                        </View>
                        <LoginButton name='确认提现' onPressCallback={this.onPressCallback}/>
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
        this.money = this.money.replace(/^ +/, '');
        if (this.money == '') {
            alert("请输入充值金额");
        } else {
            // alert(this.state.userId);
            // alert(this.money);
            let url = Url.localhost + "mobile/userWithdrawals?userID="+this.state.userId+"&numStr="+this.money;
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