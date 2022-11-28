import React from 'react';
import { GameActions } from './Store.types';

export interface ButtonProps {
	action: GameActions,
	name: string
	// setIsPlaying?: React.Dispatch<React.SetStateAction<boolean>>
}