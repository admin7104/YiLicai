/**
 * Created by Administrator on 2017/3/29 0029.
 */
import React from 'react';
import {
    View,
    Navigator,
    TouchableOpacity,
    ToolbarAndroid,
    Text
} from 'react-native';
export default class LoginSuccess extends React.Component {
    constructor(props){
        super(props);
        this.state = {};

    }
    //回到第一个页面去
    onJump(){
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    render(){
        return (

            <View >
                <TouchableOpacity onPress = {this.onJump.bind(this)}>
                    <Text> 登录成功，点击返回登录页面 </Text>
                </TouchableOpacity>
            </View>


        );

    }

}