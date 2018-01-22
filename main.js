require(['ko', 'ROT', 'drag', 'Mapper'], function (ko, ROT, drag, Mapper) {

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

      var mapHandle = document.getElementById("map-handle");
      mapHandle.style.width = Math.round(mWidth.value * 32) + "px";
      mapHandle.style.height = Math.round(mHeight.value * 32) + "px";

      new drag('map-inner', {
        x: 0.5,
        y: 0.5,
        top: 32,
        bottom: 32,
        left: 32,
        right: 32,
        vertical: true,
        speed: 0.2,
        loose: true,
        requestAnimationFrame: true
      });

    });

});