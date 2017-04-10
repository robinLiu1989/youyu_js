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
    Platform
} from 'react-native';

import NavigationBar from '../../../Common/NavigationBar';
import MatchModel from '../MatchModel'
import MySubmitButton from '../../../Common/MySubmitButton'
import Square from '../../square/Square'

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;


export default class GetTrueWordSingle extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            backgroundColor:'#f1f1f1',
            redPacketType:'kaixin',
            forGroupOwner:false,
            isGettingMoney:false,

            titleText:{
               ing:'正在疯抢中',
            }
            // '#FF5077'
        };
    }

    _renderTitle(){
        if(!this.state.isGettingMoney){
            return <View style={{backgroundColor:'#ccc',width:KScreenWidth,height:40,position:'relative',top:0 }}>
                <Text style={{paddingLeft:15,paddingTop:12}}>1个红包，共10尤票</Text>
            </View>
        }
        return <View style={{backgroundColor:'#ccc',width:KScreenWidth,height:40,position:'relative',top:-50 }}>
            <Text style={{paddingLeft:15,paddingTop:12}}>红包金额10尤票，等待对方领取</Text>
        </View>

    }
    _renderWhoGet(){
        if(!this.state.isGettingMoney){
            return <View style={{width:KScreenWidth-10,marginLeft:10,height:100,top:0,flexDirection:'row',paddingTop:10,borderBottomWidth: 1,borderColor:'#f1f1f1'}}>
                <Image
                    source={require('../../../../res/images/model2.jpg')}
                    style={{width:50,height:50,borderRadius:25}}
                />
                <View style={{paddingLeft:15,paddingTop:5}}>
                    <Text style={{height:22,color:'#000'}}>Tim新亮</Text>
                    <Text style={{width:KScreenWidth-180}}>答案：最喜欢英俊神武玉树临风高大威猛型的男人</Text>
                    <Text style={{paddingTop:5}}>3-17 19:20</Text>
                </View>
                <Text style={{right:10,top:40,position:'absolute',color:'#000'}}>10尤票</Text>
            </View>
        }


    }

    render(){

        return   <View  style={styles.container}>
            <View style={{zIndex:99,height:Platform.OS === 'ios' ? 44 : 44}}>
                <NavigationBar
                    title='尤趣红包'
                    leftButtonIcon={require('../../../../res/images/ic_code.png')}
                    onLeftButtonPress={()=>this.props.navigator.pop()}
                />
            </View>

            <View style={{alignItems:'center',marginTop:0,}}>
                <View style={{width:200,height:200,backgroundColor:'#FF5077',borderRadius:100,transform:[{scaleX:KScreenWidth/200}],position:'relative',top:-100,zIndex:9}}>
                </View>
                <View style={{height:102,width:102,borderRadius:50,borderWidth:2,borderColor:'yellow', position:'relative',top:-150,backgroundColor:'#fff',zIndex:999}}>
                    <Image source={require('../../../../res/images/model2.jpg')}
                           style={{width:100,height:100,borderRadius:50,top:-1,left:-1}}

                    />
                </View>
                <View style={{position:'absolute',top:160,alignItems:'center',width:KScreenWidth}}>
                    <Text style={{fontWeight:'bold'}}>青楼满座的真心话红包</Text>
                    <View style={{flexDirection:'row',justifyContent:'center',margin:0,}}>
                        <Text style={{fontSize:40,fontWeight:'bold'}}>10</Text>
                        <Text style={{marginTop:25,marginLeft:5}}>尤票</Text>
                    </View>
                    <TouchableOpacity style={{top:0,height:20}}>
                        <Text style={{color:'red'}}>已存入尤趣红包</Text>
                    </TouchableOpacity>

                </View>
                <View style={{top:-20,width:KScreenWidth-20}}>
                    <Text style={{fontSize:16}}>题目:你最喜欢什么样的男人？</Text>
                </View>

                {this._renderTitle()}
                {this._renderWhoGet()}
               

            </View>

        </View>


    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },



});
