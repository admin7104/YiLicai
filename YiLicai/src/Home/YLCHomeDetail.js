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
    TouchableOpacity
} from 'react-native';

let HomeDetail = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=>this.popToHome()}>
                    <Text style={styles.welcome}>
                        详情页面
                    </Text>
                </TouchableOpacity>
            </View>
        );
    },
    popToHome(){
        this.props.navigator.pop();
    }
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});

module.exports = HomeDetail;