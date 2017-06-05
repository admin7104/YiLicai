/**
 * Created by admin7104 on 2017/4/5.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';


export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: ''
        }
    }
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
    }

    render() {
        this.getValue();
        return (
            <View style={styles.navBarStyle}>
                {/*左边*/}
                {this.leftNavBar()}
                {/*中间*/}
                <Text style={styles.navCenterStyle}>{this.props.title}</Text>
                {/*右边*/}
                {this.rightNavBar()}

            </View>
        )
    }

    leftNavBar() {
        if (this.props.leftUri) {
            return (
                <TouchableOpacity onPress={() => { this.props.Backpop()} }>
                    <Image source={{uri: this.props.leftUri}} style={styles.navLeftStyle}/>
                </TouchableOpacity>
            )
        } else {
            return (
                <View style={{width:50}}><Text>&nbsp;</Text></View>
            )
        }
    }

    rightNavBar() {
        if (this.props.rightUri) {
            return (
                <TouchableOpacity onPress={()=> {this.props.rightImg()}}>
                    <Image source={{uri: this.props.rightUri}} style={styles.navRightimgStyle}/>
                </TouchableOpacity>
            )
        } else if (this.props.loginText) {
            if(this.state.currentId!=null){
                return (
                    null
                )
            }else {
                return (
                    <TouchableOpacity onPress={()=>{this.props.toLogin()}}>
                        <Text style={styles.navRightStyle}>{this.props.loginText}</Text>
                    </TouchableOpacity>
                )
            }
        } else {
            return (
                <View style={{width:50}}><Text>&nbsp;</Text></View>
            )
        }
    }

};

const styles = StyleSheet.create({
    navBarStyle: {
        height: 48,
        backgroundColor: '#ed5564',

        flexDirection: 'row',
        alignItems: 'center',
    },
    navLeftStyle: {
        width: Platform.OS == 'ios' ? 30 : 26,
        height: Platform.OS == 'ios' ? 30 : 26,
        position: 'relative',
        left: 10,
    },
    navCenterStyle: {
        flex: 1,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 18
    },
    navRightStyle: {
        position: 'relative',
        width: 50,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 14,
        // backgroundColor:'red'
    },
    navRightimgStyle: {
        width: Platform.OS == 'ios' ? 30 : 24,
        height: Platform.OS == 'ios' ? 30 : 24,
        position: 'relative',
        marginRight: 10,
    }
});
