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
    Button,
    InteractionManager
} from 'react-native';

import {toast} from '../../utils/CommonUtils';

import NavigationBar from '../../Common/NavigationBar';


import InputItem  from  '../../Common/InputItem';
import Square  from '../square/Square';
import Main  from '../Main';
import ForgotPassWord from './ForgotPassWord'
import HttpUtils from '../../utils/HttpUtils'
import  Register from './Register'


const LOGIN_URL='http://115.28.78.5/api/user/login'

export default class Login extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            telText:'',
            pwdText:'',
            disabled:true,
            buttonColor:'#eee',
            result:''
        };
    }
    _linkToLogin(){
        // if(this.state.telText.length!=11){
        //     toast('请输入正确的手机号',220);
        //     return false;
        // }
        // if(this.state.pwdText.length<6){
        //     toast('密码长度不能小于6位',220);
        //     return false;
        // }

        const userInfo={
            phone:this.state.telText,
            passWord:this.state.pwdText,
            verifyCode:this.state.verifyCode
        }

        // this._requestService(userInfo);
        const {navigator}=this.props;
        navigator.push({
            component:Main
        })

    }

    _requestService(userInfo){
        const  postData='mobile='+userInfo.phone+'&password='+userInfo.passWord
        HttpUtils.post(LOGIN_URL,postData)
            .then(result=>{
                console.log(result)
                //访问成功后的处理，状态码为0000
                if(result.state==='0000'){
                    const {navigator}=this.props;
                    navigator.push({
                        component:Main
                    })
                }
                //访问成功后的处理,状态码为403
                else{
                    toast('用户名或密码错误',220)
                }

            })
            .catch(err=>{
                console.log(err)
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
                    buttonColor:'green',
                })
            }else{
                _this.setState({
                    buttonColor:'#eee',
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
                    buttonColor:'green',
                    disabled:true,
                })
            }else{
                _this.setState({
                    buttonColor:'#eee',
                    disabled:false
                })
            }
        },10)
    }
   

    render(){

        return   <View  style={[styles.container]}>
            <NavigationBar style={styles.NavigationBar}
                           title='登录'
                           leftButtonIcon={require('../../../res/images/ic_code.png')}
                           rightButtonTitle='注册'
                           onRightButtonPress={()=>this._linkToRegister()}
            />

            <View  style={styles.userverify}>
                <InputItem
                    leftButtonIcon={require('../../../res/images/ic_computer.png')}
                    placeHolderText='请输入登录手机号'
                    maxLength={13}
                    onChangeText={(text)=>this._ChangeTelHandle(text)}
                   
                />
                <InputItem
                    leftButtonIcon={require('../../../res/images/ic_computer.png')}
                    placeHolderText='请输入密码'
                    maxLength={20}
                    secureTextEntry={true}
                    onChangeText={(text)=>this._ChangePwdHandle(text)}
                />
            </View>
                <TouchableOpacity
                    onPress={this._linkToLogin.bind(this)}
                    activeOpacity={0.7}>
                        <View>
                             <Text  style={[styles.login,{backgroundColor:this.state.buttonColor}]}>登录</Text>
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
    },
    login:{
        textAlign:'center',
        fontSize:20,
        backgroundColor:'#eee',
        height:40,
        lineHeight:35,
        marginLeft:20,
        marginRight:20,
        borderRadius:20
    },
    forgotPwd:{
        textAlign:'center',
        fontSize:20,
        marginTop:20
    },
    userverify:{
        height:300,
        position:'relative'
    },
});
