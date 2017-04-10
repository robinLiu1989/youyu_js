/**
 * Created by zhouqiang on 2017/3/27.
 */

import React, { Component } from 'react';
import {
    requireNativeComponent,
    StyleSheet,
    NativeModules,
    findNodeHandle,
    NativeEventEmitter,
} from 'react-native';

import MessageMainView from "./MessageMainView"
import ChatRoom from "../luckymoney/ChatRoom"

// import  ImagePicker from 'react-native-image-picker'; //第三方相机
const { ReactNativeManager } = NativeModules;
const nativeManagerEmitter = new NativeEventEmitter(ReactNativeManager);
const NativeManager = NativeModules.NativeManager;

export default class MessageMain extends React.Component {
    
    render() {
        
        // var photoOptions = {
        //     //底部弹出框选项
        //     title:'请选择',
        //     cancelButtonTitle:'取消',
        //     takePhotoButtonTitle:'拍照',
        //     chooseFromLibraryButtonTitle:'选择相册',
        //     quality:0.75,
        //     allowsEditing:false,
        //     noData:false,
        //     storageOptions: {
        //         skipBackup: true,
        //         path:'images'
        //     }
        // }

        return (
            <MessageMainView
                ref="MyViewController"
                style={styles.private}
                infoDict={
                    {'groupId':'@TGS#1VH4MYNEK',
                      'viewName':'messageMain'}
                }>
            </MessageMainView>


            // <View style={styles.container}>
            //     <Text onPress={
            //         () =>ImagePicker.showImagePicker(photoOptions,(response) =>{
            //                 console.log('response'+response);
            //            if (response.didCancel){
            //                 return;
            //            }
            //         })}
            //           style  ={{fontFamily: 'iconfont', fontSize: 20}}>
            //         &#xe604;
            //     </Text>
            // </View>
            
        )
    }



    //页面被渲染之前执行，也就是在render方法之前执行
    componentWillMount(){

        //监听原生模块发送消息回调
        this.subscription = nativeManagerEmitter.addListener(
            'EventReminder',
            (reminder) =>{
                console.log(reminder)

                if (reminder.name == 'chat'){
                    this.props.content.push({
                        component:ChatRoom,
                        params:{
                            groupId:reminder.chatId,
                            isGroup:reminder.isGroup,
                        }
                    })
                }


            }
        );
    }

    //执行在render方法之后，也就是页面的组件渲染完毕之后
    componentDidMount() {
        //从iOS中获取常量
        console.log(NativeManager.NativeUserId)

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