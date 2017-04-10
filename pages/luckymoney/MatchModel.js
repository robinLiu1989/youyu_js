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
import TabNavigator from 'react-native-tab-navigator'
import CompleteRoomInfo from './CompleteRoomInfo'

const LOGIN_URL='http://115.28.78.5/api/user/login'

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;

export default class MatchModel extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            bigWidth:60,
            bigHeight:60,
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 }),
            dataList:[
                {
                    img:require('../../../res/images/model2.jpg'),
                    width:40,
                    height:40,
                    borderRadius:20,
                    top:10
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    width:40,
                    height:40,
                    borderRadius:20,
                    top:10
                },
                {
                    img:require('../../../res/images/model3.jpg'),
                    width:40,
                    height:40,
                    borderRadius:20,
                    top:10
                },
                {
                    img:require('../../../res/images/model4.jpg'),
                    width:60,
                    height:60,
                    borderRadius:30,
                    top:0
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    width:40,
                    height:40,
                    borderRadius:20,
                    top:10
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    width:40,
                    height:40,
                    borderRadius:20,
                    top:10
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    width:40,
                    height:40,
                    borderRadius:20,
                    top:10
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    width:40,
                    height:40,
                    borderRadius:20,
                    top:10
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    width:40,
                    height:40,
                    borderRadius:20,
                    top:10
                },

            ]
        };
    }
    componentDidMount() {
        this._loadData()
    }
    _loadData(){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(this.state.dataList),
        })
    }
    _largeImage(data,sectionID, rowID, highlightRow){
        let tempDataList=this.state.dataList;
        tempDataList[rowID].width=60;
        tempDataList[rowID].height=60;
        tempDataList[rowID].borderRadius=30;
        tempDataList[rowID].top=0;
        // console.log(tempDataList)
            this.setState({
                dataList:tempDataList,
                dataSource:this.state.dataSource.cloneWithRows(this.state.dataList),
            })
        console.log(this.state.dataList)
        console.log(this.state.dataSource)
    }

    _renderRow(data,sectionID, rowID, highlightRow){
         return <View style={{marginRight:10,borderRadius:20,paddingTop:data.top,}}>
             <TouchableOpacity
                 onPress={()=>this._largeImage(data,sectionID, rowID, highlightRow)}
                 activeOpacity={0.7}
             >
                 <Image source={require('../../../res/images/model2.jpg')}
                        style={{height:data.height,width:data.width,borderRadius:data.borderRadius,borderColor:'#fff',borderWidth:1,}}
                 />
             </TouchableOpacity>


         </View>
    }


    _renderRowBig(data,sectionID, rowID, highlightRow){
        return <View style={{marginRight:20}}>
            <Image source={require('../../../res/images/model2.jpg')}
                   style={{height:KScreenHeight-80,width:KScreenWidth-160,borderRadius:20}}
            />

        </View>
    }

    render(){
        return <View style={styles.container}>
            <NavigationBar
                    title='土豪房在线配对'
                    leftButtonIcon={require('../../../res/images/ic_code.png')}
                    onLeftButtonPress={()=>this.props.navigator.pop()}
            />
            <View style={{flex:1,marginTop:44,marginBottom:15,backgroundColor:'#eee'}}>
                <View style={{height:60,marginTop:10,marginLeft:20}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data,sectionID, rowID, highlightRow)=>this._renderRow(data,sectionID, rowID, highlightRow)}
                        contentContainerStyle={styles.list}
                        horizontal = {true}
                        showsHorizontalScrollIndicator = {false}

                    >
                    </ListView>

                    <View style={{position:'absolute',right:0,top:0,backgroundColor:'#eee',height:60,width:40}}>
                        <Text style={{top:18,left:5,fontSize:16,}}>+20</Text>
                    </View>
                </View>
                <View style={{height:300,marginTop:20}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data,sectionID, rowID, highlightRow)=>this._renderRowBig(data,sectionID, rowID, highlightRow)}
                        contentContainerStyle={styles.listBig}
                        horizontal = {true}
                        showsHorizontalScrollIndicator = {false}
                    >
                    </ListView>

                </View>
                <View style={{backgroundColor:'#fff',height:KScreenHeight/2}}>

                    <Text style={{height:30,marginTop:10,marginLeft:15,fontSize:16}}>账户余额</Text>
                    <View  style={{flexDirection:'row',marginLeft:15,height:40}} >
                        <Text style={{fontSize:30,fontWeight:'bold'}}>3680</Text>
                        <Image source={require('../../../res/images/ic_computer.png')}
                               style={{marginLeft:5,marginTop:10}}
                        />
                        <Text style={{position:'absolute',right:20,width:50,height:28,borderWidth:1,borderRadius:5 ,borderColor:'red',paddingTop:5,paddingLeft:10,color:'red',top:5}}>充值</Text>
                    </View>
                    <View style={{marginTop:20,flexDirection:'row',justifyContent:'center'}}>
                        <Text style={{textAlign:'center'}}>支付688         ,创建土豪房</Text>
                        <Image source={require('../../../res/images/ic_computer.png')}
                               style={{position:'absolute',left:155,top:-3}}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={()=>this.props.navigator.push({component:CompleteRoomInfo})}
                        activeOpacity={0.7}
                    >
                        <Text style={{textAlign:'center',height:40,paddingTop:10,backgroundColor:'#FF5077',marginTop:10,width:KScreenWidth-40,marginLeft:20,borderRadius:20,color:"#fff",fontWeight:'bold' ,fontSize:16}}>下一步</Text>
                    </TouchableOpacity>

                </View>
             </View>
         </View>
    }
    
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    single:{
        width:KScreenWidth-20,
        // marginBottom:5,
        height:150,
        position:'relative',
        left:10,
        marginTop:15,
        // paddingLeft:15,
        borderRadius:20,
        // justifyContent:'center',
        // alignItems:'center',
        backgroundColor:'#fff',
        zIndex:9,
        // flexDirection: 'row',
        // flexWrap: 'wrap',

        // borderWidth:2,

        borderColor:'#000',
        // borderBottomWidth:1
        // opacity:0.3

    },
    thumb:{
        width:KScreenWidth/2 - 80,
        height:150,
        // backgroundColor:'blue',
        borderBottomLeftRadius:20,
        borderTopLeftRadius:20

        // backgroundColor:'green'
    },
    list:{
        // marginTop:5,
        // marginBottom:5,
        // paddingBottom:5,
        // justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor:'pink',
        position:'relative',
        // bottom:50
    },
    listBig:{
        // marginTop:5,
        // marginBottom:5,
        // paddingBottom:5,
        // justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor:'pink',
        position:'relative',
        // bottom:50
    },

});
