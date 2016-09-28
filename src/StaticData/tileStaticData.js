define(['tileTypes'], function(tileTypes){

  // Tile type data (contains all graphical info, etc) - Expects each eType to always differ!
  return [{
    name: "block",
    eType: tileTypes.block, // Corresponds to enums below.
    asset: "../blockimg.jpg"
  },
  {
    name: "enemy",
    eType: tileTypes.enemy, // Corresponds to enums below.
    asset: "../enemyimg.jpg"
  }];

});