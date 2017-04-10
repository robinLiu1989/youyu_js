/**
 * Created by zhouqiang on 2017/3/30.
 */

import React, { Component } from 'react';
import {
    Text,
    View,
    requireNativeComponent,
    Button,
    StyleSheet,
    NativeModules,
    findNodeHandle,
    NativeEventEmitter,
} from 'react-native';

import MessageMainView from "../message/MessageMainView"

const { ReactNativeManager } = NativeModules;
const nativeManagerEmitter = new NativeEventEmitter(ReactNativeManager);
const NativeManager = NativeModules.NativeManager;

export default class ChatRoom extends React.Component {

    render() {

        return (
            <MessageMainView
                ref="MyViewController"
                style={styles.private}
                infoDict={
                    {
                      'viewName':'chatRoom',
                      'groupId':this.props.groupId,
                      'isGroup':this.props.isGroup
                    }
                }>
            </MessageMainView>

        )

    }

    //页面被渲染之前执行，也就是在render方法之前执行
    componentWillMount(){
        //监听原生模块发送消息回调
        this.subscription = nativeManagerEmitter.addListener(
            'EventReminder',
            (reminder) =>{
                //实现跳转或者其他逻辑操作
                console.log(reminder.name)
            }
        );
    }

    //执行在render方法之后，也就是页面的组件渲染完毕之后
    componentDidMount() {
        //从iOS中获取常量
        // console.log(NativeManager.NativeUserId)


    }

    componentWillUnmount(){
        // 别忘了取消订阅，通常在componentWillUnmount生命周期方法中实现。
        this.subscription.remove();
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    private: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});