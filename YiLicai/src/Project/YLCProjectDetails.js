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
    ScrollView,
    ViewPagerAndroid,
    TextInput,
    ListView,
    AsyncStorage
} from 'react-native';

import NavBar from '../Common/NavBar';
import Url from '../../app.json';
import NetUitl from '../app/lib/NetUtil';

export default class ProjectDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rowdata: "",
            selectedPage: 0,
            projectsJL: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
        };
        this.touziMoney = "";
    }

    componentWillMount() {
        this.setState({
            rowdata: this.props.rowdata,
            projectsJL: this.state.projectsJL.cloneWithRows(this.props.rowdata.mobileOrderList)
        })
    }

    _onPageClick(position) {
        this.refs.viewPage.setPage(position);
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title="投资项目"
                    leftUri="icon_back"
                    Backpop={()=>{this.goToProject()}}
                />
                <View style={{paddingTop:15,paddingLeft:10,paddingRight:10,flex:1}}>
                    {/*标题*/}
                    <Text
                        style={{borderBottomColor:'#ccc',borderBottomWidth:0.5,fontSize:18,color:'#000'}}>{this.props.rowdata.projectName}</Text>
                    {/*描述*/}
                    <View style={[styles.flexD, styles.two]}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{color: '#fa5513'}}><Text
                                style={{fontSize: 20}}>{this.props.rowdata.projectInterest}</Text>%</Text>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>年化收益</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{color: '#e71e31'}}><Text
                                style={{fontSize: 20}}>{this.props.rowdata.projectLimitday}</Text>天</Text>
                            <Text style={{fontSize: 12, fontWeight: 'bold'}}>{this.props.rowdata.type}</Text>
                        </View>
                    </View>
                    {/*具体信息tab切换*/}
                    <View style={{borderTopWidth:0.5,borderColor:'#ccc',borderLeftWidth:1,borderRightWidth:1,flex:1}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.tab}>
                                <TouchableOpacity onPress={this._onPageClick.bind(this,0)}>
                                    <Text style={{textAlign:'center'}}>产品规则</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.tab}>
                                <TouchableOpacity onPress={this._onPageClick.bind(this,1)}>
                                    <Text style={{textAlign:'center'}}>产品介绍</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.tab}>
                                <TouchableOpacity onPress={this._onPageClick.bind(this,2)}>
                                    <Text style={{textAlign:'center'}}>投资记录</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ViewPagerAndroid style={styles.pageStyle} initialPage={this.state.selectedPage} ref="viewPage">
                            <View style={{paddingTop:7}}>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                >
                                    <View style={{height:50,justifyContent:'center',paddingLeft:15}}>
                                        <Text>项目id：{this.state.rowdata.projectId}</Text>
                                    </View>
                                    <View
                                        style={{height:50,backgroundColor:'#ccc',justifyContent:'center',paddingLeft:15}}>
                                        <Text>项目名称：{this.state.rowdata.projectName}</Text>
                                    </View>
                                    <View style={{height:50,justifyContent:'center',paddingLeft:15}}>
                                        <Text>项目状态：{this.state.rowdata.projectState}</Text>
                                    </View>
                                </ScrollView>
                            </View>
                            <View
                                style={{paddingTop:7,paddingLeft:5,paddingRight:5}}>
                                <ScrollView
                                    showsVerticalScrollIndicator={false}
                                >
                                    <Text style={{color:'orange'}}>产品描述</Text>
                                    <Text>{this.state.rowdata.introPjms}</Text>
                                    <Text style={{color:'orange',marginTop:10}}>企业信息</Text>
                                    <Text>{this.state.rowdata.introQyxx}</Text>
                                    <Text style={{color:'orange',marginTop:10}}>担保详情</Text>
                                    <Text>{this.state.rowdata.introDbxq}</Text>
                                </ScrollView>
                            </View>
                            <View
                                style={{paddingTop:7,paddingLeft:5,paddingRight:5}}>
                                <ListView
                                    showsVerticalScrollIndicator={false}
                                    dataSource={this.state.projectsJL}
                                    renderRow={this.renderRowProjectJL}
                                    enableEmptySections={true}
                                />
                            </View>
                        </ViewPagerAndroid>
                    </View>
                </View>
                <View
                    style={{flexDirection:'row',height:40,alignItems:'center',borderTopColor:'#ccc',borderTopWidth:0.5,justifyContent:'center',padding:10,paddingLeft:20,paddingRight:20}}>
                    <TextInput
                        underlineColorAndroid='transparent'
                        style={{height:30,paddingLeft:10,flex:1,borderColor:'#ccc',borderWidth:0.5}}
                        placeholder="请输入投资金额"
                        onChangeText={(text)=>{this.touziMoney=text}}
                    />
                    <Text
                        onPress={()=>{this.touzi(this.state.rowdata.projectId,this.props.currentId,this.touziMoney)}}
                        style={{color:'#fff',lineHeight:25,height:30,width:80,textAlign:'center',backgroundColor:'#ed5564'}}>立即投资</Text>
                </View>
            </View>
        );
    }

    renderRowProjectJL(rowData) {
        return (
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <Text>{rowData.userId}</Text>
                <Text>{rowData.investMoney}元</Text>
                <Text>{rowData.investTime}</Text>
            </View>
        )
    }

    renderNavBar() {
        return (
            <View style={styles.navBarStyle}>
                {/*左边*/}
                <TouchableOpacity onPress={()=> {
                    this.goToProject()
                }}>
                    <Image source={{uri: 'icon_back'}} style={styles.navLeftStyle}/>
                </TouchableOpacity>
                {/*中间*/}
                <Text style={styles.navCenterStyle}>投资项目</Text>
            </View>
        )
    }

    goToProject() {
        this.props.navigator.pop();
    }

    touzi(projectId, userId, touziMoney) {
        if (userId == null) {
            alert('当前没有用户登录');
        } else {
            let url = Url.localhost + "mobile/userInvestment?projectID=" + projectId + "&userID=" + userId + "&numStr=" + touziMoney;
            NetUitl.getJson(url, (responseText) => {//, formData
                alert(responseText);
            });
            // alert('项目id'+projectId+"用户id"+userId+"投资钱数"+ touziMoney);
        }
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    content: {
        backgroundColor: 'red'
    },
    navCenterStyle: {
        flex: 1,
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 18
    },
    tab: {
        height: 30,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ccc',
        borderColor: '#bbb',
        borderWidth: 1
    },
    pageStyle: {
        flex: 1
    },

    flexD: {
        flexDirection: 'row'
    },
    two: {
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10
    },

});
