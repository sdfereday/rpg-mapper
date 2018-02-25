import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';
import Export from '../Components/Export';

export default compose(
    withState('exportedData', 'setExportedData', '{}'),
    withHandlers({
        onExportData: ({ setExportedData }) => () => {
            const jsonData = {};
            const formatted = JSON.stringify(jsonData);
            setExportedData(formatted);
            console.log(formatted);
        }
    })
)
(Export);