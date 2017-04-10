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

import NavigationBar from '../../Common/NavigationBar';
import MatchModel from './MatchModel'
import SendHappyAll from '../luckymoney/happy/SendHappyAll'

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;


export default class CompleteRoomInfo extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

            buttonBackgroundColor:'#eee'
            // '#FF5077'
        };
    }

    _changeText(text){
        if(text.length<=15&&text.length>0&&text.trim()!==''){
            this.setState({
                buttonBackgroundColor:'#FF5077'
            })
            return false;
        }
        if(text.length>15||text.length===0){
            this.setState({
                buttonBackgroundColor:'#eee'
            })
            return false;
        }
    }

    render(){

        return   <View  style={styles.container}>
            <NavigationBar
                           title='填写群资料'
                           leftButtonIcon={require('../../../res/images/ic_code.png')}
                           onLeftButtonPress={()=>this.props.navigator.pop()}
            />
            <View style={{alignItems:'center',marginTop:100}}>
                <TouchableOpacity style={{width:100,height:100,borderStyle:'dashed',borderWidth:1}}
                                  onPress={()=>this.props.navigator.push({component:MatchModel})}
                                  activeOpacity={0.7}
                >
                    <Image source={require('../../../res/images/ic_computer.png')}
                            style={{width:60,height:60,marginLeft:20,marginTop:10}}
                    />
                    <Text style={{textAlign:'center'}}>添加群头像</Text>
                </TouchableOpacity>
                <View style={{marginTop:20}}>
                    <Text style={{position:'absolute',bottom:20,left:5,fontSize:16,fontWeight:'bold'}}>群名称</Text>
                    <TextInput style={{width:KScreenWidth-40,paddingLeft:60}}
                               placeholder='输入群名称，不超过15个字'
                               onChangeText={(text)=>this._changeText(text)}
                    />
                </View>
                <View style={{marginTop:40}}>
                    <TouchableOpacity
                        onPress={()=>this.props.navigator.push({component:SendHappyAll})}
                        activeOpacity={0.7}
                    >
                        <Text style={{textAlign:'center',height:40,paddingTop:10,backgroundColor:this.state.buttonBackgroundColor,marginTop:10,width:KScreenWidth-40,borderRadius:20,color:"#fff",fontWeight:'bold' ,fontSize:16}}>创建房间</Text>
                    </TouchableOpacity>
                </View>


            </View>


        </View>


    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },



});
