import React, { useEffect, useCallback, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import { slices } from '../store/slices';
import { useGameSelector } from '../hooks/storeHooks';

import { ButtonProps } from '../types/ControlButton.types';

const ControlButton: React.FC<ButtonProps> = (props) => {
	const {
		action,
		name
	} = props || {};

	const gameState = useGameSelector();

	const dispatch = useDispatch();

	const doNothing = useCallback(() => {
		console.log('I did nothing');
	}, []);

	let onClick: MouseEventHandler = action
		? () => dispatch(slices[action](gameState))//dispatch({type: action, payload: gameState})
		: doNothing;

	// switch(action) {
	// 	case 'reset':
	// 		onClick = reset;
	// 		btnText = 'Reset';
	// 		break;
	// 	case 'play':
	// 		onClick = play;
	// 		btnText = 'Play';
	// 		break;
	// 	case 'stop':
	// 		onClick = stop;
	// 		btnText = 'Stop';
	// 		break;
	// 	default:
	// 		onClick = doNothing;
	// 		btnText = 'Do nothing';
	// 		break;
	// }

	return (
		<Button onClick={onClick}>{name}</Button>
	);
}

export default ControlButton;