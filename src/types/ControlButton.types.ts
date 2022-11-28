import React from 'react';
import { GameActions, GameSagaActions } from './Store.types';

export interface ButtonProps {
	action: GameActions | GameSagaActions,
	name: string
	sagaParams?: Object
}