/**
 * Created by Administrator on 2017/3/27 0027.
 */

import React, { Component, PropTypes} from 'react';
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Image,
    Dimensions,
    Button
} from 'react-native';
import Squre from '../pages/square/Square';

let width = Dimensions.get('window').width;

export default  class InputItem extends  Component{
    static propTypes = {
        placeHolderText : PropTypes.string,

    };
    

    componentWillMount(){
        this.state = this._getStateFromProps(this.props);
    }

    componentWillReceiveProps(newProps){
        let newState = this._getStateFromProps(newProps);
        this.setState(newState);
    }

    shouldComponentUpdate(nextProps, nextState, context) {
        return JSON.stringify([nextState, context]) !== JSON.stringify([this.state, context]);
    }

    _getStateFromProps(props){
        let placeHolderText = props.placeHolderText;
        let leftButtonIcon = props.leftButtonIcon;
        let onChangeText=props.onChangeText;
        let onPress=props.onPress;
        let secureTextEntry=props.secureTextEntry;
        let maxLength=props.maxLength;

        return {
            placeHolderText,
            leftButtonIcon,
            onChangeText,
            onPress,
            secureTextEntry,
            maxLength
        };
    }
    _renderLeftIcon() {
        if(this.state.leftButtonIcon){
            return (
                <Image style={styles.leftButtonIcon} resizeMode={'contain'} source={this.state.leftButtonIcon} />
            );
        }
        return null;
    }
    _ChangeTextHandle(event){
        let onChangeText = this.state.onChangeText;
        typeof onChangeText === 'function' && onChangeText(event);
    }
    _onPressHandle(event){
        let onPress = this.state.onPress;
        typeof onPress === 'function' && onPress(event);
    }

    render(){

        return   <View style={styles.inputItem} >
            <View >
                 {this._renderLeftIcon()}
            </View>
            <TextInput placeholder={this.state.placeHolderText} style={styles.value}
                       onChangeText={this._ChangeTextHandle.bind(this)}
                       secureTextEntry={this.state.secureTextEntry}
                       maxLength={this.state.maxLength}
            />

        </View>
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        width: width
    },

    inputItem:{
        height:50,
        width: width,
        position: 'relative',
        top:80,
        paddingLeft:30,
        paddingRight:30,
    },
    leftButtonIcon: {
        width: 20,
        height: 25,
        top:35,
        left:10,
        position:'relative'
    },
    value:{
        paddingLeft:65,
        fontSize:16,
        color:'red'
    },
    userverify:{
        height:300,
    },
    button:{
        position:'relative',
        height:50,
        top:150,
        marginLeft:30,
        marginRight:30,
        borderRadius:5
    }
});



