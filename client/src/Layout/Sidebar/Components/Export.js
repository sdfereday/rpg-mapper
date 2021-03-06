import React from 'react';
import Button from '../../../Common/Button';
import Checkbox from '../../../Common/Checkbox';

const ExportComponent = ({
    exportedData,
    flipMode,
    formatData,
    dropEmbedded,
    onExportData,
    onFlipModeSelected,
    onFormatSelected,
    onDropEmbedded
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
        <Checkbox
            id="drop-embedded"
            label="Remove embedded walls?"
            key="drop-embedded-mode"
            checked={dropEmbedded}
            onChange={onDropEmbedded}
        />,
        <Button onClick={onExportData} text="Export" key="button-export" />,
        <div id="output" key="output">
          <pre>{exportedData}</pre>
        </div>
    ]
}

export default ExportComponent;