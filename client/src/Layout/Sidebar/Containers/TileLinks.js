import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import TileLinks from '../Components/TileLinks';

import { TILE_TYPES } from '../../../Consts/EditorConstants.js';

export default compose(
    withState('exitRequirements', 'setExitRequirements', []),
    withHandlers({
        onTileToggled: ({ exitRequirements, setExitRequirements }) => ({ target }) => {
            const targetId = target.id;
            const targetMode = target.value === 'on';
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