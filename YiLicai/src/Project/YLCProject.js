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
    TouchableOpacity,
    Platform,
    ListView,
    AsyncStorage,
    InteractionManager
} from 'react-native';

let Dimensions = require('Dimensions');
const {width, height} = Dimensions.get('window');

import ProjectCommonCell from './YLCProjectCommonCell';
import ProjectDetails from './YLCProjectDetails';
let projectData = require('../../projectData.json');

import NavBar from '../Common/NavBar';
import Url from '../../app.json';
let sxzdTemp,sxsxTemp,urlTemp;

const Project = React.createClass({
    getInitialState: function () {
        //返回数据
        return {
            projects:new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2}),
            currentId: '',
            url:Url.localhost+ "mobile/gitProjects",
            shaixuanziduan:'begtime',
            shaixuanshunxu:'0',
            begtimeImgUri:'',
            endtimeImgUri:'',
            interestImgUri:'',
            investmentImgUri:'',
        }
    },
    componentWillMount() {
        InteractionManager.runAfterInteractions(()=>{
            this.fetchData(this.state.url);
            this.getValue();
        });
    },
    getValue() {
        try {// try catch 捕获异步执行的异常
            AsyncStorage.getItem('userId', (error, result)=> {
                if (error) {
                    this.setState({
                        currentId: ''
                    })
                }
                else {
                    this.setState({
                        currentId: result
                    })
                }
            });
        } catch (error) {
            alert('_get() error: ', error.message);
        }
    },
    fetchData(urlTemp) {
        fetch(urlTemp)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    projects: this.state.projects.cloneWithRows(responseData),
                });
            })
            .done();
    },
    render() {
        // alert(this.state.projects);
        return (
            <View style={styles.container}>
                <NavBar
                    title="投资项目"
                    rightUri="icon_shaixuan"
                    rightImg={()=>{this.shaixuan()}}
                />
                <Image source={{uri: 'bgproject'}} style={styles.bgProject}/>
                {/*排序*/}
                <View style={styles.orderStyle}>
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 12}} onPress={()=>this.updateUrl('上架时间')}>上架时间</Text>
                            <Image source={{uri: this.state.begtimeImgUri}} style={styles.updown}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 12}} onPress={()=>this.updateUrl('结束时间')}>结束时间</Text>
                            <Image source={{uri: this.state.endtimeImgUri}} style={styles.updown}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 12}} onPress={()=>this.updateUrl('利率')}>利率</Text>
                            <Image source={{uri: this.state.interestImgUri}} style={styles.updown}/>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 12}} onPress={()=>this.updateUrl('起投金额')}>起投金额</Text>
                            <Image source={{uri: this.state.investmentImgUri}} style={styles.updown}/>
                        </View>
                    </TouchableOpacity>
                </View>
                <ListView
                    showsVerticalScrollIndicator={false}
                    dataSource={this.state.projects}
                    renderRow={this.renderRowProject}
                />
            </View>
        );
    },
    shaixuan(){
        alert("筛选图片");
    },
    renderRowProject(rowData){
        return (
            <TouchableOpacity onPress={()=>{this.goToTouzi(rowData)}}>
                <ProjectCommonCell
                    rowdata={rowData}
                />
            </TouchableOpacity>
        )
    },
    goToTouzi(rowdata){
        this.props.navigator.push({
            component: ProjectDetails,
            title: "投资项目",
            params: {
                rowdata: rowdata,
                currentId:this.state.currentId
            }
        })
    },
    updateUrl(txt){
        switch(txt){
            case '上架时间':
                // alert('begtime');
                sxzdTemp = 'begtime';
                break;
            case '结束时间':
                // alert('endtime');
                sxzdTemp = 'endtime';
                break;
            case '利率':
                // alert('interest');
                sxzdTemp = 'interest';
                break;
            case '起投金额':
                // alert('investment');
                sxzdTemp = 'investment';
                break;
        }
        if(this.state.shaixuanshunxu==0){
            this.setState({
                shaixuanshunxu:1
            });
            sxsxTemp = 1;
        }else {
            this.setState({
                shaixuanshunxu:0
            });
            sxsxTemp = 0;
        }

        //'icon_up'
        //icon_down_gray
        if(sxsxTemp==0){
            switch(sxzdTemp){
                case 'begtime':
                    break;
            }
        }
        urlTemp = this.state.url+"?"+sxzdTemp+"="+sxsxTemp;
        // alert("更新的url"+urlTemp);
        this.componentWillReceiveProps();
    },
    componentWillReceiveProps(){
        // alert("开始刷新啦");
        this.fetchData(urlTemp);
    },
    shouldComponentUpdate(){
        return true;
    },
    componentDidUpdate(){
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4'
    },
    bgProject: {
        width: width,
        height: height * 0.15,
        resizeMode: 'stretch'
    },
    orderStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 36
    },
    updown: {
        width: 12,
        height: 12,
        marginTop: 2
    }
});

module.exports = Project;