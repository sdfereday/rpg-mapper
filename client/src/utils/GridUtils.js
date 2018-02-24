import uniqueId from 'lodash/uniqueId';
import { TILE_TYPES } from '../Consts/EditorConstants';

export const createGrid = (w, h) => {
    let arr = [];
    for (let x = 0; x < h; x++) {
        for (let y = 0; y < w; y++) {
            arr.push({
                id: uniqueId,
                x, y,
                activeType: TILE_TYPES.EMPTY,
            });
        }
    }
    return arr;
};