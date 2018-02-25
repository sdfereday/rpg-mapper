import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import Export from '../Components/Export';

export default compose(
    withState('exportedData', 'setExportedData', '{}'),
    withHandlers({
        onExportData: ({ setExportedData, mapGridPlane }) => () => {
            const jsonData = mapGridPlane;
            const formatted = JSON.stringify(jsonData);
            setExportedData(formatted);
            console.log(formatted);
        }
    })
)
(Export);

/// This is currently what is expected of the shape in Unity right now for map data. I believe this
/// could quite easily be cleaned up somewhat!
// extract() {

//     let output = '';
//     document.getElementById('output').innerHTML = '';

//     // flipped values for unity.
//     const result = {
//       "Items": [
//         {
//           "id": helpers.guid(),
//           "themeSlot": 0,
//           "dimensions": {
//             "width": this.width,
//             "height": this.height
//           },
//           "topLayer": this.getGridAt(2).map(({ id, x, y, decorType, requires }) => {

//             // Needs some work.
//             let additionalProps = {
//               // ...
//             }

//             if(requires().length > 0) {
//               additionalProps.requires = requires();
//             }

//             return decorType() > 0 ? {
//               id,
//               x: x(),
//               y: this.unityFlip() ? this.height - y() : y(),
//               tileType: decorType(),
//               tileName: helpers.getDataTileName(decorType()),
//               ...additionalProps
//             } : null
//           }).filter(x => x),
//           "middleLayer": this.getGridAt(1).map(({ id, x, y, decorType }) => {
//             return decorType() > 0 ? {
//               id,
//               x: x(),
//               y: this.unityFlip() ? this.height - y() : y(),
//               tileType: decorType(),
//               tileName: helpers.getDataTileName(decorType())
//             } : null
//           }).filter(x => x),
//           "bottomLayer": this.getGridAt(0).map(({ id, x, y, decorType }) => {
//             return {
//               id,
//               x: x(),
//               y: this.unityFlip() ? this.height - y() : y(),
//               tileType: decorType(),
//               tileName: helpers.getDataTileName(decorType())
//             };
//           })
//         }
//       ]
//     };

//     document.getElementById('output').innerHTML = '<pre>' + JSON.stringify(result, null, 4) + '</pre>';

//   }