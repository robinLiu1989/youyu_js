/**
 * Created by Administrator on 2017/3/27 0027.
 */

import React, { Component} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    StatusBar,
} from 'react-native';

const  StatusBarShape={
    backgroundColor:React.PropTypes.string,
    hidden:React.PropTypes.bool
}


export default  class Header extends  Component{
    static propTypes={
        statusBar:React.PropTypes.shape(StatusBarShape),
        backgroundColor:React.PropTypes.string
    }
    static defaultProps={
        statusBar:{
            barStyle:'light-content',
            hidden:false
        },
        backgroundColor:'red',
    }
    render(){
        return   <View style={styles.header} >
            <StatusBar {...this.props.statusBar} />
        </View>
    }
}

const styles = StyleSheet.create({
    header: {
      height:Platform.OS === "ios" ? 64 : 44,
    },
});



