/**
 * Created by admin7104 on 2017/4/9.
 */
/**
 * Created by Administrator on 2017/3/29 0029.
 */
import React, {Component} from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ListView
} from 'react-native';

import NavBar from '../../Common/NavBar';

export default class MyTouziListActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tList: new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2}),
            yList: new ListView.DataSource({rowHasChanged: (r1, r2)=> r1 !== r2})
        }
    }

    componentDidMount() {
        this.setState({
            tList: this.state.tList.cloneWithRows(this.props.tList),
            yList: this.state.tList.cloneWithRows(this.props.yList),
        })
    }

    render() {
        return (
            <View style={LoginStyles.loginview}>
                <NavBar
                    leftUri="icon_back"
                    title="我的投资记录"
                    Backpop={()=>{this.returnCount()}}
                />
                <Text>今天投资记录</Text>
                <ListView
                    showsVerticalScrollIndicator={false}
                    dataSource={this.state.tList}
                    renderRow={this.renderTList}
                />
                <Text>昨天投资记录</Text>
                <ListView
                    showsVerticalScrollIndicator={false}
                    dataSource={this.state.yList}
                    renderRow={this.renderYList}
                />
            </View>
        )
    }

    returnCount() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    };

    renderTList(rowData) {
        return (
            <View>
                <Text>项目id：{rowData.projectId}</Text>
                <Text>投资金额：{rowData.investMoney}</Text>
                <Text>投资时间：{rowData.investTime}</Text>
            </View>
        )
    }

    renderYList(rowData) {
        return (
            <View>
                <Text>项目id：{rowData.project_ID}</Text>
                <Text>投资金额：{rowData.invest_money}</Text>
                <Text>投资时间：{rowData.invest_time}</Text>
            </View>
        )
    }

}


const LoginStyles = StyleSheet.create({
    loginview: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});