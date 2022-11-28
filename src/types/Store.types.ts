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
	gameSlice: GameState,
	gameReducer: GameState,
	game: GameState
}

export type GameActions = 'play' | 'stop' | 'changeDimensions' | 'speedUp' | 'speedDown' | 'reset';