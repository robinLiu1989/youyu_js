'use strict';
import Toast from 'react-native-root-toast';

//提示弹窗
export function toast(message, position = -130){
	let space = '    ';
	let toast = Toast.show(space + message + space, {
		duration: Toast.durations.SHORT,
		position: position,   //Toast.positions.BOTTOM,
		shadow: true,
		animation: true,
		hideOnPress: true,
		delay: 0,
		onShow: () => {
		},
		onShown: () => {
		},
		onHide: () => {
		},
		onHidden: () => {
		}
	});
}







