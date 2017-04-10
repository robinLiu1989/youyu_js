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
    TouchableOpacity
} from 'react-native';
import Squre from '../pages/square/Square';

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;

export default  class MySubmitButton extends  Component{
    static propTypes = {
        placeHolderText : PropTypes.string,
        onPress:PropTypes.func,
        Text:PropTypes.string,
        backgroundColor:PropTypes.string
    };
    static defaultProps = {
        Text:'下一步',
        backgroundColor:'#FF5077',
        navigator:{}
    }
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            buttonBackgroundColor:'#FF5077',
        };
      }
    
    _onButtonPressHandle(event) {
        let onPress = this.props.onPress;
        typeof onPress === 'function' && onPress(event);
    }
    render(){

        return    <View style={{marginTop:40}}>
            <TouchableOpacity
                onPress={this._onButtonPressHandle.bind(this)}
                activeOpacity={0.7}
            >
                <Text style={{textAlign:'center',height:40,paddingTop:10,backgroundColor:this.props.backgroundColor,marginTop:10,width:KScreenWidth-40,borderRadius:20,color:"#fff",fontWeight:'bold' ,fontSize:16}}>{this.props.Text}</Text>
            </TouchableOpacity>
        </View>
    }
}


const styles = StyleSheet.create({

});



