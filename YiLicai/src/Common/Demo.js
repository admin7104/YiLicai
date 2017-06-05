/**
 * Created by admin7104 on 2017/4/8.
 */
'use strict';

import React, {AsyncStorage, Component, TouchableOpacity, View, Text, AppRegistry} from 'react-native';

// 数据对应的key
var STORAGE_KEY = 'I_AM_KEY';

export default class Demo extends Component {

    // 获取
    async _get() {
        alert('Demo._get()');
        try {// try catch 捕获异步执行的异常
            var value = await AsyncStorage.getItem(STORAGE_KEY);
            if (value !== null) {
                alert('_get() success: ', value);
            } else {
                alert('_get() no data');
            }
        } catch (error) {
            alert('_get() error: ', error.message);
        }
    }

    // 保存
    async _save(value) {
        alert('Demo._save()');
        try {
            await AsyncStorage.setItem(STORAGE_KEY, value);
            alert('_save success: ', value);
        } catch (error) {
            alert('_save error: ', error.message);
        }
    }

    // 删除
    async _remove() {
        alert('Demo._remove()');
        try {
            await AsyncStorage.removeItem(STORAGE_KEY);
            alert('_remove() success');
        } catch (error) {
            alert('_remove() error: ', error.message);
        }
    }

    render() {
        return (
            <View style={{flexDirection:'column',flex:1,marginTop:50,}}>

                <TouchableOpacity style={{padding:10,flex:1,flexDirection:'row',}}
                                  onPress={()=>this._save('haha').then(()=>alert('you can do something here when the setItem is starting')).done(()=>alert('you can do something here when the setItem is done'))}>
                <Text style={{fontSize:16,color:'#333333'}}>保存数据</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:10,flex:1,flexDirection:'row',}} onPress={()=>this._get().done()}>
                    <Text style={{fontSize:16,color:'#333333'}}>获取数据</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:10,flex:1,flexDirection:'row',}} onPress={()=>this._remove()}>
                    <Text style={{fontSize:16,color:'#333333'}}>删除数据</Text>
                </TouchableOpacity>
            </View>);
    }
}
