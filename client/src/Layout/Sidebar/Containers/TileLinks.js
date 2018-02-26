import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import TileLinks from '../Components/TileLinks';

import { TILE_TYPES } from '../../../Consts/EditorConstants.js';

// TODO: Make more generic so multiple 'things' can have requirements such as chests,
// hidden doors, etc. For now however, just stick with exits.
export default compose(
    withState('exitTile', 'setExitTile', null),
    withState('eligibleTiles', 'setEligibleTiles', []),
    withPropsOnChange(['mapGridPlane'], (({ mapGridPlane, setExitTile, setEligibleTiles }) => {
        const exitTile = mapGridPlane.find(x => x.t === TILE_TYPES.EXIT);
        const eligible = mapGridPlane.filter(x => x.t === TILE_TYPES.PUZZLE_SPAWN);

        if(exitTile) {
            setExitTile(exitTile);
        }
        
        if(eligible.length > 0) {
            setEligibleTiles(eligible);
        }
    })),
    withHandlers({
        onTileToggled: ({ exitRequirements, setExitRequirements }) => ({ target }) => {
            const targetId = target.id;
            const current = [].concat(exitRequirements);
            const exists = current.some(x => x === targetId);
            
            if(exists) {
                setExitRequirements(current.filter(x => x !== targetId));
                return;
            }
            current.push(targetId);
            setExitRequirements(current);
        }
    })
)
(TileLinks);