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
    ScrollView,
    TouchableOpacity,
    Platform,
    TextInput
} from 'react-native';

import NavBar from '../Common/NavBar';

export default class HuangjinActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backMoney: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title="易理财黄金"
                    leftUri="icon_back"
                    Backpop={()=>{this.returnHome()}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Text>黄金资讯</Text>
                    {this.renderHuangjinItem()}
                    {this.renderHuangjinItem()}
                    {this.renderHuangjinItem()}
                    {this.renderHuangjinItem()}
                    {this.renderHuangjinItem()}
                    {this.renderHuangjinItem()}
                    {this.renderHuangjinItem()}
                </ScrollView>
            </View>
        );
    }

    returnHome() {
        this.props.navigator.pop();
    }

    renderHuangjinItem() {
        return (
            <View style={{borderBottomWidth:0.5,borderBottomColor:'#ccc',paddingTop:5,paddingBottom:5,paddingLeft:3,paddingRight:3}}>
                <Text>二季度投资战网（黄金）</Text>
                <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                    <Text style={{borderRightColor:'#333',borderRightWidth:1}}>黄金要闻</Text>
                    <Text>易理财金融研究团队</Text>
                </View>
            </View>
        )
    }

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
