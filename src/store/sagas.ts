import { all, put, takeLatest, delay, take } from "typed-redux-saga";
import { slices } from "./slices";

import { Action } from '@redux-saga/types';
import { GameActions } from '../types/Store.types'

export function* delayedAction(): any {
	let { payload } = yield take('saga-action');
	let {
		delayTime = 1000,
		action,
		...slicePayload
	} = payload || {};

	yield delay(delayTime);

	yield put(slices[action as GameActions](slicePayload));

	yield delayedAction();
}

export function* speedChangeInterval(): any {
	let { payload } = yield take('saga-speed-interval');
	let { interval = 1000, count = 5, change = 1 } = payload || {};

	for(let i = 0; i < count; i++) {
		yield delay(interval);
		yield put(change >= 0 ? slices.speedUp() : slices.speedDown())
	}

	yield speedChangeInterval();
}

export default function* rootSaga() {
	yield all([
		delayedAction(),
		speedChangeInterval()
	])
}
