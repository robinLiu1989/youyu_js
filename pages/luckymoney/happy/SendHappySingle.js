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

import NavigationBar from '../../../Common/NavigationBar';
import MatchModel from '../MatchModel'
import MySubmitButton from '../../../Common/MySubmitButton'
import Square from '../../square/Square'

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;


export default class SendHappySingle extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            backgroundColor:'#f1f1f1',
            diamondNumber:0,
            isQuestionSelected:false
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
                backgroundColor:'#FF5077',
                diamondNumber:text-0
            })
        }
        if(text.trim()===''){
            this.setState({
                backgroundColor:'#f1f1f1',
                diamondNumber:0
            })
        }

    }

    render(){

        return   <View  style={styles.container}>
            <NavigationBar
                           title='发开心红包'
                           leftButtonIcon={require('../../../../res/images/ic_code.png')}
                           onLeftButtonPress={()=>this.props.navigator.pop()}
            />
            <View style={{alignItems:'center',marginTop:44,backgroundColor:'#ddd',height:KScreenHeight}}>
                <View style={{backgroundColor:'#fff',width: KScreenWidth-40,height:40,flexDirection:'row',marginLeft:0,marginTop:20}}>
                    <Text style={{paddingTop:10,paddingLeft:10}}>红包金额</Text>
                    <TextInput style={{position:'absolute',right:40,width:150,textAlign:'right',top:-10}}
                        placeholder='填写金额'
                        underlineColorAndroid="transparent"
                        onChangeText={(text)=>this._changeText(text)}
                    />
                    <Image  style={{position:'absolute',right:10,top:8}}
                        source={require('../../../../res/images/ic_computer.png')}
                    />
                </View>
                <View style={{backgroundColor:'#fff',width: KScreenWidth-40,height:40,flexDirection:'row',marginLeft:0,marginTop:20}}>
                    <TextInput style={{width: KScreenWidth-40,paddingLeft:10}}
                               placeholder='恭喜发财，大吉大利！'
                               underlineColorAndroid="transparent"

                    />
                </View>

                <View style={{marginTop:40,flexDirection:'row',}}>
                    <Text style={{fontSize:40}}>{this.state.diamondNumber}</Text>
                    <Text style={{marginLeft:5,marginTop:20}}>钻石</Text>
                </View>
                <View style={{backgroundColor:'#fff',width:KScreenWidth,height:40,marginTop:30,paddingLeft:10,paddingTop:10,flexDirection:'row' }}>
                    <Text>钻石余额</Text>
                    <View style={{flexDirection:'row',position:'absolute',right:5,top:10,}}>
                        <Image style={{top:-2,marginRight:5}}
                            source={require('../../../../res/images/ic_computer.png')}
                        />
                        <Text>600枚</Text>
                        <TouchableOpacity
                            // onPress={}
                        >
                            <Text style={{marginLeft:5,width:50,height:20,borderColor:'red',borderWidth:1,textAlign:'center',borderRadius:5}}>充值</Text>
                        </TouchableOpacity>

                    </View>

                </View>
                <MySubmitButton
                    Text='发送红包'
                    onPress={()=>this._pressHandle()}
                    backgroundColor={this.state.backgroundColor}
                />
                <Text  style={{marginTop:20}}>未领取的红包将于24小时后退回您的账户中。</Text>

            </View>


        </View>


    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },



});
