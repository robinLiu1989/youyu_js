
import React, { Component } from 'react';
import {
    Text,
    View,
    NativeModules,
    StyleSheet,
    Image,
    ListView,
    Dimensions,
} from 'react-native';

import NavigationBar from '../../Common/NavigationBar';
import  Header   from '../../utils/Header';
import TabNavigator from 'react-native-tab-navigator';

import Swiper from 'react-native-swiper';

let KScreenHeight = Dimensions.get('window').height;
let KScreenWidth = Dimensions.get('window').width;

export default class Square extends Component {
    static defaultProps = {
        navi:{}
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'tb_popular',
            dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2 }),
            dataList:[
                {
                    img:require('../../../res/images/model2.jpg'),
                    name:'郭采洁',
                    age:'27',
                    level:'32',
                    city:'福建',
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    name:'尼尼克罗',
                    age:'28',
                    level:'32',
                    city:'广州',
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    name:'郭采洁2',
                    age:'29',
                    level:'32',
                    city:'厦门',
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    name:'郭采洁3',
                    age:'21',
                    level:'32',
                    city:'重庆',
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    name:'郭采洁4',
                    age:'27',
                    level:'32',
                    city:'福建',
                },
                {
                    img:require('../../../res/images/model2.jpg'),
                    name:'郭采洁5',
                    age:'27',
                    level:'32',
                    city:'福建',
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
    // loadData(){
    //     let url=URL+this.props.tabLabel+QUERY_STR;
    //     HttpUtils.get(url)
    //         .then(result=>{
    //             this.setState({
    //                 // result:JSON.stringify(result),
    //                 dataSource:this.state.dataSource.cloneWithRows(this.state.dataList),
    //             })
    //
    //         })
    //         .catch(err=>{
    //             this.setState({
    //                 result:JSON.stringify(err)
    //             })
    //         })
    // }

    renderRow(data){
        return (
            <View style={styles.single}>
                <Image source={require('../../../res/images/model2.jpg')}
                       style={styles.thumb}
                />
                <View style={[styles.picFooter]}>
                    {/*<View style={[styles.slideText]}>*/}
                        {/*<Text style={[styles.name]}>{data.name}</Text>*/}
                    {/*</View>*/}
                    {/*<View style={[styles.slideText]}>*/}
                        {/*<Text style={[styles.name]}>{data.age}{data.level}{data.city}</Text>*/}
                    {/*</View>*/}
                </View>
                <View style={[styles.picFooter_noBgColor]}>
                    <View style={[styles.slideText]}>
                        <Text style={[styles.name]}>{data.name}</Text>
                    </View>
                    <View style={[styles.slideText]}>
                        <Text style={[styles.name]}>{data.age}{data.level}{data.city}</Text>
                    </View>
                </View>
            </View>
        )
    }

    SliderImages(){

        let sliderImgs = [
            'http://images3.c-ctrip.com/SBU/apph5/201505/16/app_home_ad16_640_128.png',
            'http://images3.c-ctrip.com/rk/apph5/C1/201505/app_home_ad49_640_128.png',
            'http://images3.c-ctrip.com/rk/apph5/D1/201506/app_home_ad05_640_128.jpg'
        ];
        let imageViews=[];
        for(let i=0;i<sliderImgs.length;i++){
            imageViews.push(
                <View key={i} style={styles.slide1}>
                    <Image
                        key={i}
                        style={{width:KScreenWidth,height:170}}
                        resizeMode='stretch'
                        source={{uri:sliderImgs[i]}}
                    />
                </View>
            );
        }
        return imageViews;
    }

    HeaderView(){
        return(
            <Swiper style={styles.wrapper} showsButtons={false} height={170} autoplay={true} showsPagination={true}>
                {this.SliderImages()}
            </Swiper>
        )
    }

    renderSectionHeader(sectionData, sectionID){
        return(
            <View style={{height:200 , backgroundColor:'red'}}>
            </View>
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <Header />
                <NavigationBar title='尤趣广场'  titleColor='white'
                                   rightButtonIcon={require('../../../res/images/ic_computer.png')}
                                   rightButtonTitleColor='white'
                                   backgroundColor='pink'
                                   onRightButtonPress={()=>this.props.navi.pop()}
                    />

                <View style={{flex:1}}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={(data)=>this.renderRow(data)}
                        // enableEmptySections={true}
                        contentContainerStyle={styles.list}
                        renderHeader={this.HeaderView.bind(this)}
                        renderSectionHeader={this.renderSectionHeader}
                        // refreshControl={
                        //     <RefreshControl
                        //         refreshing={this.state.isLoading}
                        //         onRefresh={()=>this._loadData()}
                        //         tintColor={'#2196F3'}
                        //         title="Loading..."
                        //         titleColor="#2196F3"
                        //         colors={['#2196F3']}
                        //
                        //     />
                        // }
                    />
                </View>
            </View>
            )
    }

}

// class SquareCell extends React.Component{
//
//     render(){
//         return(
//             <View style={styles.single}>
//                 <Image source={require('../../../res/images/mode1.jpg')}
//                        style={styles.thumb}
//                 />
//                 <View style={[styles.picFooter]}>
//                     <View style={[styles.slideText]}>
//                         <Text style={[styles.name]}>{data.name}</Text>
//                     </View>
//                     <View style={[styles.slideText]}>
//                         <Text style={[styles.name]}>{data.name} + {data.level} + {data.level}</Text>
//                     </View>
//                 </View>
//             </View>
//         )
//     }
// }

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
        top:64,
        height:200
    },
    wrapper: {
        // marginTop:64,
    },
    slide1: {
        height:170,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#9DD6EB'
    },
    slideText: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor:'clear',
        // opacity:'1.0',
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
        // marginTop:5,
        // marginBottom:5,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
        // backgroundColor:'pink',
        position:'relative',
        // bottom:50
    },
    single:{
        width:KScreenWidth/2,
        height:200,
        marginBottom:5,
        flexDirection: 'row',
        position:'relative',
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
    },
    picFooter:{
        flexDirection: 'column',
        position:'absolute',
        bottom:0,
        height:50,
        width:KScreenWidth/2 - 10,
        left:5,
        backgroundColor:'gray',
        opacity:0.25,
    },
    picFooter_noBgColor:{
        flexDirection: 'column',
        position:'absolute',
        bottom:0,
        height:50,
        width:KScreenWidth/2 - 10,
        left:5,
    },
    thumb:{
        width:KScreenWidth/2 - 10,
        height:200,
        borderRadius:5,
    },
    name:{
        fontSize:16.0,
        color:'white',
        backgroundColor:'transparent'//透明度
    },
    descript:{
        fontSize:12.0,
        color:'white',
    }

});