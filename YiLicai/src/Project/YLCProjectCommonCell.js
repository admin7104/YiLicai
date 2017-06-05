/**
 * Created by admin7104 on 2017/3/27.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';


let ProjectCommonCell = React.createClass({
    getDefaultProps(){
        return {
            rowdata: '',//对象
        }
    },
    render() {
        return (
            <View style={styles.container}>
                {/*上*/}
                <View style={[styles.flexD, styles.one]}>
                    <View style={styles.flexD}>
                        <Text style={{color: '#2c2c2c', fontSize: 16, fontWeight: 'bold'}}>{this.props.rowdata.projectName}</Text>
                        {this.renderHot()}
                    </View>
                    <Text style={{fontSize: 12, fontWeight: 'bold'}}>{this.props.rowdata.projectTag}</Text>
                </View>
                {/*中*/}
                <View style={[styles.flexD, styles.two]}>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{color: '#fa5513'}}><Text
                            style={{fontSize: 20}}>{this.props.rowdata.projectInterest}</Text>%</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>年化收益</Text>
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <Text style={{color: '#e71e31'}}><Text
                            style={{fontSize: 20}}>{this.props.rowdata.projectLimitday}</Text>天</Text>
                        <Text style={{fontSize: 12, fontWeight: 'bold'}}>项目期限</Text>
                    </View>
                    <Image source={{uri: 'right'}} style={{width: 20, height: 20, marginLeft: 20}}/>
                </View>
                {/*下*/}
                <View style={[styles.flexD, styles.three]}>
                    <View style={[styles.flexD, {alignItems: 'center'}]}>
                        <Image source={{uri: 'money'}} style={{width: 12, height: 12}}/>
                        <Text>{this.props.rowdata.projectMinmoney}元起投</Text>
                    </View>
                    <View style={[styles.flexD, {alignItems: 'center'}]}>
                        <Image source={{uri: 'jianguan'}} style={{width: 12, height: 12}}/>
                        <Text>平安银行专项账号资金监管</Text>
                    </View>
                </View>
            </View>
        );
    },
    renderHot(){
        if (this.props.rowdata.projectState) {
            return (
                <Text style={styles.hotStyle}><Image source={{uri: 'hot'}}
                                                     style={{width: 22, height: 22}}/>{this.props.rowdata.projectState}</Text>
            )
        } else {
        }
    },
});
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: 8,
        marginLeft: 3,
        marginRight: 3,
        borderRadius: 2
    },
    flexD: {
        flexDirection: 'row'
    },
    one: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 3,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#f6f6f6'
    },
    hotStyle: {
        color: 'white',
        backgroundColor: '#ed5466',
        borderRadius: 3,
        fontSize: 10,
        fontWeight: 'bold',
        padding: 2,
        height: 18
    },
    two: {
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10
    },
    three: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        backgroundColor: '#f8f8f8',
        alignItems: 'center'
    }
});

module.exports = ProjectCommonCell;