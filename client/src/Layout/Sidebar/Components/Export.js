import React from 'react';
import Button from '../../../Common/Button';

const ExportComponent = ({
    exportedData,
    onExportData
}) => {
    return [
        <Button onClick={onExportData} text="Export" key="button-export" />,
        <div id="output" key="output">
          <pre>{exportedData}</pre>
        </div>
    ]
}

export default ExportComponent;