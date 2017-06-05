/**
 * Created by admin7104 on 2017/4/4.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

import EditView from '../app/lib/EditView';
import AddButton from '../app/lib/LoginButton';
import NetUitl from '../app/lib/NetUtil';
import Url from '../../app.json'
import NavBar from '../Common/NavBar';

export default class AddMoneyManage extends Component {
    constructor(props) {
        super(props);
        this.project_name = "";
        this.project_interest = "";
        this.project_minmoney = "";
        this.project_tag = "";
        this.project_starttime = "";
        this.project_endtime = "";
        this.intro_qyxx = "";
        this.intro_dbxq = "";
        this.intro_pjms = "";
    }

    render() {
        return (
            <View style={styles.container}>
                <NavBar
                    title="添加投资项目"/>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.addProject}>
                        <EditView name='项目名称' onChangeText={(text) => {
                            this.project_name = text;
                        }}/>
                        <EditView name='项目利率' onChangeText={(text) => {
                            this.project_interest = text;
                        }}/>
                        <EditView name='项目期限' onChangeText={(text) => {
                            this.project_limitday = text;
                        }}/>
                        <EditView name='起投金额' onChangeText={(text) => {
                            this.project_minmoney = text;
                        }}/>
                        <EditView name='标签' onChangeText={(text) => {
                            this.project_tag = text;
                        }}/>
                        <EditView name='项目描述' onChangeText={(text) => {
                            this.intro_pjms = text;
                        }}/>
                        <EditView name='企业信息' onChangeText={(text) => {
                            this.intro_qyxx = text;
                        }}/>
                        <EditView name='担保详情' onChangeText={(text) => {
                            this.intro_dbxq = text;
                        }}/>
                        <AddButton name='添加' onPressCallback={this.onAddCallback}/>
                    </View>
                </ScrollView>
            </View>
        )
    };
    onAddCallback = () => {

        // let formData = new FormData();
        // formData.append("projectName", this.project_name);
        // formData.append("projectInterest", this.project_interest);
        // formData.append("projectLimitday", this.project_limitday);
        // formData.append("projectMinmoney", this.project_minmoney);
        // formData.append("projectTag", this.project_tag);
        // formData.append("introQyxx", this.intro_qyxx);
        // formData.append("introDbxq", this.intro_dbxq);
        // formData.append("introPjms", this.intro_pjms);
        //
        // alert((formData));

        this.project_name = this.project_name.replace(/^ +/, '');
        this.project_interest = this.project_interest.replace(/^ +/, '');
        this.project_minmoney = this.project_minmoney.replace(/^ +/, '');
        this.project_tag = this.project_tag.replace(/^ +/, '');
        this.project_starttime = this.project_starttime.replace(/^ +/, '');
        this.project_endtime = this.project_endtime.replace(/^ +/, '');
        this.intro_qyxx = this.intro_qyxx.replace(/^ +/, '');
        this.intro_dbxq = this.intro_dbxq.replace(/^ +/, '');
        this.intro_pjms = this.intro_pjms.replace(/^ +/, '');
        let url = Url.localhost + "mobile/addProject?projectName=" + this.project_name + "&projectInterest=" + this.project_interest + "&projectLimitday="+this.project_limitday+"&projectMinmoney=" + this.project_minmoney + "&projectTag=" + this.project_tag + "&introQyxx=" + this.intro_qyxx + "&introDbxq=" + this.intro_dbxq + "&introPjms=" + this.intro_pjms;
        NetUitl.getJson(url, (responseText) => {//, formData
            alert(responseText);
        })
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efeff4'
    },
    navBarStyle: {
        height: 48,
        backgroundColor: '#ed5564',

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    navCenterStyle: {
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 18
    },
    addProject: {
        padding: 20
    },
});


