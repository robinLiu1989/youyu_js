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
    ListView
} from 'react-native';

import NavigationBar from '../../Common/NavigationBar'
import TabNavigator from 'react-native-tab-navigator';
import LuckyMoneyMain   from './LuckyMoneyMain';

const LOGIN_URL='http://115.28.78.5/api/user/login'

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;

export default class CreatRoom extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isMaskVisible:false
        };
    }

    render(){
        return <View style={styles.container}>
            <LuckyMoneyMain/>

        </View>
    }
    
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },

});
