import React from 'react';
import Button from '../../../Common/Button';
import Checkbox from '../../../Common/Checkbox';

const ExportComponent = ({
    exportedData,
    flipMode,
    formatData,
    onExportData,
    onFlipModeSelected,
    onFormatSelected
}) => {
    return [
        <Checkbox
            id="flip-data"
            label="Flip axis for Unity?"
            key="flip-mode"
            checked={flipMode}
            onChange={onFlipModeSelected}
        />,
        <Checkbox
            id="format-data"
            label="Format JSON output?"
            key="format-mode"
            checked={formatData}
            onChange={onFormatSelected}
        />,
        <Button onClick={onExportData} text="Export" key="button-export" />,
        <div id="output" key="output">
          <pre>{exportedData}</pre>
        </div>
    ]
}

export default ExportComponent;