var require = {
    paths: {
        "ko": "bower_components/knockout/dist/knockout",
        "ROT": "bower_components/rot.js/rot",
        "drag": "bower_components/dragdealer/src/dragdealer",
        "Mapper": "src/Mapper/Mapper",
        "TileModel": "src/Models/TileModel",
        "rotTypes": "src/StaticData/rotTypes",
        "tileStaticData": "src/StaticData/tileStaticData",
        "tileTypes": "src/StaticData/tileTypes",
        "helpers": "src/helpers"
    },
    shim: {
    	"ROT": {
    		exports: "ROT"
    	}
    }
};