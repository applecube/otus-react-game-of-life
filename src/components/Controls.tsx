import React from 'react';
import { Stack, Button } from '@mui/material';

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
			sx={{ width: 1/4, margin: "5%" }}
		>
			<ControlButton action="reset" name="Reset" />
			<ControlButton action={isPlaying ? "stop" : "play"} name={isPlaying ? "Stop" : "Play"} />
			<ControlButton action="speedUp" name="Speed Up" />
			<ControlButton action="speedDown" name="Speed Down" />
			<ControlButton action="saga-action" name="Delayed Stop" sagaParams={{action: "stop"}}/>
			<ControlButton action="saga-speed-interval" name="Speed Up Interval" />
			<Button variant="contained" disabled>{speedText}</Button>
		</Stack>
	)
}

export default Controls;