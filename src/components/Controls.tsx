import React from 'react';
import { Stack, Input } from '@mui/material';

import { useGameSelector } from '../hooks/storeHooks';
import ControlButton from './ControlButton';

import { ControlProps } from '../types/Controls.types';

const Controls:React.FC<ControlProps> = (props) => {
	const {
		direction = "column"
	} = props || {};

	const { isPlaying, speed } = useGameSelector();
	const speedText = (speed < 1 ? speed.toFixed(2) : speed) + 'x';

	return (
		<Stack
			direction={direction}
  			spacing={2}
			sx={{ width: 1/4 }}
		>
			<ControlButton action="reset" name="Reset" />
			<ControlButton action={isPlaying ? "stop" : "play"} name={isPlaying ? "Stop" : "Play"} />
			<ControlButton action="speedUp" name="Speed Up" />
			<ControlButton action="speedDown" name="Speed Down" />
			<Input value={speedText} disabled/>
		</Stack>
	)
}

export default Controls;