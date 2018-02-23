const { compose, withState, withHandlers, lifecycle } = Recompose;

// SETUP //
const guid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

const transpose = (matrix) => {
    // TODO: Make functional, no side-effects.
    // reverse the rows
    matrix = matrix.reverse();

    // swap the symmetric elements
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < i; j++) {
        var temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
    }

    return matrix;
};

const convertToCSharp = (arr, index) => {
	const newLine = index > 0 ? '\n' : '';
  let built = '';

  arr.forEach(function (row, i) {
    built += i !== arr.length - 1 ? '{' + row.toString() + '},\n' : '{' + row.toString() + '}';
  });

  return newLine + 'int[,] array' + index + ' = {\n' + built + '};';
};

const getCellsByRow = (arr, n) => {
  return arr.filter(function (item) {
    return item.y === n;
  });
};

const extractAsTypes = (arr) => {
  return arr.map(function (item) {
    return item.selectedTileType;
  });
};

// Data generator
const createGrid = (w, h, layer) => {
  let arr = [];
  for (let x = 0; x < h; x++) {
    for (let y = 0; y < w; y++) {
      arr.push({
      	id: guid() + layer,
        x, y,
        layer,
        selectedTileType: TILE_TYPES.EMPTY,
      });
    }
  }
  return arr;
};

// ...
const getTileByType = (type) => {
	return TILE_DATA.find(td => td.tileType === type);
};

const getTileById = (id) => {
	return TILE_DATA.find(td => td.id === id);
};

// ...
const MAP_OPTIONS = {
	TILE_SCALE: 32,
  WIDTH: 9,
  HEIGHT: 9
}

const TILE_TYPES = {
  EMPTY: 0,
  FLOOR_TILE: 1,
  WALL_TILE: 2,
  PILLAR_DECOR: 3,
  WALL_DECOR: 4,
  KEY_SPAWN: 5,
  PUZZLE_SPAWN: 6,
  ENEMY_SPAWN: 7,
  TREASURE_SPAWN: 8,
  TRAP_SPAWN: 9,
  ENTRANCE: 10,
  EXIT: 11,
  AI_WAYPOINT: 12
};

const TILE_DATA = [{
    id: "empty",
    name: "Empty",
    tileType: TILE_TYPES.EMPTY, // Corresponds to enums below.
    asset: "empty.png"
  },
  {
    id: "floor",
    name: "Floor",
    tileType: TILE_TYPES.FLOOR_TILE, // Corresponds to enums below.
    asset: "floor.png"
  },
  {
    id: "wall",
    name: "Wall",
    tileType: TILE_TYPES.WALL_TILE, // Corresponds to enums below.
    asset: "wall.png"
  },
  {
    id: "pillar",
    name: "Pillar",
    tileType: TILE_TYPES.PILLAR_DECOR, // Corresponds to enums below.
    asset: "pillar.png"
  },
  {
    id: "wallDecor",
    name: "Wall Decor",
    tileType: TILE_TYPES.WALL_DECOR, // Corresponds to enums below.
    asset: "wallDecor.png"
  },
  {
    id: "key",
    name: "Key",
    tileType: TILE_TYPES.KEY_SPAWN, // Corresponds to enums below.
    asset: "key.png"
  },
  {
    id: "puzzle",
    name: "Puzzle",
    tileType: TILE_TYPES.PUZZLE_SPAWN, // Corresponds to enums below.
    asset: "puzzle.png"
  },
  {
    id: "enemy",
    name: "Enemy",
    tileType: TILE_TYPES.ENEMY_SPAWN, // Corresponds to enums below.
    asset: "enemy.png"
  },
  {
    id: "treasure",
    name: "Treasure",
    tileType: TILE_TYPES.TREASURE_SPAWN, // Corresponds to enums below.
    asset: "treasure.png"
  },
  {
    id: "trap",
    name: "Trap",
    tileType: TILE_TYPES.TRAP_SPAWN, // Corresponds to enums below.
    asset: "trap.png"
  },
  {
    id: "entrance",
    name: "Entrance",
    tileType: TILE_TYPES.ENTRANCE, // Corresponds to enums below.
    asset: "entrance.png"
  },
  {
    id: "exit",
    name: "Exit",
    tileType: TILE_TYPES.EXIT, // Corresponds to enums below.
    asset: "exit.png"
  },
  {
    id: "aiWaypoint",
    name: "AI Waypoint",
    tileType: TILE_TYPES.AI_WAYPOINT, // Corresponds to enums below.
    asset: "aiWaypoint.png"
  }
];

// GRID EDITOR //
// ...
const { asset } = getTileByType(TILE_TYPES.EMPTY);

// ...
const CellComponent = ({
	x,
  y,
  decorType,
  asset,
  occupied,
  tileScale,
  onCellClicked
}) => {
  const tileX = x * tileScale + 'px';
  const tileY = y * tileScale + 'px';
  
  const cellStyle = {
  	top: tileY,
    left: tileX,
    backgroundUrl: asset
  }

	return (
  	<div className="sq" style={cellStyle} onClick={onCellClicked}>{decorType}</div>
  )
}

