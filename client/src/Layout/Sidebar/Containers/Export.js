import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import uniqueId from 'lodash/uniqueId';
import Export from '../Components/Export';
import { TILE_TYPES } from '../../../Consts/EditorConstants';

const populateStructure = ({
    width,
    height,
    themeSlot,
    levelConditions,
    entityLayer,
    floorLayer
}) => {
    return {
        Items: [
            {
                id: uniqueId(),
                themeSlot,
                levelConditions,
                dimensions: {
                    width,
                    height
                },
                entityLayer,
                floorLayer
            }
        ]
    }
};

const findInTiles = (x, y, arr) => {
    return arr.find(tile => tile.x === x && tile.y === y) || { t: TILE_TYPES.EMPTY };
}

const removeEmbedded = (tileArray) => {
    return tileArray.filter(({ x, y, t }) => {
        let score = 0;
        score += findInTiles(x, y - 1, tileArray).t === TILE_TYPES.WALL_TILE ? 1 : 0;
        score += findInTiles(x + 1, y, tileArray).t === TILE_TYPES.WALL_TILE ? 2 : 0;
        score += findInTiles(x, y + 1, tileArray).t === TILE_TYPES.WALL_TILE ? 4 : 0;
        score += findInTiles(x - 1, y, tileArray).t === TILE_TYPES.WALL_TILE ? 8 : 0;
        return score < 15 && t === TILE_TYPES.WALL_TILE;
    });
};

export default compose(
    withState('exportedData', 'setExportedData', '{}'),
    withState('flipMode', 'setFlipMode', true),
    withState('formatData', 'setFormatData', true),
    withState('dropEmbedded', 'setDropEmbedded', true),
    withHandlers({
        onExportData: ({ setExportedData, formatData, flipMode, dropEmbedded, exitRequirements, mapGridPlane, mapEntityPlane, mapWidth, mapHeight }) => () => {
            const floorLayer = flipMode ? mapGridPlane.map(({ y, ...tileProps }) => {
                return {
                    ...tileProps,
                    y: mapHeight - y
                }
            }) : [].concat(mapGridPlane);

            const entityLayer = flipMode ? mapEntityPlane.map(({ y, ...tileProps }) => {
                return {
                    ...tileProps,
                    y: mapHeight - y
                }
            }) : [].concat(mapEntityPlane);

            // TODO: Yet to implement
            const themeSlot = 0;

            const jsonData = populateStructure({
                width: mapWidth,
                height: mapHeight,
                levelConditions: exitRequirements,
                themeSlot,
                entityLayer,
                floorLayer: dropEmbedded ? removeEmbedded(floorLayer) : floorLayer
            });

            const data = formatData ? JSON.stringify(jsonData, null, 4) : JSON.stringify(jsonData);
            setExportedData(data);
        },
        onFlipModeSelected: ({ setFlipMode, flipMode }) => () => {
            setFlipMode(!flipMode);
        },
        onFormatSelected: ({ setFormatData, formatData }) => () => {
            setFormatData(!formatData);
        },
        onDropEmbedded: ({ setDropEmbedded, dropEmbedded }) => () => {
            setDropEmbedded(!dropEmbedded);
        }
    }),
    withPropsOnChange(['mapGridPlane', 'mapEntityPlane'], (({ onExportData }) => onExportData))
)
(Export);
