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
import Main  from '../Main'


import InputItem  from  '../../Common/InputItem';
import Square  from '../square/Square';
import ForgotPassWord from './ForgotPassWord'
import HttpUtils from '../../utils/HttpUtils'
import  Register from './Register'

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;


export default class CompleteUserInfo extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            startButtonColor:'#eee',
            name:'',
            birthday:'',
            boyBackgroundColor:'#fff',
            boyBorderColor:'#eee',
            boyTextColor:'blue',
            girlBackgroundColor:'#fff',
            girlBorderColor:'#eee',
            girlTextColor:'pink',
            chooseBoy:false,
            chooseGirl:false,
            isTakePhotoVisible:false,
            buttonTextColor:'#000',
            isCannotChangeSexVisible:false,
            sexButtonTouchAble:true
        };
    }
    _changeStartButonColor(){
        if(this.state.name!==''&&this.state.birthday!==''){
            this.setState({
                startButtonColor:'pink',
                buttonTextColor:'#fff'
            })
            return false;
        }
        if(this.state.name===''||this.state.birthday===''){
            this.setState({
                startButtonColor:'#eee',
                buttonTextColor:'#000'
            })
            return false;
        }
    }
    _changeBoySexButonColor(){
        if(!this.state.chooseBoy&&this.state.sexButtonTouchAble){
            this.setState({
                boyBackgroundColor:'pink',
                boyBorderColor:'pink',
                boyTextColor:'#fff',
                chooseBoy:true,
                chooseGirl:false,
                girlBackgroundColor:'#fff',
                girlBorderColor:'#eee',
                girlTextColor:'pink',
                isCannotChangeSexVisible:true
            })
        }

    }
    _changeGirlSexButonColor(){
        if(!this.state.chooseGirl&&this.state.sexButtonTouchAble){
            this.setState({
                girlBackgroundColor:'pink',
                girlBorderColor:'pink',
                girlTextColor:'#fff',
                chooseGirl:true,
                chooseBoy:false,
                boyBackgroundColor:'#fff',
                boyBorderColor:'#eee',
                boyTextColor:'blue',
                isCannotChangeSexVisible:true
            })
        }

    }
    _handleNameInput(text){
        this.state.name=text;
        this._changeStartButonColor()
    }
    _handleBirthdayInput(text){
        this.state.birthday=text;
        this._changeStartButonColor();
    }


    _uploadImg(){
        this.setState({
            isTakePhotoVisible:true
        })
            this._renderTakePhotoBlockMask();
            this._renderTakePhotoBlock();
    }
    _renderTakePhotoBlock(){
        if(this.state.isTakePhotoVisible){
            return <View style={{zIndex:99,width:KScreenWidth-20,position:'relative',bottom:15,left:10,}}>
                <View style={{backgroundColor:'#fff',marginBottom:10,borderRadius:20}}>
                    <Text style={{height:40,textAlign:'center',lineHeight:30,borderBottomWidth:1,borderColor:'#eee'}}>尤趣是一个真实交友APP，请上传自己的近照</Text>
                    <TouchableOpacity

                    >
                        <Text style={{height:50,color:'blue',textAlign:'center',borderBottomWidth:1,borderColor:'#eee',lineHeight:36,fontSize:18,fontWeight:'bold'}}>拍照</Text>
                    </TouchableOpacity>
                    <TouchableOpacity

                    >
                        <Text style={{height:50,color:'blue',textAlign:'center',lineHeight:36,fontSize:18,fontWeight:'bold'}}>从相册选择</Text>
                    </TouchableOpacity>
                </View>
                <View style={{height:50,backgroundColor:'#fff',borderRadius:20}}>
                    <TouchableOpacity
                        onPress={()=>this.setState({isTakePhotoVisible:false})}
                    >
                        <Text style={{height:50,color:'blue',textAlign:'center',lineHeight:36,fontSize:18,fontWeight:'bold'}}>取消</Text>
                    </TouchableOpacity>
                </View>

            </View>
        }

    }
    _renderTakePhotoBlockMask(){
        if(this.state.isTakePhotoVisible){
            return <View style={styles.mask}>
            </View>
        }

    }
    _confrimHandle(){
        this.setState({
            isCannotChangeSexVisible:false,
            sexButtonTouchAble:false
        });

    }

    _renderCannotChangeSex(){
        if(this.state.isCannotChangeSexVisible){
            return <View style={{width:KScreenWidth-40,backgroundColor:'#fff',position:'absolute',top:300,left:20,borderRadius:20}}>
                    <Text style={{height:70,textAlign:'center',fontSize:18,color:'#000',fontWeight:'bold',borderBottomWidth:1,borderColor:'#eee',lineHeight:50}}>性别选择后不可更改</Text>
                <TouchableOpacity
                    onPress={()=>this._confrimHandle()}
                >
                    <Text style={{height:50,lineHeight:36,textAlign:'center',fontSize:18,color:'blue',fontWeight:'bold',}}>确定</Text>
                </TouchableOpacity>
            </View>
        }
    }

    render(){

        return   <View  style={[styles.container]}>
            <NavigationBar style={styles.NavigationBar}
                           title='完善资料'
                          
            />
            <View style={{position:'relative',top:20,flex:1,alignItems:'center'}}>
                <View style={{marginTop:60,height:120,width:120,backgroundColor:'#eee',borderRadius:60}}>
                    <Image source={require('../../../res/images/ic_computer.png')}
                           style={{width:60,height:60,position:'relative',left:30,top:30}}
                           resizeMode='contain'
                    ></Image>
                </View>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={()=>this._uploadImg()}
                >
                    <Text style={{height:20,fontSize:16,marginTop:10}}>上传头像</Text>
                </TouchableOpacity>

                <View style={{marginTop:10,flexDirection:'row',justifyContent:'space-between',}}>
                    <TouchableOpacity style={[styles.sex,{ backgroundColor:this.state.boyBackgroundColor, borderColor:this.state.boyBorderColor,}]}
                                      onPress={()=>this._changeBoySexButonColor()}
                                      activeOpacity={0.7}
                    >
                        <Image source={require('../../../res/images/ic_code.png')}
                               style={{width:20,height:20,marginRight:10}}
                        />
                        <Text style={{textAlign:'right',height:40,fontWeight:'bold',fontSize:16,        color:this.state.boyTextColor}}>男</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.sex,{ backgroundColor:this.state.girlBackgroundColor, borderColor:this.state.girlBorderColor,}]}
                                      activeOpacity={0.7}
                                      onPress={()=>this._changeGirlSexButonColor()}
                    >
                        <Image source={require('../../../res/images/ic_code.png')}
                               style={{width:20,height:20,marginRight:10}}
                        />
                        <Text style={{textAlign:'center',height:40,fontWeight:'bold',fontSize:16,        color:this.state.girlTextColor}}>女</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop:0,width:250}}>
                       <View style={{position:'relative',flexDirection:'row'}}>
                           <Text style={{position:'absolute',top:19,left:5,fontSize:18,fontWeight:'bold'}}>昵称</Text>
                           <TextInput  style={{paddingLeft:60,width:250,paddingBottom:12}}
                                       placeholder='请输入昵称'
                                       onChangeText={(text)=>this._handleNameInput(text)}
                           />
                       </View>
                        <View style={{position:'relative',flexDirection:'row'}}>
                            <Text style={{position:'absolute',top:19,left:5,fontSize:18,fontWeight:'bold'}}>生日</Text>
                            <TextInput  style={{paddingLeft:60,width:250,paddingBottom:12}}
                                        placeholder='请选择生日'
                                        onChangeText={(text)=>this._handleBirthdayInput(text)}
                            />
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={{position:'absolute',top:20,right:5,width:30,height:30}}
                            >
                                <Image source={require('../../../res/images/ic_code.png')}
                                />
                            </TouchableOpacity>

                        </View>

                   </View>
                <View style={{marginTop:30,width:250,backgroundColor:this.state.startButtonColor,borderRadius:20,}}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={()=>this.props.navigator.push({
                            component:Main
                        })}
                    >
                            <Text style={[styles.start,{color:this.state.buttonTextColor}]} >开始我的尤趣</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {this._renderTakePhotoBlockMask()}
            {this._renderTakePhotoBlock()}
            {this._renderCannotChangeSex()}

        </View>


    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    NavigationBar:{
        fontSize:50,
        height:80

    },
    start:{
        height:40,
        textAlign:'center',
        paddingTop:10,
        fontWeight:'bold',
        fontSize:16,
        borderRadius:20
    },
    sex:{
        height:40,
        width:120,
        marginRight:20,
        paddingTop:10,
        borderRadius:20,
        flexDirection:'row',
        justifyContent:'center',
        borderWidth:1,
    },
    mask:{
        height:KScreenHeight,
        width:KScreenWidth,
        zIndex:9,
        backgroundColor:'#000',
        opacity:0.3,
        position:'absolute',
        top:0
    }

});
