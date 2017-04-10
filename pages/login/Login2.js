/**
 * Created by Administrator on 2017/3/27 0027.
 */

import React, { Component,PropTypes} from 'react';
import {
    Text,
    TextInput,
    View,
    NativeModules,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    Button
} from 'react-native';

import {toast} from '../../utils/CommonUtils';

import NavigationBar from '../../Common/NavigationBar';


import InputItem  from  '../../Common/InputItem'
import Main  from '../Main'
import ForgotPassWord   from './ForgotPassWord'
import Register from './Register'

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;

export default class Login extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            telText:'',
            pwdText:'',
            disabled:true,
            buttonColor:'#cccccc',
        };
    }

    _linkToLoad(){
        if(this.state.telText.length!=11){
            toast('请输入正确的手机号',220);
            return false;
        }
        if(this.state.pwdText.length<6){
            toast('密码长度不能小于6位',220);
            return false;
        }
            const {navigator}=this.props;
            navigator.push({
                component:Main
            })
    }

    _linkToForgotPassWord(){
        const {navigator}=this.props;
        navigator.push({
            component:ForgotPassWord
        })
    }

    _linkToRegister(){
        const {navigator}=this.props;
        navigator.push({
            component:Register
        })
    }

    _ChangeTelHandle(text){
        let _this=this;
        this.setState({
            telText:text,
        })
        setTimeout(function () {
            if(_this.state.pwdText.length>=6&&_this.state.telText.length===11){
                _this.setState({
                    buttonColor:'ff5077',
                })
            }else{
                _this.setState({
                    buttonColor:'#cccccc',
                })
            }
        },10)
    }

    _ChangePwdHandle(text){
        let _this=this;
        this.setState({
            pwdText:text,
        })
        setTimeout(function () {
            if(_this.state.pwdText.length>=6&&_this.state.telText.length===11){
                _this.setState({
                    buttonColor:'#ff5077',
                    disabled:true,
                })
            }else{
                _this.setState({
                    buttonColor:'#cccccc',
                    disabled:false
                })
            }
        },10)
    }

    setupInputView(){
        return(
            <View style={{height:150 , flexDirection:'column'}}>
                <View style={{marginTop:20 , marginLeft:20 , marginRight:20 , height:50 , flexDirection:'row'}}>
                    <View style={{marginLeft:10 , marginTop:12.5 , width:25 , height:25}}>
                        <Text style  ={{fontFamily: 'iconfont', fontSize: 25}}>
                            &#xe6ca;
                        </Text>
                    </View>
                    <View style={{height:50 , marginLeft:10 , width:KScreenWidth - 100}}>
                        <TextInput
                            style={{fontSize: 16,height:50}}
                            placeholder='请输入登录手机号'
                            keyboardType='numeric'
                            onChangeText={(text)=>this._ChangeTelHandle(text)}
                        />
                    </View>
                </View>
                <View style={{marginLeft:20 , marginRight:20 , height:50 , flexDirection:'row'}}>
                    <View style={{marginLeft:10 , marginTop:12.5 , width:25 , height:25}}>
                        <Text style  ={{fontFamily: 'iconfont', fontSize: 25}}>
                            &#xe694;
                        </Text>
                    </View>
                    <View style={{height:50 , marginLeft:10 , width:KScreenWidth - 100}}>
                        <TextInput
                            style={{fontSize: 16,height:50}}
                            placeholder='请输入密码'
                            keyboardType='default'
                            onChangeText={(text)=>this._ChangePwdHandle(text)}
                        />
                    </View>
                </View>
            </View>
        )
    }

    render(){

        return   <View  style={styles.container}>
            <NavigationBar style={styles.NavigationBar}
                           title='登录'
                           leftButtonIcon={require('../../../res/images/ic_code.png')}
                           rightButtonTitle='注册'
                           onLeftButtonPress={()=>this._linkToForgotPassWord()}
                           onRightButtonPress={()=>this._linkToRegister()}
            />
            {/*<View  style={styles.userverify}>*/}
                {/*<InputItem*/}
                    {/*leftButtonIcon={require('../../../res/images/ic_computer.png')}*/}
                    {/*placeHolderText='请输入登录手机号'*/}
                    {/*maxLength={13}*/}
                    {/*onChangeText={(text)=>this._ChangeTelHandle(text)}*/}
                {/*/>*/}
                {/*<InputItem*/}
                    {/*leftButtonIcon={require('../../../res/images/ic_computer.png')}*/}
                    {/*placeHolderText='请输入密码'*/}
                    {/*maxLength={20}*/}
                    {/*secureTextEntry={true}*/}
                    {/*onChangeText={(text)=>this._ChangePwdHandle(text)}*/}
                {/*/>*/}
            {/*</View>*/}

            {this.setupInputView()}

            <TouchableOpacity
                onPress={this._linkToLoad.bind(this)}
                activeOpacity={0.7}>
                <View style={{borderRadius:20}}>
                    <Text  style={[styles.load,{backgroundColor:this.state.buttonColor}]}>登录</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={this._linkToForgotPassWord.bind(this)}
                activeOpacity={0.7}>
                <View>
                    <Text  style={styles.forgotPwd}>忘记密码</Text>
                </View>
            </TouchableOpacity>

        </View>
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page1:{
        flex:1,
        // backgroundColor:'green'
    },
    page2:{
        flex:1,
        // backgroundColor:'yellow'
    },
    img:{
        height:22,
        width:22
    },
    text:{
        height:100,
        fontSize:30
    },

    NavigationBar:{
        fontSize:50,
        height:80
    },
    load:{
        textAlign:'center',
        fontSize:20,
        backgroundColor:'#cccccc',
        height:40,
        lineHeight:35,
        marginLeft:20,
        marginRight:20,
        borderRadius:20,
        color:'white',
    },
    forgotPwd:{
        textAlign:'center',
        fontSize:14,
        marginTop:20,
        color:'gray',
    },
    userverify:{
        height:300,
        position:'relative'
    },




});
