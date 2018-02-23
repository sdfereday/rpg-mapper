export default ExportComponent = ({
    exportedData,
    onExportData
}) => {
    return [
        <Button onClick={onExportData} text="Export" />,
        <div id="output">
          <pre>{exportedData}</pre>
        </div>
    ]
}