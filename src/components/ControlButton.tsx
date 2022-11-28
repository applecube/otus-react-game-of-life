import React, { useEffect, useCallback, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

import { slices } from '../store/slices';
import { useGameSelector } from '../hooks/storeHooks';

import { ButtonProps } from '../types/ControlButton.types';
import { GameActions, gameActions, GameSagaActions, gameSagaActions } from '../types/Store.types';

const ControlButton: React.FC<ButtonProps> = (props) => {
	const {
		action,
		name,
		sagaParams
	} = props || {};

	const gameState = useGameSelector();

	const dispatch = useDispatch();

	const doNothing = useCallback(() => {
		console.log('I did nothing');
	}, []);

	let onClick: MouseEventHandler = doNothing;

	if(gameActions.includes(action as GameActions)) {
		onClick = () => dispatch(slices[action as GameActions](gameState));//dispatch({type: action, payload: gameState})
	}
	else if(gameSagaActions.includes(action as GameSagaActions)) {
		onClick = () => dispatch({ type: action, payload: sagaParams });
	}

	return (
		<Button variant="contained" onClick={onClick}>{name}</Button>
	);
}

export default ControlButton;