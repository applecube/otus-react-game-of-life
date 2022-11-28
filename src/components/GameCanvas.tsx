import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';

import { useGameSelector } from '../hooks/storeHooks';
import { slices } from '../store/slices';

import { StyleProps } from '../types/Props.types';
import { GameMatrix } from '../types/GameCanvas.types';


const GameCanvas: React.FC<StyleProps> = (props) => {
	const {
		canvasWidth = "70%",
		canvasHeight = "70%"
	} = props || {};

	const canvasRef = useRef<HTMLCanvasElement>(null);

	const {
		isPlaying,
		needReset,
		width,
		height,
		cellSize,
		cellCount,
		speed
	} = useGameSelector();

	const dispatch = useDispatch();

	let timerRef = useRef<any>(null);
	let matrixRef = useRef<GameMatrix>([]);
	const setMatrix = (val: GameMatrix) => matrixRef.current = val;

	const draw = useCallback(() => {
		let matrix = matrixRef.current;
		let canvas = canvasRef.current;
		if(!canvas) return;

		let ctx = canvas.getContext('2d');
		if(!ctx) return;

		let gridWidth = cellSize * width;
		let gridHeight = cellSize * height;

		ctx.clearRect(0, 0, gridWidth, gridHeight);

		for(let i = 0; i < width; i++) {
			for(let j = 0; j < height; j++) {
				if(matrix[i][j])
					ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
			}
		}
	}, [width, height, cellSize]);

	const countNeighbors = useCallback((x: number, y: number): number => {
		let matrix = matrixRef.current;
		let total = 0;
		// Check top
		if(y > 0 && matrix[x][y - 1]) {
			total++;
		}
		// Check bottom
		if(y < height - 1 && matrix[x][y + 1]) {
			total++;
		}
		// Check left
		if(x > 0 && matrix[x - 1][y]) {
			total++;
		}
		// Check right
		if(x < width - 1 && matrix[x + 1][y]) {
			total++;
		}
		// Check top-left
		if(y > 0 && x > 0 && matrix[x - 1][y - 1]) {
			total++;
		}
		// Check top-right
		if(y > 0 && x < width - 1 && matrix[x + 1][y - 1]) {
			total++;
		}
		// Check bottom-left
		if(y < height - 1 && x > 0 && matrix[x - 1][y + 1]) {
			total++;
		}
		// Check bottom-right
		if(y < height - 1 && x < width - 1 && matrix[x + 1][y + 1]) {
			total++;
		}
		return total;
	}, [width, height]);

	const createMatrix = useCallback((width: number, height: number) => {
		let newMatrix = new Array(width);
		for(let i = 0; i < width; i++) {
			newMatrix[i] = new Array(height);
		}
		return newMatrix;
	}, []);
	
	const step = useCallback(() => {
		let matrix = matrixRef.current;
		let count: number = 0;
		let stepMatrix = matrix;

		for(let i = 0; i < width; i++) {
			for(let j = 0; j < height; j++) {
				count = countNeighbors(i, j);
				stepMatrix[i][j] = matrix[i][j]
					? count === 2 || count === 3
					: count === 3;
			}
		}

		setMatrix(stepMatrix);
		draw();

	}, [width, height, countNeighbors, createMatrix, draw]);

	const clearLoop = useCallback(() => {
		if(timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
	}, []);

	const gameLoop = useCallback(() => {
		let interval = Math.round(500 / speed);
		timerRef.current = setInterval(step, interval);

	}, [speed, step]);

	const fillMatrix = useCallback((width: number, height: number) => {
		let filledMatrix = new Array(width);

		for(let i = 0; i < width; i++) {
			filledMatrix[i] = new Array(height);
			for(let j = 0; j < height; j++) {
				filledMatrix[i][j] = Math.random() < 0.1; 
			}
		}

		setMatrix(filledMatrix);

	}, [width, height]);

	useEffect(() => {
		fillMatrix(width, height);

		if(needReset) {
			dispatch(slices.resetDone());
		}

	}, [width, height, needReset]);

	useEffect(() => {
		let matrix = matrixRef.current;

		if(!matrix.length)
			return;

		clearLoop();

		if(isPlaying) {
			gameLoop();
		}

	}, [isPlaying, speed]);

	return <canvas style={{ width: canvasWidth, height: canvasHeight }} ref={canvasRef} />
}

export default GameCanvas;