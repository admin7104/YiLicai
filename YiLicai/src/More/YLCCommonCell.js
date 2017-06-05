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

let CommonCell = React.createClass({
    getDefaultProps(){
        return {
            imgUri: '',
            title: '',//标题
            content: '',
            rightTitle: '',
            versionNum: ''
        }
    },
    render() {
        return (
            <TouchableOpacity onPress={()=>{this.props.MoreCellPress()}}>
                <View style={styles.container}>
                    {/*左边*/}
                    <Image source={{uri:this.props.imgUri}} style={{width:25,height:25}}/>
                    <View style={styles.contentRight}>
                        {/*文字*/}
                        <View>
                            <Text style={{color:'#4f4f4f',fontSize:16}}>{this.props.title}</Text>
                            <Text style={{color:'#4f4f4f',fontSize:16}}>{this.props.content}</Text>
                        </View>
                        {/*右边*/}
                        {this.renderRightView()}
                    </View>
                </View>
            </TouchableOpacity>
        );
    },
    renderRightView(){
        if (this.props.versionNum) {
            return (
                <Text style={{color:'gray'}}>{this.props.versionNum}</Text>
            )
        } else {
            return (
                <View style={{flexDirection:'row',alignItems: 'center',}}>
                    <Text style={styles.rightTitle}>{this.props.rightTitle}</Text>
                    <Image source={{uri:'icon_cell_rightarrow'}} style={{width:8,height:13}}/>
                </View>
            )
        }
    }
});
const styles = StyleSheet.create({
    container: {
        height: 44,
        backgroundColor: 'white',

        //主轴方向
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomColor: '#f1f1f1',
        borderBottomWidth: 1,
    },
    contentRight: {
        flexDirection: 'row',
        height: 44,
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 5,
        alignItems: 'center',
    },
    rightTitle: {
        marginRight: 3,
        fontFamily: '华文新魏',
        color: '#e94657'
    }
});

module.exports = CommonCell;