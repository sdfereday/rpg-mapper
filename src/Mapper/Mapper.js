define(['helpers', 'ko', 'TileModel', 'tileTypes', 'rotTypes'], function (helpers, ko, TileModel, tileTypes, rotTypes) {

  class Layer {

    constructor(name, index) {
      this.name = name + index;
      this.index = index;
      this.selected = ko.observable(true);
    }

    onLayerSelect(data) {
      this.selected(true);
      console.log(this.selected());
      console.log(data);
    }

  }

  var Mapper = function (w, h) {

    // In units (convert to observable 'if' you want resize).
    this.width = w;
    this.height = h;
    this.generated = ko.observable(true);

    // Selected tile types
    this.rotMode = ko.observable(rotTypes.maze.type);
    this.tileGraphic = ko.observable(helpers.getDataTileName(tileTypes.FLOOR_TILE));

    // Startup
    this.grid = ko.observableArray(this.createGrid(w, h));
    this.layers = ko.observableArray(this.createLayers(1));

    // Exported
    this.invert = ko.observable(false);
    this.multiMode = ko.observable(true);
    this.asCS = ko.observable(true);
    this.exportedData = ko.observable("");

  };

  Mapper.prototype.createLayers = function(n) {
    let layers = [];

    for(let i = 0; i < n; i++) {
      layers.push(new Layer('Layer-', i));
    }
    
    return layers;
  };

  Mapper.prototype.createGrid = function (w, h) {

    var tm, arr = [];

    // Remember to consider flipping
    for (var c = 0; c < h; c++) {
      for (var r = 0; r < w; r++) {
        // Passing parent in here - may not be the ideal way to do it...
        arr.push(new TileModel(r, c, false, tileTypes.FLOOR_TILE, this));
      }
    }

    return arr;

  };

  Mapper.prototype.findOnGridAt = function (x, y) {

    return this.grid().find(function (item) {
      return item.x() === x && item.y() === y;
    });

  };

  Mapper.prototype.generateUsingROT = function () {

    // Note: Only works for foundation layer at this stage (probably always be that way too)
    var self = this, tile;

    let emptyType = this.invert() ? tileTypes.WALL_TILE : tileTypes.FLOOR_TILE;
    let blockType = this.invert() ? tileTypes.FLOOR_TILE : tileTypes.WALL_TILE;

    // Clear previous grid (may wish to leave decors alone)
    this.grid().forEach(function (item) {
      item.decorType(emptyType);
      item.occupied(false);
    });

    // Should have produced an array of stuff. Once done, we can now edit the grid automatically.
    // One thing to note: Ensure that the arrays are layed in the right order, as cols and rows often get mixed up along the way.
    // ...
    // After grid has been created, use its dimensions to generate an ROT map.
    helpers.useROT(this.width, this.height, function (x, y, v) {

      // WIP: Knockout might just have its own way of doing this.
      var tile = self.findOnGridAt(x, y);

      // 'v' should be equal to whatever your block enum is (could be more dynamic)...
      if (tile && v === tileTypes.WALL_TILE) {
        // Since I need inverted, I set any blocks to unset here.
        tile.setDecor(blockType);
      }

    }, this.rotMode());

  };

  Mapper.prototype.transpose = function(matrix) {

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

  Mapper.prototype.exportData = function () {

    var fLayer = this.grid().map(function (tile, i) {
      return tile.decorType();
    });

    // Debug
    console.clear();
    console.log("Exporting...");
    console.log(fLayer);

    if (this.multiMode()) {
      console.log("Running in multi-mode.");
      this.extract();
      return;
    }

    this.exportedData(JSON.stringify({
      foundationLayer: fLayer
    }));

  };

  Mapper.prototype.changeExportMode = function () {
    this.multiMode();
    return true;
  };

  Mapper.prototype.changeCS = function () {
    this.asCS();
    return true;
  };

  Mapper.prototype.changeBlockMode = function () {
    this.invert();
    return true;
  };

  // Inflate to two dimensional
  Mapper.prototype.getCellsByRow = function (arr, n) {
    return arr.filter(function (item) {
      return item.y() === n;
    });
  }

  Mapper.prototype.extractAsTypes = function (arr) {
    return arr.map(function (item) {
      return item.decorType();
    });
  };

  Mapper.prototype.extract = function () {

    let inflated = [];

    for (var i = 0; i < this.width; i++) {
      let filteredCells = this.extractAsTypes(this.getCellsByRow(this.grid(), i));
      inflated.push(filteredCells);
    }

    // Rotate - TODO: make more functional by returning new array.
    this.transpose(inflated);

    const converted = this.asCS() ? this.convert(inflated) : inflated;

    // temp
    document.getElementById('output').innerHTML = '<pre>' + converted + '</pre>';

    //this.exportedData(JSON.stringify({
    //foundationLayer: converted//,
    //entityLayer: eLayer
    //}));

  };

  // Converts to a c# matrix array
  Mapper.prototype.convert = function (arr, dimensions) {

    let built = '';

    arr.forEach(function (row, i) {

      built += i !== arr.length - 1 ? '{' + row.toString() + '},\n' : '{' + row.toString() + '}';

    });

    return 'int[,] yourArray = {' + built + '};';

  };

  return Mapper;

});