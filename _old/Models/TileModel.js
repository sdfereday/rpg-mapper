define(['ko', 'tileStaticData', 'tileTypes', 'helpers'], function (ko, tileStaticData, tileTypes, helpers) {

  class TileModel {
    constructor(x, y, occupied, d, parent) {
      this.id = helpers.guid();
      this.name = ko.observable('');
      this.w = 32;
      this.h = 32;
      this.x = ko.observable(x);
      this.y = ko.observable(y);
      this.occupied = ko.observable(occupied);
      this.decorType = ko.observable(d);
      this.parent = parent;
      this.layer = null;

      // Data experimentation
      // Should only exist on certain types
      this.requires = ko.observableArray([]);

      // Set initial icon (if any)
      const assetsRoot = 'icons/';
      const { asset } = tileStaticData.find(t => t.eType === d);
      this.asset = ko.observable(asset);

      // http://stackoverflow.com/questions/18560815/can-you-add-knockoutjs-style-binding-specifying-propertyvalue-together
      this.positionCSS = ko.computed(function () {
        return {
          'left': this.x() * this.w + 'px',
          'top': this.y() * this.h + 'px'
        };
      }, this);

      this.icon = ko.computed(function () {
        return {
          'background-image': 'url(' + assetsRoot + this.asset() + ')'
        }
      }, this);
    }

    clicked(data, event) {
      // This should be pre-determined by what you select from the menu. If you're not in placement mode, it should revert to using the default block graphic (or set of)
      const { eType, asset, name } = tileStaticData.find(t => t.id === data.parent.tileGraphic());
      this.decorType(eType);
      this.name(name);
      this.asset(asset);
      /// Can we make sure that only certain tiles can be placed in thin air / not in thin air? This is just to make it nicer.
      // Not entirely sure if this is allowed or if it buggers the memory...
      this.occupied(eType !== tileTypes.EMPTY);
    };

    setDecor(eType) {
      const { asset, name } = tileStaticData.find(t => t.eType === eType);
      this.name(name);
      this.asset(asset);
      this.decorType(eType);
      this.occupied(eType !== tileTypes.EMPTY);
    };

    setRequired(v) {
      console.log("boop", v);
    }
  }

  return TileModel;

});