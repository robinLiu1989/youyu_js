/**
 * Created by Administrator on 2017/3/27 0027.
 */

import React, { Component } from 'react';
import {
    Text,
    TextInput,
    View,
    NativeModules,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import {toast} from '../../utils/CommonUtils';
import NavigationBar from '../../Common/NavigationBar';
import Square  from '../square/Square'

import Main  from '../Main'

let width = Dimensions.get('window').width;


export default class ForgotPassWord extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            buttonColor:'#eee',
            telText:'',
            pwdText:'',
            verifyCode:'',
            getVerifyCodeButtonText:'获取验证码',
            getVerifyCodeButtonColor:'pink',
            borderColor:'pink',
            isClick:false
        };
    }

    _ChangeTelHandle(text){
        this.setState({
            telText:text,
        })
        this._ChangeButtonColor();
    }

    _ChangePwdHandle(text){
        this.setState({
            pwdText:text,
        })
        this._ChangeButtonColor();
    }

    _VertifyCodeHandle(text){
        this.setState({
            verifyCode:text,
        })
       this._ChangeButtonColor();
    }


    _verifyCodeButton(){
        if(!this.state.isClick){
            this._verifyCodeButton2()
        }
    }

    _verifyCodeButton2(){
            let second=4;
            let _this=this;
            let text='';
            this.setState({
                isClick:true
            })
            let timerId=setInterval(function () {

                if(second<=1){

                    _this.setState({
                        getVerifyCodeButtonText:'重新获取',
                        getVerifyCodeButtonColor:'pink',
                        borderColor:'#eee',
                        isClick:false
                    })
                    clearInterval(timerId);

                }else{
                    second--;
                    text=second===0? second:second+'s';
                    _this.setState({
                        getVerifyCodeButtonText:text,
                        getVerifyCodeButtonColor:'#eee',
                        borderColor:'#eee',
                    })
                }
            },1000)

    }
    
    _ChangeButtonColor(){
        let _this=this;
        setTimeout(function () {
            if(_this.state.pwdText.length>=6&&_this.state.telText.length===11&&_this.state.verifyCode.length===4){
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

    _linkToLoad(){
        if(this.state.telText.length!=11){
            toast('请输入正确的手机号',80);
            return false;
        }
        if(this.state.verifyCode.length!==4){
            toast('验证码错误',80);
            return false;
        }
        if(this.state.pwdText.length<6){
            toast('密码长度不能小于6位',80);
            return false;
        }
        const {navigator}=this.props;
        navigator.push({
            component:Main
        })
    }
    render(){
        return   <View  style={styles.container}>
                <NavigationBar style={styles.NavigationBar}
                    title='忘记密码'
                    leftButtonIcon={require('../../../res/images/ic_code.png')}
                    onLeftButtonPress={()=>this.props.navigator.pop()}
                />
                <View style={styles.forgot}>
                    <View style={styles.inputItem} >
                        <Text style={styles.leftButtonIcon}>+86</Text>
                        <TextInput placeholder={'请输入手机号'} style={styles.value}
                                   onChangeText={(text)=>this._ChangeTelHandle(text)}     
                        />
                    </View>
                    <View style={styles.inputItem2} >
                        <TextInput placeholder={'请输入验证码'} style={styles.phone}
                                   onChangeText={(text)=>this._VertifyCodeHandle(text)}
                        />
                        <TouchableOpacity
                            style={[styles.rightButtonIcon,{backgroundColor:this.state.getVerifyCodeButtonColor,borderColor:this.state.borderColor}]}
                            onPress={this._verifyCodeButton.bind(this)}
                        >
                            <View>
                                <Text style={styles.text}>{this.state.getVerifyCodeButtonText}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.inputItem} >
                        <TextInput placeholder={'设置新密码'} style={styles.phone}
                                   onChangeText={(text)=>this._ChangePwdHandle(text)}
                                   secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this._linkToLoad.bind(this)}
                    >
                        <View>
                            <Text  style={[styles.load,{backgroundColor:this.state.buttonColor}]}>提交并登录</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            
        </View>
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        fontSize:50
    },

    inputItem:{
        height:50,
        width: width,
        position: 'relative',
        top:80,
        paddingLeft:30,
        paddingRight:30,
        marginBottom:50,
    },
    inputItem2:{
        height:50,
        width: width,
        position: 'relative',
        top:80,
        paddingLeft:30,
        paddingRight:180,
        marginBottom:20,
    },
    forgot:{
        marginTop:30,

    },
    value:{
        paddingLeft:65,
        fontSize:16,
        color:'red',
        paddingBottom:20,
    },
    phone:{
        paddingLeft:15,
        fontSize:16,
        color:'red',
        paddingBottom:20,
    },
    leftButtonIcon: {
        width: 50,
        height: 25,
        top:30,
        left:10,
        fontSize:20,
        color:"#000"
    },
    rightButtonIcon: {
        position:'absolute',
        width: 120,
        height: 45,
        top:-5,
        right:35,
        borderWidth:1,
        borderColor:'pink',
        padding:10,
        borderRadius:10
    },
    load:{
        textAlign:'center',
        fontSize:20,
        backgroundColor:'#eee',
        height:40,
        lineHeight:35,
        marginLeft:20,
        marginRight:20,
        marginTop:50,
        borderRadius:20,
        color:'white'
    },
    text:{
        height:22,
        lineHeight:22,
        textAlign:'center'
    }

});
