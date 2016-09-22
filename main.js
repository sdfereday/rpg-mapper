require(['ko', 'ROT'], function (ko, ROT) {

    // Tile graphical types
    var tileTypes = {
      unset: 0,
      block: 1,
      enemy: 2,
      chest: 3
    };

    // Tile type data (contains all graphical info, etc) - Expects each eType to always differ!
    var tileStaticData = [{
      name: "block",
      eType: tileTypes.block, // Corresponds to enums below.
      asset: "../blockimg.jpg"
    },
    {
      name: "enemy",
      eType: tileTypes.enemy, // Corresponds to enums below.
      asset: "../enemyimg.jpg"
    }];

    // Helpers, for when there's nowhere else to put these functions
    var helpers = {
      guid: function() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
      },
      useROT: function(w, h, callback, asMaze) {

        // Sanity check (10 is just a guess)
        if(!asMaze && w < 10 || h < 10)
          asMaze = true;

        // If not as maze, w and h need to be of certain amount about integer.
        // http://ondras.github.io/rot.js/hp/
        // ROT.RNG.setSeed(1234); // Only if you want a fixed seed per session.
        var map = asMaze ? new ROT.Map.EllerMaze(w, h) : new ROT.Map.Digger(w, h);

        if(typeof callback !== 'function') {
          console.warn("Requires a callback to function.");
          return;
        }

        map.create(callback);

      },
      getDataTileName: function(eType) {

        var found = tileStaticData.find(function(data) {
          return data.eType === eType;
        });
        
        return found ? found.name : null;

      }
    }

    // Components / models for mapper to use
    var TileModel = function(x, y, occupied, d, parent) {
      this.w = 32;
      this.h = 32;
      this.x = ko.observable(x);
      this.y = ko.observable(y);
      this.occupied = ko.observable(occupied);
      this.decorType = ko.observable(d);
      this.guid = ko.observable(helpers.guid());
      this.parent = parent;
      this.layer = null;

      // No idea how this works.
      // http://stackoverflow.com/questions/18560815/can-you-add-knockoutjs-style-binding-specifying-propertyvalue-together
      this.positionCSS = ko.computed(function() {
        return {
          "left": this.x() * this.w + "px",
          "top": this.y() * this.h + "px"
        };
      }, this);

    };

    TileModel.prototype.clicked = function(data, event) {

      /// Can we make sure that only certain tiles can be placed in thin air / not in thin air? This is just to make it nicer.
      // Not entirely sure if this is allowed or if it buggers the memory...
      this.occupied(!this.occupied());

      // This should be pre-determined by what you select from the menu. If you're not in placement mode, it should revert to using the default block graphic (or set of)
      this.decorType(tileTypes[data.parent.tileGraphic()]);

    }

    // ...
    var Mapper = function(w, h) {

      // In units (convert to observable 'if' you want resize).
      this.width = w;
      this.height = h;
      this.generated = ko.observable(true);

      // Selected tile types
      this.propMode = ko.observable(false);
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

      }, true);

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


    // Startup
    function generate(w, h){

      // Knockout start
      ko.applyBindings(new Mapper(w, h));

    }

    var startButton = document.getElementById("generate"),
    mWidth = document.getElementById("mapWidth"),
    mHeight = document.getElementById("mapHeight");

    startButton.addEventListener("click", function(){
      generate(mWidth.value, mHeight.value);
    });

});