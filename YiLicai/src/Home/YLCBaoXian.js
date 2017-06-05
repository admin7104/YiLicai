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

export default class BaoXianActivity extends Component {

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
                    title="我的保障"
                    leftUri="icon_back"
                    Backpop={()=>{this.returnHome()}}
                />
                <ScrollView
                    showsHorizontalScrollIndicator={false}
                >
                    <Text style={{paddingLeft:10,fontSize:14,fontWeight:'bold'}}>热卖精选</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {this.renderBaoxianItem()}
                        {this.renderBaoxianItem()}
                        {this.renderBaoxianItem()}
                        {this.renderBaoxianItem()}
                    </View>
                    <Text style={{paddingLeft:10,fontSize:14,fontWeight:'bold'}}>给身边的TA买份保险</Text>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={{width:width/2,margin:10,height:40,justifyContent:'center',alignItems:'center',backgroundColor:'red'}}>
                            <Text >家人健康你做主</Text>
                        </View>
                        <View style={{width:width/2,margin:10,height:40,justifyContent:'center',alignItems:'center',backgroundColor:'red'}}>
                            <Text >有压力 更要有保障</Text>
                        </View>
                        <View style={{width:width/2,margin:10,height:40,justifyContent:'center',alignItems:'center',backgroundColor:'red'}}>
                            <Text >让穷游更安心</Text>
                        </View>
                    </ScrollView>
                </ScrollView>
            </View>
        );
    }

    returnHome() {
        this.props.navigator.pop();
    }

    renderBaoxianItem() {
        return (
            <TouchableOpacity
                style={{width: width / 2, height: 80, paddingTop: 15, paddingBottom: 15, paddingLeft: 10}}>
                <View>
                    <View>
                        <Text style={{marginBottom: 2,fontSize:16}} numberOfLines={1}>养老年金</Text>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>按月领取最多40%</Text>
                        <Text style={{fontSize: 12, color: '#999'}}>1.0万用户购买</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});
