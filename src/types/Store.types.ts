export interface GameState {
	isPlaying: boolean,
	needReset: boolean,
	canvasWidth: number | string,
	canvasHeight: number | string,
	width: number,
	height: number,
	cellSize: number,
	cellCount: number,
	speed: number
}

export interface FullState {
	game: GameState
}

export const gameActions = ['play', 'stop', 'changeDimensions', 'speedUp', 'speedDown', 'reset'] as const;

export const gameSagaActions = ['saga-action', 'saga-speed-interval'] as const;

export type GameActions = typeof gameActions[number];

export type GameSagaActions = typeof gameSagaActions[number];