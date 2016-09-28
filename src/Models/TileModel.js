define(['ko', 'tileTypes', 'helpers'], function(ko, tileTypes, helpers){

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

    return TileModel;

});