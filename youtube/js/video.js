'use strict'

module.exports = {
    player: null,

    init: function() {
      console.log("init");

        this.player = new YT.Player("player", {
            height: "390",
            width: "640"
        });
    },

    play: function(videoId) {
        this.player.loadVideoById(videoId);
        this.player.playVideo();
    },

    stop: function() {
        this.player.stopVideo();
    }
}
