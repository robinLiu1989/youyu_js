/**
 * Created by zhouqiang on 2017/3/7.
 */
'use strict';
import React, { Component,PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    Platform,
    StatusBar
} from 'react-native';

let width = Dimensions.get('window').width;
const  StatusBarShape={
    backgroundColor:React.PropTypes.string,
    hidden:React.PropTypes.bool
}

export default class NavigationBar extends Component{

    static propTypes = {
        title: PropTypes.string.isRequired,
        //not include the height of statusBar on ios platform;
        height: PropTypes.number,
        titleColor: PropTypes.string,
        titleSize:PropTypes.number,
        backgroundColor: PropTypes.string,
        leftButtonTitle: PropTypes.string,
        leftButtonTitleColor: PropTypes.string,
        onLeftButtonPress: PropTypes.func,
        rightButtonTitle: PropTypes.string,
        rightButtonTitleColor: PropTypes.string,
        onRightButtonPress: PropTypes.func,
        statusBar:React.PropTypes.shape(StatusBarShape),
    };

    static defaultProps = {
        height: 44,
        titleColor: '#fff',
        backgroundColor: '#FF5077',
        leftButtonTitle: null,
        leftButtonTitleColor: '#fff',
        rightButtonTitle: null,
        rightButtonTitleColor: '#fff',
        titleSize:18,
        statusBar:{
            barStyle:'light-content',
            hidden:false,
            backgroundColor:'#FF5077',
        },
    };

    componentWillMount(){
        this.state = this._getStateFromProps(this.props);
    }

    componentWillReceiveProps(newProps){
        let newState = this._getStateFromProps(newProps);
        this.setState(newState);
    }

    shouldComponentUpdate(nextProps, nextState, context) {
        return JSON.stringify([nextState, context]) !== JSON.stringify([this.state, context]);
    }

    _getStateFromProps(props){
        let title = props.title;
        let height = props.height;
        let titleColor = props.titleColor;
        let backgroundColor = props.backgroundColor;
        let leftButtonTitle = props.leftButtonTitle;
        let leftButtonTitleColor = props.leftButtonTitleColor;
        let onLeftButtonPress = props.onLeftButtonPress;
        let rightButtonTitle = props.rightButtonTitle;
        let rightButtonTitleColor = props.rightButtonTitleColor;
        let onRightButtonPress = props.onRightButtonPress;
        let leftButtonIcon = props.leftButtonIcon;
        let rightButtonIcon = props.rightButtonIcon;
        return {
            title,
            height,
            titleColor,
            backgroundColor,
            leftButtonTitle,
            leftButtonTitleColor,
            onLeftButtonPress,
            rightButtonTitle,
            rightButtonTitleColor,
            onRightButtonPress,
            leftButtonIcon,
            rightButtonIcon
        };
    }

    _renderLeftIcon() {
        if(this.state.leftButtonIcon){
            return (
                <Image style={styles.leftButtonIcon} resizeMode={'contain'} source={this.state.leftButtonIcon} />
            );
        }
        return null;
    }

    _renderRightIcon() {
        if(this.state.rightButtonIcon){
            return (
                <Image style={styles.rightButtonIcon} resizeMode={'contain'} source={this.state.rightButtonIcon} />
            );
        }
        return null;
    }

    _onLeftButtonPressHandle(event) {
        let onPress = this.state.onLeftButtonPress;
        typeof onPress === 'function' && onPress(event);
    }

    _onRightButtonPressHandle(event) {
        let onPress = this.state.onRightButtonPress;
        typeof onPress === 'function' && onPress(event);
    }
    _renderMyStatusBar(){
        if(Platform.OS === 'ios'){
            return   <View style={styles.myStatusBar} >
            </View>
        }
        return   <View style={styles.myStatusBar} >
            <StatusBar {...this.props.statusBar} />
        </View>
    }

    render() {
        let height = Platform.OS === 'ios' ? this.state.height + 20 : this.state.height;
        return (

                <View style={[styles.container, {
                    height: height,
                    backgroundColor: this.state.backgroundColor
                }]}>
                    {this._renderMyStatusBar()}
                    <TouchableOpacity onPress={this._onLeftButtonPressHandle.bind(this)}>
                        <View style={styles.leftButton}>
                            {this._renderLeftIcon()}
                            <Text style={[styles.leftButtonTitle, {color: this.state.leftButtonTitleColor}]}>
                                {this.state.leftButtonTitle}
                            </Text>
                        </View>
                    </TouchableOpacity>
    
                    <View style={styles.title}>
                        <Text style={[styles.titleText, {color: this.state.titleColor},{fontSize:this.props.titleSize}]} numberOfLines={1}>
                            {this.state.title}
                        </Text>
                    </View>
    
                    <TouchableOpacity onPress={this._onRightButtonPressHandle.bind(this)}>
                        <View style={styles.rightButton}>
                            {this._renderRightIcon()}
                            <Text style={[styles.rightButtonTitle, {color: this.state.rightButtonTitleColor}]}>
                                {this.state.rightButtonTitle}
                            </Text>
                        </View>
                    </TouchableOpacity>
    
                </View>

           
        )
    }
};

let styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        flexDirection: 'row',
        width: width,
        

    },
    leftButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 90,
        paddingTop: 1,
        paddingLeft: 8
    },
    leftButtonIcon: {
        width: 20,
        height: 25,
        marginRight: 6
    },
    leftButtonTitle: {
        fontSize: 15
    },
    title: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 1,
        justifyContent: 'center',
        width: width - 200,
        overflow: 'hidden'
    },
    titleText: {
        fontSize: 18,
        fontWeight: '700'
    },
    rightButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 90,
        paddingTop: 1,
        paddingRight: 18,
    },
    rightButtonIcon: {
        width: 20,
        height: 25
    },
    rightButtonTitle: {
        fontSize: 15
    },
    myStatusBar:{
        height:Platform.OS === "ios" ? 64 : 44,
    }
});

if(Platform.OS === 'ios'){
    styles = {
        ...styles,
        container: {
            flex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            flexDirection: 'row',
            width: width,
            paddingTop: 20
        },
        rightButton: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: 90,
            paddingTop: 1,
            paddingRight: 8
        }
    }
}
