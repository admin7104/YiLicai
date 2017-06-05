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
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');
import Main from './YLCMain';
let imgsArr = [{"img": "launchimage3"}, {"img": "launchimage2"}, {"img": "launchimage1"}];
let jump = "";
let Launch = React.createClass({
    _onPage(){
        this.props.navigator.push({
            component: Main,
        })
    },
    getInitialState(){
        return {
            currentPage: 0
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref='scrollView'
                    horizontal={true}
                    //隐藏
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                >
                    {this.renderChildView()}
                </ScrollView>
                {/*返回指示器*/}
                <View style={styles.pageViewStyle}>
                    {/*返回五个圆点*/}
                    {this.renderPageCircle()}
                </View>

                {/*<View style={{position: 'absolute', bottom: 100,backgroundColor:'green'}}>*/}
                <Text onPress={this._onPage} style={styles.jumpStyle}>{jump}</Text>
                {/*</View>*/}

            </View>
        );
    },
    //返回子View 所有图片
    renderChildView(){
        //    数组
        let allImage = [];
        // var colors = ['red','green','blue','yellow','purple'];
        //遍历
        for (let i = 0; i < imgsArr.length; i++) {
            //取出单独的每个对象
            let imgItem = imgsArr[i];
            //创建组件装入数组
            allImage.push(
                <Image key={i} source={{uri: imgItem.img}} resizeMode={'stretch'}
                       style={{width: width, height: height}}/>
            )
        }
        //返回数组
        return allImage;
    },
    // 返回所有圆点
    renderPageCircle(){
        let indicatorArr = [];
        let style;
        //遍历
        for (let i = 0; i < imgsArr.length; i++) {
            //判断
            style = (i == this.state.currentPage) ? {color: 'orange'} : {color: 'white'};
            //把圆点装入数组
            if (this.state.currentPage == 2) {
                jump = "跳过";
            } else {
                jump = "";
            }
            indicatorArr.push(
                <Text key={i} style={[{fontSize: 35, marginRight: 5}, style]}>&bull;</Text>
            )
        }
        return indicatorArr;
    },
    //设置焦点跟随图片
    onAnimationEnd(e){
        //求出当前水平偏移量
        let offSetX = e.nativeEvent.contentOffset.x;
        //求出当前页数
        let currentPage = Math.floor(offSetX / width);
        //更新状态机
        this.setState({
            //当前的页码
            currentPage: currentPage
        })
    }
});
const styles = StyleSheet.create({

    pageViewStyle: {
        width: width,
        height: 25,
        // backgroundColor: 'rgba(241,241,241,0.8)',

        //    定位
        position: 'absolute',
        bottom: 100,
        left: width / 2 - 13,

        flexDirection: 'row',
        alignItems: 'center'
    },
    jumpStyle: {
        position: 'absolute',
        fontSize: 15,
        color: '#fff',
        top: 20,
        right: -width + 63,
        // width: width,
        width: width,
        height: 20,
        // backgroundColor:'red'
    }
});

module.exports = Launch;