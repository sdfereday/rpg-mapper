define(['ROT', 'tileStaticData', 'rotTypes'], function (ROT, tileStaticData, rotTypes) {

  return {
    guid: () => {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },
    useROT: (w, h, callback, rotMode) => {
      // Sanity check (24 is just a guess)
      if (!rotMode && (w < 24 || h < 24)) {
        console.warn("Reverting to maze mode to avoid generation failure.");
        rotMode = true;
      }

      // If not as maze, w and h need to be of certain amount about integer.
      // http://ondras.github.io/rot.js/hp/
      // ROT.RNG.setSeed(1234); // Only if you want a fixed seed per session.
      const map = rotMode === rotTypes.maze.type ? new ROT.Map.EllerMaze(w, h) : new ROT.Map.Digger(w, h);

      if (typeof callback !== 'function') {
        console.warn("Requires a callback to function.");
        return;
      }

      map.create(callback);

    },
    getDataTileName: (eType) => {
      const found = tileStaticData.find(function (data) {
        return data.eType === eType;
      });
      return found ? found.id : null;
    }
  };

});