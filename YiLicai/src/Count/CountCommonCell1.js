/**
 * Created by admin7104 on 2017/3/26.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');

let CountCommonCell1 = React.createClass({
    getDefaultProps(){
        return {
            money: '',
            title: '',//标题
        }
    },
    render() {
        return (
            <View style={styles.container}>
                {/*钱数*/}
                <Text style={{color:'#ff6948',fontSize:16}}>{this.props.money}</Text>
                {/*标题*/}
                <Text style={{color:'#7a7a7a',fontSize:10,fontWeight:'bold'}}>{this.props.title}</Text>
            </View>
        );
    }
});
const styles = StyleSheet.create({
    container: {
        height: 54,
        width:width/3,
        backgroundColor: 'white',
        //主轴方向
        alignItems: 'center',
        paddingTop:10
    },
});

module.exports = CountCommonCell1;