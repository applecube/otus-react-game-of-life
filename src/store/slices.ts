import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPlaying: true,
	needReset: false,
	width: 100,
	height: 100,
	cellSize: 5,
	cellCount: 50,
	speed: 1,
};

const gameSlice = createSlice({
	name: 'game',
	initialState,
	reducers: {
		play: (state) => {
			state.isPlaying = true;
			return state;
		},
		stop: (state) => {
			state.isPlaying = false;
			return state;
		},
		changeDimensions: (state, { payload }) => {
			state.width = payload?.width;
			state.height = payload?.height;
			state.cellSize = payload?.cellSize;
			state.cellCount = payload?.cellCount;
			return state;
		},
		speedUp: (state) => {
			state.speed *= 2;
			return state;
		},
		speedDown: (state) => {
			state.speed /= 2;
			return state;
		},
		reset: (state) => {
			state = {...initialState};
			state.needReset = true;
			return state;
		},
		resetDone: (state) => {
			state.needReset = false;
			return state;
		}
	}
});

export const slices = gameSlice.actions;
const gameReducer = gameSlice.reducer;
export default gameReducer;