// ...
const CellContainer = compose(
	withState('decorType', 'setDecorType', TILE_TYPES.EMPTY),
  withState('asset', 'setAsset', asset),
  withState('occupied', 'setOccupied', false),
	withHandlers({
  	// Remember: The props are passed down (so if you pass onclick, it shoudl be defined by parent)
  	onCellClicked: ({ onCellClicked, x, y, setDecorType, setAsset, setOccupied, selectedTileType, id }) => () => {
      const { tileType, asset } = getTileByType(selectedTileType);
      
			setDecorType(tileType);
      setAsset(asset);
      setOccupied(tileType !== TILE_TYPES.EMPTY);
      
      return onCellClicked({x, y, id});
    }
  })
)
(CellComponent);

// ...
const GridComponent = ({
	cellData,
  selectedTileType,
  selectedLayer,
  onCellClicked
}) => { 
  // Remember: The props flow down.
	return (
  	<div className="map">
      {cellData && cellData.length &&
        cellData.map(({x, y, id}, i) => {
            return (
              <CellContainer
                key={i}
                selectedTileType={selectedTileType}
                selectedLayer={selectedLayer}
                tileScale={MAP_OPTIONS.TILE_SCALE}
                onCellClicked={onCellClicked}
                x={x}
                y={y}
                id={id}
              />
            );
        })
      }
    </div>
  )
}

// SIDEBAR //
// Sidebar generator
const GeneratorComponent = ({
	mapWidth,
  mapHeight,
	onMapDimensionsChanged,
  onMake
}) => {
	return (
  	<form className="start-form">
      <p>
        <strong>Map Options (fill these in before starting):</strong>
      </p>
      <p>Dimensions (in units):</p>
      <div className="node">
        <span>
          Width:
          <input type="text" id="mapWidth" value={mapWidth} onChange={onMapDimensionsChanged} />
        </span>
        <span>
          Height:
          <input type="text" id="mapHeight" value={mapHeight} onChange={onMapDimensionsChanged} />
        </span>
      </div>
      <p>
        <strong>Initialize Map?</strong>
      </p>
      <button onClick={onMake}>Make</button>
    </form>
  )
};

// Sidebar layers
const LayersComponent = ({
	layers,
  selectedLayer,
  onionMode,
  onOnionSelected,
	onLayerSelected
}) => {
	return (
  	<form id="layers">
        <p>
          <strong>Layers</strong>
        </p>
        <div className="checkbox">
            <input type="checkbox" id="onion-mode" onChange={onOnionSelected} checked={onionMode} />
            <label htmlFor="onion-mode"></label>
            <span>Onion</span>
        </div>
        {layers && layers.length &&
          layers.map((layerData, i) => {
              return (
                <span className="radio" key={i}>
                  <input type="radio" id={'layer' + i} name="layer" value={i} onChange={onLayerSelected} checked={i === selectedLayer} />
                  <label htmlFor={'layer' + i}>Layer {i}</label>
                  <div className="check"></div>
                </span>
              );
          })
        }
     </form>
  )
};

// Tile type selecttion
const TileTypeSelectionComponent = ({
  onCellTypeClicked
}) => {
	return (
  	<form id="tileTypes">
        <p>
          <strong>Tile Types</strong>
        </p>
        {TILE_DATA && TILE_DATA.length &&
          TILE_DATA.map(({id, name, tileType, asset}, i) => {
              return (
                <span className="radio" key={id}>
                  <input type="radio" id={id} name="entity" value={name} onChange={onCellTypeClicked} />
                  <label htmlFor={id}>{name}</label>
                  <div className="check"></div>
                </span>
              );
          })
        }
      </form>
  )
}

// Data exporting
const DataExportComponent = ({
	exportedData,
	onExportData
}) => {
	return (
  		<form id="dataExport">
        <button onClick={onExportData}>Export</button>
        <div id="output">
          <pre>{exportedData}</pre>
        </div>
      </form>
  )
};

// Sidebar container
const SidebarComponent = ({
	layers,
  selectedLayer,
  exportedData,
  onionMode,
  mapWidth,
  mapHeight,
  onMapDimensionsChanged,
  onMake,
  onCellTypeClicked,
  onLayerSelected,
  onExportData,
  onOnionSelected
}) => {
	// ROTComponent - Disabled for now.
	return (
  	<div id="ui">
      <p className="lead">Mapper
        <span>v0.3</span>
      </p>
      
      <GeneratorComponent
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        onMapDimensionsChanged={onMapDimensionsChanged}
        onMake={onMake} 
      />
      
      <div className="tools enableTools">
        <LayersComponent layers={layers} onionMode={onionMode} onLayerSelected={onLayerSelected} onOnionSelected={onOnionSelected} selectedLayer={selectedLayer} />
        <TileTypeSelectionComponent onCellTypeClicked={onCellTypeClicked} />
        <DataExportComponent exportedData={exportedData} onExportData={onExportData} />
      </div>
  	  
  	</div>
  )
}

