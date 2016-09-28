define(['helpers', 'ko', 'TileModel', 'tileTypes', 'rotTypes'], function(helpers, ko, TileModel, tileTypes, rotTypes){

    var Mapper = function(w, h) {

      // In units (convert to observable 'if' you want resize).
      this.width = w;
      this.height = h;
      this.generated = ko.observable(true);

      // Selected tile types
      this.propMode = ko.observable(false);
      this.rotMode = ko.observable(rotTypes.maze.type);
      this.tileGraphic = ko.observable(helpers.getDataTileName(tileTypes.block));

      // Startup
      this.grid = ko.observableArray(this.createGrid(w, h));
      this.propGrid = ko.observableArray(this.createGrid(w, h));

      // Exported
      this.exportedData = ko.observable("");

    };

    Mapper.prototype.createGrid = function(w, h) {

      var tm, arr = [];

      // Remember to consider flipping
      for (var c = 0; c < h; c++) {
        for (var r = 0; r < w; r++) {
          // Passing parent in here - may not be the ideal way to do it...
          arr.push(new TileModel(r, c, false, tileTypes.unset, this));
        }
      }

      return arr;

    };

    Mapper.prototype.findOnGridAt = function(x, y) {

      return this.grid().find(function(item){
        return item.x() === x && item.y() === y;
      });

    };

    Mapper.prototype.generateUsingROT = function() {

      // Note: Only works for foundation layer at this stage (probably always be that way too)
      var self = this, tile;

      // Clear previous grid (may wish to leave decors alone)
      this.grid().forEach(function(item){
        item.decorType(tileTypes.unset);
        item.occupied(false);
      });

      // Should have produced an array of stuff. Once done, we can now edit the grid automatically.
      // One thing to note: Ensure that the arrays are layed in the right order, as cols and rows often get mixed up along the way.
      // ...
      // After grid has been created, use its dimensions to generate an ROT map.
      helpers.useROT(this.width, this.height, function(x, y, v){
        
        // WIP: Knockout might just have its own way of doing this.
        var tile = self.findOnGridAt(x, y);

        // 'v' should be equal to whatever your block enum is (could be more dynamic)...
        if(tile && v === tileTypes.block) {
          tile.decorType(v);
          tile.occupied(true);
        }

      }, this.rotMode());

    };

    Mapper.prototype.exportData = function() {

      var fLayer = this.grid().map(function(tile) {
          return tile.decorType();
        }),
        eLayer = this.propGrid().map(function(tile) {
          return tile.decorType();
        });

      // Debug
      console.clear();
      console.log(fLayer);
      console.log(eLayer);

      // Does not work, need to parse as array of numbers, and not coordy things. Awesome.
      // Also need the other layes too.
      this.exportedData(JSON.stringify({
        foundationLayer: fLayer,
        entityLayer: eLayer
      }));

    };

    Mapper.prototype.changeDefault = function() {
      
      var defGraphic = !this.propMode() ? helpers.getDataTileName(tileTypes.block) : helpers.getDataTileName(tileTypes.enemy);
        
      this.tileGraphic(defGraphic);
      
      return true;

    };

    return Mapper;

});