define(['helpers', 'ko', 'TileModel', 'tileTypes', 'rotTypes'], function (helpers, ko, TileModel, tileTypes, rotTypes) {

  //...
  const returnTilesByType = (tiles, type) => {
    return tiles.filter(tile => tile.decorType() === type);
  };

  class Mapper {
    constructor(w, h) {
      // In units (convert to observable 'if' you want resize).
      this.width = w;
      this.height = h;
      this.generated = ko.observable(true);

      // Selected tile types
      this.rotMode = ko.observable(rotTypes.maze.type);
      this.tileGraphic = ko.observable(helpers.getDataTileName(tileTypes.EMPTY));

      // Startup
      this.grids = ko.observableArray([
        {
          grid: ko.observableArray(this.createGrid(w, h))
        },
        {
          grid: ko.observableArray(this.createGrid(w, h))
        },
        {
          grid: ko.observableArray(this.createGrid(w, h))
        }
      ]);

      this.selectableTiles = ko.computed(() => {
        const tiles = returnTilesByType(this.getGridAt(2), tileTypes.PUZZLE_SPAWN);
        return tiles.map(tile => tile.x() + '-' + tile.y());
      }, this);

      this.selectedLayer = ko.observable("0");
      this.mapExits = ko.observable(this.getGridAt(2).filter(x => {
        return ////
      }));

      this.onion = ko.observable(true);
      this.invert = ko.observable(false);
      this.multiMode = ko.observable(true);
      this.unityFlip = ko.observable(true);
      this.exportedData = ko.observable("");
    }

    getGridAt(i) {
      return this.grids()[i].grid();
    }

    createGrid(w, h) {
      let tm, arr = [];
      // Remember to consider flipping
      for (let r = 0; r < h; r++) {
        for (let c = 0; c < w; c++) {
          // Passing parent in here - may not be the ideal way to do it...
          arr.push(new TileModel(c, r, false, tileTypes.EMPTY, this));
        }
      }
      return arr;
    }

    findOnGridAt(x, y) {
      return this.getGridAt(this.selectedLayer()).find(function (item) {
        return item.x() === x && item.y() === y;
      });
    }

    generateUsingROT() {

      // Note: Only works for foundation layer at this stage (probably always be that way too)
      const self = this;

      let emptyType = this.invert() ? tileTypes.WALL_TILE : tileTypes.FLOOR_TILE;
      let blockType = this.invert() ? tileTypes.FLOOR_TILE : tileTypes.WALL_TILE;

      // Clear previous grid (may wish to leave decors alone)
      this.getGridAt(this.selectedLayer()).forEach(function (item) {
        item.setDecor(emptyType);
      });

      // Should have produced an array of stuff. Once done, we can now edit the grid automatically.
      // One thing to note: Ensure that the arrays are layed in the right order, as cols and rows often get mixed up along the way.
      // ...
      // After grid has been created, use its dimensions to generate an ROT map.
      helpers.useROT(this.width, this.height, function (x, y, v) {

        // WIP: Knockout might just have its own way of doing this.
        const tile = self.findOnGridAt(x, y);

        // 'v' should be equal to whatever your block enum is (could be more dynamic)...
        if (tile && v === tileTypes.FLOOR_TILE) {
          // Since I need inverted, I set any blocks to unset here.
          tile.setDecor(blockType);
        }

      }, this.rotMode());

    }

    exportData() {

      const fLayer = this.getGridAt(this.selectedLayer()).map((tile, i) => {
        return tile.decorType();
      });

      if (this.multiMode()) {
        this.extract();
        return;
      }

      this.exportedData(JSON.stringify({
        foundationLayer: fLayer
      }));

    }

    changeExportMode() {
      this.multiMode();
      return true;
    }

    changeBlockMode() {
      this.invert();
      return true;
    }

    // Inflate to two dimensional
    getCellsByRow(arr, n) {
      return arr.filter((item) => {
        return item.y() === n;
      });
    }

    extractAsTypes(arr) {
      return arr.map((item) => {
        return item.decorType();
      });
    }

    extract() {

      let output = '';
      document.getElementById('output').innerHTML = '';

      // flipped values for unity.
      const result = {
        "Items": [
          {
            "id": helpers.guid(),
            "themeSlot": 0,
            "dimensions": {
              "width": this.width,
              "height": this.height
            },
            "topLayer": this.getGridAt(2).map(({ id, x, y, decorType }) => {
              return decorType() > 0 ? {
                id,
                x: x(),
                y: this.unityFlip() ? this.height - y() : y(),
                tileType: decorType(),
                tileName: helpers.getDataTileName(decorType())
              } : null
            }).filter(x => x),
            "middleLayer": this.getGridAt(1).map(({ id, x, y, decorType }) => {
              return decorType() > 0 ? {
                id,
                x: x(),
                y: this.unityFlip() ? this.height - y() : y(),
                tileType: decorType(),
                tileName: helpers.getDataTileName(decorType())
              } : null
            }).filter(x => x),
            "bottomLayer": this.getGridAt(0).map(({ id, x, y, decorType }) => {
              return {
                id,
                x: x(),
                y: this.unityFlip() ? this.height - y() : y(),
                tileType: decorType(),
                tileName: helpers.getDataTileName(decorType())
              };
            })
          }
        ]
      };

      document.getElementById('output').innerHTML = '<pre>' + JSON.stringify(result, null, 4) + '</pre>';

    }

  }

  return Mapper;

});