// CONTAINER //
const AppComponent = ({
	layers,
  selectedTileType,
  selectedLayer,
  onionMode,
  exportedData,
  mapWidth,
  mapHeight,
  onMapDimensionsChanged,
  onMake,
  onCellClicked,
  onCellTypeClicked,
  onLayerSelected,
  onOnionSelected,
  onExportData
}) => {
	return (
  	<div>
      {layers &&
      	<SidebarComponent
          layers={layers}
          selectedLayer={selectedLayer}
          exportedData={exportedData}
          mapWidth={mapWidth}
          mapHeight={mapHeight}
          onionMode={onionMode}
          onMapDimensionsChanged={onMapDimensionsChanged}
          onMake={onMake}
          onCellTypeClicked={onCellTypeClicked}
          onLayerSelected={onLayerSelected}
          onExportData={onExportData}
          onOnionSelected={onOnionSelected}
        />
      }
      {layers && layers.length &&
          layers.map((layerData, i) => {
              return (
              <div
                key={i}
                className={selectedLayer === i ? (onionMode ? 'grid-outer active onion' : 'grid-outer active') : 'grid-outer inactive'}
              >
                  <GridComponent
                    key={i}
                    cellData={layerData}
                    selectedTileType={selectedTileType}
                    onCellClicked={onCellClicked}
                  />
              </div>
              );
          })
        }
    </div>
  )
}

const AppContainer = compose(
	withState('selectedLayer', 'setSelectedLayer', 0),
  withState('layers', 'updateLayers', []),
  withState('selectedTileType', 'setSelectedTileType', TILE_TYPES.EMPTY),
  withState('onionMode', 'setOnionMode', false),
  withState('exportedData', 'setExportedData', ''),
  withState('mapWidth', 'setMapWidth', MAP_OPTIONS.WIDTH),
  withState('mapHeight', 'setMapHeight', MAP_OPTIONS.HEIGHT),
  withHandlers({
  	onMapDimensionsChanged: ({ setMapWidth, setMapHeight }) => (e) => {
    	const inputValue = parseInt(e.target.value);
    	
      if(e.target.id === 'mapWidth' && inputValue > 0) {
      	setMapWidth(inputValue);
      }
      
      if(e.target.id === 'mapHeight' && inputValue > 0) {
      	setMapHeight(inputValue);
      }     
    },
    onMake: ({ mapWidth, mapHeight, updateLayers  }) => (e) => {
    	if(mapWidth > 0 && mapHeight > 0) {
      	const layers = [
      		createGrid(mapWidth, mapHeight, 0),
        	createGrid(mapWidth, mapHeight, 1)
     		];
        
        updateLayers(layers);
      } 
    
    	e.preventDefault();
    },
  	onCellClicked: ({ layers, selectedTileType, selectedLayer, updateLayers }) => ({ x, y, id }) => {
      const copiedLayers = layers.map((layer) => {
        return layer.map((cell) => {
        	if(cell.id === id) {
            return { id, x, y, layer: selectedLayer, selectedTileType };
          }
          return cell;
        });
      });
      updateLayers(copiedLayers);
      //dataStorage.save(copiedLayers);
    },
    onCellTypeClicked: ({ setSelectedTileType }) => (e) => {
      const { tileType } = getTileById(e.target.id);
    	setSelectedTileType(tileType);
    },
    onLayerSelected: ({ setSelectedLayer }) => (e) => {
      setSelectedLayer(parseInt(e.target.value));
    },
    onOnionSelected: ({ setOnionMode, onionMode }) => () => {
    	setOnionMode(!onionMode);
    },
    onExportData: ({ layers, setExportedData }) => (e) => {
    	/* Should end up like this:
      public int[,] floorLayer = {
      {2,2,2,2,2,2,2,2,2},
      {2,1,1,1,1,1,1,1,2},
      {2,1,1,1,1,1,1,1,2},
      {2,1,1,1,1,1,1,1,2},
      {2,1,1,1,1,1,1,1,2},
      {2,1,1,1,1,1,1,1,2},
      {2,2,2,1,2,1,2,2,2},
      {2,1,1,1,1,1,1,1,2},
      {2,2,2,2,2,2,2,2,2}};
      */
    	e.preventDefault();
      
      let output = '';
      
      for(let i = 0; i < layers.length; i++) {
        let inflated = [];

				// width = 2 || layers[i].length
        for (let j = 0; j < 9; j++) {
          //inflated.push(layers[i][j].selectedTileType);
          //inflated.push([0]);
          let filteredCells = extractAsTypes(getCellsByRow(layers[i], j));
          console.log(filteredCells);
        	inflated.push(filteredCells);
        }
        
        // Rotate - TODO: make more functional by returning new array.
        transpose(inflated);
        output += convertToCSharp(inflated, i);
      }
      
      setExportedData(output);
    }
  }),
  lifecycle({
  	componentDidMount(){
    	// ...
    }
	})
)
(AppComponent);

// TODO: Usually layers should be done on mounted lifecycle or something like that so data can be set accordingly and without need of
// multiple properties housing the same thing.
ReactDOM.render(
  <AppContainer />, // See above.
  document.getElementById('container')
);

