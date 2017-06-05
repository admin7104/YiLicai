/**
 * Created by admin7104 on 2017/3/26.
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

import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');

let CountCommonCell1 = React.createClass({
    getDefaultProps(){
        return {
            imgUri: '',
            title: '',//标题
            tag: ''
        }
    },
    render() {
        return (
            <TouchableOpacity  style={styles.container} onPress={this.props.clickCountThreeContent}>
                <View>
                    <Image source={{uri:this.props.imgUri}} style={{width:25,height:25}}/>
                    {/*标题*/}
                    <Text style={{fontSize:14,marginTop:5}}>{this.props.title}</Text>
                    {/*tag*/}
                    <Text style={{color:'#7a7a7a',fontSize:10,fontWeight:'bold'}}>{this.props.tag}</Text>
                </View>
            </TouchableOpacity>
        );
    }
});
const styles = StyleSheet.create({
    container: {
        height: 108,
        width: width / 3,
        backgroundColor: 'white',
        //主轴方向
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        borderColor: '#f1f1f1',
        borderRightWidth: 2,
        borderBottomWidth: 2
    },
});

module.exports = CountCommonCell1;