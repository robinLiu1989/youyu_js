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

const LOGIN_URL='http://115.28.78.5/api/user/login'

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;

export default class LuckyMoneyMain extends  Component{

    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 }),
            dataList:[
                {
                    img:require('../../../res/images/model2.jpg'),
                    title:'单身贵族游戏',
                    logo:'宫殿',
                    logoBgColor:'pink'
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    title:'情侣对对碰',
                    logo:'豪趣',
                    logoBgColor:'red'
                },
                {
                    img:require('../../../res/images/model3.jpg'),
                    title:'18岁的进来玩',
                    logo:'尤趣',
                    logoBgColor:'blue'
                },
                {
                    img:require('../../../res/images/model4.jpg'),
                    title:'单身贵族游戏',
                    logo:'尤趣',
                    logoBgColor:'green'
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    title:'单身贵族游戏',
                    logo:'尤趣',
                    logoBgColor:'green'
                },
                {
                    img:require('../../../res/images/model3.jpg'),
                    title:'单身贵族游戏',
                    logo:'豪趣',
                    logoBgColor:'green'
                },
                {
                    img:require('../../../res/images/model4.jpg'),
                    title:'单身贵族游戏',
                    logo:'豪趣',
                    logoBgColor:'green'
                },
                {
                    img:require('../../../res/images/model4.jpg'),
                    title:'单身贵族游戏',
                    logo:'豪趣',
                    logoBgColor:'green'
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
    _renderRow(data){
            return <View >
                    <View style={{position:'absolute',bottom:-2,right:8,width:KScreenWidth-20,height:151,borderRadius:5,backgroundColor:'#000',opacity:0.1,zIndex:1,borderRadius:20,borderBottomLeftRadius:10}}>

                    </View>
                    <View style={styles.single}>

                        <TouchableOpacity
                        activeOpacity={0.7}
                        style={{flexDirection:'row',zIndex:99,position:'relative'}}
                    >
                        <Image source={require('../../../res/images/model2.jpg')}
                               style={styles.thumb}
                               resizeMode='stretch'
                        />
                        <View style={{marginTop:20,marginLeft:10,paddingRight:10}}>

                            <View style={{borderBottomWidth:1,borderBottomColor:'#eee',height:70,width:KScreenWidth/2+30}}>
                                <View style={{flexDirection:'row',height:30}}>
                                    <Text style={{width:40,height:20,backgroundColor:data.logoBgColor,borderRadius:5,paddingLeft:5}}>{data.logo}</Text>
                                    <Text style={{fontSize:16,fontWeight:'bold',marginLeft:10}}>单身贵族游戏</Text>
                                </View>

                                <View style={{flexDirection:'row'}}>
                                    <Text style={{color:'red',marginRight:3}}>688</Text>
                                    <Image source={require('../../../res/images/ic_code.png')} />
                                    <Text style={{marginLeft:3}}>正在被疯抢...</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row',paddingTop:10}}>
                                <View  style={{width:40,height:40,borderRadius:20,backgroundColor:'pink'}}>
                                    <Image source={require('../../../res/images/model2.jpg')}
                                           style={{width:40,height:40,borderRadius:20}}
                                    />
                                </View>
                                <Text style={{marginLeft:10,marginTop:10}}>我是群主</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                    <View style={{position:'absolute',top:11,right:30,backgroundColor:'#FF5077',width:40,height:40,borderRadius:5,zIndex:999}}>
                        <Text style={{color:'#fff',fontSize:16,top:10,textAlign:'center',}}>6/8</Text>
                    </View>
                </View>

    }


    render(){
        return <View style={styles.container}>
            <NavigationBar
                           title='尤乐场'
            />
            <View style={{flex:1,marginTop:44,marginBottom:15}}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(data)=>this._renderRow(data)}
                    contentContainerStyle={styles.list}
                >

                </ListView>
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
        paddingBottom:5,
        // justifyContent: 'space-around',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // backgroundColor:'pink',
        position:'relative',
        // bottom:50
    },

});
