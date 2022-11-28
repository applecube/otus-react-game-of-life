import { all, put, takeLatest, delay } from "typed-redux-saga";
import { slices } from "./slices";
import { GameActions } from '../types/Store.types'

function* delayedAction({
  delayTime,
  slice,
  payload
}: {
  delayTime: number;
  slice: GameActions;
  payload: any;
}) {
  yield delay(delayTime);
  yield put(slices[slice](payload))
}

function* speedChangeInterval({
  interval,
  count,
  change
}: {
  interval: number,
  count: number,
  change: number
}) {
  for(let i = 0; i < count; i++) {
    yield delay(interval);
    yield put(change >= 0 ? slices.speedUp() : slices.speedDown())
  }
}

export default function* rootSaga() {
  
}
