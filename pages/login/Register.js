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
    InteractionManager
} from 'react-native';

import {toast} from '../../utils/CommonUtils';
import NavigationBar from '../../Common/NavigationBar';
import Square  from '../square/Square'
import HttpUtils from '../../utils/HttpUtils'
import CompleteUserInfo  from './CompleteUserInfo'

import Main  from '../Main'
import Login from './Login'



let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;


const REGISTER_URL='http://115.28.78.5/api/user/register'


let getVerifyCodeTimerId=null;

export default class Register extends  Component{

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
            getVerifyBorderColor:'pink',
            isClick:false,
            VerifyButtonDisabled:false,
            buttonText:'注册',
            showAlreadyRegister:false,

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
            let second=60;
            let text='';
            this.setState({
                isClick:true
            })
            this._startTimer(second,text);

        }
    }
    _startTimer(second,text){
        let _this=this;
        getVerifyCodeTimerId=setInterval(function () {
            if(second<=1){
                _this.setState({
                    getVerifyCodeButtonText:'重新获取',
                    getVerifyCodeButtonColor:'pink',
                    getVerifyBorderColor:'pink',
                    isClick: false
                })
                clearInterval(getVerifyCodeTimerId);

            }else{
                second--;
                text=second===0? second:second+'s';
                _this.setState({
                    getVerifyCodeButtonText:text,
                    getVerifyCodeButtonColor:'#eee',
                    getVerifyBorderColor:'#eee',
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
                    buttonText:'提交并登录'
                })
            }else{
                _this.setState({
                    buttonColor:'#eee',
                    buttonText:'注册'
                })
            }
        },10)
    }

    _Register(){
        const userInfo={
            phone:this.state.telText,
            passWord:this.state.pwdText,
            verifyCode:this.state.verifyCode
        }
        // if(this.state.telText.length!=11){
        //     toast('请输入正确的手机号',80);
        //     return false;
        // }
        // if(this.state.verifyCode.length!==4){
        //     toast('验证码错误',80);
        //     return false;
        // }
        // if(this.state.pwdText.length<6){
        //     toast('密码长度不能小于6位',80);
        //     return false;
        // }

        // this._requestService(userInfo);

        const {navigator}=this.props;
        navigator.push({
            component:CompleteUserInfo
        })


        // const {navigator}=this.props;
        // navigator.push({
        //     component:Login
        // })
    }

    _requestService(userInfo){
        const  postData='mobile='+userInfo.phone+'&password='+userInfo.passWord+'&VerificationCode=9999'
        HttpUtils.post(REGISTER_URL,postData)
            .then(result=>{
                console.log(result)
                //访问成功后的处理，状态码为0000
                if(result.state==='0000'){
                    const {navigator}=this.props;
                    navigator.push({
                        component:Login
                    })

                }
                //访问成功后的处理,状态吗为403
                else{

                    let msg=result.message.mobile ||result.message.password;
                    if(msg=='密码不能为空！'){
                        toast(msg,80);
                        return false;
                    }

                    if(msg=='该手机号码已存在！'){
                        msg=msg+'请直接登录';
                        this.setState({
                            getVerifyBorderColor:'#eee',
                            getVerifyCodeButtonColor:'#eee',
                            showAlreadyRegister:true,
                            VerifyButtonDisabled:true,
                        })
                        clearInterval(getVerifyCodeTimerId);
                        return false;
                    }
                    // toast(msg,80);
                }

            })
            .catch(err=>{
               console.log(err)
            })

    }
    _cancelHandle(){
        this.setState({
            showAlreadyRegister:false,
            VerifyButtonDisabled:false,
            getVerifyCodeButtonText:'获取验证码',
            getVerifyCodeButtonColor:'pink',
            getVerifyBorderColor:'pink',
            isClick: false
        })
    }
    _confirm(){
        const {navigator}=this.props;
       
        navigator.push({
            component:Login
        })


    }
    _renderAlreadyRrgister(){
        if(this.state.showAlreadyRegister){
            return <View style={styles.alreadyRrgister}>
                    <Text style={{fontSize:18,marginTop:20,textAlign:'center',fontWeight:'bold'}}>账号已注册，是否直接登录？</Text>
                    <View style={{ flexDirection:'row',justifyContent:'center'}}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={()=>this._cancelHandle()}
                        >
                            <Text style={styles.alreadyRrgisterText}>取消</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={()=>this._confirm()}


                        >
                            <Text style={styles.alreadyRrgisterText}>登录</Text>
                        </TouchableOpacity>

                    </View>

                </View>

        }

    }
    _renderAlreadyRrgisterMask(){
        if(this.state.showAlreadyRegister){
            return <View style={styles.mask}>

            </View>
        }
    }

    render(){
        return   <View  style={styles.container}>
                <NavigationBar style={styles.NavigationBar}
                    title='注册'
                    titleSize={16}
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
                            style={[styles.rightButtonIcon,{backgroundColor:this.state.getVerifyCodeButtonColor,borderColor:this.state.getVerifyBorderColor}]}
                            onPress={this._verifyCodeButton.bind(this)}
                            disabled={this.state.VerifyButtonDisabled}
                        >
                            <View>
                                <Text style={styles.text}>{this.state.getVerifyCodeButtonText}</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.inputItem} >
                        <TextInput placeholder={'请设置密码'} style={styles.phone}
                                   onChangeText={(text)=>this._ChangePwdHandle(text)}
                                   secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this._Register.bind(this)}
                    >
                        <View>
                            <Text  style={[styles.load,{backgroundColor:this.state.buttonColor}]}>{this.state.buttonText}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.agreement}>
                        <Text style={styles.agree1}>注册代表您已阅读并同意</Text>
                        <Text style={styles.agree2}>用户协议</Text>
                    </View>

                </View>
                 {this._renderAlreadyRrgisterMask()}
                 {this._renderAlreadyRrgister()}

            
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
        width: KScreenWidth,
        position: 'relative',
        top:80,
        paddingLeft:30,
        paddingRight:30,
        marginBottom:50,
    },
    inputItem2:{
        height:50,
        width: KScreenWidth,
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
        color:'#000',
        paddingBottom:20,
    },
    phone:{
        paddingLeft:15,
        fontSize:16,
        color:'#000',
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
    },
    agreement:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:15,

    },
    agree1:{
        textAlign:'center',
        fontSize:15
    },
    agree2:{
        textAlign:'center',
        fontSize:15,
        color:'red',
        borderBottomWidth:1,
        borderBottomColor:'red',
    },

    mask:{
        backgroundColor:'#000',
        opacity:0.3,
        width:KScreenWidth,
        height:KScreenHeight,
        zIndex:99,
        position:'absolute',
    },
    alreadyRrgister:{
        zIndex:99,
        height:100,
        width:KScreenWidth-80,
        position:'absolute',
        top:300,
        left:40,
        backgroundColor:'white',
        borderRadius:10,

    },
    alreadyRrgisterText:{
        fontSize:16,
        marginTop:20,
        textAlign:'center',
        color:'#0E81FF',
        fontWeight:'bold',
        width:120

    }


});
