const WINDOW_SIZE = 750;

const config = {
    type: Phaser.AUTO,
    width: WINDOW_SIZE,
    height: WINDOW_SIZE,
    backgroundColor: '#ffffff',
    pixelArt: false,
    scene: [loadingScene, homeScene, gameScene]
};

const game = new Phaser.Game(config);




/*
TO DO LIST

sakk
sakk matt
rosálás
en passant
paraszt átváltozás
bábú leütési animáció??
*/