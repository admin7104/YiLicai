/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
//noinspection JSUnresolvedVariable
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    ListView,
    AsyncStorage,
    InteractionManager
} from 'react-native';

//引入计时器类库
import TimerMixin from 'react-timer-mixin';

import Dimensions from 'Dimensions';
let {width, height} = Dimensions.get('window');

// import HomeDetail from './YLCHomeDetail';
import ImageData from '../../imageData.json';
import ContentOneData from '../../contentOneData.json';
import ContentThreeData from '../../contentThreeData.json';
//登录
import login from '../app/ui/LoginPage';
import YLCJinKu from './YLCJinKu';
import YLCXiaoBai from './YLCXiaoBai';
import YLCHuangJin from './YLCHuangJin';
import YLCBaoXian from './YLCBaoXian';
import NavBar from '../Common/NavBar';

let Home = React.createClass({
    //注册计时器
    mixins: [TimerMixin],
    //设置可变的初始值
    getDefaultProps(){
        return {
            duration: 1500
        }
    },
    getInitialState(){
        //设置数据源
        var pd = new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2});
        //返回数据
        return {
            currentPage: 0,
            dataSourceone: pd.cloneWithRows(ContentOneData.data),
            dataSourcethree: pd.cloneWithRows(ContentThreeData.data),
            userId:''
        }
    },
    getValue() {
        try {// try catch 捕获异步执行的异常
            AsyncStorage.getItem('username', (error, result)=> {
                if (error) {
                    this.setState({
                        currentId: ''
                    })
                }
                else {
                    if(result==null){
                        this.setState({
                            userId: '未登录'
                        })
                    }else {
                        this.setState({
                            userId: result
                        })
                    }
                }
            });
        } catch (error) {
            alert('_get() error: ', error.message);
        }
    },
    componentWillMount(){
        InteractionManager.runAfterInteractions(()=>{
            this.getValue();
        });
    },
    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title="易理财宝典"
                    loginText="登录"
                    toLogin={()=>{this.toLogin()}}
                />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    {this.renderScrollView()}
                    {/*Content*/}
                    <View style={{marginTop: 10, padding: 10, backgroundColor: '#ffffff'}}>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>理财神器·让理财很简单</Text>
                        <View style={{ marginTop: 5}}>
                            <ListView
                                dataSource={this.state.dataSourceone}
                                renderRow={this.renderRowone}
                                contentContainerStyle={{flexDirection:'row'}}
                            />
                        </View>
                    </View>

                    {this.contentTwo()}
                    <View style={{marginTop: 10, backgroundColor: '#ffffff'}}>
                        <ListView
                            dataSource={this.state.dataSourcethree}
                            renderRow={this.renderRowthree}
                            contentContainerStyle={{flexDirection:'row',flexWrap:'wrap', }}
                        />
                    </View>
                    <View style={{marginTop: 10, padding: 10, backgroundColor: '#ffffff'}}>
                        <Image source={{uri: 'help'}} style={{width: width, height: width * 252 / 1125}}
                               resizeMode={'stretch'}/>
                    </View>
                    {this.contentFooter()}
                </ScrollView>

            </View>
        );
    },

    //轮播图片
    renderScrollView(){
        return (
            <View>
                <ScrollView
                    ref='scrollView'
                    horizontal={true}
                    //隐藏
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled={true}
                    onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                    //开始拖拽
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    //停止拖拽
                    onScrollEndDrag={this.onScrollEndDrag}
                >
                    {this.renderChildView()}
                </ScrollView>
                {/*返回指示器*/}
                <View style={styles.pageViewStyle}>
                    {/*返回五个圆点*/}
                    {this.renderPageCircle()}
                </View>
            </View>

        )
    },
    //开始拖拽
    onScrollBeginDrag(){
        this.clearInterval(this.timer);
    },
    //停止拖拽
    onScrollEndDrag(){
        this.startTimer();
    },
    componentDidMount(){
        //开启定时器
        this.startTimer();
    },
    //开启定时器
    startTimer(){
        //1.拿到ScrollView
        var ScrollView = this.refs.scrollView;
        var imgCount = ImageData.data.length;

        //2.添加定时器
        this.timer = this.setInterval(function () {
            //console.log('1');
            //2.1 设置圆点
            var activePage = 0;
            //2.2判断
            if ((this.state.currentPage + 1) >= imgCount) {//越界了
                activePage = 0;
            } else {
                activePage = this.state.currentPage + 1;
            }
            //2.3.更新状态机
            this.setState({
                currentPage: activePage
            });
            //2.4 让ScrollView滚动起来
            //    设置滚动的宽度
            var offSetx = activePage * width;
            ScrollView.scrollResponderScrollTo({x: offSetx, y: 0, animated: true});
            //    开始滚动

        }, this.props.duration)
    },
    //返回子View 所有图片
    renderChildView(){
        //    数组
        var allImage = [];
        // var colors = ['red','green','blue','yellow','purple'];
        var imgsArr = ImageData.data;
        //遍历
        for (var i = 0; i < imgsArr.length; i++) {
            //取出单独的每个对象
            var imgItem = imgsArr[i];
            //创建组件装入数组
            allImage.push(
                <Image key={i} source={{uri: imgItem.img}} resizeMode={'stretch'}
                       style={{width: width, height: width * 0.7 * 440 / 700}}/>
            )
        }
        //返回数组
        return allImage;
    },
    // 返回所有圆点
    renderPageCircle(){
        var indicatorArr = [];
        var style;
        var imgsArr = ImageData.data;
        //遍历
        for (var i = 0; i < imgsArr.length; i++) {
            //判断
            style = (i == this.state.currentPage) ? {color: 'orange'} : {color: 'white'};
            //把圆点装入数组
            indicatorArr.push(
                <Text key={i} style={[{fontSize: 25, color: 'white'}, style]}>&bull;</Text>
            )
        }
        return indicatorArr;
    },
    //设置焦点跟随图片
    onAnimationEnd(e){
        //求出当前水平偏移量
        var offSetX = e.nativeEvent.contentOffset.x;
        //求出当前页数
        var currentPage = Math.floor(offSetX / width);
        //更新状态机
        this.setState({
            //当前的页码
            currentPage: currentPage
        })
    },
    //跳转到登录界面
    toLogin () {
        // alert("登录按钮");
        this.props.navigator.push({
            component: login,
            title: 'login'
        })
    },
    //
    renderRowone(rowData){
        return (
            <TouchableOpacity onPress={()=>{this.clickHomeItem(rowData)}}>
                <View style={{width:width/4-5,justifyContent:'center',alignItems:'center'}}>
                    <Image source={{uri: rowData.img}} resizeMode={'stretch'}
                           style={{width: width / 6, height: width / 6}}/>
                    <Text style={{fontSize: 13, textAlign: 'center', marginTop: 3}}>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        )
    },
    contentTwo(){
        return (
            <View style={{marginTop: 10, padding: 10, backgroundColor: '#ffffff'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>爆款理财</Text>
                </View>
                <Image source={{uri: 'qiangquan'}} style={{width: width, height: width * 170 / 750}}
                       resizeMode={'stretch'}/>
            </View>
        )
    },
    renderRowthree(rowData){
        return (
            <TouchableOpacity  onPress={()=>{this.clickHomeItem(rowData)}}
                              style={{width: width / 2, height: 100, paddingTop: 15, paddingBottom: 15, paddingLeft: 10}}>
                <View>
                    <View style={{borderRightColor: '#e8e8e8', borderRightWidth: 1}}>
                        <View style={{flexDirection: 'row', marginBottom: 2}}>
                            <Text style={styles.longTitle} numberOfLines={1}>{rowData.title}</Text>
                            <Text style={{
                                fontSize: 11,
                                borderWidth: 1,
                                borderColor: '#FF5155',
                                color: '#FF5155',
                                padding: 2
                            }}>{rowData.tag}</Text>
                        </View>
                        <Text style={{fontSize: 18, color: '#FF5155', fontWeight: 'bold'}}>{rowData.percent}%</Text>
                        <Text style={{fontSize: 12, color: '#999'}}>{rowData.desc}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    },
    clickHomeItem(rowdata){
        if(rowdata.title=="理财小金库"||rowdata.title=="活期理财"){
            this.props.navigator.push({
                component:YLCJinKu,
                params: {
                    userId: 1
                }
            })
        }else if(this.state.userId){
            if(rowdata.title=="小白理财"){
                this.props.navigator.push({
                    component:YLCXiaoBai,
                    params: {
                        userId: 1
                    }
                })
            }
            if(rowdata.title=="黄金"){
                this.props.navigator.push({
                    component:YLCHuangJin,
                    params: {
                        userId: 1
                    }
                })
            }
            if(rowdata.title=="保障险"){
                this.props.navigator.push({
                    component:YLCBaoXian,
                    params: {
                        userId: 1
                    }
                })
            }
        }else {
            this.props.navigator.push({
                component: login,
                title: 'login'
            })
        }
    },
    contentFooter(){
        return (
            <View style={{marginTop: 10, paddingTop: 10,paddingBottom: 15}}>
                <Text
                    style={{textAlign:'center',fontSize: 12,paddingTop:10,paddingBottom:10,color:'#999',borderTopWidth:1,borderBottomWidth:1,borderColor:'#e6e6e9'}}>Copyright © 2017-20267 YiLiCai17.com 版权所有</Text>
                <Text style={{textAlign:'center',fontSize: 12,color:'#999',paddingTop:5}}>投资有风险，购买需谨慎</Text>
            </View>
        )
    },

});


//样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4'
    },
    pageViewStyle: {
        width: width,
        height: 25,
        // backgroundColor: 'rgba(241,241,241,0.8)',
        //    定位
        position: 'absolute',
        bottom: 0,

        flexDirection: 'row',
        alignItems: 'center'
    },
    longTitle: {
        fontWeight: 'bold',
        marginRight: 3,
        width: 80
    }
});

module.exports = Home;