
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    ListView,
    Dimensions,
    NativeModules,
    TouchableOpacity,
    navigator
} from 'react-native';


import NavigationBar from '../Common/NavigationBar';

import TabNavigator from 'react-native-tab-navigator';

import Swiper from 'react-native-swiper';



// import MessageMain from './message/MessageMain';
import Square   from './square/Square';
import LuckyMoneyMain from './luckymoney/LuckyMoneyMain'
import CreatRoom from './luckymoney/CreatRoom'
import MatchModel from './luckymoney/MatchModel'


let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;


export default class Main extends  Component{

    constructor(props) {

        super(props);
        // 初始状态
        this.state = {
            selectedTab:'tb_popular',
            isMaskVisible:false,
            creatRoom1MatchButton:'#FF5077',
            creatRoom2MatchButton:'#ccc',
            creatRoom3MatchButton:'#ccc',
            isRoom1Selected:true,
            isRoom2Selected:false,
            isRoom3Selected:false,
        };
    }

    _rendCreatRoomMask(){
        if(this.state.isMaskVisible){
            return <View style={{position:'absolute',height:KScreenHeight,width:KScreenWidth,backgroundColor:'#000',opacity:0.3,bottom:0}}>
            </View>
        }
    }
    _selectRoom1(){
        this.setState({
            isRoom1Selected:true,
            isRoom2Selected:false,
            isRoom3Selected:false,
            creatRoom1MatchButton:'#FF5077',
            creatRoom2MatchButton:'#ccc',
            creatRoom3MatchButton:'#ccc',
        })
        this._renderRoom1Border()
    }
    _renderRoom1Border(){
        if(this.state.isRoom1Selected){
            return <View style={{height:KScreenWidth/3+10,width:KScreenWidth/3-20,position:'absolute',top:0,left:10,borderColor:'blue',borderWidth:5,borderRadius:5}}>
            </View>
        }
    }
    _selectRoom2(){
        this.setState({
            isRoom1Selected:false,
            isRoom2Selected:true,
            isRoom3Selected:false,
            creatRoom1MatchButton:'#ccc',
            creatRoom2MatchButton:'#FF5077',
            creatRoom3MatchButton:'#ccc',
        })
        this._renderRoom2Border()
    }
    _renderRoom2Border(){
        if(this.state.isRoom2Selected){
            return <View style={{height:KScreenWidth/3+10,width:KScreenWidth/3-20,position:'absolute',top:0,left:10,borderColor:'blue',borderWidth:5,borderRadius:5}}>
            </View>
        }
    }
    _selectRoom3(){
        this.setState({
            isRoom1Selected:false,
            isRoom2Selected:false,
            isRoom3Selected:true,
            creatRoom1MatchButton:'#ccc',
            creatRoom2MatchButton:'#ccc',
            creatRoom3MatchButton:'#FF5077',
        })
        this._renderRoom3Border()
    }
    _renderRoom3Border(){
        if(this.state.isRoom3Selected){
            return <View style={{height:KScreenWidth/3+10,width:KScreenWidth/3-20,position:'absolute',top:0,left:10,borderColor:'blue',borderWidth:5,borderRadius:5}}>
            </View>
        }
    }
    _rendCreatRoomBlock(){
        if(this.state.isMaskVisible){
            return <View style={{position:'absolute',height:KScreenHeight/2,width:KScreenWidth,backgroundColor:'#fff',bottom:0}}>
                <View >
                    <Text style={{fontSize:18,fontWeight:'bold',textAlign:'center',height:70,top:20}}>选择房间类型</Text>
                </View>
                <View style={{flexDirection:'row',marginLeft:10}}>
                    <TouchableOpacity
                        onPress={this._selectRoom1.bind(this)}
                        activeOpacity={0.7}>

                        <View style={{borderWidth:1,borderColor:'#eee',borderRadius:10,height:KScreenWidth/3+10,width:KScreenWidth/3-20,marginLeft:10,alignItems:'center'}}>
                            <Text style={{color:'#fff',width:50,height:20,top:5,backgroundColor:'red',textAlign:'center',borderRadius:10}}>尤趣房</Text>
                            <Image source={require('../../res/images/ic_computer.png')}
                                   style={{width:40,height:40,marginTop:10}}
                            />
                            <Text  style={{marginTop:8}}>首次免费</Text>
                            <Text style={{marginTop:8,backgroundColor:this.state.creatRoom1MatchButton,color:'#fff',width:KScreenWidth/3-20,height:24,fontSize:16,textAlign:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>配对5人</Text>

                        </View>
                        {this._renderRoom1Border()}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this._selectRoom2.bind(this)}
                        activeOpacity={0.7}>

                        <View style={{borderWidth:1,borderColor:'#eee',borderRadius:10,height:KScreenWidth/3+10,width:KScreenWidth/3-20,marginLeft:10,alignItems:'center'}}>
                            <Text style={{color:'#fff',width:50,height:20,top:5,backgroundColor:'green',textAlign:'center',borderRadius:10}}>豪趣房</Text>
                            <Image source={require('../../res/images/ic_computer.png')}
                                   style={{width:40,height:40,marginTop:10}}
                            />
                            <Text  style={{marginTop:8,color:'red'}}>688钻</Text>
                            <Text style={{marginTop:8,backgroundColor:this.state.creatRoom2MatchButton,color:'#fff',width:KScreenWidth/3-20,height:24,fontSize:16,textAlign:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>配对10人</Text>
                        </View>
                        {this._renderRoom2Border()}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={this._selectRoom3.bind(this)}
                        activeOpacity={0.7}>


                        <View style={{borderWidth:1,borderColor:'#eee',borderRadius:10,height:KScreenWidth/3+10,width:KScreenWidth/3-20,marginLeft:10,alignItems:'center'}}>
                            <Text style={{color:'#fff',width:70,height:20,top:5,backgroundColor:'pink',textAlign:'center',borderRadius:10}}>海洋宫殿</Text>
                            <Image source={require('../../res/images/ic_computer.png')}
                                   style={{width:40,height:40,marginTop:10}}
                            />
                            <Text  style={{marginTop:8,color:'red'}}>1888钻</Text>
                            <Text style={{marginTop:8,backgroundColor:this.state.creatRoom3MatchButton,color:'#fff',width:KScreenWidth/3-20,height:24,fontSize:16,textAlign:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10}}>配对20人</Text>
                        </View>
                        {this._renderRoom3Border()}
                    </TouchableOpacity>

                </View>
                <View style={{marginTop:30,alignItems:'center'}}>
                    <Text>普通房人数上限6人，留存48小时。</Text>
                    <TouchableOpacity
                        onPress={()=>this.props.navigator.push({component:MatchModel})}

                        activeOpacity={0.7}>
                        <Text  style={{marginTop:10,width:KScreenWidth-40,textAlign:'center',backgroundColor:'#FF5077',borderRadius:20,height:40,paddingTop:10,fontSize:16,color:'#fff',fontWeight:'bold'}}>下一步</Text>
                    </TouchableOpacity>
                </View>
            </View>
        }
    }


    render(){

        const {navigator}=this.props;

        return   <View  style={styles.container}>
            
                <TabNavigator
                    tabBarStyle={{backgroundColor:'white'}}
                >
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        selectedTitleStyle={{color:'red'}}
                        title="广场"
                        renderIcon={() => <Image source={require('../../res/images/ic_polular.png')}  style={styles.img} />}
                        renderSelectedIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={[styles.img,{tintColor:'red'}]}  />}
                        onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
                        <View style={styles.page2}>
                            <Square 
                                navi={navigator}
                            />
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        selectedTitleStyle={{color:'red'}}
                        title="尤乐场"
                        renderIcon={() => <Image source={require('../../res/images/ic_trending.png')} style={styles.img} />}
                        renderSelectedIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={[styles.img,{tintColor:'red'}]} />}
                        onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                        <View style={styles.page2}>
                            <LuckyMoneyMain
                                context={navigator}
                            />
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_create'}
                        selectedTitleStyle={{color:'red'}}

                        renderIcon={() => <Image source={require('../../res/images/ic_polular.png')}  style={styles.img} />}
                        renderSelectedIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={[styles.img,{tintColor:'red'}]}  />}
                        onPress={() => this.setState({ selectedTab: 'tb_create',isMaskVisible:true})}
                        >
                        <View style={styles.page1}>
                            <CreatRoom />
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favorite'}
                        selectedTitleStyle={{color:'red'}}
                        title="消息"
                        renderIcon={() => <Image source={require('../../res/images/ic_polular.png')}  style={styles.img} />}
                        renderSelectedIcon={() => <Image source={require('../../res/images/ic_polular.png')} style={[styles.img,{tintColor:'red'}]}  />}

                        onPress={() => this.setState({ selectedTab: 'tb_favorite' })}>

                        {/*<View style={styles.page2}>*/}

                        {/*</View>*/}

                        {/* <MessageMain style={styles.page1}
                                         content={navigator}
                                         viewName={'messageMain'}
                                        >
                        </MessageMain> */}

                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        selectedTitleStyle={{color:'red'}}
                        title="我的"
                        renderIcon={() => <Image source={require('../../res/images/ic_trending.png')} style={styles.img} />}
                        renderSelectedIcon={() => <Image source={require('../../res/images/ic_trending.png')} style={[styles.img,{tintColor:'red'}]} />}
                        onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                        <View style={styles.page2}>

                        </View>
                    </TabNavigator.Item>
                </TabNavigator>
                {this._rendCreatRoomMask()}
                {this._rendCreatRoomBlock()}

            </View>
    }


}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    page1:{
        flex:1,
        // backgroundColor:'green'
    },
    page2:{
        flex:1,
        // backgroundColor:'yellow'
    },
    img:{
        height:22,
        width:22
    },
    text:{
        height:100,
        fontSize:30
    },
    swiper:{
        position:'relative',
        top:50,
        height:200
    },
    wrapper: {
    },
    slide1: {
        height:200,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#9DD6EB'
    },
    slide2: {
        height:200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        height:200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    slideImg:{
        height:200,
    },
    text1: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    dot:{
        backgroundColor:'red',
        width:20,
        height:20,

    },
    row:{

    },
    youququan:{

    },
    list:{
        marginTop:5,
        marginBottom:5,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor:'pink',
        position:'relative',
        // bottom:50
    },

    single:{
        width:KScreenWidth/2-20,
        height:200,
        marginBottom:15,
        flexDirection: 'row',
        position:'relative',
        bottom:20
        // borderWidth:1,

    },
    miaoshu:{
        flexDirection: 'row',
        position:'relative',
        bottom:50,
        right:130
    },
    thumb:{
        width:KScreenWidth/2-20,
        height:200,

    },
    name:{


    },
    descript:{


    }

});