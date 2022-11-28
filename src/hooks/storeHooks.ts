import { useSelector } from 'react-redux';
import { FullState } from '../types/Store.types';

export const useGameSelector = () => {
	return useSelector((state: FullState) => state.game);
}