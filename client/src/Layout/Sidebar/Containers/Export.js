import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import uniqueId from 'lodash/uniqueId';
import Export from '../Components/Export';

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

export default compose(
    withState('exportedData', 'setExportedData', '{}'),
    withState('flipMode', 'setFlipMode', true),
    withState('formatData', 'setFormatData', true),
    withHandlers({
        onExportData: ({ setExportedData, formatData, flipMode, exitRequirements, mapGridPlane, mapWidth, mapHeight }) => () => {
            const modifiedGrid = flipMode ? mapGridPlane.map(({ y, ...tileProps }) => {
                return {
                    ...tileProps,
                    y: mapHeight - y
                }
            }) : [].concat(mapGridPlane);

            // TODO: Layers to editor consts
            const floorLayer = modifiedGrid.filter(tile => tile.selectedLayer === 0);
            const entityLayer = modifiedGrid.filter(tile => tile.selectedLayer === 1);
            
            // TODO: Yet to implement
            const themeSlot = 0;

            const jsonData = populateStructure({
                width: mapWidth,
                height: mapHeight,
                levelConditions: exitRequirements,
                themeSlot,
                entityLayer,
                floorLayer
            });
            const data = formatData ? JSON.stringify(jsonData, null, 4) : JSON.stringify(jsonData);
            setExportedData(data);
        },
        onFlipModeSelected: ({ setFlipMode, flipMode }) => () => {
            setFlipMode(!flipMode);
        },
        onFormatSelected: ({ setFormatData, formatData }) => () => {
            setFormatData(!formatData);
        }
    })
)
(Export);