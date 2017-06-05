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

import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');
import NavBar from '../Common/NavBar';

export default class XiaoBaiActivity extends Component {

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
                    title="易理财小白理财"
                    leftUri="icon_back"
                    Backpop={()=>{this.returnHome()}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        <View style={{flexDirection:'row',borderBottomColor:'#ccc',borderBottomWidth:0.5}}>
                            <TouchableOpacity>
                                <View style={{alignItems:'center'}}>
                                    <Text>年年盈</Text>
                                    <Text>5.20%</Text>
                                    <Text>历史年化结算利率</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{alignItems:'center'}}>
                                    <Text>年年盈</Text>
                                    <Text>5.20%</Text>
                                    <Text>历史年化结算利率</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <Text>我要转入(元)</Text>
                            <TextInput
                                placeholder="请输入转入金额"
                                onChangeText={(text)=>{this.state.backMoney=text}}
                            />
                        </View>
                        <View>
                            <Text>暗历史结算利率365天可赚(元)</Text>
                            <Text onPress={()=>{alert(this.state.backMoney*0.52)}}>查看总收益</Text>
                        </View>
                    </View>
                    <View style={{marginTop:20}}>
                        {this.renderXiaiBaiItem()}
                        {this.renderXiaiBaiItem()}
                        {this.renderXiaiBaiItem()}
                        {this.renderXiaiBaiItem()}
                        {this.renderXiaiBaiItem()}
                        {this.renderXiaiBaiItem()}
                        {this.renderXiaiBaiItem()}
                    </View>
                </ScrollView>
                <View style={{width:width,height:60,backgroundColor:'#ed5564',alignItems:'center',justifyContent:'center'}}>
                    <Text style={{color:'#fff',fontSize:18}}>转入</Text>
                </View>
            </View>
        );
    }

    returnHome() {
        this.props.navigator.pop();
    }

    renderXiaiBaiItem() {
        return (
            <View>
                <View style={{flexDirection:'row',backgroundColor:'#f5f5f5',height:40,alignItems:'center'}}>
                    <Text>产品类别</Text>
                    <Text>保险理财</Text>
                </View>
                <View style={{flexDirection:'row',height:40,alignItems:'center'}}>
                    <Text>产品类别</Text>
                    <Text>保险理财</Text>
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
