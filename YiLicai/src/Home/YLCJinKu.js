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
    Platform
} from 'react-native';

import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');

export default class JinKuActivity extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.jinkuNav}>
                    <TouchableOpacity onPress={()=>{this.returnHome()}}>
                        <Image source={{uri:"icon_back"}} style={styles.navLeftStyle}/>
                    </TouchableOpacity>
                    <Text style={{fontSize:18,color:'#fff'}}>易理财小金库</Text>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {this.jinkuTop()}
                    <Text style={{fontSize:14,backgroundColor:'#fff',flex:1,marginTop:10,padding:10}}>自动还更省心</Text>
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                        {this.renderSX()}
                        {this.renderSX()}
                        {this.renderSX()}
                        {this.renderSX()}
                    </View>
                    <Text style={{fontSize:14,backgroundColor:'#fff',flex:1,marginTop:10,padding:10}}>小金库能赚钱</Text>
                    <View style={{flexDirection:'row',backgroundColor:'#fff'}}>
                        <View>
                            <Text>5.90%</Text>
                            <Text>预期年化收益率</Text>
                        </View>
                        <View>
                            <Text>定期理财文件投资</Text>
                            <Text>到期自动入账</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    returnHome() {
        this.props.navigator.pop();
    }

    jinkuTop() {
        if (this.props.userId == 1) {
            return (
                <View style={styles.jinkuTop}>
                    <View>
                        <Text style={{fontSize:14,color:'#fff'}}>总金额(元)</Text>
                        <Text style={{fontSize:22,color:'#fff'}}>0.00</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
                        <View style={styles.lcjlyq}>
                            <Text style={{color:'#fff'}}>理财金</Text>
                            <Text style={{color:'#fff'}}>0.00</Text>
                            <Text style={{color:'#fff',marginTop:5}}>七日年化 4.2810%</Text>
                        </View>
                        <View style={styles.lcjlyq}>
                            <Text style={{color:'#fff'}}>零用钱</Text>
                            <Text style={{color:'#fff'}}>0.00</Text>
                            <Text style={{color:'#fff',marginTop:5}}>七日年化 4.1210%</Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={styles.jinkuTop}>
                    <View style={{width:width}}>
                        <Text style={{color:'#fff',paddingLeft:20}}>科学理财第一步</Text>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
                        <View style={{width:width/3,justifyContent:'center',alignItems:'center'}}>
                            <Image source={{uri: 'ct2'}} resizeMode={'stretch'}
                                   style={{width: width/6, height: width/6}}/>
                            <Text
                                style={{color:'#fff',fontSize: 13, textAlign: 'center', marginTop: 3}}>七日年化 4.1210%</Text>
                        </View>
                        <View style={{width:width/3,justifyContent:'center',alignItems:'center'}}>
                            <Image source={{uri: 'ct2'}} resizeMode={'stretch'}
                                   style={{width: width/6, height: width/6}}/>
                            <Text
                                style={{color:'#fff',fontSize: 13, textAlign: 'center', marginTop: 3}}>七日年化 4.1210%</Text>
                        </View>
                        <View style={{width:width/3,justifyContent:'center',alignItems:'center'}}>
                            <Image source={{uri: 'ct2'}} resizeMode={'stretch'}
                                   style={{width: width/6, height: width/6}}/>
                            <Text
                                style={{color:'#fff',fontSize: 13, textAlign: 'center', marginTop: 3}}>七日年化 4.1210%</Text>
                        </View>
                    </View>
                    <View style={{width:width,alignItems:'center'}}>
                        <Text
                            style={{margin:15,paddingTop:10,paddingBottom:10,paddingLeft:30,paddingRight:30,backgroundColor:'#fff',borderRadius:25,fontSize:16,color:'#BD9E6F'}}>立即登录体验</Text>
                    </View>
                </View>
            )
        }
    }

    renderSX() {
        return (
            <TouchableOpacity
                style={{width: width / 2, height: 80, paddingLeft:10,paddingTop:10,backgroundColor:'#fff'}}>
                <View style={{alignItems:'center'}}>
                    <View style={{borderRightColor: '#e8e8e8', borderRightWidth: 1}}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source={{uri:'xinyongka'}} style={{width:width/7,height:width/7}}/>
                            <View style={{marginLeft:15,justifyContent:'center'}}>
                                <Text style={styles.longTitle} numberOfLines={1}>还信用卡</Text>
                                <Text style={{fontSize: 12, color: '#BD9E6F'}}>去还款</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    jinkuTop: {
        height: height * 0.3,
        backgroundColor: 'rgba(205, 167, 110, 0.77)',
        padding: 20
    },
    jinkuNav: {
        height: height * 0.1,
        backgroundColor: 'rgba(205, 167, 110, 0.77)',
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10
    },
    navLeftStyle: {
        width: Platform.OS == 'ios' ? 30 : 26,
        height: Platform.OS == 'ios' ? 30 : 26,
        marginLeft: 10,
        marginRight: 20
    },
    lcjlyq: {
        backgroundColor: 'rgba(205, 167, 110, 0.66)',
        padding: 15,
        borderRadius: 3
    },
    longTitle: {
        marginRight: 3,
        width: 80
    }
});
