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
    TouchableOpacity
} from 'react-native';
export default class EditView extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={LoginStyles.TextInputView}>
                <TextInput style={LoginStyles.TextInput}
                           placeholder={this.props.name}
                           underlineColorAndroid='transparent'
                           value={this.props.value}
                           onChangeText={
                               (text) => {
                                   this.setState({text});
                                   this.props.onChangeText(text);
                               }
                           }/>
            </View>
        );
    }
}


const LoginStyles = StyleSheet.create({
    TextInputView: {
        marginTop: 10,
        height: 40,
        backgroundColor: '#ffffff',
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#000000',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    TextInput: {
        backgroundColor: '#ffffff',
        height: 34,
        marginLeft: 18,
        marginRight: 18,
    },
});