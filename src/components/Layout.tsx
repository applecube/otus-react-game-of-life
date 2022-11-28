import React from 'react';
import { Stack, Divider } from '@mui/material';
import Controls from './Controls';
import GameCanvas from './GameCanvas';

const Layout = () => {
	const divider = <Divider orientation="vertical" flexItem />;

	return (
		<Stack
			direction="row"
			divider={divider}
  			spacing={2}
		>
			<Controls direction="column"/>
			<GameCanvas />
		</Stack>
	);
}

export default Layout;