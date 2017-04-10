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
import MySubmitButton from '../../Common/MySubmitButton'
import Square from '../square/Square'

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;


export default class ApplyToJoin extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            backgroundColor:'#f1f1f1'
            // '#FF5077'
        };
    }

    _pressHandle(){
        if(this.state.backgroundColor!=='#FF5077') return false;
        this.props.navigator.push({
            component:Square
        })
    }
    _changeText(text){
        if(text.trim()!==''){
            this.setState({
                backgroundColor:'#FF5077'
            })
        }
    }

    render(){

        return   <View  style={styles.container}>
            <NavigationBar
                           title='申请加入群聊'
                           rightButtonTitle='取消'
                           onRightButtonPress={()=>this.props.navigator.pop()}
            />
            <View style={{alignItems:'center',marginTop:44}}>
                <View style={{backgroundColor:'#eee',width: KScreenWidth,height:40,justifyContent:'center'}}>
                    <Text style={{paddingLeft:10}}>您需要发送验证申请，等待群主通过</Text>
                </View>
                <View style={{backgroundColor:'#fff',width: KScreenWidth,height:100}}>
                    <TextInput style={{paddingLeft:10,textAlignVertical: 'top',width:KScreenWidth}}
                               placeholder='请填写加群理由'
                               underlineColorAndroid="transparent"
                               numberOfLines = {4}
                               multiline = {true}
                               onChangeText={(text)=>this._changeText(text)}
                    />
                </View>
                <MySubmitButton
                    Text='提交申请'
                    onPress={()=>this._pressHandle()}
                    backgroundColor={this.state.backgroundColor}
                />

            </View>


        </View>


    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },



});
