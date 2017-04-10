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
import Squre from '../pages/Square';

let width = Dimensions.get('window').width;

class InputItem extends  Component{
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
        return {
            placeHolderText,
            leftButtonIcon,
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

    render(){

        return   <View style={styles.inputItem} >
            <View >
                 {this._renderLeftIcon()}
            </View>
            <TextInput placeholder={this.state.placeHolderText} style={styles.value} />

        </View>
    }
}




export default  class UserVerifyForLoad extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            pwdLength:0,
            pwdText:''
        };
    }
   
    _link(){
        const {navigator}=this.props;
        navigator.push({
            component:Squre
        });
    }
    render(){

        return   <View  style={styles.userverify}>
             <InputItem
                 leftButtonIcon={require('../../res/images/ic_computer.png')}
                 placeHolderText='请输入登录手机号'
                 maxLength={13}
             />
            <InputItem
                leftButtonIcon={require('../../res/images/ic_computer.png')}
                placeHolderText='请输入密码'
                maxLength={20}
                
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
        left:10
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



