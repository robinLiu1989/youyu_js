/**
 * Created by zhouqiang on 2017/3/27.
 */

import React, { Component } from 'react';
import {
    requireNativeComponent
} from 'react-native';

var NativeView = requireNativeComponent('NativeView', MessageMainView);

export default class MessageMainView extends Component {

    static propTypes = {
        infoDict:                   React.PropTypes.object,
    };

    componentDidMount() {
        console.log("NativeView被加载了");
    }

    render() {
        return(
            <NativeView
                {...this.props}
            >
            </NativeView>
        );
    }
}
